(() => {
  'use strict';
  const root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const mobile = matchMedia('(max-width: 760px)');
  const hero = document.querySelector('.hero-scroll');
  const story = document.querySelector('.heritage-scroll');
  const storyStage = document.querySelector('.heritage-stage');
  const nav = document.querySelector('.navigation');
  const motionButton = document.querySelector('.motion-toggle');
  let paused = reduced.matches;
  let frame = 0;
  let chapter = 0;
  let manualStoryY = null;
  const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
  const chapters = [
    {number: '1993', kicker: 'TEMELLERİMİZİN ATILDIĞI YIL', title: ['Temeller sağlam.', 'Bakış daima ileri.'], text: "1993'te atılan temellerimiz, bugün denetim ve danışmanlığın farklı disiplinlerini bir araya getiren bir uzmanlığa dönüştü.", sign: '01 — DENEYİM'},
    {number: 'Birlik.', kicker: 'BİRBİRİNİ TAMAMLAYAN DİSİPLİNLER', title: ['Gücümüz, insan.', 'Bakışımız, bütünsel.'], text: 'Denetimden finansal raporlamaya, farklı uzmanlıkları aynı masa etrafında buluşturuyor; işinizin bütününe bakıyoruz.', sign: '02 — UZMANLIK'},
    {number: 'İleri.', kicker: 'BUGÜNÜ ANLAYAN. YARINI DÜŞÜNEN.', title: ['Deneyimden güç alır.', 'Yeni olasılıklara bakarız.'], text: 'Veri analizi, mali danışmanlık ve yönetim danışmanlığı uzmanlıklarımızı iş dünyasının değişen ihtiyaçlarıyla buluşturuyoruz.', sign: '03 — GELECEK'}
  ];
  const chapterButtons = [...document.querySelectorAll('button[data-chapter]')];
  function setChapter(index) {
    if (!storyStage || chapter === index) return;
    chapter = index;
    const data = chapters[index];
    storyStage.dataset.chapter = String(index);
    const number = document.querySelector('.story-number');
    number.textContent = data.number;
    const title = document.querySelector('#heritage-title');
    const emphasis = document.createElement('em');
    emphasis.textContent = data.title[1];
    title.replaceChildren(document.createTextNode(data.title[0]), document.createElement('br'), emphasis);
    document.querySelector('#chapter-kicker').textContent = data.kicker;
    document.querySelector('#chapter-description').textContent = data.text;
    document.querySelector('.chapter-sign').textContent = data.sign;
    chapterButtons.forEach((button, i) => {
      button.classList.toggle('active', i === index);
      button.setAttribute('aria-pressed', String(i === index));
    });
    if (!paused) {
      number.getAnimations().forEach(animation => animation.cancel());
      number.animate([{opacity: 0, translate: '0 22px', filter: 'blur(5px)'}, {opacity: 1, translate: '0 0', filter: 'blur(0)'}], {duration: 420, easing: 'cubic-bezier(.22,1,.36,1)'});
    }
  }
  chapterButtons.forEach(button => button.addEventListener('click', () => {
    manualStoryY = scrollY;
    setChapter(Number(button.dataset.chapter));
  }));
  function finishIntro() {
    root.classList.add('intro-done');
    try { sessionStorage.setItem('boraden-perspective-intro', '1'); } catch {}
  }
  if (paused || root.classList.contains('intro-done') || (location.hash && !new URLSearchParams(location.search).has('intro'))) finishIntro();
  else setTimeout(finishIntro, 4300);

  function updateScroll() {
    frame = 0;
    const y = scrollY;
    const extent = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    root.style.setProperty('--page-p', clamp(y / extent).toFixed(4));
    nav.classList.toggle('is-scrolled', y > 55);
    if (paused || mobile.matches || !hero || !story) return;
    const heroBox = hero.getBoundingClientRect();
    const hp = clamp(-heroBox.top / Math.max(1, hero.offsetHeight - innerHeight));
    root.style.setProperty('--hero-p', hp.toFixed(4));
    const storyBox = story.getBoundingClientRect();
    const sp = clamp(-storyBox.top / Math.max(1, story.offsetHeight - innerHeight));
    root.style.setProperty('--story-p', sp.toFixed(4));
    if (manualStoryY !== null && Math.abs(y - manualStoryY) > 40) manualStoryY = null;
    if (manualStoryY === null) setChapter(Math.min(2, Math.floor(sp * 3)));
  }
  function requestFrame() { if (!frame) frame = requestAnimationFrame(updateScroll); }
  addEventListener('scroll', requestFrame, {passive: true});
  addEventListener('resize', requestFrame, {passive: true});
  mobile.addEventListener('change', requestFrame);
  requestFrame();

  function syncMotion() {
    root.classList.toggle('motion-paused', paused);
    motionButton.setAttribute('aria-pressed', String(paused));
    motionButton.setAttribute('aria-label', paused ? 'Hareketi başlat' : 'Hareketi durdur');
    motionButton.querySelector('.motion-icon').textContent = paused ? '▷' : 'Ⅱ';
    if (paused) {
      finishIntro();
      document.querySelector('.story-number')?.getAnimations().forEach(animation => animation.finish());
      root.style.setProperty('--mx', '0');
      root.style.setProperty('--my', '0');
    }
    requestFrame();
  }
  motionButton.addEventListener('click', () => { paused = !paused; syncMotion(); });
  reduced.addEventListener('change', event => { paused = event.matches; syncMotion(); });
  syncMotion();
  hero?.addEventListener('pointermove', event => {
    if (paused || mobile.matches || event.pointerType !== 'mouse') return;
    root.style.setProperty('--mx', ((event.clientX / innerWidth - .5) * 2).toFixed(3));
    root.style.setProperty('--my', ((event.clientY / innerHeight - .5) * 2).toFixed(3));
  });
  hero?.addEventListener('pointerleave', () => { root.style.setProperty('--mx', '0'); root.style.setProperty('--my', '0'); });
  document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('pointermove', event => {
      if (paused || mobile.matches || event.pointerType !== 'mouse') return;
      const box = card.getBoundingClientRect();
      const x = (event.clientX - box.left) / box.width;
      const y = (event.clientY - box.top) / box.height;
      card.style.setProperty('--rx', `${(y - .5) * -3}deg`);
      card.style.setProperty('--ry', `${(x - .5) * 4}deg`);
      card.style.setProperty('--sx', `${x * 100}%`);
      card.style.setProperty('--sy', `${y * 100}%`);
    });
    card.addEventListener('pointerleave', () => { card.style.setProperty('--rx', '0deg'); card.style.setProperty('--ry', '0deg'); });
  });
  document.querySelectorAll('.magnetic').forEach(button => {
    button.addEventListener('pointermove', event => {
      if (paused || mobile.matches || event.pointerType !== 'mouse') return;
      const box = button.getBoundingClientRect();
      button.style.translate = `${(event.clientX - box.left - box.width / 2) * .07}px ${(event.clientY - box.top - box.height / 2) * .12}px`;
    });
    button.addEventListener('pointerleave', () => { button.style.translate = '0 0'; });
  });
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), {threshold: .07});
    document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
  } else document.querySelectorAll('.reveal').forEach(element => element.classList.add('is-visible'));

  const menu = document.querySelector('#expertise-menu');
  const menuButtons = [...document.querySelectorAll('.expertise-toggle, .menu-toggle')];
  let menuOpener = null;
  function setMenu(open) {
    menu.hidden = !open;
    menuButtons.forEach(button => button.setAttribute('aria-expanded', String(open)));
    document.querySelector('.menu-toggle').setAttribute('aria-label', open ? 'Menüyü kapat' : 'Menüyü aç');
  }
  menuButtons.forEach(button => button.addEventListener('click', () => { menuOpener = button; setMenu(menu.hidden); }));
  document.querySelectorAll('.menu-close-link, .brand, [data-nav]').forEach(link => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('click', event => { if (!nav.contains(event.target)) setMenu(false); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && !menu.hidden) { setMenu(false); menuOpener?.focus(); } });

  const grid = document.querySelector('.service-grid');
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach(item => {
      item.classList.toggle('active', item === button);
      item.setAttribute('aria-pressed', String(item === button));
    });
    grid.classList.toggle('filtered', filter !== 'all');
    grid.querySelectorAll('[data-group]').forEach(card => {
      card.hidden = filter !== 'all' && card.dataset.group !== filter;
      if (!card.hidden) card.classList.add('is-visible');
    });
    requestFrame();
  }));
  // The mobile discipline gallery also supports buttons and keyboard focus.
  const atlasDeck=document.querySelector('.atlas-deck');
  if(atlasDeck){
    const atlasCards=[...atlasDeck.querySelectorAll('.atlas-card')];
    const previous=document.querySelector('[data-atlas-prev]'),next=document.querySelector('[data-atlas-next]');
    const position=document.querySelector('[data-atlas-position]');
    let selected=0,atlasFrame=0;
    const atlasLeft=i=>Math.min(atlasDeck.scrollWidth-atlasDeck.clientWidth,Math.max(0,atlasCards[i].offsetLeft-atlasCards[0].offsetLeft));
    const updateAtlas=()=>{
      atlasFrame=0;
      selected=atlasCards.reduce((best,_,i)=>Math.abs(atlasLeft(i)-atlasDeck.scrollLeft)<Math.abs(atlasLeft(best)-atlasDeck.scrollLeft)?i:best,0);
      position.textContent=String(selected+1).padStart(2,'0')+' / 06';
      previous.disabled=selected===0;next.disabled=selected===atlasCards.length-1;
    };
    const selectAtlas=i=>atlasDeck.scrollTo({left:atlasLeft(i),behavior:paused?'instant':'smooth'});
    previous.addEventListener('click',()=>selectAtlas(Math.max(0,selected-1)));
    next.addEventListener('click',()=>selectAtlas(Math.min(atlasCards.length-1,selected+1)));
    atlasDeck.addEventListener('scroll',()=>{if(!atlasFrame)atlasFrame=requestAnimationFrame(updateAtlas);},{passive:true});
    addEventListener('resize',updateAtlas,{passive:true});
    updateAtlas();
  }
  // Full service pages replace the earlier preview dialogs.
  const directory = document.querySelector('#directory-results');
  if (directory) {
    const input = document.querySelector('#service-search');
    const buttons = [...document.querySelectorAll('[data-category]')];
    const requested = window.BoradenRoutes.resolve(location.href).params.get('category');
    let category = buttons.some(b=>b.dataset.category===requested) ? requested : 'all';
    const normalize = text => text.toLocaleLowerCase('tr').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ı/g,'i');
    const updateDirectory = () => {
      const query=normalize(input.value.trim());
      let count=0;
      buttons.forEach(b=>{b.classList.toggle('active',b.dataset.category===category);b.setAttribute('aria-pressed',String(b.dataset.category===category));});
      directory.querySelectorAll('[data-directory-group]').forEach(group=>{
        let inGroup=0;
        group.querySelectorAll('.directory-service').forEach(link=>{
          const show=(category==='all'||category===group.dataset.directoryGroup)&&(!query||normalize(link.textContent).includes(query));
          link.hidden=!show;if(show){inGroup++;count++;}
        });
        group.hidden=inGroup===0;
      });
      document.querySelector('.search-result-count').textContent=`${count} uzmanlık alanı`;
      document.querySelector('.search-empty').hidden=count>0;
      requestFrame();
    };
    buttons.forEach(b=>b.addEventListener('click',()=>{category=b.dataset.category;updateDirectory();}));
    input.addEventListener('input',updateDirectory);
    document.querySelector('[data-clear-search]').addEventListener('click',()=>{input.value='';category='all';updateDirectory();input.focus();});
    updateDirectory();
  }
  const archive=document.querySelector('[data-collection]');
  if(archive&&document.querySelector('#archive-search')){
    const input=document.querySelector('#archive-search');
    const year=document.querySelector('#archive-year');
    const category=document.querySelector('#archive-category');
    const rows=[...archive.querySelectorAll('.archive-row')];
    const empty=archive.querySelector('.archive-empty');
    const updateArchive=()=>{
      let count=0;const q=input.value.toLocaleLowerCase('tr').trim();
      rows.forEach(row=>{const show=(!q||row.textContent.toLocaleLowerCase('tr').includes(q))&&(year.value==='all'||row.dataset.year===year.value)&&(category.value==='all'||row.dataset.category===category.value);row.hidden=!show;if(show)count++;});
      archive.querySelector('.archive-count').textContent=`${count} yayın`;
      empty.hidden=count>0;
      if(rows.length&&count===0){empty.querySelector('h2').textContent='Bu filtrelerde bir yayın bulunamadı.';empty.querySelector('p').textContent='Aramanızı veya seçtiğiniz filtreleri değiştirebilirsiniz.';}
      requestFrame();
    };
    [input,year,category].forEach(el=>el.addEventListener(el===input?'input':'change',updateArchive));
  }
  const careerForm=document.querySelector('[data-career-application]');
  if(careerForm){
    const cv=careerForm.querySelector('[data-cv-upload]'),fileName=careerForm.querySelector('[data-file-name]');
    const error=careerForm.querySelector('[data-career-error]'),status=careerForm.querySelector('[data-career-status]');
    const validateCV=()=>{
      const file=cv.files[0];cv.setCustomValidity('');error.textContent='';
      if(!file){fileName.textContent='PDF, DOC veya DOCX · En fazla 10 MB';return true;}
      const extension=file.name.toLocaleLowerCase('tr').split('.').pop();
      if(!['pdf','doc','docx'].includes(extension)||file.size>10*1024*1024){cv.setCustomValidity('PDF, DOC veya DOCX biçiminde, en fazla 10 MB bir dosya seçin.');error.textContent=cv.validationMessage;return false;}
      fileName.textContent=file.name;return true;
    };
    cv.addEventListener('change',validateCV);
    careerForm.addEventListener('submit',event=>{
      status.textContent='';if(!validateCV()||!careerForm.reportValidity()){event.preventDefault();return;}
      if(location.protocol==='file:'||['localhost','127.0.0.1'].includes(location.hostname)){event.preventDefault();status.textContent='Önizleme doğrulaması tamamlandı. Bilgileriniz gönderilmedi.';}
    });
  }
})();
