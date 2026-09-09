/* Static HTML is the public baseline; browser-local records hydrate only editorial areas. */
(() => {
  'use strict';
  const R=window.BoradenRoutes,X=window.BoradenExperience;
  const route=R.resolve(location.href),main=document.querySelector('#main');
  const local=window.BoradenStudio.read();
  const rendered=document.documentElement.dataset.rendered==='true';
  const collection=['blog','haberler','sirkuler','duyurular','basari-hikayeleri','article'].includes(route.page);
  const contactTopic=route.page==='iletisim'&&route.params.has('konu');
  if(!rendered||contactTopic||(collection&&(local.length||route.params.get('preview')==='1'))){
    const view=window.renderBoradenPage({pathname:location.pathname,search:location.search,homeHTML:route.page==='home'?main.innerHTML:''});
    main.innerHTML=view.main;
    document.querySelector('.navigation').innerHTML=view.navigation;
    document.querySelector('.site-footer')?.remove();
    main.insertAdjacentHTML('afterend',view.footer);
    document.title=view.title;
    if(view.page!=='home'){document.documentElement.classList.add('intro-done');document.body.classList.add('interior','page-'+view.page);}
    if(route.page==='article'&&(local.length||route.params.has('preview'))){
      let robots=document.querySelector('meta[name="robots"]');if(!robots){robots=document.createElement('meta');robots.name='robots';document.head.append(robots);}robots.content='noindex,follow';
    }
  }else if(route.page==='home'&&local.some(r=>r.kind==='news')){
    const news=document.querySelector('.news-section');if(news)news.outerHTML=R.html(X.news());
  }
  document.querySelector('.service-dialog')?.remove();
})();
