/* Real clips only. Offscreen, hidden-tab and reduced-motion states never autoplay. */
(()=>{'use strict';
 const root=document.documentElement,reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const clips=[...document.querySelectorAll('[data-section-video]')].map(video=>({video,host:video.closest('.scroll-scene,.media-story,.sector-film'),button:video.closest('.scroll-scene,.media-story,.sector-film')?.querySelector('[data-video-toggle]'),manualPause:false,blocked:false,pending:false}));
 if(!clips.length)return;
 let frame=0;
 const motionOff=()=>reduced.matches||root.classList.contains('motion-paused')||innerWidth<768;
 function label(item){if(!item.button)return;item.button.disabled=motionOff();const stopped=item.manualPause||item.blocked;item.button.setAttribute('aria-pressed',String(stopped));item.button.setAttribute('aria-label',stopped?'Videoyu oynat':'Videoyu durdur');item.button.textContent=stopped?'Videoyu oynat ▷':'Videoyu durdur Ⅱ';}
 function fallback(item){item.blocked=true;item.video.pause();item.video.classList.remove('ready');item.host.classList.add('video-unavailable');label(item);}
 function update(){frame=0;let active=null,best=0;
  if(!document.hidden&&!motionOff())for(const item of clips){const r=item.video.parentElement.getBoundingClientRect();const visible=Math.max(0,Math.min(innerHeight,r.bottom)-Math.max(0,r.top))/Math.max(1,Math.min(innerHeight,r.height));if(visible>.2&&visible>best&&!item.manualPause&&!item.blocked){active=item;best=visible;}}
  for(const item of clips){const v=item.video;label(item);if(item!==active){v.pause();continue;}
   if(!v.getAttribute('src')){v.src=v.dataset.src;v.muted=true;v.preload='auto';v.load();}
   if(v.dataset.videoMode==='scroll'){v.pause();const r=item.host.getBoundingClientRect(),p=Math.max(0,Math.min(1,-r.top/Math.max(1,r.height-innerHeight)));item.host.style.setProperty('--film-progress',p);item.host.classList.toggle('film-inside',p>.43);if(v.readyState>=2&&Number.isFinite(v.duration)&&!v.seeking){const target=Math.min(v.duration-.06,p*v.duration);if(Math.abs(v.currentTime-target)>.07)v.currentTime=Math.max(0,target);v.classList.add('ready');}continue;}
   if(v.paused&&!item.pending){item.pending=true;v.play().then(()=>{item.pending=false;queue();}).catch(()=>{item.pending=false;fallback(item);});}
  }
 }
 function queue(){if(!frame)frame=requestAnimationFrame(update);}
 for(const item of clips){const v=item.video;v.loop=v.dataset.videoMode!=='scroll';v.muted=true;
  v.addEventListener('playing',()=>{v.classList.add('ready');item.host.classList.remove('video-unavailable');});
  v.addEventListener('timeupdate',()=>{if(v.dataset.videoMode==='scroll'||!item.host.classList.contains('sector-film'))return;const p=Number.isFinite(v.duration)&&v.duration>0?v.currentTime/v.duration:0;item.host.style.setProperty('--film-progress',p);item.host.classList.toggle('film-inside',p>.43);});
  v.addEventListener('loadeddata',queue);v.addEventListener('seeked',queue);v.addEventListener('error',()=>fallback(item));
  item.button?.addEventListener('click',()=>{if(item.blocked){item.blocked=false;item.manualPause=false;item.host.classList.remove('video-unavailable');v.load();}else item.manualPause=!item.manualPause;queue();});
 }
 addEventListener('scroll',queue,{passive:true});addEventListener('resize',queue);document.addEventListener('visibilitychange',queue);reduced.addEventListener('change',queue);
 new MutationObserver(queue).observe(root,{attributes:true,attributeFilter:['class']});
 queue();
})();
