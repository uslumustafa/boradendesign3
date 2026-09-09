(function(root,factory){const api=factory();if(typeof module==='object')module.exports=api;else root.BoradenRoutes=api;})(typeof window==='object'?window:globalThis,()=>{
  'use strict';
  const pages=['hakkimizda','biz-kimiz','misyon-vizyon','ekibimiz','kariyer','hizmetler','sektorler','blog','haberler','sirkuler','duyurular','basari-hikayeleri','iletisim','hesaplama','kurumsal-arsiv','perspektifler','yayin-ilkeleri'];
  const categories={vergi:'vergi-ve-mali-musavirlik',denetim:'denetim-ve-raporlama',danismanlik:'kurumsal-danismanlik',insan:'insan-kaynaklari-ve-bordro',sistem:'sistemler-ve-is-zekasi',akademi:'boraden-akademi'};
  const kinds={blog:'blog',news:'haberler',circulars:'sirkuler',announcements:'duyurular',stories:'basari-hikayeleri'};
  const calculators={income:'gelir-vergisi',vat:'kdv',salary:'brut-net-maas'};
  const slug=/^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  function path(params){
    const p=params instanceof URLSearchParams?params:new URLSearchParams(params);
    if(p.has('service'))return '/hizmetler/'+encodeURIComponent(p.get('service'))+'/';
    if(p.has('sector'))return '/sektorler/'+encodeURIComponent(p.get('sector'))+'/';
    if(p.has('perspective'))return '/perspektifler/'+encodeURIComponent(p.get('perspective'))+'/';
    if(p.has('article')&&kinds[p.get('kind')])return '/'+kinds[p.get('kind')]+'/'+encodeURIComponent(p.get('article'))+'/';
    if(p.get('page')==='hizmetler'&&categories[p.get('category')])return '/hizmetler/alan/'+categories[p.get('category')]+'/';
    if(p.get('page')==='hesaplama'&&calculators[p.get('calc')])return '/hesaplama/'+calculators[p.get('calc')]+'/';
    if(p.get('page')==='home'||!p.get('page'))return '/';
    return '/'+encodeURIComponent(p.get('page'))+'/';
  }
  function resolve(input){
    const u=new URL(input,'http://boraden.local');const params=new URLSearchParams(u.search);
    const parts=u.pathname.replace(/^\/+|\/+$/g,'').split('/').filter(Boolean);
    if(parts.length&&parts[0]!=='index.html'){
      ['page','service','sector','perspective','article','kind','category','calc'].forEach(k=>params.delete(k));
      if(parts.length===1&&pages.includes(parts[0]))params.set('page',parts[0]);
      else if(parts.length===2&&slug.test(parts[1])){
        if(parts[0]==='hizmetler')params.set('service',parts[1]);
        else if(parts[0]==='sektorler')params.set('sector',parts[1]);
        else if(parts[0]==='perspektifler')params.set('perspective',parts[1]);
        else if(parts[0]==='hesaplama'&&Object.values(calculators).includes(parts[1])){params.set('page','hesaplama');params.set('calc',Object.keys(calculators).find(k=>calculators[k]===parts[1]));}
        else if(Object.values(kinds).includes(parts[0])){params.set('article',parts[1]);params.set('kind',Object.keys(kinds).find(k=>kinds[k]===parts[0]));}
        else params.set('page','404');
      }else if(parts.length===3&&parts[0]==='hizmetler'&&parts[1]==='alan'&&Object.values(categories).includes(parts[2])){params.set('page','hizmetler');params.set('category',Object.keys(categories).find(k=>categories[k]===parts[2]));}
      else params.set('page','404');
    }
    return {params,path:path(params),page:params.get('page')||(params.has('service')?'service':params.has('sector')?'sector':params.has('perspective')?'perspective':params.has('article')?'article':'home')};
  }
  function href(value){
    if(!value||value.startsWith('#')||/^(?:[a-z]+:|\/\/)/i.test(value))return value;
    if(value==='./'||value==='index.html')return '/';
    if(value.startsWith('?')){const u=new URL(value,'http://boraden.local');const out=path(u.searchParams);const keep=new URLSearchParams();['intro','konu','preview'].forEach(k=>{if(u.searchParams.has(k))keep.set(k,u.searchParams.get(k));});return out+(keep.size?'?'+keep:'')+u.hash;}
    return value.startsWith('/')?value:'/'+value.replace(/^\.\//,'');
  }
  function html(value){return value.replace(/\b(href|src|poster|data-src)="([^"<>]*)"/g,(_,attr,value)=>attr+'="'+href(value.replace(/&amp;/g,'&')).replace(/&/g,'&amp;').replace(/"/g,'&quot;')+'"');}
  return {pages,categories,kinds,calculators,path,resolve,href,html};
});
