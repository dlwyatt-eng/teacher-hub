'use client';
import {useEffect,useRef,useState} from 'react';
import {classroomDate,classroomTime,parseCurrentWeather,usableWeather,weatherDescription,WEATHER_CACHE_KEY,WEATHER_REFRESH_MS,WEATHER_URL,type ClassroomWeather} from './classroom-weather';

function readCachedWeather():ClassroomWeather|null {
  try {const saved=JSON.parse(window.localStorage.getItem(WEATHER_CACHE_KEY)||'null');return usableWeather(saved)?saved:null;}catch{return null;}
}
export default function ClassroomLiveStatus(){
  const [now,setNow]=useState(()=>new Date());
  const [weather,setWeather]=useState<ClassroomWeather|null>(readCachedWeather);
  const [state,setState]=useState<'loading'|'ready'|'error'>(weather?'ready':'loading');
  const refreshRef=useRef<()=>void>(()=>{});
  useEffect(()=>{const tick=()=>setNow(new Date());const timer=window.setInterval(tick,1000);document.addEventListener('visibilitychange',tick);return()=>{window.clearInterval(timer);document.removeEventListener('visibilitychange',tick);};},[]);
  useEffect(()=>{
    let disposed=false,controller:AbortController|null=null;
    let last=readCachedWeather();
    const refresh=async(force=false)=>{
      if(controller||disposed||document.visibilityState==='hidden')return;
      if(!force&&last&&usableWeather(last)&&Date.now()-last.fetchedAt<WEATHER_REFRESH_MS)return;
      controller=new AbortController();const signal=controller.signal;
      const timeout=window.setTimeout(()=>controller?.abort(),8000);
      setState('loading');
      try{
        const response=await fetch(WEATHER_URL,{signal,cache:'no-store',credentials:'omit'});
        if(!response.ok)throw new Error('Weather unavailable');
        const next=parseCurrentWeather(await response.json());if(!next)throw new Error('Weather unavailable');
        if(disposed)return;
        last=next;setWeather(next);setState('ready');
        try{window.localStorage.setItem(WEATHER_CACHE_KEY,JSON.stringify(next));}catch{/* Weather does not require storage. */}
      }catch{if(!disposed)setState('error');}
      finally{window.clearTimeout(timeout);controller=null;}
    };
    refreshRef.current=()=>{void refresh(true);};
    void refresh();
    const timer=window.setInterval(()=>void refresh(),WEATHER_REFRESH_MS);
    const resume=()=>{void refresh();};
    window.addEventListener('online',resume);document.addEventListener('visibilitychange',resume);
    return()=>{disposed=true;controller?.abort();window.clearInterval(timer);window.removeEventListener('online',resume);document.removeEventListener('visibilitychange',resume);};
  },[]);
  const current=usableWeather(weather,now.getTime())?weather:null;
  const detail=current?weatherDescription(current.code,current.isDay):null;
  const older=!!current&&(state==='error'||now.getTime()-current.validAt>45*60*1000);
  return <aside className="day-live" aria-label="Surrey time and weather">
    <div className="day-live-clock"><span>Surrey, BC · live time</span><time dateTime={now.toISOString()}>{classroomTime(now,true)}</time><span>{classroomDate(now)}</span></div>
    <div className="day-live-weather">
      <span className="day-weather-icon" aria-hidden="true">{detail?.icon??'☁'}</span>
      <div>{current?<><strong>{Math.round(current.temperatureC)}°C</strong><span>{detail?.label}</span></>:<><strong className="day-weather-empty">{state==='loading'?'Checking weather…':'Weather unavailable'}</strong><span>Surrey</span></>}
        <small>{current?`${older?'Last available':'Local estimate'} · ${classroomTime(new Date(current.validAt))}`:'Updates when connected'} · <a href="https://open-meteo.com/" target="_blank" rel="noreferrer">Open-Meteo</a></small>
      </div>
      {state==='error'&&<button onClick={()=>refreshRef.current()}>Retry weather</button>}
    </div>
  </aside>;
}
