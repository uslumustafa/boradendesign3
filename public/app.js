// A reversal must travel 20px before it changes the header; the first 96px stay visible.
export function headerScrollState(state,y,locked=false){
 y=Math.max(0,y);
 if(locked||y<=96)return {lastY:y,anchor:y,direction:0,hidden:false};
 const direction=Math.sign(y-state.lastY);
 if(!direction)return state;
 const anchor=direction===state.direction?state.anchor:state.lastY;
 return {lastY:y,anchor,direction,hidden:Math.abs(y-anchor)>=20?direction>0:state.hidden};
}

if(typeof document!=='undefined'){
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const norm=s=>String(s||'').toLocaleLowerCase('tr-TR').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replaceAll('ı','i').trim();
// Native links and server-rendered content are the baseline. JS adds wayfinding.
const dialog=$('#search-dialog');let returnFocus;
$$('.search-toggle').forEach(button=>button.addEventListener('click',()=>{returnFocus=button;dialog.showModal();$('#global-search').focus();updateSearch();}));
$('.close-search')?.addEventListener('click',()=>dialog.close());
dialog?.addEventListener('close',()=>returnFocus?.focus());
dialog?.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
function updateSearch(){const term=norm($('#global-search').value);let count=0;$$('.search-results>a').forEach(row=>{const match=norm(row.dataset.search).includes(term);row.hidden=!match;if(match)count++;});$('.search-count').textContent=count?`${count} sonuç`:'Bu aramayla eşleşen sonuç yok. Farklı bir sözcük deneyin.';}
document.addEventListener('click',event=>$$('.header details[open]').forEach(d=>{if(!d.contains(event.target))d.open=false;}));
document.addEventListener('keydown',event=>{if(event.key==='Escape')$$('.header details[open]').forEach(d=>d.open=false);});
function applyScrollParam() {
 const scrollParam = typeof location !== 'undefined' ? new URLSearchParams(location.search).get('scroll') : null;
 if (!scrollParam) return;
 const intro = document.getElementById('boraden-intro');
 if (intro) intro.remove();
 if (isNaN(Number(scrollParam))) {
  const el = document.querySelector(scrollParam);
  if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
 } else {
  window.scrollTo(0, Number(scrollParam));
 }
}
if (typeof window !== 'undefined') {
 window.addEventListener('load', () => setTimeout(applyScrollParam, 50));
 document.addEventListener('DOMContentLoaded', applyScrollParam);
 setTimeout(applyScrollParam, 200);
}
const serviceInput=$('#service-search');
serviceInput?.addEventListener('input',()=>{const term=norm(serviceInput.value);let count=0;$$('[data-filter-group]').forEach(group=>{let groupCount=0;group.querySelectorAll('[data-filter-text]').forEach(row=>{row.hidden=!norm(row.dataset.filterText).includes(term);if(!row.hidden){groupCount++;count++;}});group.hidden=!groupCount;});$('#service-count').textContent=count?`${count} hizmet`:'Sonuç bulunamadı. Başka bir terim deneyin.';});
$('#archive-search')?.addEventListener('input',event=>{const term=norm(event.target.value);let count=0;$$('.archive-list [data-filter-text]').forEach(row=>{row.hidden=!norm(row.dataset.filterText).includes(term);if(!row.hidden)count++;});$('.archive-count').textContent=`${count} belge`;});

const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const opening=$('.brand-opening');
if(opening){
 opening.classList.add('is-ready');
 let visible=false,active=false;
 function syncOpening(){
  const next=visible&&!document.hidden&&!reduced.matches;
  for(const animation of opening.getAnimations({subtree:true})){
   if(!animation.animationName?.startsWith('opening-'))continue;
   if(next&&!active){animation.currentTime=0;animation.play();}
   else if(!next)animation.pause();
  }
  active=next;
 }
 new IntersectionObserver(entries=>{visible=entries[0].isIntersecting&&entries[0].intersectionRatio>=.5;syncOpening();},{threshold:.5}).observe(opening);
 document.addEventListener('visibilitychange',syncOpening);
 reduced.addEventListener('change',syncOpening);
 matchMedia('(max-width: 600px)').addEventListener('change',()=>{active=false;syncOpening();});
 window.addEventListener('pageshow',event=>{if(event.persisted){active=false;syncOpening();}});
}
const header=$('.header');
if(header){
 let state={lastY:window.scrollY,anchor:window.scrollY,direction:0,hidden:false},frame=0,atTopEdge=false,overHeader=false;
 function updateHeader(){
  frame=0;
  const y=Math.max(0,Math.min(window.scrollY,document.documentElement.scrollHeight-window.innerHeight));
  const locked=atTopEdge||overHeader||header.contains(document.activeElement)||!!header.querySelector('details[open]')||!!dialog?.open;
  state=headerScrollState(state,y,locked);
  header.classList.toggle('is-hidden',state.hidden);
  header.classList.toggle('is-scrolled',y>80);
 }
 function scheduleHeader(){if(!frame)frame=requestAnimationFrame(updateHeader);}
 window.addEventListener('scroll',scheduleHeader,{passive:true});
 window.addEventListener('resize',scheduleHeader,{passive:true});
 document.addEventListener('pointermove',event=>{if(event.pointerType==='touch')return;const near=event.clientY<=16;if(near!==atTopEdge){atTopEdge=near;scheduleHeader();}},{passive:true});
 document.addEventListener('pointerleave',()=>{atTopEdge=false;overHeader=false;scheduleHeader();});
 header.addEventListener('pointerenter',event=>{if(event.pointerType!=='touch'){overHeader=true;scheduleHeader();}});
 header.addEventListener('pointerleave',()=>{overHeader=false;scheduleHeader();});
 document.addEventListener('focusin',scheduleHeader);
 document.addEventListener('focusout',scheduleHeader);
 header.querySelectorAll('details').forEach(menu=>menu.addEventListener('toggle',scheduleHeader));
 dialog?.addEventListener('close',scheduleHeader);
 dialog?.addEventListener('toggle',scheduleHeader);
 scheduleHeader();
}

const openingArt=$('.opening-art');
if(openingArt){
 let tiltFrame=0,targetX=0,targetY=0,currentX=0,currentY=0;
 function updateTilt(){
  tiltFrame=0;
  currentX+=(targetX-currentX)*0.08;
  currentY+=(targetY-currentY)*0.08;
  const svg=openingArt.querySelector('.puzzle-complete')||openingArt.querySelector('.puzzle-opening');
  if(svg&&!reduced.matches){
   svg.style.transform=`rotateX(${28-currentY*9}deg) rotateY(${-6+currentX*9}deg) rotateZ(-2deg)`;
  }
  if(Math.abs(targetX-currentX)>0.001||Math.abs(targetY-currentY)>0.001){
   tiltFrame=requestAnimationFrame(updateTilt);
  }
 }
 window.addEventListener('pointermove',event=>{
  if(event.pointerType==='touch'||reduced.matches)return;
  const w=window.innerWidth,h=window.innerHeight;
  if(window.scrollY>h)return;
  targetX=(event.clientX/w-0.5)*2;
  targetY=(event.clientY/h-0.5)*2;
  if(!tiltFrame)tiltFrame=requestAnimationFrame(updateTilt);
 },{passive:true});
 window.addEventListener('pointerleave',()=>{
  targetX=0;targetY=0;
  if(!tiltFrame)tiltFrame=requestAnimationFrame(updateTilt);
 });
}

const expertise=$('[data-expertise]');
if(expertise){
 const cards=[...expertise.querySelectorAll('[data-expertise-card]')],pieces=[...expertise.querySelectorAll('.expertise-puzzle a[data-piece]')];
 const items=[...cards,...pieces],overlay=expertise.querySelector('[data-piece-overlay]');
 const indexOf=item=>Number(item.dataset.expertiseCard??item.dataset.piece);
 let activeIndex=-1,overlayAnimation;
 const raised='translateY(-12px) scale(1.28)';
 function select(index){
  if(index===activeIndex)return;
  activeIndex=index;
  items.forEach(item=>item.classList.toggle('is-selected',indexOf(item)===index));
  const piece=pieces.find(item=>indexOf(item)===index&&item.id);
  overlayAnimation?.cancel();overlayAnimation=null;
  if(overlay){
   overlay.style.removeProperty('transform');
   if(piece){
    overlay.style.setProperty('--cx',piece.style.getPropertyValue('--cx'));
    overlay.style.setProperty('--cy',piece.style.getPropertyValue('--cy'));
    overlay.setAttribute('href','#'+piece.id);
    if(reduced.matches)overlay.style.transform=raised;
    else overlayAnimation=overlay.animate([{transform:'translateY(0) scale(1)'},{transform:raised}],{duration:300,easing:'cubic-bezier(.16,.8,.2,1)',fill:'both'});
   }else overlay.removeAttribute('href');
  }
 }
 reduced.addEventListener('change',()=>{if(reduced.matches&&overlayAnimation){overlayAnimation.cancel();overlayAnimation=null;overlay.style.transform=raised;}});
 function selectFocused(){const focused=items.find(item=>item.contains(document.activeElement));select(focused?indexOf(focused):-1);}
 items.forEach(item=>{
  item.addEventListener('pointerenter',event=>{if(event.pointerType!=='touch')select(indexOf(item));});
  item.addEventListener('pointerleave',selectFocused);
  item.addEventListener('focusin',()=>select(indexOf(item)));
  item.addEventListener('focusout',()=>requestAnimationFrame(selectFocused));
 });
}

const motionBands=$$('[data-motion-band]');
motionBands.forEach(band=>{
 const windowEl=band.querySelector('.motion-window'),button=band.querySelector('[data-band-pause]');
 if(!windowEl||!button)return;
 band.classList.add('is-ready');
 let visible=false,manualPause=false,focused=false,running=false;
 function syncBand(){
  const active=visible&&!document.hidden&&!reduced.matches;
  const nextRunning=active&&!manualPause&&!focused;
  if(nextRunning&&!running)windowEl.scrollLeft=0;
  running=nextRunning;
  band.classList.toggle('is-active',active);
  band.classList.toggle('is-paused',manualPause);
  band.classList.toggle('is-focused',focused);
  band.classList.toggle('is-static',reduced.matches);
  button.hidden=reduced.matches;button.disabled=reduced.matches;
  button.setAttribute('aria-pressed',String(manualPause));
  button.setAttribute('aria-label',`${button.dataset.label}: ${manualPause?'Başlat':'Durdur'}`);
  button.textContent=manualPause?'▷':'Ⅱ';
 }
 button.addEventListener('click',()=>{manualPause=!manualPause;syncBand();});
 windowEl.addEventListener('focusin',event=>{focused=event.target.matches(':focus-visible');syncBand();if(focused)requestAnimationFrame(()=>{if(document.activeElement===event.target)event.target.scrollIntoView({behavior:'instant',block:'nearest',inline:'nearest'});});});
 windowEl.addEventListener('focusout',()=>requestAnimationFrame(()=>{focused=windowEl.contains(document.activeElement)&&document.activeElement.matches(':focus-visible');syncBand();}));
 document.addEventListener('visibilitychange',syncBand);
 reduced.addEventListener('change',syncBand);
 new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;syncBand();},{threshold:0}).observe(band);
 syncBand();
});

const world=$('.world-perspectives'),slides=$$('[data-perspective-slide]');
if(world&&slides.length){
 const picker=$('[data-perspective-select]'),pause=$('[data-perspective-pause]');
 let index=0,manualPause=false,visible=false,hovered=false,timeout;
 $('.perspective-controls').hidden=false;
 function show(next){index=(next+slides.length)%slides.length;slides.forEach((slide,i)=>slide.hidden=i!==index);picker.value=String(index);$('[data-perspective-count]').textContent=`${String(index+1).padStart(2,'0')} / ${slides.length}`;}
 function schedule(){clearTimeout(timeout);pause.disabled=reduced.matches;pause.setAttribute('aria-pressed',String(manualPause));pause.setAttribute('aria-label',manualPause?'Otomatik geçişi başlat':'Otomatik geçişi durdur');pause.textContent=manualPause?'▷':'Ⅱ';if(!visible||manualPause||reduced.matches||document.hidden||hovered||world.contains(document.activeElement))return;timeout=setTimeout(()=>{show(index+1);schedule();},1500);}
 $('[data-perspective-prev]').addEventListener('click',()=>{show(index-1);schedule();});
 $('[data-perspective-next]').addEventListener('click',()=>{show(index+1);schedule();});
 picker.addEventListener('change',()=>{show(Number(picker.value));schedule();});
 pause.addEventListener('click',()=>{manualPause=!manualPause;schedule();});
 world.addEventListener('pointerenter',event=>{if(event.pointerType==='mouse'){hovered=true;schedule();}});
 world.addEventListener('pointerleave',()=>{hovered=false;schedule();});
 world.addEventListener('focusin',schedule);world.addEventListener('focusout',()=>setTimeout(schedule,0));
 document.addEventListener('visibilitychange',schedule);reduced.addEventListener('change',schedule);
 new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;schedule();},{threshold:.2}).observe(world);
 show(0);schedule();
}

const needChips=$$('[data-need-index]');
if(needChips.length){
 const expCards=$$('[data-expertise-card]');
 const expPieces=$$('.expertise-puzzle a[data-piece]');
 const needToast=$('#need-status');
 const needText=needToast?.querySelector('.need-status-text');
 const needMessages={
  0:'01 Vergi & Mevzuat: Tam Tasdik, Vergi Danışmanlığı, KDV İadesi ve Transfer Fiyatlandırması çözümleri.',
  1:'02 Bağımsız Denetim: SPK, KGK, BDDK ve TFRS/UFRS standartlarında güvence ve denetim raporlaması.',
  2:'03 Şirket Değerleme & M&A: Birleşme, devralma, finansal değerleme ve durum tespiti (Due Diligence).',
  3:'04 Bordro & İK: 3.500+ personel operasyonu, SGK teşvik optimizasyonu ve dış kaynak yönetimi.',
  4:'05 Sistem & Raporlama: ERP danışmanlığı, finansal süreç analizi ve yönetici iş zekâsı panelleri (BI).',
  5:'06 Boraden Akademi: Mevzuat güncellemeleri, mali eğitimler ve kurumsal finans seminerleri.'
 };
 needChips.forEach(chip=>{
  chip.addEventListener('click',()=>{
   needChips.forEach(c=>c.classList.toggle('is-active',c===chip));
   const idx=Number(chip.dataset.needIndex);
   if(idx>=0){
    expCards.forEach((c,i)=>c.classList.toggle('is-selected',i===idx));
    expPieces.forEach(p=>{
     const pIdx=Number(p.dataset.piece);
     p.classList.toggle('is-selected',pIdx===idx);
    });
    if(needToast&&needText){
     needText.textContent=needMessages[idx]||'Seçilen uzmanlık alanı vurgulandı.';
     needToast.classList.add('is-visible');
    }
    const targetCard=expCards[idx];
    if(targetCard)targetCard.scrollIntoView({behavior:'smooth',block:'nearest'});
   }else{
    expCards.forEach(c=>c.classList.remove('is-selected'));
    expPieces.forEach(p=>p.classList.remove('is-selected'));
    if(needToast&&needText){
     needText.textContent='Tüm uzmanlık alanları aktif.';
     needToast.classList.remove('is-visible');
    }
   }
  });
 });
}

}


if (typeof document !== 'undefined') {
// Intro Screen Controller
const boradenIntro = document.getElementById('boraden-intro');
if (boradenIntro) {
 const hasSeen = sessionStorage.getItem('boraden_intro_v3_seen');
 if (hasSeen && !location.hash.includes('replay-intro')) {
  boradenIntro.remove();
 } else {
  sessionStorage.setItem('boraden_intro_v3_seen', '1');
  setTimeout(() => {
   boradenIntro.classList.add('is-dismissing');
   setTimeout(() => boradenIntro.remove(), 750);
  }, 2300);
 }
}

// 3D Earth Globe Initializer
if (document.getElementById('earth-canvas-container')) {
 import('./earth-globe.js').then(m => {
  if (m && m.initBoradenEarth) {
   m.initBoradenEarth();
  }
 }).catch(err => console.error('Earth globe init error:', err));
}

// 6 Continents = 6 Services Metaphor Controller
const CONTINENTS_DATA = {
 turkiye: {
  id: 'turkiye',
  badge: 'TÜRKİYE &bull; MERKEZ HUB',
  tag: 'Boraden Bağımsız Denetim ve Danışmanlık A.Ş.',
  title: "Türkiye'nin Güven Üssü: Boraden",
  desc: '1993’ten bugüne KGK, SPK ve BDDK yetkileriyle 6 kıta metaforundaki tüm hizmetlerimizin merkez üssü. Ankara ve İstanbul merkezlerimizden küresel standartlarda 6 stratejik alanda bütünleşik çözüm mimarisi sunuyoruz.',
  linkText: 'Tüm Uzmanlıkları İnceleyin',
  linkUrl: '#uzmanlik',
  targetCard: -1
 },
 avrupa: {
  id: 'avrupa',
  badge: 'AVRUPA &bull; 02 BAĞIMSIZ DENETİM',
  tag: 'UFRS &bull; TFRS Standartları',
  title: '02 Bağımsız Denetim ve Raporlama',
  desc: 'Avrupa kıtası metaforumuz: Uluslararası UFRS/TFRS standartlarında KGK, SPK ve BDDK yetkili bağımsız denetim güvencesi. Güvenilir, şeffaf ve küresel yatırımcı raporlaması.',
  linkText: '02 Bağımsız Denetim Sayfasına Git',
  linkUrl: '/hizmetler/bagimsiz-denetim/',
  targetCard: 1
 },
 'kuzey-amerika': {
  id: 'kuzey-amerika',
  badge: 'KUZEY AMERİKA &bull; 01 VERGİ',
  tag: 'Tam Tasdik &bull; Transfer Fiyatlandırması',
  title: '01 Vergi & Mali Müşavirlik',
  desc: 'Kuzey Amerika kıtası metaforumuz: Çok uluslu vergi mimarisi, transfer fiyatlandırması, tam tasdik denetimi ve uluslararası vergi planlaması çözümleri.',
  linkText: '01 Vergi Hizmetlerini İnceleyin',
  linkUrl: '/hizmetler/vergi-mali-musavirlik/',
  targetCard: 0
 },
 'guney-amerika': {
  id: 'guney-amerika',
  badge: 'GÜNEY AMERİKA &bull; 03 DANIŞMANLIK',
  tag: 'M&A &bull; Şirket Değerleme',
  title: '03 Kurumsal Danışmanlık & Değerleme',
  desc: 'Güney Amerika kıtası metaforumuz: Şirket birleşme ve devralmaları (M&A), finansal durum tespiti (Due Diligence), şirket değerleme ve stratejik yönetim.',
  linkText: '03 Danışmanlık Hizmetlerini İnceleyin',
  linkUrl: '/hizmetler/kurumsal-danismanlik/',
  targetCard: 2
 },
 afrika: {
  id: 'afrika',
  badge: 'AFRİKA &bull; 04 İK & BORDRO',
  tag: '3.500+ Personel &bull; SGK Teşvik',
  title: '04 İnsan Kaynakları & Bordro Yönetimi',
  desc: 'Afrika kıtası metaforumuz: 3.500+ çalışan operasyonunda bordro dış kaynak kullanımı, SGK teşvik optimizasyonu ve iş hukuku uyumluluk denetimleri.',
  linkText: '04 Bordro Hizmetlerini İnceleyin',
  linkUrl: '/hizmetler/insan-kaynaklari/',
  targetCard: 3
 },
 asya: {
  id: 'asya',
  badge: 'ASYA &bull; 05 SİSTEM & İŞ ZEKÂSI',
  tag: 'ERP Entegrasyonu &bull; BI Raporlama',
  title: '05 Sistemler & Finansal İş Zekâsı',
  desc: 'Asya kıtası metaforumuz: ERP entegrasyonu, finansal veri ambarı modelleme, süreç dijitalizasyonu ve üst yönetici analitik iş zekâsı panelleri (BI).',
  linkText: '05 Sistemler Hizmetlerini İnceleyin',
  linkUrl: '/hizmetler/sistemler-is-zekasi/',
  targetCard: 4
 },
 okyanusya: {
  id: 'okyanusya',
  badge: 'OKYANUSYA &bull; 06 AKADEMİ',
  tag: 'Kurumsal Finans &bull; Seminerler',
  title: '06 Boraden Akademi',
  desc: 'Okyanusya kıtası metaforumuz: Şirket yönetim kurulları, CFO’lar ve finans liderleri için güncel mevzuat, TFRS/UFRS standartları ve mali seminerler.',
  linkText: "06 Boraden Akademi'yi İnceleyin",
  linkUrl: '/hizmetler/akademi/',
  targetCard: 5
 }
};

function selectContinentMetaphor(key) {
 const data = CONTINENTS_DATA[key] || CONTINENTS_DATA.turkiye;
 const pills = document.querySelectorAll('#space-metaphor-nav .metaphor-pill');
 pills.forEach(p => {
  p.classList.toggle('is-active', p.dataset.continentFocus === key);
 });

 if (window.focusContinent) {
  window.focusContinent(key === 'turkiye' ? 'hq' : key);
 }

 if (window.triggerSunbeam) {
  window.triggerSunbeam(key === 'turkiye');
 }

 const liveBadge = document.getElementById('live-badge');
 const liveTag = document.getElementById('live-tag');
 const liveTitle = document.getElementById('live-title');
 const liveDesc = document.getElementById('live-desc');
 const liveLink = document.getElementById('live-link');
 const liveCard = document.getElementById('metaphor-live-card');

 if (liveBadge) liveBadge.innerHTML = data.badge;
 if (liveTag) liveTag.textContent = data.tag;
 if (liveTitle) liveTitle.textContent = data.title;
 if (liveDesc) liveDesc.textContent = data.desc;
 if (liveLink) {
  liveLink.setAttribute('href', data.linkUrl);
  const span = liveLink.querySelector('span');
  if (span) span.textContent = data.linkText;
 }
 if (liveCard) {
  if (key === 'turkiye') {
   liveCard.classList.remove('is-open');
  } else {
   liveCard.classList.add('is-open');
   liveCard.style.animation = 'none';
   liveCard.offsetHeight;
   liveCard.style.animation = 'liveCardFadeIn .32s ease-out';
  }
 }

 const cards = document.querySelectorAll('[data-expertise-card]');
 cards.forEach((c, idx) => {
  c.classList.toggle('is-selected', idx === data.targetCard);
 });
}

const metaphorNav = document.getElementById('space-metaphor-nav');
if (metaphorNav) {
 metaphorNav.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-continent-focus]');
  if (btn) {
   const target = btn.dataset.continentFocus;
   selectContinentMetaphor(target);
  }
 });
}

// Center Logo Interactive God-Ray Sunbeam & Unfold Earth Trigger
const navCenterLogo = document.querySelector('.brand-center');
if (navCenterLogo) {
 navCenterLogo.addEventListener('mouseenter', () => {
  navCenterLogo.classList.add('is-sunbeam-active');
  if (window.triggerSunbeam) window.triggerSunbeam(true);
  if (window.focusContinent) window.focusContinent('hq');
 });

 navCenterLogo.addEventListener('mouseleave', () => {
  navCenterLogo.classList.remove('is-sunbeam-active');
  if (window.triggerSunbeam) window.triggerSunbeam(false);
  if (window.focusContinent) window.focusContinent('all');
 });

 navCenterLogo.addEventListener('click', (e) => {
  if (location.pathname === '/' || location.pathname === '/index.html' || location.pathname === '') {
   e.preventDefault();
   navCenterLogo.classList.add('is-sunbeam-active');
   if (window.triggerSunbeam) window.triggerSunbeam(true);
   selectContinentMetaphor('turkiye');

   const earthHero = document.getElementById('uzay-dunya-sahnesi');
   const servicesSheet = document.getElementById('uzmanlik') || document.getElementById('deloitte-content-sheet');
   
   if (window.scrollY > 200) {
    if (earthHero) earthHero.scrollIntoView({ behavior: 'smooth', block: 'start' });
   } else {
    if (servicesSheet) servicesSheet.scrollIntoView({ behavior: 'smooth', block: 'start' });
   }

   setTimeout(() => {
    navCenterLogo.classList.remove('is-sunbeam-active');
    if (window.triggerSunbeam) window.triggerSunbeam(false);
   }, 3500);
  }
 });
}

// Executive Hero Brand Lockup Interactive Trigger
const heroBrandLockup = document.getElementById('space-hero-brand-lockup') || document.getElementById('earth-grounding-bar');
if (heroBrandLockup) {
 heroBrandLockup.addEventListener('mouseenter', () => {
  if (window.triggerSunbeam) window.triggerSunbeam(true);
  if (window.focusContinent) window.focusContinent('hq');
 });

 heroBrandLockup.addEventListener('mouseleave', () => {
  if (window.triggerSunbeam) window.triggerSunbeam(false);
  if (window.focusContinent) window.focusContinent('all');
 });

 heroBrandLockup.addEventListener('click', (e) => {
  e.preventDefault();
  if (window.triggerSunbeam) window.triggerSunbeam(true);
  const servicesSheet = document.getElementById('deloitte-content-sheet') || document.getElementById('uzmanlik');
  if (servicesSheet) servicesSheet.scrollIntoView({ behavior: 'smooth', block: 'start' });
  setTimeout(() => {
   if (window.triggerSunbeam) window.triggerSunbeam(false);
  }, 3000);
 });
}

}

