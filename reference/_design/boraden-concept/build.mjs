/* Dependency-free static export. The same render functions serve the browser and the build. */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
const root=path.dirname(fileURLToPath(import.meta.url));
const out=path.join(root,'_site');
const read=name=>fs.readFileSync(path.join(root,name),'utf8');
const write=(name,value)=>{const target=path.join(out,name);fs.mkdirSync(path.dirname(target),{recursive:true});fs.writeFileSync(target,value);};
const copy=(name,dest=name)=>{const target=path.join(out,dest);fs.mkdirSync(path.dirname(target),{recursive:true});fs.copyFileSync(path.join(root,name),target);};
const scripts=['content.js','legacy-data.js','experience-content.js','growth-content.js','perspectives.js','editorial-content.js','media-content.js','studio-store.js','routes.js','page-media.js','experience-views.js','growth-views.js','calculator-views.js','calculator-core.js','motion-views.js','page-renderer.js','seo.js'];
const context=vm.createContext({window:{},URL,URLSearchParams,Date,console,localStorage:{getItem:()=>null}});
for(const script of scripts)vm.runInContext(read(script),context,{filename:script});
const W=context.window,D=W.BORADEN,R=W.BoradenRoutes,SEO=W.BoradenSEO;
const source=read('index.html'),home=source.match(/<main id="main">([\s\S]*?)<\/main>/)[1];
const variants=JSON.parse(read('research/image-variants.json'));
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const routes=['/',...R.pages.map(p=>'/'+p+'/'),...D.services.map(s=>R.path({service:s.id})),...D.sectors.map(s=>R.path({sector:s.id})),...D.groups.map(g=>R.path({page:'hizmetler',category:g.id})),...D.perspectives.map(p=>R.path({perspective:p.id})),...Object.keys(R.calculators).map(calc=>R.path({page:'hesaplama',calc}))];
for(const kind of Object.keys(R.kinds))for(const record of D.publications[kind]||[])if(W.BoradenStudio.published(record))routes.push(R.path({article:record.id,kind}));
// A clean build removes only the previous generated output, never source files or local editor data.
fs.rmSync(out,{recursive:true,force:true});fs.mkdirSync(out,{recursive:true});
const docCopies=new Map();
for(const d of W.BORADEN_LEGACY.documents){const old=d.file;d.file='assets/documents/archive/'+d.id+'.pdf';docCopies.set(old,d.file);}
const manifest={origin:SEO.origin,builtAt:new Date().toISOString(),routes:{},queries:{'page=home':'/'},redirects:{}};
function render(url,filename,dynamic=false){
  const u=new URL(url,'http://boraden.local'),view=W.renderBoradenPage({pathname:u.pathname,search:u.search,homeHTML:home}),meta=SEO.metadata(url,view);
  let html=source.replace(/<title>[\s\S]*?<\/title>/,'<title>'+escape(meta.title)+'</title>').replace(/<meta name="description"[^>]*>/,'<meta name="description" content="'+escape(meta.description)+'">');
  html=html.replace(/<header class="navigation"[\s\S]*?<\/header>/,'<header class="navigation" id="navigation">'+view.navigation+'</header>');
  html=html.replace(/<main id="main">[\s\S]*?<\/main>/,'<main id="main">'+view.main+'</main>'+view.footer);
  html=html.replace('<html lang="tr">',`<html lang="tr" data-rendered="${dynamic?'dynamic':'true'}"${view.page!=='home'?' class="intro-done"':''}>`);
  html=html.replace('<body>',`<body${view.page!=='home'?' class="interior page-'+view.page+'"':''}>`);
  // Raw legacy migration text is rendered at build time, not downloaded on every page visit.
  html=html.replace(/\s*<script src="legacy-data.js" defer><\/script>/,'');
  if(['sirkuler','kurumsal-arsiv'].includes(view.page))html=html.replace('<script src="experience-content.js"', '<script src="legacy-data.js" defer></script>\n  <script src="experience-content.js"');
  const priority=view.main.match(/<img\b[^>]*src="([^"]+)"[^>]*fetchpriority="high"/);
  html=html.replace(/<link rel="preload"[^>]*as="image"[^>]*>/,priority?'<link rel="preload" href="'+priority[1]+'" as="image" fetchpriority="high">':'');
  const tags=`<meta name="robots" content="${meta.noindex||dynamic?'noindex,follow':'index,follow,max-image-preview:large'}"><link rel="canonical" href="${escape(meta.canonical)}"><meta property="og:locale" content="tr_TR"><meta property="og:site_name" content="Boraden"><meta property="og:type" content="${meta.article?'article':'website'}"><meta property="og:title" content="${escape(meta.title)}"><meta property="og:description" content="${escape(meta.description)}"><meta property="og:url" content="${escape(meta.canonical)}"><meta property="og:image" content="${escape(meta.image)}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${escape(meta.title)}"><meta name="twitter:description" content="${escape(meta.description)}"><meta name="twitter:image" content="${escape(meta.image)}"><script type="application/ld+json">${JSON.stringify(meta.graph).replace(/</g,'\\u003c')}</script>`;
  html=html.replace('</head>',tags+'\n</head>');
  html=R.html(html);
  // A new preview must never mix old cached interactions with new page markup.
  html=html.replace(/(src|href)="([^":?#]+\.(?:js|css))"/g,(tag,attr,asset)=>{
    const file=path.join(root,asset.replace(/^\//,''));
    if(!fs.existsSync(file))return tag;
    const version=createHash('sha256').update(fs.readFileSync(file)).digest('hex').slice(0,10);
    return attr+'="'+asset+'?v='+version+'"';
  });
  html=html.replace(/<img\b([^>]*\bsrc="([^"]+)"[^>]*)>/g,(tag,attrs,src)=>{
    const asset=variants[src.replace(/^\//,'')];if(!asset)return tag;
    const sizes=src.includes('/thinkers/')?'(max-width: 760px) 100vw, 40vw':attrs.includes('fetchpriority="high"')?'100vw':'(max-width: 760px) 100vw, 50vw';
    const srcset=asset.variants.map(v=>'/'+v.src+' '+v.width+'w').join(', ');
    attrs=attrs.replace(/width="\d+"/,'width="'+asset.width+'"').replace(/height="\d+"/,'height="'+asset.height+'"');
    return '<picture><source type="image/webp" srcset="'+srcset+'" sizes="'+sizes+'"><img'+attrs+' decoding="async"></picture>';
  });
  if(priority){
    const src=priority[1].replace(/^\//,''),asset=variants[src];
    if(asset){const sizes=src.includes('/thinkers/')?'(max-width: 760px) 100vw, 40vw':'100vw';html=html.replace(/<link rel="preload"[^>]*as="image"[^>]*>/,'<link rel="preload" as="image" type="image/webp" href="/'+asset.variants.at(-1).src+'" imagesrcset="'+asset.variants.map(v=>'/'+v.src+' '+v.width+'w').join(', ')+'" imagesizes="'+sizes+'" fetchpriority="high">');}
  }
  write(filename,html);
  if(!dynamic){manifest.routes[u.pathname]={file:filename,status:view.status,title:meta.title,description:meta.description,indexable:!meta.noindex,canonical:meta.canonical};const query=R.resolve(url).params;query.sort();if(query.size)manifest.queries[query.toString()]=u.pathname;}
}
for(const route of new Set(routes))render(route,(route==='/'?'':route.slice(1))+'index.html');
render('/404/','404.html');render('/404/','dynamic.html',true);
delete manifest.routes['/404/'];
for(const s of D.services){if(s.legacy)manifest.redirects['/'+s.legacy.replace(/^\//,'')]=R.path({service:s.id});}
Object.assign(manifest.redirects,{
  '/index.html':'/','/biz-kimiz':'/biz-kimiz/','/ekibimiz.html':'/ekibimiz/','/kariyer':'/kariyer/','/degerlerimiz':'/misyon-vizyon/',
  '/iletisim.html':'/iletisim/','/hizmetlerimiz':'/hizmetler/',
  '/vergi-hizmetlerimiz':'/hizmetler/alan/vergi-ve-mali-musavirlik/',
  '/denetim':'/hizmetler/alan/denetim-ve-raporlama/',
  '/danismanlik':'/hizmetler/alan/kurumsal-danismanlik/',
  '/insan-kiymetleri':'/hizmetler/alan/insan-kaynaklari-ve-bordro/',
  '/sektor-raporlari':'/sektorler/'
});
write('sitemap.xml','<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+Object.values(manifest.routes).filter(r=>r.indexable).map(r=>'<url><loc>'+escape(r.canonical)+'</loc></url>').join('\n')+'\n</urlset>');
write('robots.txt','User-agent: *\nAllow: /\nDisallow: /admin.html\nDisallow: /research/\nDisallow: /kurumsal-arsiv/\nSitemap: '+SEO.origin+'/sitemap.xml\n');
write('_redirects',Object.entries(manifest.redirects).filter(([from,to])=>from!==to).map(([from,to])=>from+' '+to+' 301').join('\n')+'\n');
for(const name of ['styles.css','pages.css','experience.css','growth.css','page-media.css','motion.css','catalog.css','editorial.css','editorial.js','section-video.js','motion.js','tailwind.css','app.js','experience.js','pages.js','admin.css','admin.js','admin.html',...scripts.filter(n=>n!=='seo.js'&&n!=='legacy-data.js')])copy(name);
// Public archive payload contains the public document paths, not the raw crawl inventory.
write('legacy-data.js','window.BORADEN_LEGACY='+JSON.stringify(W.BORADEN_LEGACY)+';');
function copyAssets(dir='assets'){for(const entry of fs.readdirSync(path.join(root,dir),{withFileTypes:true})){const name=dir+'/'+entry.name;if(entry.isDirectory())copyAssets(name);else if(/\.(?:jpg|jpeg|png|webp|avif|svg|mp4|ttf|woff2?|css|xlsx|pdf)$/i.test(name))copy(name);}}
copyAssets();for(const [old,name] of docCopies)copy(old,name);
// The local editor is never an indexable public page.
let admin=read('admin.html');if(!/name="robots"/.test(admin))admin=admin.replace('</head>','<meta name="robots" content="noindex,nofollow">\n</head>');write('admin.html',admin);
write('route-manifest.json',JSON.stringify(manifest,null,2));
console.log(JSON.stringify({pages:Object.keys(manifest.routes).length,indexable:Object.values(manifest.routes).filter(r=>r.indexable).length,documents:docCopies.size,output:out}));
