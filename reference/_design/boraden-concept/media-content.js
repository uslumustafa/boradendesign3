/* Page-owned media slots map directly to future CMS image/video chooser blocks. */
(()=>{'use strict';const D=window.BORADEN;
const slots={
 'vergi':['vergi','veri','alan-vergi'],
 'denetim':['denetim','vergi','alan-denetim'],
 'danismanlik':['danismanlik','veri','alan-kurumsal'],
 'insan':['insan','akademi','alan-insan'],
 'sistem':['veri','danismanlik','alan-sistemler'],
 'akademi':['akademi','insan','alan-akademi']
};
D.editorialMedia=Object.fromEntries(Object.entries(slots).map(([id,[scope,scene,context]])=>[id,{scope:'assets/editorial/'+scope+'.webp',scene:'assets/editorial/'+scene+'.webp',context:'assets/pages/'+context+'.jpg',alt:{vergi:'Belge ve kayıtların incelendiği temsili çalışma',denetim:'Bir üretim sahasındaki temsili inceleme',danismanlik:'Yatırım seçeneklerini değerlendiren temsili ekip',insan:'İki profesyonel arasında temsili gelişim görüşmesi',veri:'Raporlama ve veri analizi üzerine temsili çalışma',akademi:'Profesyonel öğrenme üzerine temsili eğitim'}[scope]}]));
D.services.forEach(s=>{const m=D.editorialMedia[s.group];s.media={hero:'assets/'+s.image,scope:{image:m.scope,alt:m.alt},story:{images:[{image:m.scene,alt:'İşin farklı boyutlarına ilişkin temsili sahne'},{image:m.context,alt:s.title+' hizmet alanına ilişkin temsili sahne'}],video:null,poster:m.scene,kind:'scroll-photography',caption:'Temsili fotoğraf sekansı · yapay zekâ ile üretilmiştir'},preparation:{image:null}};});
const storyTitles={vergi:['Kayıtları anlayın.','Kararları netleştirin.'],denetim:['Sorudan kanıta.','Bütüne uzanan bakış.'],danismanlik:['Olasılıkları tartın.','Sonraki adımı görün.'],insan:['Sürecin merkezinde.','İnsana yakın.'],sistem:['Dağınık veriden.','Anlamlı bağlantılara.'],akademi:['Bilgiyi paylaşın.','Birlikte derinleştirin.']};
D.services.forEach(s=>{s.media.story.title=storyTitles[s.group];if(['ufrs-tfrs-raporlama','ufrs','kurumsal-raporlama','raporlama','mali-tablolarin-denetimi','finansal-tablo-denetimi'].includes(s.id)){s.media.scope={image:'assets/editorial/veri.webp',alt:'Finansal rapor ve verileri inceleyen temsili uzman'};s.media.story.images[0]={image:'assets/editorial/vergi.webp',alt:'Finansal kayıtların belge üzerinden temsili incelemesi'};s.media.story.images[1]={image:'assets/editorial/haber-raporlama.webp',alt:'Standartlar ve rapor dosyalarını temsil eden kitap ve büyüteç kompozisyonu'};s.media.story.title=['Kayıttan finansal resme.','Bağlantıları görün.'];}if(s.id==='sirket-kurulus-danismanligi'){s.media.scope={image:'assets/editorial/insan.webp',alt:'Yeni işin ihtiyaçlarını görüşen temsili profesyoneller'};s.media.story.images[0]={image:'assets/editorial/vergi.webp',alt:'Kuruluş belgelerinin temsili incelemesi'};s.media.story.title=['Bir fikirle başlar.','Sağlam adımlarla ilerler.'];}});

const sectorGroups={uretim:'denetim',ticaret:'danismanlik',teknoloji:'sistem',perakende:'vergi',insaat:'danismanlik',hizmet:'insan'};
D.sectors.forEach(s=>{const m=D.editorialMedia[sectorGroups[s.id]];s.media={scope:{image:m.scope,alt:m.alt},story:{images:[{image:m.scene,alt:s.title+' için temsili çalışma sahnesi'},{image:m.context,alt:s.title+' için temsili danışmanlık sahnesi'}],video:null,poster:m.scene,caption:'Temsili fotoğraf sekansı · yapay zekâ ile üretilmiştir'}};});
})();
