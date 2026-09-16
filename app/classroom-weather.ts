export const CLASSROOM_TIMEZONE = 'America/Vancouver';
export const WEATHER_CACHE_KEY = 'wyatt-surrey-weather-v1';
export const WEATHER_REFRESH_MS = 15 * 60 * 1000;
export const WEATHER_MAX_AGE_MS = 3 * 60 * 60 * 1000;
// Same Surrey coordinates as the existing morning-draft forecast.
export const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast?latitude=49.153&longitude=-122.775&current=temperature_2m,weather_code,is_day&temperature_unit=celsius&timeformat=unixtime&timezone=America%2FVancouver&forecast_days=1';
export type ClassroomWeather = {temperatureC:number; code:number; isDay:boolean; validAt:number; fetchedAt:number};

export function classroomTime(now: Date, seconds = false) {
  return new Intl.DateTimeFormat('en-CA', {timeZone:CLASSROOM_TIMEZONE,hour:'numeric',minute:'2-digit',...(seconds?{second:'2-digit' as const}:{}),hour12:true}).format(now);
}
export function classroomDate(now: Date) {
  return new Intl.DateTimeFormat('en-CA', {timeZone:CLASSROOM_TIMEZONE,weekday:'long',month:'long',day:'numeric'}).format(now);
}
export function weatherDescription(code:number,isDay=true): {label:string; icon:string} {
  if(code===0)return {label:isDay?'Clear skies':'Clear night',icon:isDay?'☀':'☾'};
  if(code===1)return {label:'Mainly clear',icon:isDay?'🌤':'☾'};
  if(code===2)return {label:'Partly cloudy',icon:'⛅'};
  if(code===3)return {label:'Overcast',icon:'☁'};
  if([45,48].includes(code))return {label:'Foggy',icon:'🌫'};
  if([51,53,55].includes(code))return {label:'Drizzle',icon:'🌦'};
  if([56,57].includes(code))return {label:'Freezing drizzle',icon:'🌨'};
  if([61,63,65].includes(code))return {label:'Rain',icon:'🌧'};
  if([66,67].includes(code))return {label:'Freezing rain',icon:'🌨'};
  if([71,73,75,77].includes(code))return {label:'Snow',icon:'❄'};
  if([80,81,82].includes(code))return {label:'Rain showers',icon:'🌦'};
  if([85,86].includes(code))return {label:'Snow showers',icon:'🌨'};
  if([95,96,99].includes(code))return {label:'Thunderstorms',icon:'⛈'};
  return {label:'Conditions unavailable',icon:'☁'};
}
export function parseCurrentWeather(raw:unknown,now=Date.now()):ClassroomWeather|null {
  if(!raw||typeof raw!=='object')return null;
  const data=raw as {current?:Record<string,unknown>;current_units?:Record<string,unknown>};
  const c=data.current;
  if(!c||data.current_units?.temperature_2m!=='°C'||typeof c.temperature_2m!=='number'||!Number.isFinite(c.temperature_2m)||c.temperature_2m < -80||c.temperature_2m > 65||typeof c.weather_code!=='number'||!Number.isInteger(c.weather_code)||c.weather_code<0||c.weather_code>99||typeof c.time!=='number'||!Number.isFinite(c.time)||(c.is_day!==0&&c.is_day!==1))return null;
  const validAt=c.time*1000;
  if(validAt>now+10*60*1000||now-validAt>WEATHER_MAX_AGE_MS)return null;
  return {temperatureC:c.temperature_2m,code:c.weather_code,isDay:c.is_day===1,validAt,fetchedAt:now};
}
export function usableWeather(value:unknown,now=Date.now()):value is ClassroomWeather {
  if(!value||typeof value!=='object')return false;
  const w=value as ClassroomWeather;
  return Number.isFinite(w.temperatureC)&&w.temperatureC>=-80&&w.temperatureC<=65&&Number.isInteger(w.code)&&w.code>=0&&w.code<=99&&typeof w.isDay==='boolean'&&Number.isFinite(w.validAt)&&Number.isFinite(w.fetchedAt)&&w.fetchedAt<=now+60000&&w.validAt<=now+600000&&now-w.validAt<=WEATHER_MAX_AGE_MS&&now-w.fetchedAt<=WEATHER_MAX_AGE_MS;
}
