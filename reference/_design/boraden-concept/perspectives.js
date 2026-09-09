/* Original Turkish editorial pages. Source summaries and editorial applications are distinguished. */
(() => {
  'use strict';
  const D = window.BORADEN;
  const entries = [
    {
      id:'warren-buffett-deger-ve-fiyat', person:'Warren Buffett', image:'buffett', topic:'DEĞER & UZUN VADE',
      title:'Fiyatı görmek. Değeri anlamak.',
      summary:'Warren Buffett’ın 1989 mektubundan, şirket değerlemesinde daha iyi sorular sormaya uzanan bir okuma.',
      intro:'Bir fiyat teklifini görmek kolaydır. O teklifin dayandığı işletmeyi, nakit üretme kapasitesini ve belirsizlikleri anlamak ise daha dikkatli bir bakış ister.',
      bio:'Berkshire Hathaway’in 1989 hissedar mektubunun yazarı Warren Buffett, bu metinde işletmenin ekonomik değeriyle kayıtlı değeri arasındaki ayrımı ele alıyor.',
      quote:'Harika bir şirketi makul bir fiyata almak, makul bir şirketi harika bir fiyata almaktan çok daha iyidir.',
      quoteLabel:'1989 hissedar mektubundan kısa Türkçe çeviri',
      sourceTitle:'Berkshire Hathaway · 1989 hissedar mektubu', source:'https://www.berkshirehathaway.com/letters/1989.html',
      sourceSummary:'Mektup, bir işletmeyi değerlendirirken bilançodaki tutarın tek başına yeterli olmadığını anlatır. Gelecekteki nakit giriş ve çıkışlarıyla işletmenin ekonomik özellikleri birlikte düşünülür. Buffett, geçmişteki yüksek büyüme hızının gelecekte aynı ölçüde sürmeyebileceğini de açıkça belirtir.',
      sections:[
        ['İşletmeniz için hangi soruya dönüşür?','Bir ortaklık görüşmesinde ilk soru, teklif edilen tutarın hangi pay ve hakları kapsadığıdır. Şirketin faaliyetleri, finansmanı ve işlem yapısı aynı hesapta karıştırılırsa aynı rakama farklı anlamlar yüklenebilir. Bu nedenle önce değerleme tarihi, amaç ve pay kapsamı yazılı hale getirilmelidir.'],
        ['Rakamın arkasını görün','Son dönem finansal tabloları ile iş planı arasında bir bağ arayın. Satış beklentisi hangi müşterilere, maliyet öngörüsü hangi sözleşmelere, yatırım ihtiyacı hangi kapasiteye dayanıyor? Bir varsayımın kaynağını gösterebilmek, yalnızca ayrıntılı bir hesap tablosu hazırlamaktan daha işe yarar bir başlangıçtır.'],
        ['Tek sonuç yerine açıklanabilir çerçeve','Sonuç değiştiğinde hangi varsayımın etkili olduğunu görebilmek gerekir. Borç, nakit, işletme sermayesi ve faaliyet dışı kalemlerin nasıl ele alındığını açıkça sormak; değerleme görüşüyle pazarlık sonucunu birbirinden ayırmaya yardımcı olur.']
      ],
      takeaway:'Bir rakamı tartışmadan önce, o rakamın hangi soruya cevap verdiğini netleştirin.',
      questions:['Değerleme hangi tarih ve işlem için yapılıyor?','Varsayımlar hangi veriyle destekleniyor?','Şirket değeri ile pay değeri nasıl ilişkilendiriliyor?'],
      service:'sirket-degerlemesi', diagram:'value', readMinutes:4
    },
    {
      id:'daniel-kahneman-karar-ve-belirsizlik', person:'Daniel Kahneman', image:'kahneman', topic:'KARAR & BELİRSİZLİK',
      title:'İyi karar, iyi bir soruyla başlar.',
      summary:'Daniel Kahneman’ın karar verme çalışmalarından, yönetim toplantılarında varsayımları görünür kılmaya uzanan Türkçe bir perspektif.',
      intro:'Aynı tabloya bakan iki kişi farklı sonuçlara ulaşabilir. Verinin yanında, o veriyi nasıl seçtiğimiz ve nasıl yorumladığımız da kararın parçasıdır.',
      bio:'Psikolog Daniel Kahneman, belirsizlik altında yargı ve karar verme üzerine çalışmalarıyla 2002 ekonomi bilimleri ödülünü Vernon L. Smith ile paylaştı.',
      quote:'İnsan yargısı, olasılığın temel ilkelerinden sistematik biçimde uzaklaşan kestirme yollar kullanabilir.',
      quoteLabel:'2002 ödül duyurusundaki açıklamadan kısa Türkçe çeviri; Kahneman’ın doğrudan sözü değildir',
      sourceTitle:'NobelPrize.org · 2002 ekonomi bilimleri ödül duyurusu',source:'https://www.nobelprize.org/prizes/economic-sciences/2002/press-release/',
      sourceSummary:'Ödül duyurusu, Kahneman’ın psikoloji ile ekonomik karar verme arasındaki ilişkiye katkısını açıklar. Belirsizlik altındaki yargılarda kullanılan zihinsel kestirmeler, her zaman standart ekonomik modellerin öngördüğü sonuçlara götürmez. Metin, deneysel ekonomi çalışmalarıyla ödülü paylaşan Vernon L. Smith’in katkısını ayrıca ele alır.',
      sections:[
        ['Toplantıya bir sonuçla değil, bir çerçeveyle gelin','Yönetim raporunu hazırlarken karar verilecek konuyu ilk sayfada yazmak işe yarar. “Satışlar arttı” bilgisi ile “Yeni kapasiteye yatırım yapmalı mıyız?” sorusu aynı şey değildir. Kararın gerektirdiği veri, dönem ve alternatifler baştan belirlenirse toplantının odağı daha kolay korunur.'],
        ['Varsayımı, gözlemden ayırın','Gerçekleşen satış, tahmin edilen satış ve hedeflenen satış raporda ayrı gösterilmelidir. Bir yönetici tahmini veri gibi okursa, hesapların doğru olması tek başına yeterli olmaz. Kaynak ve tarih etiketleri, bu ayrımı görünür kılmanın basit yollarıdır.'],
        ['Karşı görüş için yer açın','Karar notuna “Hangi bilgi bu görüşümüzü değiştirirdi?” sorusunu eklemek, alternatiflerin konuşulmasına alan açar. Bu bir başarı garantisi veya bilimsel ölçüm iddiası değildir; farklı ekiplerin aynı veriyi tartışabilmesi için önerilen bir çalışma alışkanlığıdır.']
      ],
      takeaway:'Gözlem, varsayım ve kararı aynı sütuna yazmayın.',
      questions:['Neyi biliyoruz?','Neyi varsayıyoruz?','Hangi yeni bilgi kararımızı değiştirir?'],
      service:'yonetim-danismanligi',diagram:'decision',readMinutes:4
    },
    {
      id:'richard-thaler-insan-ve-sistem',person:'Richard Thaler',image:'thaler',topic:'İNSAN & DAVRANIŞ',
      title:'Sistemi insanla birlikte düşünün.',
      summary:'Richard Thaler’ın davranışsal ekonomi çalışmalarından, daha anlaşılır iş akışları tasarlamaya uzanan Türkçe bir okuma.',
      intro:'Bir sürecin kâğıt üzerinde doğru olması, günlük hayatta kolay uygulanacağı anlamına gelmez. İyi bir işleyiş, insanların karar verirken karşılaştığı koşulları da dikkate alır.',
      bio:'Richard H. Thaler, davranışsal ekonomiye katkıları nedeniyle 2017 ekonomi bilimleri ödülüne layık görüldü.',
      quote:'Richard Thaler, ekonomik karar verme analizlerine psikolojik açıdan gerçekçi varsayımlar kattı.',
      quoteLabel:'2017 ödül duyurusundaki açıklamadan kısa Türkçe çeviri; Thaler’ın doğrudan sözü değildir',
      sourceTitle:'NobelPrize.org · 2017 ekonomi bilimleri ödül duyurusu',source:'https://www.nobelprize.org/prizes/economic-sciences/2017/press-release/',
      sourceSummary:'Ödül duyurusunda sınırlı rasyonellik, sosyal tercihler ve öz denetim gibi insani özelliklerin ekonomik kararlara etkisi anlatılır. Zihinsel muhasebe, insanların kararları bütün etkileri yerine ayrı hesaplar içinde değerlendirmesini açıklayan katkılarından biridir.',
      sections:[
        ['Sorumluluğu görünür hale getirin','Bir bordro döngüsünde veriyi hazırlayan, kontrol eden ve onaylayan kişinin belli olması gerekir. “İnsan kaynakları gönderir” gibi genel bir ifade yerine sorumlu rol, teslim tarihi ve gerekli belgeyi birlikte tanımlamak, işin nerede beklediğini görmeyi kolaylaştırır.'],
        ['Doğru adımı anlaşılır kılın','Bir onay ekranında hangi dönemin incelendiği, nelerin değiştiği ve sonraki adımın ne olduğu açık olmalıdır. Bu yaklaşım, kişiyi farkında olmadığı bir seçime yönlendirmek için kullanılmamalıdır. Amaç, bilgiye dayalı ve izlenebilir bir karar ortamı oluşturmaktır.'],
        ['Süreci yalnızca hızla ölçmeyin','İşin ne kadar sürede tamamlandığına ek olarak geri dönen kayıtları, eksik verinin nedenini ve tekrar yapılan kontrolleri de izleyebilirsiniz. Burada önerilen göstergeler Boraden’e ait performans verisi değildir; işletmenizin kendi başlangıç ölçümünü tasarlaması için örnek bir çerçevedir.']
      ],
      takeaway:'Bir süreci tasarlarken yalnızca adımları değil, o adımları uygulayan insanı da düşünün.',
      questions:['Bir sonraki adım açık mı?','Kimin onay vereceği belli mi?','Hata veya eksik bilgi geri bildirimi anlaşılır mı?'],
      service:'insan-kaynaklari-ve-bordro',diagram:'flow',readMinutes:4
    }
  ];
  D.perspectives=entries.map(p=>({...p,date:'2026-09-06',credit:D.thinkers.find(t=>t.image===p.image)}));
  D.thinkers.forEach((t,i)=>{t.perspective=entries[i].id;t.kind='Türkçe kaynak özeti ve Boraden yorumu';});
  D.thinkers[0].quote='Şirketin fiyatından önce, o fiyatın arkasındaki işin niteliğine ve değerine bakın.';
})();
