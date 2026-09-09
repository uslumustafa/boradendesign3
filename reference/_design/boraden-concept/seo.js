(() => {
  'use strict';
  const D=window.BORADEN,R=window.BoradenRoutes,origin='https://boraden.com.tr';
  const pages={
    home:['Boraden | Bağımsız Denetim, YMM ve Danışmanlık','1993’te temelleri atılan Boraden: bağımsız denetim, YMM, şirket değerleme, kuruluş danışmanlığı ve bordro hizmetleri. İstanbul’da bizimle tanışın.'],
    hakkimizda:['Boraden Hakkımızda | 1993’ten Gelen Deneyim','Boraden Bağımsız Denetim ve Danışmanlık A.Ş.’nin hikâyesi, çalışma yaklaşımı ve uzmanlık alanları. İşletmenizin ihtiyaçlarını birlikte değerlendirelim.'],
    'biz-kimiz':['Biz Kimiz | Boraden','1993’te temelleri atılan Boraden’in denetim, vergi, finans, danışmanlık ve veri disiplinlerini bir araya getiren çalışma yaklaşımını tanıyın.'],
    'misyon-vizyon':['Misyon ve Vizyon | Boraden','Boraden’in ihtiyaçları doğru anlama, uzmanlıkları birleştirme ve deneyimini yeni çalışma biçimleriyle geliştirme yönünü keşfedin.'],
    ekibimiz:['Ekibimiz | Boraden','Boraden ekip profilleri yayın onayının ardından bu sayfada yer alacaktır.'],
    kariyer:['Kariyer ve Genel Başvuru | Boraden','Boraden kariyer alanında uzmanlığınızı, ilgi alanınızı ve özgeçmişinizi paylaşarak genel başvuru bırakın.'],
    hizmetler:['Denetim, Vergi ve Danışmanlık Hizmetleri | Boraden','Boraden hizmetlerini keşfedin: bağımsız denetim, YMM, TFRS, şirket değerleme, kuruluş, insan kaynakları, bordro, muhasebe ve veri analiz sistemleri.'],
    sektorler:['Sektörlere Göre Denetim ve Danışmanlık | Boraden','Üretim, ticaret, teknoloji, perakende, inşaat ve profesyonel hizmetlerde iş modelinize uygun Boraden uzmanlık alanlarını keşfedin.'],
    blog:['Boraden Blog | Vergi, Finans ve İş Dünyası Rehberleri','Şirket değerleme, kuruluş, insan kaynakları ve bordro üzerine özgün Boraden yazıları. Kaynaklı bilgilerle kararlarınıza farklı bir açıdan bakın.'],
    haberler:['Güncel Vergi ve İş Dünyası Haberleri | Boraden','Resmî kaynaklardan seçilen vergi ve iş dünyası gelişmeleri. Tarihli haberler, mevzuat bağlantıları ve ilgili Boraden yayınları.'],
    sirkuler:['Sirküler ve Vergi Mevzuatı Arşivi | Boraden','Boraden sirküler ve belge arşivinde başlık, numara ve yıla göre arayın. Yeni yayınları ve tarihsel PDF belgelerini kaynaklarıyla inceleyin.'],
    duyurular:['Boraden Duyurular','Boraden’in yayımlanan kurumsal duyuruları ve ilgili iletişim bilgileri.'],
    'basari-hikayeleri':['İş Birliği ve Çalışma Yaklaşımı | Boraden','Şirket değerleme, kuruluş ve bordro ihtiyaçlarını anlatan örnek çalışma senaryoları. Boraden’in yaklaşımını tanıyın.'],
    iletisim:['Boraden İletişim | İstanbul Zeytinburnu','Boraden Bağımsız Denetim ve Danışmanlık A.Ş. İstanbul iletişim bilgileri: telefon, e-posta ve Zeytinburnu ofis adresi. İhtiyacınızı paylaşın.'],
    hesaplama:['2026 Vergi ve Maaş Hesaplama Araçları | Boraden','2026 gelir vergisi, KDV dahil-hariç ve brüt/net maaş hesaplama. Açıklanan varsayımlar, vergi dilimleri ve resmî kaynaklarla ön hesap yapın.'],
    perspektifler:['Dünyadan Perspektifler: Türkçe Okumalar | Boraden','Warren Buffett, Daniel Kahneman ve Richard Thaler’dan değer, karar ve insan üzerine Türkçe kaynak özetleri ve özgün Boraden değerlendirmeleri.'],
    'yayin-ilkeleri':['Yayın ve Kaynak İlkeleri | Boraden','Boraden’in kaynak, tarih, çeviri, şirket bilgisi ve içerik düzeltme ilkeleri. Doğrulanabilir ve açık bilgi paylaşımı yaklaşımımız.'],
    'kurumsal-arsiv':['Kurumsal İçerik Arşivi | Boraden','Önceki Boraden sitesinden alınan tarihsel içerik kayıtları.'],
    '404':['Sayfa Bulunamadı | Boraden','Aradığınız sayfaya ulaşılamıyor. Boraden hizmetlerini keşfedin veya bizimle iletişime geçin.']
  };
  function metadata(url,view){
    const r=R.resolve(url),p=r.params;let [title,description]=pages[r.page]||[view.title,'Boraden uzmanlık alanlarını ve içeriklerini keşfedin.'];let image=window.BoradenPageMedia.imageFor(r.path)?'/'+window.BoradenPageMedia.imageFor(r.path):r.page==='misyon-vizyon'?'/assets/pages/misyon-vizyon.jpg':['hakkimizda','biz-kimiz'].includes(r.page)?'/assets/expertise-table.jpg':r.page==='sektorler'?'/assets/enterprise-landscape.jpg':'/assets/decision-room.jpg',article=null,service=null;
    if(r.page==='service'){service=D.services.find(s=>s.id===p.get('service'));if(service){title=service.seoTitle;description=service.description;image='/assets/'+service.image;}}
    else if(r.page==='sector'){const s=D.sectors.find(s=>s.id===p.get('sector'));if(s){title=s.title+': Denetim ve Danışmanlık | Boraden';description=s.text;image='/assets/'+s.image;}}
    else if(r.page==='perspective'){const x=D.perspectives.find(x=>x.id===p.get('perspective'));if(x){title=x.person+': '+x.title+' | Boraden';description=x.summary;image='/assets/thinkers/'+x.image+'.jpg';article={headline:x.title,date:x.date,person:x.person,source:x.source};}}
    else if(r.page==='article'){const x=D.publications[p.get('kind')]?.find(x=>x.id===p.get('article'));if(x){title=x.title+' | Boraden';description=x.summary;image=R.href(x.cover||'assets/decision-room.jpg');article={headline:x.title,date:x.date};}}
    else if(r.page==='hizmetler'&&p.has('category')){const g=D.groups.find(g=>g.id===p.get('category'));if(g){title=g.name+' Hizmetleri | Boraden';description=g.description+' Boraden uzmanlık alanlarını ve hizmet kapsamlarını inceleyin.';}}
    else if(r.page==='hesaplama'&&p.has('calc')){const c=window.BoradenExperience.calculatorInfo[p.get('calc')];if(c){title='2026 '+c.name+' | Boraden';description=c.lead+' Hesaplama yöntemi, varsayımlar ve resmî kaynaklarla sonucu inceleyin.';}}
    const noindex=view.status!==200||['kurumsal-arsiv','basari-hikayeleri'].includes(r.page)||p.has('preview');
    if(view.status!==200)[title,description]=pages['404'];
    const canonical=origin+r.path;
    const org={'@type':'Organization','@id':origin+'/#organization',name:'Boraden',legalName:'Boraden Bağımsız Denetim ve Danışmanlık A.Ş.',url:origin+'/',logo:origin+'/assets/boraden-logo.png',telephone:'+90-212-483-26-11',email:'info@boraden.com.tr',address:{'@type':'PostalAddress',streetAddress:'Maltepe Mahallesi, Yedikule Çırpıcı Yolu Sokak, Avrupa Kale Ofis Blok, No: 2, Kat: 2, Daire: 5',addressLocality:'Zeytinburnu',addressRegion:'İstanbul',postalCode:'34010',addressCountry:'TR'}};
    const graph=[org,{'@type':'WebSite','@id':origin+'/#website',url:origin+'/',name:'Boraden',inLanguage:'tr-TR',publisher:{'@id':org['@id']}}];
    graph.push({'@type':'WebPage','@id':canonical+'#webpage',url:canonical,name:title,description,inLanguage:'tr-TR',isPartOf:{'@id':origin+'/#website'},about:service?{'@id':canonical+'#service'}:{'@id':org['@id']},primaryImageOfPage:{'@type':'ImageObject',url:image.startsWith('http')?image:origin+image}});
    const crumbs=[{name:'Ana sayfa',url:origin+'/'}];
    if(r.page!=='home'){
      if(r.page==='service')crumbs.push({name:'Hizmetlerimiz',url:origin+'/hizmetler/'});
      if(r.page==='sector')crumbs.push({name:'Sektörler',url:origin+'/sektorler/'});
      if(r.page==='perspective')crumbs.push({name:'Dünyadan perspektifler',url:origin+'/perspektifler/'});
      if(r.page==='article')crumbs.push({name:({blog:'Blog',news:'Haberler',circulars:'Sirküler',announcements:'Duyurular',stories:'Başarı hikâyeleri'})[p.get('kind')],url:origin+'/'+R.kinds[p.get('kind')]+'/'});
      crumbs.push({name:service?.title||article?.headline||title.split(' | ')[0],url:canonical});
      graph.push({'@type':'BreadcrumbList',itemListElement:crumbs.map((c,i)=>({'@type':'ListItem',position:i+1,name:c.name,item:c.url}))});
    }
    if(service)graph.push({'@type':'Service','@id':canonical+'#service',name:service.title,serviceType:service.title,url:canonical,description:service.definition,provider:{'@id':org['@id']}});
    if(article)graph.push({'@type':'Article',headline:article.headline,description,datePublished:article.date,dateModified:article.date,inLanguage:'tr-TR',mainEntityOfPage:{'@id':canonical+'#webpage'},image:[image.startsWith('http')?image:origin+image],author:{'@type':'Organization',name:'Boraden',url:origin+'/yayin-ilkeleri/'},publisher:{'@id':org['@id']},...(article.source?{citation:article.source,about:{'@type':'Person',name:article.person}}:{})});
    return {title,description,canonical,image:image.startsWith('http')?image:origin+image,noindex,graph:{'@context':'https://schema.org','@graph':graph},article:!!article};
  }
  window.BoradenSEO={origin,metadata};
})();
