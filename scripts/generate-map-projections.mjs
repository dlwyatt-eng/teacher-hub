import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const topology = JSON.parse(await readFile(resolve(root, "scripts/data/world-atlas-110m.json"), "utf8"));
const { scale, translate } = topology.transform;
const sourceArcs = topology.arcs;
const geometries = topology.objects.countries.geometries;
const width = 960;
const height = 500;
const margin = 24;

function decodeArc(index) {
  const reversed = index < 0;
  const arc = sourceArcs[reversed ? ~index : index];
  let x = 0;
  let y = 0;
  const points = arc.map(([dx, dy]) => {
    x += dx;
    y += dy;
    return [x * scale[0] + translate[0], y * scale[1] + translate[1]];
  });
  return reversed ? points.reverse() : points;
}

function stitch(indices) {
  return indices.flatMap((index, position) => {
    const points = decodeArc(index);
    return position === 0 ? points : points.slice(1);
  });
}

function geometryRings(geometry) {
  if (geometry.type === "Polygon") return geometry.arcs.map(stitch);
  if (geometry.type === "MultiPolygon") return geometry.arcs.flatMap((polygon) => polygon.map(stitch));
  return [];
}

const landRings = geometries.flatMap(geometryRings);

// TopoJSON rings that cross the antimeridian jump from +180° to -180°.
// Drawing that jump as one SVG segment creates a false stripe across the map.
// Split those rings at the edge and close each piece along the edge instead.
function crossingLatitude(first, second) {
  const secondLongitude = first[0] > 0 ? second[0] + 360 : second[0] - 360;
  const boundary = first[0] > 0 ? 180 : -180;
  const longitudeSpan = secondLongitude - first[0];
  if (Math.abs(longitudeSpan) < 1e-9) return (first[1] + second[1]) / 2;
  const progress = (boundary - first[0]) / longitudeSpan;
  return first[1] + (second[1] - first[1]) * progress;
}

function splitAtAntimeridian(sourceRing) {
  const ring = sourceRing.length > 1 && sourceRing[0][0] === sourceRing.at(-1)[0] && sourceRing[0][1] === sourceRing.at(-1)[1]
    ? sourceRing.slice(0, -1)
    : sourceRing;
  const firstCrossing = ring.findIndex((point, index) => Math.abs(point[0] - ring[(index + 1) % ring.length][0]) > 180);
  if (firstCrossing < 0) return [ring];

  const first = ring[firstCrossing];
  const firstAfter = ring[(firstCrossing + 1) % ring.length];
  const firstLatitude = crossingLatitude(first, firstAfter);
  let current = [[firstAfter[0] < 0 ? -180 : 180, firstLatitude], firstAfter];
  const pieces = [];

  for (let offset = 1; offset < ring.length; offset += 1) {
    const currentIndex = (firstCrossing + 1 + offset) % ring.length;
    const previousIndex = (currentIndex - 1 + ring.length) % ring.length;
    const previous = ring[previousIndex];
    const point = ring[currentIndex];
    if (Math.abs(previous[0] - point[0]) > 180) {
      const latitude = crossingLatitude(previous, point);
      current.push([previous[0] < 0 ? -180 : 180, latitude]);
      pieces.push(current);
      current = [[point[0] < 0 ? -180 : 180, latitude], point];
    } else {
      current.push(point);
    }
  }

  // The loop ends at the point before the first crossing. Close that last piece
  // at the same crossing where the first piece began.
  current.push([first[0] < 0 ? -180 : 180, firstLatitude]);
  pieces.push(current);
  return pieces.filter((piece) => piece.length >= 4);
}

const clippedLandRings = landRings.flatMap(splitAtAntimeridian);
const invalidCoordinates = clippedLandRings.flat().filter((coordinate) => !Number.isFinite(coordinate?.[0]) || !Number.isFinite(coordinate?.[1]));
if (invalidCoordinates.length) throw new Error(`Antimeridian clipping produced ${invalidCoordinates.length} invalid coordinates: ${invalidCoordinates.map((coordinate) => coordinate?.map(String).join(",")).join(" | ")}`);

function mercator([lon, lat]) {
  const lambda = lon * Math.PI / 180;
  const phi = Math.max(-85, Math.min(85, lat)) * Math.PI / 180;
  return [lambda, -Math.log(Math.tan(Math.PI / 4 + phi / 2))];
}

function equalEarth([lon, lat]) {
  const lambda = lon * Math.PI / 180;
  const phi = lat * Math.PI / 180;
  const a1 = 1.340264;
  const a2 = -0.081106;
  const a3 = 0.000893;
  const a4 = 0.003796;
  const theta = Math.asin(Math.sqrt(3) * Math.sin(phi) / 2);
  const theta2 = theta * theta;
  const theta6 = theta2 * theta2 * theta2;
  const denominator = 3 * (9 * a4 * theta6 * theta2 + 7 * a3 * theta6 + 3 * a2 * theta2 + a1);
  const x = 2 * Math.sqrt(3) * lambda * Math.cos(theta) / denominator;
  const y = -(a4 * theta * theta6 * theta2 + a3 * theta * theta6 + a2 * theta * theta2 + a1 * theta);
  return [x, y];
}

function graticuleLines() {
  const lines = [];
  for (let lon = -180; lon <= 180; lon += 30) {
    lines.push(Array.from({ length: 35 }, (_, index) => [lon, -85 + index * 5]));
  }
  for (let lat = -60; lat <= 60; lat += 30) {
    lines.push(Array.from({ length: 73 }, (_, index) => [-180 + index * 5, lat]));
  }
  return lines;
}

function render(name, project, description) {
  const sample = [...clippedLandRings.flat(), ...graticuleLines().flat()].map(project);
  const xs = sample.map(([x]) => x);
  const ys = sample.map(([, y]) => y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const fit = Math.min((width - margin * 2) / (maxX - minX), (height - margin * 2) / (maxY - minY));
  const offsetX = (width - (maxX - minX) * fit) / 2 - minX * fit;
  const offsetY = (height - (maxY - minY) * fit) / 2 - minY * fit;
  const point = (coordinate) => {
    const [x, y] = project(coordinate);
    return `${(x * fit + offsetX).toFixed(2)},${(y * fit + offsetY).toFixed(2)}`;
  };
  const path = (ring, close = false) => `${ring.map((coordinate, index) => `${index ? "L" : "M"}${point(coordinate)}`).join(" ")}${close ? " Z" : ""}`;
  const grid = graticuleLines().map((line) => `<path d="${path(line)}"/>`).join("");
  const land = clippedLandRings.map((ring) => `<path d="${path(ring, true)}"/>`).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title desc">
  <title id="title">${name} world map projection</title>
  <desc id="desc">${description}</desc>
  <rect width="${width}" height="${height}" rx="28" fill="#e8f5f4"/>
  <g fill="none" stroke="#86b9b7" stroke-width="1" opacity=".65">${grid}</g>
  <g fill="#dfaa55" fill-rule="evenodd" stroke="#355e5d" stroke-width=".7" stroke-linejoin="round">${land}</g>
</svg>\n`;
}

const outputDirectory = resolve(root, "public/images/map-inquiry");
await mkdir(outputDirectory, { recursive: true });
await writeFile(resolve(outputDirectory, "mercator-world.svg"), render("Mercator", mercator, "A Mercator projection with high-latitude land areas enlarged. It preserves local angles but not relative area."));
await writeFile(resolve(outputDirectory, "equal-earth-world.svg"), render("Equal Earth", equalEarth, "An Equal Earth projection that preserves the relative area of continents while changing some shapes and angles."));
console.log("Generated Mercator and Equal Earth classroom comparison maps.");
