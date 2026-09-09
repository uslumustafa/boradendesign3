(() => {
  'use strict';
  const X=window.BoradenExperience,base=X.calculator;
  const info={
    income:{name:'Gelir Vergisi Hesaplama',title:'Gelir vergisini<br><em>dilim dilim görün.</em>',lead:'2026 yılı vergi matrahınız için ücret ve ücret dışı gelir tarifeleri.',heading:'Gelir vergisi nasıl hesaplanır?',text:'Artan oranlı tarifede matrahın her bölümü kendi vergi diliminde hesaplanır. Bir üst dilime geçmek, bütün gelirin o dilimin oranıyla vergilendirilmesi anlamına gelmez. Araç matrahın dilimlere dağılımını ve her dilimin vergi tutarını gösterir. İndirim, istisna ve mahsuplar için kişisel durum ayrıca değerlendirilmelidir.'},
    vat:{name:'KDV Hesaplama',title:'KDV dahil.<br><em>KDV hariç.</em>',lead:'Seçtiğiniz oranla net tutar, KDV ve toplamı ayrı ayrı hesaplayın.',heading:'KDV dahil tutardan vergi nasıl ayrılır?',text:'KDV hariç tutarda vergi, net bedelin seçilen oranla çarpılmasıyla bulunur. KDV dahil tutarda ise toplam, 1 + oran değerine bölünerek net bedele ulaşılır. Örneğin %20 KDV dahil 12.000 TL; 10.000 TL net bedel ve 2.000 TL KDV içerir. İşlem için geçerli oranı bu araç belirlemez; uygun oranı seçmeniz gerekir.'},
    salary:{name:'Brüt / Net Maaş Hesaplama',title:'Brütten nete.<br><em>Her kalemi görün.</em>',lead:'2026 parametreleri, seçilen ay ve önceki kümülatif matrahla standart ücret ön hesabı.',heading:'Brüt ve net maaş arasındaki fark nedir?',text:'Brüt ücret ile çalışana ödenen net ücret arasındaki ilişki; SGK ve işsizlik işçi payları, gelir ve damga vergileri ile uygulanabilir istisnalara bağlıdır. Kümülatif matrah nedeniyle seçilen ay önemlidir. Bu araç Ocak’tan beri kesintisiz, tam ay çalışan standart 4/a sigortalısı içindir; kişiye özgü bütün bordro kalemlerini kapsamaz.'}
  };
  X.calculatorInfo=info;
  X.calculator=(requested)=>{
    const mode=Object.hasOwn(info,requested)?requested:'income',m=info[mode];let html=base();
    html=html.replace('<h1>Rakamları girin.<br><em>Resmi netleştirin.</em></h1>','<h1>'+(requested?m.title:'Rakamları girin.<br><em>Resmi netleştirin.</em>')+'</h1>');
    if(requested)html=html.replace('2026 parametreleriyle, adım adım açıklanan hesaplar.',m.lead);
    html=html.replace(/<button data-calc-tab="([^"]+)"[^>]*>([^<]+)<\/button>/g,(_,key,label)=>`<a href="?page=hesaplama&calc=${key}" ${key===mode?'aria-current="page"':''}>${label}</a>`);
    const fields={income:['incomeAmount','incomeKind'],vat:['vatAmount','vatRate','vatMode'],salary:['salaryMode','salaryAmount','salaryMonth','salaryPrevious']};
    html=html.replace(/<div data-calc-panel="([^"]+)"(?: hidden)?>/g,(_,key)=>`<div data-calc-panel="${key}"${key===mode?'':' hidden'}>`);
    html=html.replace(/<(input|select)([^>]*name="([^"]+)"[^>]*)>/g,(_,tag,attrs,name)=>{let out=attrs.replace(/ disabled/g,'');if(!fields[mode].includes(name))out+=' disabled';return '<'+tag+out+'>';});
    html=html.replace('<form id="calculator-form">',`<noscript><p class="no-js-message">Hesaplama için tarayıcınızda JavaScript açık olmalıdır. Yöntem açıklamaları ve resmî kaynaklar aşağıda okunabilir.</p></noscript><form id="calculator-form" data-initial-calculator="${mode}">`);
    html=html.replace('<section class="matrah-section',`<section class="calculator-intro-guide section-pad"><p class="eyebrow">HESABIN ARKASINDA</p><h2>${m.heading}</h2><p>${m.text}</p><a class="ex-link" href="?service=${mode==='salary'?'insan-kaynaklari-ve-bordro':mode==='vat'?'kdv-iade-islemleri':'bireysel-danismanlik-hizmetleri'}">İlgili uzmanlığı keşfedin ↗</a></section><section class="matrah-section`);
    return html;
  };
})();
