import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {shapes,palette,edgeControls,progressAt,servicePiece,puzzle} from './puzzle.mjs';
import {serviceMotionAt} from './public/service-motion.js';
import {headerScrollState} from './public/app.js';
import {render,routeList,safeURL} from './render.mjs';
const D=JSON.parse(fs.readFileSync(new URL('data/boraden.json',import.meta.url))),L=JSON.parse(fs.readFileSync(new URL('data/legacy.json',import.meta.url)));
test('homepage bands pause independently, expose focused links and resume without scroll drift',()=>{
 const target=extra=>Object.assign({events:{},addEventListener(n,fn){(this.events[n]??=[]).push(fn);},fire(n,event){for(const fn of this.events[n]||[])fn(event);}},extra);
 const doc=target({hidden:false,activeElement:null}),reduced=target({matches:false}),observers=[];
 const bands=['Hizmet akışı','Kurum akışı'].map(label=>{
  const window=target({scrollLeft:90,contains:el=>el?.owner===window}),button=target({dataset:{label},hidden:true,attrs:{},setAttribute(n,v){this.attrs[n]=v;}}),names=new Set();
  const band={classList:{add:n=>names.add(n),toggle(n,on){on?names.add(n):names.delete(n);},contains:n=>names.has(n)},querySelector:s=>s==='.motion-window'?window:button};
  return {band,window,button};
 });
 const app=fs.readFileSync(new URL('public/app.js',import.meta.url),'utf8');
 vm.runInNewContext(app.slice(app.indexOf('const motionBands='),app.indexOf('const world=')),{$$:()=>bands.map(b=>b.band),document:doc,reduced,requestAnimationFrame:fn=>fn(),IntersectionObserver:class{constructor(callback){this.callback=callback;observers.push(this);}observe(target){this.target=target;}show(on){this.callback([{target:this.target,isIntersecting:on}]);}}});
 const [a,b]=bands;for(const item of bands)assert.equal(item.band.classList.contains('is-ready'),true);observers.forEach(o=>o.show(true));assert.equal(a.window.scrollLeft,0);assert.equal(a.band.classList.contains('is-active'),true);
 a.button.fire('click');assert.equal(a.band.classList.contains('is-paused'),true);assert.equal(b.band.classList.contains('is-paused'),false);assert.equal(a.button.attrs['aria-pressed'],'true');assert.equal(a.button.attrs['aria-label'],'Hizmet akışı: Başlat');
 a.window.scrollLeft=210;a.button.fire('click');assert.equal(a.window.scrollLeft,0);
 doc.activeElement={owner:a.window,matches:()=>false};a.window.fire('focusin',{target:doc.activeElement});assert.equal(a.band.classList.contains('is-focused'),false);
 let focusedScroll;doc.activeElement={owner:a.window,matches:()=>true,scrollIntoView:options=>{focusedScroll=options;}};a.window.fire('focusin',{target:doc.activeElement});assert.equal(a.band.classList.contains('is-focused'),true);assert.equal(focusedScroll.inline,'nearest');assert.equal(focusedScroll.behavior,'instant');
 a.window.scrollLeft=170;doc.activeElement={owner:a.window,matches:()=>true};a.window.fire('focusout');assert.equal(a.window.scrollLeft,170);assert.equal(a.band.classList.contains('is-focused'),true);
 doc.activeElement=a.button;a.window.fire('focusout');assert.equal(a.band.classList.contains('is-focused'),false);assert.equal(a.window.scrollLeft,0);
 b.button.fire('click');doc.hidden=true;doc.fire('visibilitychange');for(const item of bands)assert.equal(item.band.classList.contains('is-active'),false);
 doc.hidden=false;doc.fire('visibilitychange');assert.equal(b.band.classList.contains('is-paused'),true);assert.equal(a.band.classList.contains('is-active'),true);
 reduced.matches=true;reduced.fire('change');for(const item of bands){assert.equal(item.band.classList.contains('is-static'),true);assert.equal(item.band.classList.contains('is-active'),false);assert.equal(item.button.hidden,true);assert.equal(item.button.disabled,true);}
 reduced.matches=false;reduced.fire('change');assert.equal(a.button.hidden,false);assert.equal(a.band.classList.contains('is-active'),true);assert.equal(b.band.classList.contains('is-paused'),true);
 observers[0].show(false);assert.equal(a.band.classList.contains('is-active'),false);assert.equal(b.band.classList.contains('is-active'),true);
});
test('wide expertise keeps labels unscaled and paints selection above a stable link order',()=>{
 const wide=puzzle({mode:'wide',id:'expertise'}),ordinary=puzzle({mode:'complete',id:'ordinary'});
 assert.ok(wide.includes('viewBox="0 0 1182.5 341"'));assert.ok(ordinary.includes('viewBox="0 0 550 550"'));
 assert.equal((wide.match(/class="piece-wide-surface" transform="scale\(2.15 .62\)"/g)||[]).length,7);
 assert.equal((wide.match(/<a\s/g)||[]).length,7);assert.ok(!wide.includes('class="piece-number"'));assert.ok(ordinary.includes('class="piece-number"'));
 for(const svg of [wide,ordinary])assert.match(svg,/<a\s+href="\/hakkimizda\/"[^>]+class="puzzle-piece piece-center[^>]+data-piece="6"/);
 assert.equal((puzzle({interactive:false}).match(/<a\s/g)||[]).length,0);
 assert.equal((puzzle({mode:'wide',interactive:false}).match(/<a\s/g)||[]).length,0);
 for(const [,surface] of wide.matchAll(/<g class="piece-wide-surface"[^>]*>([^]*?)<\/g>/g))assert.ok(!surface.includes('<text'));
 assert.ok(wide.endsWith('<use class="puzzle-selection-overlay" data-piece-overlay pointer-events="none" aria-hidden="true" focusable="false"/></svg>'));
 const ids=[...wide.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(ids.length,new Set(ids).size);
 const item=(index,card)=>({id:card?'card-'+index:'expertise-piece-'+shapes[index].id,dataset:card?{expertiseCard:String(index)}:{piece:String(index)},style:{getPropertyValue:n=>(n==='--cx'?100+index*50:200)+'px'},events:{},classList:{toggle(_,on){this.selected=on;}},addEventListener(name,fn){this.events[name]=fn;},contains(active){return active===this;}});
 const animations=[],reduced={matches:false,addEventListener(_,fn){this.change=fn;}};
 const cards=shapes.slice(0,6).map((_,i)=>item(i,true)),pieces=shapes.map((_,i)=>item(i,false)),overlay={attrs:{},style:{setProperty(n,v){this[n]=v;},removeProperty(n){delete this[n];}},setAttribute(name,value){this.attrs[name]=value;},removeAttribute(name){delete this.attrs[name];},animate(frames,options){const a={frames,options,cancelled:false,cancel(){this.cancelled=true;}};animations.push(a);return a;}};
 const mobile=shapes.map((_,i)=>Object.assign(item(i,false),{id:''}));
 const expertise={querySelectorAll:s=>s==='[data-expertise-card]'?cards:[...mobile,...pieces],querySelector:()=>overlay},document={activeElement:null};
 const app=fs.readFileSync(new URL('public/app.js',import.meta.url),'utf8');vm.runInNewContext(app.slice(app.indexOf("const expertise="),app.indexOf("const motionBands=")),{$:()=>expertise,document,reduced,requestAnimationFrame:fn=>fn()});
 const order=pieces.map(p=>p.id);
 cards[3].events.pointerenter({pointerType:'mouse'});assert.equal(overlay.attrs.href,'#'+pieces[3].id);assert.equal(cards[3].classList.selected,true);assert.equal(pieces[3].classList.selected,true);
 assert.equal(overlay.style['--cx'],'250px');assert.equal(overlay.style['--cy'],'200px');assert.equal(animations[0].frames[1].transform,'translateY(-12px) scale(1.28)');assert.equal(animations[0].options.duration,300);
 cards[3].events.pointerenter({pointerType:'mouse'});assert.equal(animations.length,1);
 cards[3].events.pointerleave();assert.equal(overlay.attrs.href,undefined);assert.equal(animations[0].cancelled,true);
 document.activeElement=pieces[1];pieces[1].events.focusin();cards[0].events.pointerleave();assert.equal(overlay.attrs.href,'#'+pieces[1].id);
 document.activeElement=null;pieces[1].events.focusout();assert.equal(overlay.attrs.href,undefined);assert.deepEqual(pieces.map(p=>p.id),order);
 cards[2].events.focusin();reduced.matches=true;reduced.change();assert.equal(animations.at(-1).cancelled,true);assert.equal(overlay.style.transform,'translateY(-12px) scale(1.28)');
 const count=animations.length;cards[4].events.focusin();assert.equal(animations.length,count);assert.equal(overlay.attrs.href,'#'+pieces[4].id);assert.equal(overlay.style.transform,'translateY(-12px) scale(1.28)');
 pieces[6].events.pointerenter({pointerType:'mouse'});assert.equal(overlay.attrs.href,'#expertise-piece-boraden');assert.ok(cards.every(card=>!card.classList.selected));assert.equal(pieces[6].classList.selected,true);
 document.activeElement=pieces[6];pieces[6].events.focusin();pieces[6].events.pointerleave();assert.equal(overlay.attrs.href,'#expertise-piece-boraden');
 document.activeElement=null;pieces[6].events.focusout();assert.equal(overlay.attrs.href,undefined);assert.deepEqual(pieces.map(p=>p.id),order);
});
test('service pieces preserve identity, isolate SVG ids and settle before reading',()=>{
 for(const service of D.services){
  const html=render('/hizmetler/'+service.id+'/',D,L).html;
  assert.equal((html.match(/class="service-piece-svg"/g)||[]).length,1);
  const piece=servicePiece({group:service.group,title:service.title});
  assert.equal((piece.match(/class="piece-outline"/g)||[]).length,1);
  assert.ok(piece.includes('aria-hidden="true"'));
  assert.ok(html.includes('--service-color:'+palette[shapes.findIndex(s=>s.id===service.group)]));
  assert.equal((html.match(/class="service-contact"/g)||[]).length,1);
  assert.ok(html.includes('/service-contact.css'));
 }
 assert.ok(servicePiece({group:'denetim',title:'<script> & "test"'}).includes('&lt;script&gt;'));
 for(const route of ['/',...D.groups.map(g=>'/hizmetler/alan/'+g.id+'/')]){
  const html=render(route,D,L).html,ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
  if(route!=='/'){
   assert.ok(html.includes('--service-color:'+palette[shapes.findIndex(s=>route.endsWith('/'+s.id+'/'))]));
   assert.equal((html.match(/class="service-contact"/g)||[]).length,1);
  }
  assert.equal(new Set(ids).size,ids.length,route);
  for(const [,id] of html.matchAll(/url\(#([^)]+)\)/g))assert.ok(ids.includes(id),id);
 }
 const start=serviceMotionAt(0,778);assert.ok(start.arrival<1&&start.opacity>.5);
 const end=serviceMotionAt(373,778);assert.equal(end.depth,1);assert.ok(Math.abs(end.opacity-.3)<.001);
 assert.equal(start.tint,0);
 assert.deepEqual(serviceMotionAt(-100,778),start);
 assert.deepEqual(serviceMotionAt(0,778,true),serviceMotionAt(5000,778,true));
 for(const h of [320,778,1800])for(const travel of [-100,0,800,6000]){
  const span=Math.max(280,Math.min(520,h*.46)),stop=Math.max(span+h,travel);
  assert.equal(serviceMotionAt(span,h,false,travel).tint,1);
  let previous=1;
  for(let i=0;i<=10;i++){
   const s=serviceMotionAt(span+(stop-span)*i/10,h,false,travel);
   assert.ok(s.arrival>=0&&s.arrival<=1.1&&s.depth>=0&&s.depth<=1&&s.opacity>=.29&&s.opacity<=1);
   assert.ok(s.tint>=.19&&s.tint<=previous);previous=s.tint;
  }
  assert.ok(Math.abs(serviceMotionAt(stop,h,false,travel).tint-.2)<.001);
  assert.deepEqual(serviceMotionAt(stop+10000,h,false,travel),serviceMotionAt(stop,h,false,travel));
 }
});
test('home retains perspectives and places both films with lazy media and editable brand cues',()=>{
 const html=render('/',D,L).html;
 assert.equal((html.match(/data-perspective-slide/g)||[]).length,14);
 for(const t of D.thinkers){assert.ok(D.perspectives.some(p=>p.id===t.perspective));assert.ok(html.includes('href="/perspektifler/'+t.perspective+'/"'));}
 const videos=html.match(/<video\b[^>]*>/g);assert.equal(videos.length,2);
 for(const video of videos){assert.ok(!/\ssrc=/.test(video));assert.ok(video.includes('preload="none"'));}
 assert.ok(videos[0].includes('data-src="/assets/boraden-turkiye-business.mp4"'));assert.ok(videos[0].includes('poster="/assets/boraden-turkiye-business.jpg"'));
 assert.ok(videos[1].includes('data-src="/assets/sector-entry-office.mp4"'));
 const brand=html.slice(html.indexOf('class="sector-film brand-film"'),html.indexOf('class="expertise-sheet"'));
 assert.ok(html.indexOf('class="opening-scene"')<html.indexOf('class="sector-film brand-film"'));assert.ok(html.indexOf('class="sector-film brand-film"')<html.indexOf('class="expertise-sheet"'));
 assert.deepEqual([...brand.matchAll(/data-caption-at="(\d+)"/g)].map(m=>Number(m[1])),[0,4,8,12,16]);
 for(const text of ['Farklı ihtiyaçlar. Birbirini tamamlayan uzmanlıklar.','İşinize yakından bakıyoruz.','Büyük resmi birlikte görüyoruz.','Parçadan bütüne.','Birlikte, Boraden.'])assert.ok(brand.includes(text));
 assert.ok(brand.includes('Yapay zekâ ile üretilmiş temsili iş hayatı sahneleri'));assert.ok(!brand.includes('sector-feature-copy'));
 assert.ok(html.indexOf('id="sektorel-bakis"')>html.indexOf('class="completion"'));
 assert.ok(html.includes('Bağımsız Denetim ve Danışmanlık A.Ş.'));
});
test('opening waits for a visible page, replays on return and honours reduced motion',()=>{
 const target=extra=>Object.assign({events:{},addEventListener(n,fn){this.events[n]=fn;},fire(n,event){this.events[n]?.(event);}},extra);
 const document=target({hidden:true}),window=target({}),reduced=target({matches:false}),mobile=target({matches:false});
 const animation=name=>({animationName:name,currentTime:100,plays:0,pauses:0,play(){this.plays++;},pause(){this.pauses++;}});
 const join=animation('opening-join'),camera=animation('opening-camera'),hover=animation('unrelated-hover');
 const opening={classList:{add(){}},getAnimations:()=>reduced.matches?[]:[join,camera,hover]};let observe;
 const app=fs.readFileSync(new URL('public/app.js',import.meta.url),'utf8');
 vm.runInNewContext(app.slice(app.indexOf('const opening='),app.indexOf('const header=')),{$:()=>opening,document,window,reduced,matchMedia:()=>mobile,IntersectionObserver:class{constructor(callback){observe=ratio=>callback([{isIntersecting:ratio>0,intersectionRatio:ratio}]);}observe(){}}});
 observe(1);assert.equal(join.plays,0,'Hidden-tab loading must not consume the intro');
 document.hidden=false;document.fire('visibilitychange');assert.equal(join.plays,1);assert.equal(join.currentTime,0);assert.equal(camera.plays,1);
 join.currentTime=1100;observe(.8);assert.equal(join.plays,1);assert.equal(join.currentTime,1100,'Repeated visibility updates must not restart playback');
 document.hidden=true;document.fire('visibilitychange');assert.ok(join.pauses>0);
 document.hidden=false;document.fire('visibilitychange');assert.equal(join.plays,2);assert.equal(join.currentTime,0);
 observe(.2);document.fire('visibilitychange');assert.equal(join.plays,2);
 observe(.9);assert.equal(join.plays,3,'Returning to the opening replays the assembly');
 reduced.matches=true;reduced.fire('change');observe(1);window.fire('pageshow',{persisted:true});assert.equal(join.plays,3);
 reduced.matches=false;reduced.fire('change');assert.equal(join.plays,4);
 window.fire('pageshow',{persisted:false});assert.equal(join.plays,4);
 window.fire('pageshow',{persisted:true});assert.equal(join.plays,5,'History restoration must replay the opening');
 mobile.matches=true;mobile.fire('change');assert.equal(join.plays,6,'The newly displayed mobile map must not remain paused at its scattered frame');
 assert.equal(hover.plays,0);assert.equal(hover.pauses,0);
});
test('opening is a directly usable branded hero with optional CSS assembly',()=>{
 const html=render('/',D,L).html,opening=html.match(/<section class="brand-opening wrap"[^>]*>([^]*?)<\/section>/)?.[1];
 assert.ok(opening,'Homepage has an in-flow brand opening');
 assert.equal((opening.match(/class="puzzle-piece\b/g)||[]).length,14,'Separate fitted desktop and mobile maps; CSS exposes one');
 for(const mode of ['opening','complete']){
  const svg=puzzle({mode,id:'opening-check'});
  assert.equal((svg.match(/<a\s/g)||[]).length,7);
  for(const g of D.groups)assert.ok(svg.includes('href="/hizmetler/alan/'+g.id+'/"'));
  assert.ok(svg.includes('href="/hakkimizda/"'));
 }
 const wideOpening=puzzle({mode:'opening'});
 assert.ok(wideOpening.includes('viewBox="145 25 1150 425"'));
 assert.equal((wideOpening.match(/class="piece-opening-surface" transform="scale\(2.6 0.85\)"/g)||[]).length,7);
 for(const [,surface] of wideOpening.matchAll(/<g class="piece-opening-surface"[^>]*>([^]*?)<\/g>/g))assert.ok(!surface.includes('<text'),'Labels must not stretch with the surface');
 assert.match(opening,/<h1\b[^>]*id="opening-title"[^>]*>BORADEN<\/h1>/);
 assert.ok(opening.includes('Bağımsız Denetim ve Danışmanlık A.Ş.'));
 for(const g of D.groups)assert.ok(opening.includes('href="/hizmetler/alan/'+g.id+'/"'));
 for(const href of ['#uzmanlik','/hakkimizda/','#turkiye-is-dunyasi'])assert.ok(opening.includes('href="'+href+'"'));
 assert.ok(html.includes('<header'));assert.ok(html.includes('class="desktop-nav"'));
 assert.ok(html.includes('class="sector-film brand-film"'));assert.equal((html.match(/data-expertise-card=/g)||[]).length,6);
 assert.ok(!html.includes('id="brand-intro"'));assert.ok(!html.includes('/intro.js'));assert.ok(!opening.includes('inert'));
 assert.equal(fs.existsSync(new URL('public/intro.js',import.meta.url)),false);
 const css=fs.readFileSync(new URL('public/home-motion.css',import.meta.url),'utf8');
 assert.match(css,/@keyframes\s+opening-join\b/);
 const reduced=[...css.matchAll(/@media\s*\(prefers-reduced-motion:\s*reduce\)\s*\{((?:[^{}]|\{[^{}]*\})*)\}/g)].map(m=>m[1]);
 assert.ok(reduced.some(block=>/\.opening-art\s+\.puzzle-piece[^{]*\{[^}]*animation\s*:\s*none/.test(block)),'Opening assembly has a scoped reduced-motion fallback');
 assert.ok(!render('/hizmetler/',D,L).html.includes('class="brand-opening wrap"'));
});
test('header waits for intentional direction changes and expertise links remain paired',()=>{
 let state={lastY:0,anchor:0,direction:0,hidden:false};
 const move=(y,locked=false)=>(state=headerScrollState(state,y,locked)).hidden;
 assert.equal(move(96),false);assert.equal(move(115),false);assert.equal(move(116),true);
 assert.equal(move(110),true);assert.equal(move(97),true);assert.equal(move(96),false);
 assert.equal(move(300),true);assert.equal(move(281),true);assert.equal(move(280),false);
 assert.equal(move(500,true),false);assert.equal(move(519),false);assert.equal(move(520),true);
 assert.equal(move(-30),false);
 const html=render('/',D,L).html;
 assert.ok(html.indexOf('class="expertise-puzzle"')<html.indexOf('class="expertise-grid"'));
 assert.equal((html.match(/data-expertise-card=/g)||[]).length,6);
 for(const [i,g] of D.groups.entries())assert.ok(html.includes(`data-expertise-card="${i}" id="alan-${g.id}" href="/hizmetler/alan/${g.id}/"`));
 assert.ok(!html.includes('data-chapter='));assert.ok(!html.includes('motion-toggle'));
});
test('preserved calculator engine and important transferred content remain available',()=>{const context=vm.createContext({window:{}});vm.runInContext(fs.readFileSync(new URL('public/calculator-core.js',import.meta.url),'utf8'),context);const calc=context.window.BoradenCalc;assert.equal(calc.vat(10000,20,false).total,12000);assert.equal(calc.vat(12000,20,true).net,10000);assert.throws(()=>calc.vat(-1,20,false));for(const s of D.services){const html=render('/hizmetler/'+s.id+'/',D,L).html;for(const n of s.needs||[])assert.ok(html.includes(n),s.id+': '+n);}assert.ok(render('/hesaplama/kdv/',D,L).html.includes('data-initial-calculator="vat"'));});
test('every internal jigsaw edge interlocks exactly in reverse traversal',()=>{const pairs=new Map();for(const s of shapes)for(let i=0;i<s.points.length;i++){const p=s.points[i],q=s.points[(i+1)%s.points.length],key=[p.join(','),q.join(',')].sort().join('|');const coords=edgeControls(p,q);if(pairs.has(key))assert.deepEqual(coords,pairs.get(key).slice().reverse(),key);else pairs.set(key,coords);}assert.equal(shapes.length,7);assert.equal(progressAt(-10),0);assert.equal(progressAt(100),6);});
test('all preserved services and editorial routes render, unsafe URL rejected',()=>{const routes=routeList(D);assert.equal(new Set(routes).size,routes.length);for(const route of routes)assert.equal(render(route,D,L).status,200,route);assert.equal(render('/not-a-page/',D,L).status,404);assert.equal(D.services.length,47);assert.equal(L.documents.length,247);assert.equal(safeURL('javascript:alert(1)'),'#');assert.equal(safeURL('//untrusted.example'),'#');});

test('section films synchronize cues, respect poster preferences and recover from interrupted play',async()=>{
 const source=fs.readFileSync(new URL('public/section-video.js',import.meta.url),'utf8');
 function scene({width=1200,reduce=false,saveData=false}={}){
  const target=extra=>Object.assign({events:{},addEventListener(name,fn){(this.events[name]??=[]).push(fn);},fire(name){for(const fn of this.events[name]||[])fn();}},extra);
  const classes=(...names)=>{const set=new Set(names);return {contains:n=>set.has(n),add:n=>set.add(n),remove:n=>set.delete(n),toggle(n,on){on?set.add(n):set.delete(n);}};};
  const frames=[],global=target({}),media=target({matches:reduce}),connection=target({saveData});let frameId=0;
  const items=[0,1].map(index=>{
   const captions=index?[]:[0,4,8,12,16].map(at=>({dataset:{captionAt:String(at)},hidden:!!at}));
   const button=target({attrs:{},setAttribute(n,v){this.attrs[n]=v;}}),rect={top:index?1200:0,bottom:index?1800:600,height:600};
   const host={classList:classes('sector-film'),style:{setProperty(){}},querySelector:()=>button,querySelectorAll:()=>captions,getBoundingClientRect:()=>rect};
   const video=target({dataset:{videoMode:'auto',src:index?'office.mp4':'brand.mp4'},classList:classes(),parentElement:{getBoundingClientRect:()=>rect},paused:true,currentTime:0,duration:20,plays:0,loads:0,src:'',closest:()=>host,getAttribute(n){return this[n];},load(){this.loads++;this.currentTime=0;},play(){this.plays++;return new Promise((resolve,reject)=>{this.pending={resolve,reject};});},pause(){this.paused=true;if(this.pending){const pending=this.pending;this.pending=null;pending.reject({name:'AbortError'});}},finish(){const pending=this.pending;this.pending=null;this.paused=false;this.fire('playing');pending.resolve();}});
   return {video,host,button,rect,captions};
  });
  const doc=target({hidden:false,documentElement:{classList:classes()},querySelectorAll:()=>items.map(i=>i.video)});
  const context={document:doc,navigator:{connection},matchMedia:()=>media,innerWidth:width,innerHeight:800,requestAnimationFrame(fn){frames.push(fn);return ++frameId;},addEventListener:(n,fn)=>global.addEventListener(n,fn),MutationObserver:class{observe(){}}};
  vm.runInNewContext(source,context);
  return {items,doc,connection,media,context,global,async flush(){for(let i=0;i<5;i++){frames.splice(0).forEach(fn=>fn());await Promise.resolve();}assert.equal(frames.length,0);}};
 }
 for(const preference of [{width:767},{reduce:true},{saveData:true}]){
  const s=scene(preference);await s.flush();for(const i of s.items){assert.equal(i.video.loads,0);assert.equal(i.video.plays,0);assert.ok(i.host.classList.contains('video-static'));assert.equal(i.button.hidden,true);}
  assert.equal(s.items[0].captions[0].hidden,false);
 }
 const s=scene();await s.flush();const [brand,office]=s.items;
 assert.equal(brand.video.plays,1);assert.equal(office.video.loads,0);
 // Leaving while play() is pending aborts it without marking the clip unavailable.
 brand.rect.top=1000;brand.rect.bottom=1600;s.global.fire('scroll');await s.flush();
 assert.equal(brand.video.paused,true);assert.equal(brand.host.classList.contains('video-unavailable'),false);
 brand.rect.top=0;brand.rect.bottom=600;s.global.fire('scroll');await s.flush();assert.equal(brand.video.plays,2);
 brand.video.finish();await s.flush();assert.ok(brand.video.classList.contains('ready'));
 for(const [time,index] of [[0,0],[3.99,0],[4,1],[7.99,1],[8,2],[11.99,2],[12,3],[15.99,3],[16,4],[19.99,4],[0,0]]){
  brand.video.currentTime=time;brand.video.fire('timeupdate');assert.deepEqual(brand.captions.map(c=>c.hidden),[0,1,2,3,4].map(i=>i!==index));
 }
 brand.button.fire('click');await s.flush();assert.equal(brand.video.paused,true);assert.equal(brand.button.attrs['aria-pressed'],'true');
 s.global.fire('scroll');await s.flush();assert.equal(brand.video.plays,2);
 brand.button.fire('click');await s.flush();brand.video.finish();await s.flush();
 s.doc.hidden=true;s.doc.fire('visibilitychange');await s.flush();assert.equal(brand.video.paused,true);
 s.doc.hidden=false;s.doc.fire('visibilitychange');await s.flush();brand.video.finish();await s.flush();
 s.connection.saveData=true;s.connection.fire('change');await s.flush();assert.equal(brand.video.paused,true);assert.equal(brand.video.classList.contains('ready'),false);assert.equal(brand.button.hidden,true);assert.equal(brand.captions[0].hidden,false);
 s.connection.saveData=false;s.connection.fire('change');await s.flush();brand.video.finish();await s.flush();
 brand.rect.top=1000;brand.rect.bottom=1600;office.rect.top=0;office.rect.bottom=600;s.global.fire('scroll');await s.flush();office.video.finish();await s.flush();
 assert.equal(brand.video.paused,true);assert.equal(office.video.paused,false);
});
