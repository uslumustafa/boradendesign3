/* Native clips share visibility, pause and poster handling. Captions remain editable HTML. */
(()=>{'use strict';
 const root=document.documentElement,reduced=matchMedia('(prefers-reduced-motion: reduce)'),connection=navigator.connection;
 const clips=[...document.querySelectorAll('[data-section-video]')].map(video=>{const host=video.closest('.scroll-scene,.media-story,.sector-film');return {video,host,button:host?.querySelector('[data-video-toggle]'),captions:[...host.querySelectorAll('[data-caption-at]')],manualPause:false,blocked:false,pending:false,active:false};});
 if(!clips.length)return;
 let frame=0;
 const motionOff=()=>reduced.matches||root.classList.contains('motion-paused')||innerWidth<768||!!connection?.saveData;
 function label(item){if(!item.button)return;item.button.disabled=motionOff();item.button.hidden=motionOff();const stopped=item.manualPause||item.blocked;item.button.setAttribute('aria-pressed',String(stopped));item.button.setAttribute('aria-label',stopped?'Videoyu oynat':'Videoyu durdur');item.button.textContent=stopped?'Videoyu oynat ▷':'Videoyu durdur Ⅱ';}
 function syncTime(item){
  const v=item.video,time=motionOff()||item.blocked?0:v.currentTime;
  if(item.captions.length){let active=0;item.captions.forEach((caption,i)=>{if(Number(caption.dataset.captionAt)<=time)active=i;});item.captions.forEach((caption,i)=>{caption.hidden=i!==active;});}
  if(v.dataset.videoMode==='scroll'||!item.host.classList.contains('sector-film'))return;
  const p=Number.isFinite(v.duration)&&v.duration>0?time/v.duration:0;
  item.host.style.setProperty('--film-progress',p);item.host.classList.toggle('film-inside',p>.43);
 }
 function fallback(item){item.blocked=true;item.video.pause();item.video.classList.remove('ready');item.host.classList.add('video-unavailable');syncTime(item);label(item);}
 function update(){frame=0;let active=null,best=0;const still=motionOff();
  if(!document.hidden&&!still)for(const item of clips){const r=item.video.parentElement.getBoundingClientRect();const visible=Math.max(0,Math.min(innerHeight,r.bottom)-Math.max(0,r.top))/Math.max(1,Math.min(innerHeight,r.height));if(visible>.2&&visible>best&&!item.manualPause&&!item.blocked){active=item;best=visible;}}
  for(const item of clips){const v=item.video;item.active=item===active;item.host.classList.toggle('video-static',still);if(still)v.classList.remove('ready');label(item);syncTime(item);if(!item.active){v.pause();continue;}
   if(!v.getAttribute('src')){v.src=v.dataset.src;v.muted=true;v.preload='auto';v.load();}
   if(v.dataset.videoMode==='scroll'){v.pause();const r=item.host.getBoundingClientRect(),p=Math.max(0,Math.min(1,-r.top/Math.max(1,r.height-innerHeight)));item.host.style.setProperty('--film-progress',p);item.host.classList.toggle('film-inside',p>.43);if(v.readyState>=2&&Number.isFinite(v.duration)&&!v.seeking){const target=Math.min(v.duration-.06,p*v.duration);if(Math.abs(v.currentTime-target)>.07)v.currentTime=Math.max(0,target);v.classList.add('ready');}continue;}
   if(v.paused&&!item.pending){item.pending=true;v.play().then(()=>{item.pending=false;if(!item.active||document.hidden||motionOff())v.pause();queue();}).catch(error=>{item.pending=false;if(error?.name==='AbortError')queue();else fallback(item);});}
  }
 }
 function queue(){if(!frame)frame=requestAnimationFrame(update);}
 for(const item of clips){const v=item.video;v.loop=v.dataset.videoMode!=='scroll';v.muted=true;
  v.addEventListener('playing',()=>{if(!item.active||document.hidden||motionOff()){v.pause();return;}v.classList.add('ready');item.host.classList.remove('video-unavailable');});
  v.addEventListener('timeupdate',()=>syncTime(item));
  v.addEventListener('loadeddata',queue);v.addEventListener('seeked',queue);v.addEventListener('error',()=>fallback(item));
  item.button?.addEventListener('click',()=>{if(item.blocked){item.blocked=false;item.manualPause=false;item.host.classList.remove('video-unavailable');v.load();}else item.manualPause=!item.manualPause;queue();});
 }
 addEventListener('scroll',queue,{passive:true});addEventListener('resize',queue);document.addEventListener('visibilitychange',queue);reduced.addEventListener('change',queue);connection?.addEventListener('change',queue);
 new MutationObserver(queue).observe(root,{attributes:true,attributeFilter:['class']});
 queue();
})();
