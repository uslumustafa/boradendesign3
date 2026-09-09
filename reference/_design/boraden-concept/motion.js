(() => {
 'use strict';
 const root=document.documentElement;
 const reduce=matchMedia('(prefers-reduced-motion: reduce)');
 const desktop=matchMedia('(min-width: 1001px) and (min-height: 760px)');
 const paused=()=>reduce.matches||root.classList.contains('motion-paused');
 const clamp=(n,min=0,max=1)=>Math.min(max,Math.max(min,n));
 const tabs=[...document.querySelectorAll('[data-mega-category]')];
 const expertiseMenu=document.getElementById('expertise-menu');
 let pinnedTab=tabs.find(tab=>tab.getAttribute('aria-selected')==='true')||tabs[0];
 pinnedTab?.classList.add('is-pinned');
 function chooseTab(button,focus=false,commit=true){
  if(!button)return;
  if(commit)pinnedTab=button;
  tabs.forEach(tab=>{
   const selected=tab===button;
   tab.classList.toggle('is-pinned',tab===pinnedTab);
   tab.setAttribute('aria-selected',String(selected));
   tab.tabIndex=selected?0:-1;
   document.getElementById(tab.getAttribute('aria-controls')).hidden=!selected;
  });
  if(focus)button.focus({preventScroll:true});
  if(commit||focus)button.scrollIntoView({block:'nearest',inline:'nearest',behavior:'instant'});
 }
 tabs.forEach((button,i)=>{
  button.addEventListener('click',()=>chooseTab(button));
  button.addEventListener('pointerenter',event=>{
   if(event.pointerType!=='touch')chooseTab(button,false,false);
  });
  button.addEventListener('keydown',event=>{
   let next;
   if(['ArrowDown','ArrowRight'].includes(event.key))next=(i+1)%tabs.length;
   else if(['ArrowUp','ArrowLeft'].includes(event.key))next=(i-1+tabs.length)%tabs.length;
   else if(event.key==='Home')next=0;
   else if(event.key==='End')next=tabs.length-1;
   if(next!==undefined){event.preventDefault();chooseTab(tabs[next],true);}
  });
 });
 expertiseMenu?.addEventListener('pointerleave',()=>chooseTab(pinnedTab,false,false));
 if(expertiseMenu)new MutationObserver(()=>{
  if(expertiseMenu.hidden)chooseTab(pinnedTab,false,false);
 }).observe(expertiseMenu,{attributes:true,attributeFilter:['hidden']});
 function syncTabOrientation(){document.querySelector('.mega-tabs')?.setAttribute('aria-orientation',innerWidth<=760?'horizontal':'vertical');}
 syncTabOrientation();

 const bands=[...document.querySelectorAll('.motion-band')];
 const media=[...document.querySelectorAll('.cinema-backdrop,.context-visual')];
 const visibleMedia=new Set();
 const visibility=new IntersectionObserver(entries=>entries.forEach(entry=>{
  entry.target.classList.toggle('is-active',entry.isIntersecting);
  if(media.includes(entry.target)){
   if(entry.isIntersecting)visibleMedia.add(entry.target);else visibleMedia.delete(entry.target);
   schedule();
  }
 }),{rootMargin:'0px',threshold:0});
 [...bands,...media].forEach(el=>visibility.observe(el));
 document.querySelector('.band-pause')?.addEventListener('click',event=>{
  const button=event.currentTarget;
  const stopped=button.closest('.motion-band').classList.toggle('is-paused');
  button.setAttribute('aria-pressed',String(stopped));
  button.setAttribute('aria-label',stopped?'Kurum logosu akışını başlat':'Kurum logosu akışını durdur');
  button.textContent=stopped?'▷':'Ⅱ';
 });

 document.querySelectorAll('[data-network-group]').forEach(row=>{
  const node=document.querySelector('[data-orbit="'+row.dataset.networkGroup+'"]');
  const highlight=on=>node?.classList.toggle('is-highlighted',on);
  row.addEventListener('pointerenter',()=>highlight(true));
  row.addEventListener('pointerleave',()=>highlight(false));
  row.addEventListener('focusin',()=>highlight(true));
  row.addEventListener('focusout',()=>highlight(false));
 });
 const counts=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(!entry.isIntersecting)return;
  counts.unobserve(entry.target);
  const el=entry.target,target=Number(el.dataset.countTo),start=performance.now();
  function count(now){
   const progress=paused()?1:clamp((now-start)/800);
   el.textContent=String(Math.round(target*(1-Math.pow(1-progress,3)))).padStart(2,'0');
   if(progress<1)requestAnimationFrame(count);
  }
  requestAnimationFrame(count);
 }),{threshold:.8});
 document.querySelectorAll('[data-count-to]').forEach(el=>counts.observe(el));

 const journey=document.querySelector('.decision-journey');
 const windowEl=journey?.querySelector('.journey-window');
 const track=journey?.querySelector('.journey-track');
 const cards=journey?[...journey.querySelectorAll('.journey-card')]:[];
 const prev=journey?.querySelector('[data-journey-prev]');
 const next=journey?.querySelector('[data-journey-next]');
 const count=journey?.querySelector('[data-journey-count]');
 let distance=0,frame=0,index=0;
 const pinned=()=>journey?.classList.contains('is-pinned');
 function setProgress(p){
  journey.style.setProperty('--journey-p',p.toFixed(4));
  const offset=p*distance;
  index=cards.reduce((best,card,i)=>Math.abs(Math.min(card.offsetLeft-cards[0].offsetLeft,distance)-offset)<Math.abs(Math.min(cards[best].offsetLeft-cards[0].offsetLeft,distance)-offset)?i:best,0);
  count.textContent=String(index+1).padStart(2,'0')+' / 03';
  prev.disabled=p<.005;next.disabled=p>.995;
 }
 function measure(){
  syncTabOrientation();
  if(journey){
   const oldBox=journey.getBoundingClientRect(),oldIndex=index;
   const wasOnStage=oldBox.top<=150&&oldBox.bottom>Math.min(innerHeight,550);
   const wasPinned=pinned(),willPin=desktop.matches&&!paused();
   journey.classList.toggle('is-pinned',willPin);
   distance=Math.max(0,track.scrollWidth-windowEl.clientWidth);
   journey.style.setProperty('--journey-distance',distance+'px');
   if(!willPin)track.style.removeProperty('transform');
   if(wasPinned!==willPin){
    const left=Math.min(cards[oldIndex].offsetLeft-cards[0].offsetLeft,distance);
    windowEl.scrollLeft=willPin?0:left;
    // Preserve the current story when pausing or changing the layout mode.
    if(wasOnStage)window.scrollTo({top:scrollY+journey.getBoundingClientRect().top+(willPin?left:0),behavior:'instant'});
   }
  }
  schedule();
 }
 function update(){
  frame=0;
  if(journey){
   const progress=pinned()?clamp(-journey.getBoundingClientRect().top/Math.max(1,distance)):clamp(windowEl.scrollLeft/Math.max(1,distance));
   if(pinned())track.style.transform='translate3d('+(-progress*distance).toFixed(2)+'px,0,0)';
   setProgress(progress);
  }
  for(const item of visibleMedia){
   const box=item.getBoundingClientRect();
   const shift=paused()||innerWidth<=760?0:clamp((innerHeight/2-box.top-box.height/2)/innerHeight,-1,1)*24;
   item.style.setProperty('--media-shift',shift.toFixed(2)+'px');
  }
 }
 function schedule(){if(!frame)frame=requestAnimationFrame(update);}
 function goToCard(i,instant=false){
  const card=cards[clamp(i,0,cards.length-1)];
  const left=Math.min(card.offsetLeft-cards[0].offsetLeft,distance);
  const behavior=instant||paused()?'instant':'smooth';
  if(pinned())window.scrollTo({top:scrollY+journey.getBoundingClientRect().top+left,behavior});
  else windowEl.scrollTo({left,behavior});
 }
 prev?.addEventListener('click',()=>goToCard(index-1));
 next?.addEventListener('click',()=>goToCard(index+1));
 windowEl?.addEventListener('scroll',schedule,{passive:true});
 cards.forEach((card,i)=>card.addEventListener('focusin',()=>goToCard(i,true)));
 addEventListener('scroll',schedule,{passive:true});
 addEventListener('resize',measure,{passive:true});
 document.querySelector('.motion-toggle')?.addEventListener('click',measure);
 reduce.addEventListener('change',measure);
 desktop.addEventListener('change',measure);
 measure();
})();
