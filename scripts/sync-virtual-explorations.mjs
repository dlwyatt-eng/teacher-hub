// Teacher Hub owns the register/player. Run locally with sibling checkouts present.
// CI can use --check in each release workspace; individual sites build independently.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '..');
const register = JSON.parse(await readFile(path.join(root, 'content/virtual-explorations.json'), 'utf8'));
const check = process.argv.includes('--check');
const studentTour = ({teacher, ...tour}) => tour;
const equityTrips = register.trips.filter(t => register.placements.some(p => p.tourId === t.id && p.equityLesson)).map(t => {
  if (t.id === 'turtle-camera') return {...t,
    duration: '4–6 min with observation and talk',
    route: 'Watch one short section or compare two still moments. Describe what the camera shows, then identify a question the camera cannot answer. Return to the assigned animal-care case.',
    extension: 'Name another kind of source you would need before making a claim about the turtle’s wellbeing. Explain what that source could add.',
    fallback: {...t.fallback, facts: [t.fallback.facts[0], t.fallback.facts[1], 'An animal-care recommendation needs a reliable source about the animal’s actual needs. One camera view is not enough.'], action: 'Look at a pencil case from above and then from desk height. Share one observation and something hidden from each view. Explain why a single camera view cannot tell us everything about an animal’s needs.'},
    goal: 'We are learning to separate what we observe from what we assume about an animal.',
    task: 'Share one visible movement or habitat detail and one question that needs another source. Return to the animal-care evidence before recommending an action.',
    check: 'Did you separate a camera observation from a claim about the animal’s needs or feelings?',
    teacher: {...t.teacher, prepare: 'Preview two clear moments. Use 1–2 minutes of footage and 3–4 minutes of observation and talk within the opening time. A desk object supplies the backup.', curriculum: 'Cross-grade source literacy: distinguish observation, inference and a supported recommendation. Use the host lesson’s grade guidance; science claims need evidence from the chosen animal-care case.', placement: 'Animal Welfare, opening observation. Replace the generic noticing example with a brief turtle-camera excerpt, then return to the existing care evidence and action. The video cannot establish a welfare verdict.', assessment: 'Listen for an observed detail, a clearly labelled uncertainty and a question for another source. Keep the existing care-recommendation task.'}};
  return {...t, route: 'Use a short council or city-services excerpt. Notice who decides and who carries out decisions. Then return to the fictional recreation-centre case; the tour does not depict that class scenario.', task: 'For the fictional recreation-centre choice, identify who decides, who carries out the decision and whose view you still need.',
    entry: 'Name a person who uses a shared recreation space. What might they need?',
    teacher: {...t.teacher, placement: 'Voice and Rules, decision-making screen (step 6). Use selected council/services excerpts within the source-review time. The class recreation-centre scenario remains fictional.', assessment: 'Check for distinct decision-making and implementation roles and a relevant missing perspective. Return to the lesson’s existing decision task.'}};
});
for (const repo of ['learn', 'equity-hub']) {
  const dest = path.resolve(root, '..', repo, 'app/generated');
  const data = {version:register.version, reviewDate:register.reviewDate, trips:repo === 'learn' ? register.trips.map(studentTour) : equityTrips};
  if (repo === 'equity-hub') data.placements = register.placements.filter(p => p.equityLesson).map(p => ({tourId:p.tourId, lessonId:p.equityLesson, step:p.equityStep}));
  const outputs = new Map([['virtual-explorations.json', JSON.stringify(data, null, 2)+'\n']]);
  for (const name of ['exploration-player.tsx','exploration-player.css']) outputs.set(name, await readFile(path.join(root,'app',name),'utf8'));
  if (!check) await mkdir(dest, {recursive:true});
  for (const [name, content] of outputs) {
    const file = path.join(dest,name);
    if (check) {if (await readFile(file,'utf8') !== content) throw new Error(`${repo}/${name} is out of sync`);}
    else await writeFile(file,content);
  }
  console.log(`${check ? 'Checked' : 'Synced'} virtual explorations: ${repo}`);
}
