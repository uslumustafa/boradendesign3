/* Curated images for general pages. Applied in the static renderer as well as local previews. */
(() => {
  'use strict';
  const entries={
  "/hizmetler/": {
    "id": "hizmetler",
    "image": "assets/pages/hizmetler.jpg",
    "layout": "split"
  },
  "/blog/": {
    "id": "blog",
    "image": "assets/pages/blog.jpg",
    "layout": "split"
  },
  "/sirkuler/": {
    "id": "sirkuler",
    "image": "assets/pages/sirkuler.jpg",
    "layout": "panorama"
  },
  "/haberler/": {
    "id": "haberler",
    "image": "assets/pages/haberler.jpg",
    "layout": "panorama"
  },
  "/duyurular/": {
    "id": "duyurular",
    "image": "assets/pages/duyurular.jpg",
    "layout": "split"
  },
  "/basari-hikayeleri/": {
    "id": "basari-hikayeleri",
    "image": "assets/pages/basari-hikayeleri.jpg",
    "layout": "split"
  },
  "/iletisim/": {
    "id": "iletisim",
    "image": "assets/pages/iletisim.jpg",
    "layout": "panorama"
  },
  "/hesaplama/": {
    "id": "hesaplama",
    "image": "assets/pages/hesaplama.jpg",
    "layout": "split"
  },
  "/kurumsal-arsiv/": {
    "id": "kurumsal-arsiv",
    "image": "assets/pages/kurumsal-arsiv.jpg",
    "layout": "panorama"
  },
  "/perspektifler/": {
    "id": "perspektifler",
    "image": "assets/pages/perspektifler.jpg",
    "layout": "panorama"
  },
  "/yayin-ilkeleri/": {
    "id": "yayin-ilkeleri",
    "image": "assets/pages/yayin-ilkeleri.jpg",
    "layout": "split"
  },
  "/hizmetler/alan/vergi-ve-mali-musavirlik/": {
    "id": "alan-vergi",
    "image": "assets/pages/alan-vergi.jpg",
    "layout": "split"
  },
  "/hizmetler/alan/denetim-ve-raporlama/": {
    "id": "alan-denetim",
    "image": "assets/pages/alan-denetim.jpg",
    "layout": "split"
  },
  "/hizmetler/alan/kurumsal-danismanlik/": {
    "id": "alan-kurumsal",
    "image": "assets/pages/alan-kurumsal.jpg",
    "layout": "split"
  },
  "/hizmetler/alan/insan-kaynaklari-ve-bordro/": {
    "id": "alan-insan",
    "image": "assets/pages/alan-insan.jpg",
    "layout": "split"
  },
  "/hizmetler/alan/sistemler-ve-is-zekasi/": {
    "id": "alan-sistemler",
    "image": "assets/pages/alan-sistemler.jpg",
    "layout": "split"
  },
  "/hizmetler/alan/boraden-akademi/": {
    "id": "alan-akademi",
    "image": "assets/pages/alan-akademi.jpg",
    "layout": "split"
  },
  "/hesaplama/gelir-vergisi/": {
    "id": "hesap-gelir",
    "image": "assets/pages/hesap-gelir.jpg",
    "layout": "split"
  },
  "/hesaplama/kdv/": {
    "id": "hesap-kdv",
    "image": "assets/pages/hesap-kdv.jpg",
    "layout": "split"
  },
  "/hesaplama/brut-net-maas/": {
    "id": "hesap-maas",
    "image": "assets/pages/hesap-maas.jpg",
    "layout": "split"
  }
};
  const figure=item=>`<figure class="context-visual" data-media-id="${item.id}"><img src="${item.image}" alt="" width="1672" height="941" fetchpriority="high"><figcaption>Boraden için üretilmiş temsili sahne.</figcaption></figure>`;
  function apply(html,path) {
    const item=entries[path];
    if(!item || !html.startsWith('<section ')) return html;
    const openingEnd=html.indexOf('>')+1,sectionEnd=html.indexOf('</section>');
    if(sectionEnd<openingEnd) return html;
    const opening=html.slice(0,openingEnd),body=html.slice(openingEnd,sectionEnd),rest=html.slice(sectionEnd);
    if(path==='/iletisim/') {
      const start=body.indexOf('<div class="contact-layout">');
      if(start<0) return html;
      return opening+'<div class="context-contact-intro"><div>'+body.slice(0,start)+'</div>'+figure(item)+'</div>'+body.slice(start)+rest;
    }
    const tag=opening.replace('class="','class="context-hero context-'+item.layout+' ');
    return tag+'<div class="context-hero-copy">'+body+'</div>'+figure(item)+rest;
  }
  window.BoradenPageMedia={entries,apply,imageFor:path=>entries[path]?.image};
})();
