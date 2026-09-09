(() => {
  'use strict';
  const D=window.BORADEN;
  Object.assign(D.sources,{
    framework:['KGK — finansal raporlama ve bağımsız denetim sistemi','https://www.kgk.gov.tr/Portalv2Uploads/files/Duyurular/v2/20_Soruda_Ulkemizdeki_Finansal_Raporlama_ve_Bagimsiz_Denetim_Sistemi.pdf'],
    kdv:['GİB — KDV iadesinde ortak hususlar','https://cdn.gib.gov.tr/api/gibportal-file/file/getFileResources?objectKey=arsiv%2Fyardim-kaynaklar%2Fyararli-bilgiler%2Fkdv-iadesinde-ortak-husular.pdf'],
    tasdik:['TÜRMOB — tasdike ilişkin usul ve esaslar','https://www.turmob.org.tr/Arsiv/FCKEditor/userfiles/file/TURMOB-2023-YASA-YONETMELIK-MM/3.pdf']
  });
  const needs={
    'ic-denetim-ve-ic-kontrol':['İç kontrol düzeni kurulurken','Risk öncelikleri değişirken','Süreçler değerlendiriliyorken'],
    'suistimal-inceleme-ve-onleme':['Kontrol açıkları araştırılırken','Şüpheli işlemler incelenirken','Önleyici adımlar planlanırken'],
    'sgk-dosya-acilisi':['İlk çalışan istihdamında','Yeni işyeri açılırken','İşveren kaydı hazırlığında'],
    'ev-hizmetlisi-sgk-dosya-acilisi':['Ev hizmetlerinde istihdamda','Çalışma günleri belirlenirken','Bildirim koşulları incelenirken'],
    'sirket-degerlemesi':['Yeni ortak alırken','Pay devri görüşmesinde','Bir yatırım kararında'],
    'sirket-kurulus-danismanligi':['Yeni bir iş kurarken','Şirket türünü seçerken','İlk kayıt düzenini kurarken'],
    'insan-kaynaklari-ve-bordro':['Çalışan sayısı artarken','Bordroyu dış kaynağa taşırken','Veri ve onay akışını kurarken'],
    'mali-musavirlik-ve-muhasebe':['Belge akışı dağınıkken','Kapanışlar gecikirken','Beyan takvimini kurarken'],
    'diger-dolayli-vergiler':['Yeni bir işlem türünde','İstisna koşullarını incelerken','Fatura ve kayıt eşleşmesinde'],
    'bireysel-danismanlik-hizmetleri':['Birden çok geliriniz varken','Beyana hazırlanırken','Sınır ötesi gelir elde ederken'],
    'ar-ge-hizmetleri':['Ar-Ge kayıtlarını ayırırken','Teknokent faaliyetinde','Proje maliyetini izlerken'],
    'tam-tasdik-islemleri':['Yıllık beyana hazırlanırken','Vergisel riskleri incelerken','Tasdik kapsamını belirlerken'],
    'kdv-iade-islemleri':['İade hakkını değerlendirirken','İade listeleri hazırlanırken','Dosya eksikliklerini giderirken'],
    'kurumlar-vergisi-denetim-ve-tasdik':['Ticari kârdan matraha geçerken','İndirimleri değerlendirirken','Beyan eklerini hazırlarken'],
    'transfer-fiyatlandirma':['İlişkili taraf işlemlerinde','Yöntemi belgelendirirken','Emsal çalışması hazırlığında'],
    'cari-hesap-mutabakatlarinin-yapilmasi':['Açık bakiyeler birikirken','Dönem kapanışında','Karşılıklı kayıtlar farklıyken'],
    'otv-hizmetleri':['Ürün kapsamını belirlerken','Tecil-terkin sürecinde','Vergi dosyasını hazırlarken'],
    'bagimsiz-denetim':['Raporlama döneminde','Paydaşların güvence ihtiyacında','Denetim kapsamına hazırlanırken'],
    'kurumsal-raporlama':['Paydaş bilgi ihtiyacında','Gösterge tanımları farklıyken','Dönemleri karşılaştırırken'],
    'ufrs-tfrs-raporlama':['VUK kayıtlarından dönüşümde','Grup raporlaması hazırlığında','Tablo ve dipnot setinde'],
    'finansal-tablo-denetimi':['Finansal tablo seti hazırlanırken','Önemli tahminler incelenirken','Açıklamalar değerlendirilirken'],
    'mali-tablolarin-denetimi':['Kapanış kayıtlarını incelerken','Hesaplar tabloya aktarılırken','Mali bilgi tutarlılığında'],
    'usulsuzluk-ve-hile-denetimi':['Bir işlem şüphesi doğduğunda','Kayıt örüntüleri incelenirken','Kontrol zafiyeti araştırılırken'],
    'bordrolama':['Aylık ücret döneminde','Puantajlar birleştirilirken','Ücret icmali hazırlanırken'],
    'istihdam-tesvik':['İşyeri uygunluğu incelenirken','Yeni istihdam planında','Teşvik devam koşullarında'],
    'sgk-protokolu':['Protokol başvurusu öncesinde','İş göremezlik kayıtlarında','Ödeme ve mahsup kontrolünde'],
    'asgari-iscilik-ve-ilisiksizlik-belgesi':['Taahhüt işi tamamlanırken','İşçilik kayıtları incelenirken','İlişiksizlik dosyası hazırlığında'],
    'borclanma-islemleri':['Hizmet geçmişi incelenirken','Eksik dönem araştırılırken','Borçlanma başvurusu öncesinde'],
    'emeklilik-danismanligi':['Hizmet süreleri birleştirilirken','Başvuru zamanı araştırılırken','Farklı sigorta statülerinde'],
    'insan-kiymetleri-surec-yonetimi':['Görevler belirsizleşirken','İzin düzeni kurulurken','Çalışan süreçleri büyürken'],
    'yabanci-uyruklu-ikamet-izini':['İkamet amacı belirlenirken','Başvuru dosyası hazırlığında','Mevcut statü değişirken'],
    'calisma-izni-alma-ve-iptali':['Yabancı çalışan istihdamında','Uzatma hazırlığında','İzin süreci sona ererken'],
    'yurtdisina-isci-gonderimi':['Yeni bir ülkeye görevlendirmede','Sosyal güvenlik hazırlığında','Bildirim akışı belirlenirken'],
    'isveren-denetimi-ve-raporlamasi':['Personel kayıtları incelenirken','İşyeri uyum değerlendirmesinde','Bordro-bildirim farklarında'],
    'sgk-dosya-kapanisi':['Faaliyet sona ererken','Son bildirimler hazırlanırken','Dosya kapanışı planlanırken'],
    'ticaret-sicil-islemleri':['Temsil veya adres değişince','Sermaye işlemlerinde','Tescil ve ilan hazırlığında'],
    'raporlama':['Bütçe ile gerçekleşen ayrışınca','Karar verisi dağınıkken','Düzenli yönetim raporunda'],
    'yonetim-danismanligi':['Organizasyon büyürken','Karar yetkileri değişirken','Öncelikleri uygulamaya taşırken'],
    'mali-danismanlik':['Nakit akışı planlanırken','İşletme sermayesi ihtiyacında','Bütçe senaryolarında'],
    'muhasebe-sistemleri':['Yeni sistem kurarken','Kayıt düzeni değişirken','Kapanış akışını iyileştirirken'],
    'veri-analiz-sistemleri':['Veri farklı sistemlerdeyken','Göstergeler uyuşmadığında','Yönetim raporu tasarlarken'],
    'cozum-prosedurleri':['İş akışı kişilere bağlıyken','Onay adımları belirsizken','Kontrol düzeni kurarken'],
    'muhasebe-ve-vergi':['Yeni ekip yetiştirirken','Kayıt bilgisini güncellerken','Uygulama birliği ararken'],
    'ufrs':['Standartlara girişte','Dönüşüm ekibi hazırlanırken','Dipnot yaklaşımı öğrenilirken'],
    'finansal-analiz':['Tablo okuma becerisinde','Oranları yorumlarken','Bütçe bilgisi geliştirilirken'],
    'ic-denetim':['Denetim ekibi hazırlanırken','Risk yaklaşımı öğrenilirken','Bulgu yazımı geliştirilirken'],
    'insan-kiymetleri-egitimi':['İK ekibi gelişiminde','Özlük süreçleri öğrenilirken','Bordro bilgisi güncellenirken']
  };
  const detail={
    'sirket-degerlemesi':{
      seoTitle:'Şirket Değerleme Danışmanlığı ve Yöntemleri | Boraden',
      description:'Şirket değerleme danışmanlığı: ortaklık, pay devri ve yatırım kararlarında amaç, finansal analiz, yöntem ve senaryolar. Boraden ile kapsamı belirleyin.',
      definition:'Şirket değerlemesi, belirli bir tarih ve amaç için işletmenin veya paylarının değerini; seçilen değer esası, veri ve varsayımlarla birlikte değerlendiren çalışmadır.',
      explanation:'İndirgenmiş nakit akışı gelecekteki nakit beklentilerine, piyasa yaklaşımı karşılaştırılabilir işlemlere, varlık temelli yaklaşım ise varlık ve yükümlülüklerin değerine bakar. Uygun yaklaşım şirketin iş modeline ve erişilebilir veriye göre seçilir. Değerleme sonucuyla gerçekleşecek satış fiyatı aynı olmak zorunda değildir.',
      prepare:['Son dönem finansal tabloları ve hesap dökümleri','Borç, nakit ve işletme sermayesi bilgileri','İş planı, bütçe ve değerlemenin kullanılacağı karar'],
      output:'Amaç, yöntem, varsayım ve sınırları birlikte gösteren değerleme çerçevesi.',
      faqs:[['Şirket değeri nasıl hesaplanır?','Tek bir evrensel formül yoktur. Nakit akışı, piyasa karşılaştırmaları ve varlık temelli yaklaşımlar; iş modeli, değerleme amacı ve verinin niteliğine göre değerlendirilir.'],['Değerleme için hangi belgeler gerekir?','Finansal tablolar, borç ve nakit dökümleri, işletme sermayesi bilgileri, iş planı ve işlem amacı başlangıç belgeleridir. Ayrıntılı liste kapsam görüşmesinde belirlenir.'],['Şirket değerleme ücreti ve süresi nasıl belirlenir?','Şirketin yapısı, grup şirketleri, veri hazırlığı, yöntem ve rapor kullanım amacı birlikte değerlendirilir. Bu bilgileri görmeden sabit ücret veya teslim süresi taahhüt edilmez.'],['Değerleme raporu satış fiyatını garanti eder mi?','Hayır. Değerleme belirli varsayımlarla bir görüş üretir; pazarlık, işlem koşulları ve tarafların kararları gerçekleşen fiyatı etkileyebilir.']],diagram:'value'
    },
    'sirket-kurulus-danismanligi':{
      seoTitle:'Şirket Kuruluş Danışmanlığı: Yapı, Tescil ve Kayıt | Boraden',
      description:'Şirket kuruluş danışmanlığıyla şirket türü, ortaklık, MERSİS, ticaret sicili ve kuruluş sonrası mali işleyişi planlayın. Boraden İstanbul.',
      definition:'Şirket kuruluş danışmanlığı, iş modelinin şirket yapısına dönüşmesi için karar, belge, tescil ve ilk dönem kayıt ihtiyaçlarını birlikte planlar.',
      explanation:'Şirket türü seçimi; ortakların yönetim beklentisi, temsil düzeni, pay devri ve finansman planıyla birlikte ele alınır. Sicil işlemlerinden sonra ticari defter, vergi ve muhasebe sorumluluklarının da bir takvime bağlanması gerekir. Şirket türüne veya faaliyete özgü izinler ayrıca değerlendirilir.',
      prepare:['Faaliyet konusu, adres ve ortaklık planı','Ortakların ve temsilcilerin gerekli kimlik / yetki bilgileri','Sermaye, finansman ve ilk dönem çalışma planı'],
      output:'Kuruluş adımları ve ilk dönem sorumlulukları için açık bir hazırlık planı.',
      faqs:[['Limited şirket mi anonim şirket mi kurmalıyım?','Seçim yalnızca kuruluş maliyetine göre yapılmamalıdır. Ortaklık, temsil, pay devri, yönetim ve finansman beklentileri karşılaştırılmalıdır; her işletme için aynı yapı uygun değildir.'],['MERSİS işlemi bütün kuruluş sürecini tamamlar mı?','MERSİS ve ticaret sicili adımları sürecin bir bölümüdür. Gerekli izinler, vergi ve defter yükümlülükleri ile işveren kayıtları faaliyet ve şirket yapısına göre ayrıca planlanır.'],['2026’da elektronik ticari defter yönünden ne kontrol edilmeli?','1 Ocak 2026’dan itibaren tescil edilen şirketlerin pay defteri ile genel kurul toplantı ve müzakere defteri için ETDS kapsamı kontrol edilmelidir. Şirket türüne ve deftere ilişkin güncel düzenleme esas alınır.']],diagram:'formation'
    },
    'insan-kaynaklari-ve-bordro':{
      seoTitle:'İnsan Kaynakları, Bordro ve Dış Kaynak Hizmetleri | Boraden',
      description:'Bordro dış kaynak hizmetleri, puantaj, ücret kontrolü, özlük ve bildirim hazırlığı. İnsan kaynakları süreçlerinizi Boraden ile birlikte değerlendirin.',
      definition:'İnsan kaynakları ve bordro hizmetleri, çalışan verisinin dönemsel ücret hesabına, kontrollere ve ilgili bildirim hazırlığına tutarlı biçimde aktarılmasını ele alır.',
      explanation:'Dış kaynak bordro modelinde kimin veri hazırladığı, kimin kontrol ettiği ve kimin son onayı verdiği açıkça belirlenmelidir. Puantaj, ücret değişiklikleri, izin ve yan hakların teslim takvimi önemlidir. Çalışan verilerinin erişim yetkileri ile işverenin devam eden sorumlulukları görev kapsamında ayrıca tanımlanır.',
      prepare:['Çalışan sayısı, işyeri yapısı ve mevcut bordro akışı','Puantaj, ücret, yan hak ve kesinti kuralları','Veri teslimi, kontrol ve onay sorumluları'],
      output:'Dönemi, sorumluları ve kontrol adımları belli bir bordro çalışma düzeni.',
      faqs:[['Bordro dış kaynak hizmeti neyi kapsar?','Kapsam; veri toplama düzeni, bordro hesaplama ve kontrolü, raporlar ve bildirim hazırlığı gibi adımlardan oluşabilir. İşletmeye ait onay ve yasal sorumluluklar hizmet sözleşmesinde açıkça ayrıştırılmalıdır.'],['Brütten nete ücret neden aylara göre değişebilir?','Gelir vergisi tarifesi ve kümülatif matrah, ilgili ayın gelir vergisini etkileyebilir. SGK tavanı, istisna ve kişiye özgü kalemler de sonuçta rol oynar. Hesaplama merkezindeki araç standart çalışan varsayımlarıyla ön hesap sunar.'],['Çalışan verileri nasıl paylaşılmalı?','İhtiyaç duyulan veri, yetkili kişiler ve güvenli aktarım yöntemi belirlenmelidir. Özlük ve ücret dosyalarını genel iletişim formuna eklemek yerine çalışma kapsamında kararlaştırılan kanalı kullanın.']],diagram:'payroll'
    },
    'ufrs-tfrs-raporlama':{
      seoTitle:'UFRS / TFRS Raporlama ve Dönüşüm Danışmanlığı | Boraden',
      description:'UFRS/TFRS raporlama: uygun çerçeve, VUK kayıtlarından dönüşüm, finansal tablo ve dipnot hazırlığı. Boraden ile raporlama ihtiyacınızı netleştirin.',
      definition:'UFRS/TFRS raporlama çalışması, işletmenin finansal bilgisini uygulanabilir finansal raporlama çerçevesine göre hazırlama ve sunma ihtiyaçlarını ele alır.',
      explanation:'Vergi amacıyla tutulan kayıtlar ile genel amaçlı finansal raporlama aynı hedefe hizmet etmez. Bu nedenle başlangıçta işletmenin tabi olduğu çerçeve ve rapor kullanıcıları belirlenir. Muhasebe politikaları, ölçüm farklılıkları, sınıflamalar ve dipnotlar birlikte değerlendirilir. Her işletmenin zorunlu olarak TFRS uyguladığı varsayılmaz; BOBİ FRS ve diğer çerçevelerin kapsamı ayrıca kontrol edilir.',
      prepare:['Mizan, hesap dökümleri ve önceki finansal tablolar','Sözleşmeler, duran varlık, stok, alacak ve borç detayları','Grup raporlama talepleri, kapanış takvimi ve mevcut politikalar'],
      output:'İzlenebilir dönüşüm kayıtlarıyla bağlantılı finansal tablo ve açıklama hazırlığı.',
      sourceKeys:['framework','reporting'],
      faqs:[['UFRS ile TFRS aynı kavram mı?','UFRS, uluslararası finansal raporlama standartlarını ifade eder. Türkiye’de uygulanacak standartlar ve kapsam KGK düzenlemeleri üzerinden değerlendirilir. Çalışmada raporun hangi çerçeve ve amaçla hazırlanacağı açıkça belirtilmelidir.'],['VUK kayıtları doğrudan TFRS finansal tablosu olur mu?','Otomatik olarak aynı kabul edilmez. Ölçüm, sınıflama, muhasebe politikası ve açıklama farklılıkları işletmenin işlemleri üzerinden incelenir; gerekli dönüşüm çalışmaları belgelenir.'],['Bağımsız denetime tabi her işletme TFRS uygulamak zorunda mı?','Hayır. Zorunlu TFRS uygulama kapsamı ve diğer raporlama çerçeveleri ayrı değerlendirilir. BOBİ FRS uygulaması veya ihtiyari tercihler, güncel KGK düzenlemesi ve işletmenin durumuna göre kontrol edilmelidir.'],['Rapor hazırlama ile bağımsız denetim aynı hizmet mi?','Rapor hazırlama, finansal bilginin ilgili çerçevede derlenmesini; bağımsız denetim ise standartlar çerçevesinde denetim görüşü oluşturulmasını ele alır. Görevler ve bağımsızlık koşulları ayrı değerlendirilir.']],diagram:'reporting'
    },
    'bagimsiz-denetim':{
      seoTitle:'Bağımsız Denetim Hizmetleri | Boraden İstanbul',
      description:'Risk odaklı bağımsız denetim, finansal tablo incelemesi ve bulgu iletişimi. Boraden İstanbul ile denetim dönemi, çerçevesi ve kapsamını değerlendirin.',
      definition:'Bağımsız denetim, finansal tablolar hakkında denetim görüşü oluşturmak amacıyla ilgili standartlar uyarınca kanıt toplama ve değerlendirme çalışmasıdır.',
      explanation:'Çalışmanın başlangıcında işletmenin faaliyetleri, raporlama çerçevesi, önemli hesapları ve riskleri anlaşılır. Denetim makul güvence yaklaşımına dayanır; bütün işlemlerin tek tek kontrol edildiği veya her hatanın mutlaka tespit edileceği anlamına gelmez. Zorunlu denetim kapsamı ve seçim koşulları güncel düzenleme ve işletme özelinde incelenmelidir.',
      prepare:['Denetlenecek dönem ve finansal tablo seti','Muhasebe kayıtları, sözleşmeler ve iç kontrol bilgileri','Kapanış takvimi ve ilgili yönetim sorumluları'],
      output:'Uygulanabilir standartlar çerçevesinde denetim görüşü ve yönetimle bulgu iletişimi.',sourceKeys:['framework'],
      faqs:[['Bağımsız denetim ile vergi denetimi aynı mı?','Finansal tablo denetimi ile vergi beyanı / tasdik çalışmasının amaç ve çerçeveleri farklıdır. İhtiyaç, raporun kim tarafından hangi kararda kullanılacağına göre ayrıştırılır.'],['Şirketimizin denetime tabi olduğunu nasıl öğreniriz?','Güncel kapsam düzenlemeleri, ilgili listeler ve şirketin koşulları birlikte incelenir. Geçmiş yıl eşiklerine bakarak güncel yükümlülük sonucu çıkarılmamalıdır.'],['Denetim için ne zaman hazırlanmaya başlamalıyız?','Kayıt, kapanış ve belge sorumlularının dönem sonundan önce belirlenmesi hazırlığı kolaylaştırır. Çalışma takvimi raporlama dönemi ve kapsam görüşmesiyle netleştirilir.']],diagram:'audit'
    },
    'tam-tasdik-islemleri':{
      title:'Tam Tasdik ve Yeminli Mali Müşavirlik',seoTitle:'YMM Tam Tasdik ve Yeminli Mali Müşavirlik | Boraden',
      description:'Yeminli mali müşavirlik ve tam tasdik hizmeti: vergi beyanları, kayıt incelemesi, matrah ve rapor kapsamı. Boraden ile dönem hazırlığını planlayın.',
      definition:'Tam tasdik, yıllık gelir veya kurumlar vergisi beyannameleri ve ilgili mali tabloların vergi mevzuatı çerçevesindeki inceleme ve tasdik sürecidir.',
      explanation:'Ticari kayıtların beyannameye doğru taşınması, dönem içi tespitlerin paylaşılması ve gerekli belgelerin hazırlanması birlikte ele alınır. Tam tasdik, bağımsız finansal tablo denetiminin yerine geçmez. İndirim ve istisnalara özgü tasdik koşulları, ilgili dönemin düzenlemeleri üzerinden ayrıca değerlendirilmelidir.',
      prepare:['İlgili dönem mizanı ve mali tablolar','Beyanname, indirim ve istisna çalışma dosyaları','Önemli sözleşmeler ve karşıt inceleme belge akışı'],output:'Beyan ile kayıtlar arasındaki ilişkiyi ve tasdik kapsamını belgeleyen çalışma.',sourceKeys:['tasdik'],
      faqs:[['Tam tasdik yaptırmak her şirket için zorunlu mu?','Genel bir zorunluluk varsayımı yapılmamalıdır. Şirketin durumu, işlem türü ve yararlanılan uygulamalar bakımından tasdik koşulları ayrı incelenmelidir.'],['Tam tasdik vergi incelemesini engeller mi?','Tam tasdik, idarenin inceleme yetkisini ortadan kaldıran bir garanti olarak sunulamaz. Çalışmanın kapsamı ve sorumlulukları ilgili mevzuat ve sözleşmeyle belirlenir.'],['Tam tasdik ile KDV iade tasdiki aynı dosya mı?','Amaç ve kapsamları farklı olabilir. İade hakkı doğuran işlem ve ilgili düzenlemeler doğrultusunda ayrı belge ve rapor gereklilikleri değerlendirilir.']],diagram:'tax'
    },
    'kdv-iade-islemleri':{
      seoTitle:'KDV İade Danışmanlığı ve Dosya Hazırlığı | Boraden',
      description:'KDV iade işlemlerinde kapsam, yüklenim ve indirim listeleri, mutabakat ve dosya hazırlığı. İşleminize özgü iade sürecini Boraden ile değerlendirin.',
      definition:'KDV iade çalışması, iade hakkı doğuran işlemle ilgili tutar, kayıt ve belgelerin ilgili mevzuata göre değerlendirilmesini ve dosya hazırlığını ele alır.',
      explanation:'Her devreden KDV otomatik olarak iade hakkı oluşturmaz. İhracat, indirimli oran veya diğer iade hakkı doğuran işlemler kendi koşullarında incelenir. İade yolu, tutarı, gerekli listeler ve rapor koşulları somut işlem ve dönem üzerinden belirlenmelidir.',
      prepare:['İade hakkı doğuran işlem ve dönem bilgisi','İlgili satış, indirim ve yüklenim listeleri','Beyanname, fatura ve mutabakat çalışma dosyaları'],output:'İşlemle, kayıtlarla ve gerekli belgelerle ilişkilendirilmiş bir iade dosyası hazırlığı.',sourceKeys:['kdv'],
      faqs:[['Devreden KDV’nin tamamını geri alabilir miyim?','Devreden tutar tek başına iade hakkı anlamına gelmez. İade hakkı doğuran işlem ve buna ilişkin koşullar belirlenmeli; tutar ilgili düzenlemeye göre hesaplanmalıdır.'],['KDV iadesi için hangi belgeler gerekir?','Liste ve belgeler işlem türüne göre değişir. İade talebine konu dönem, beyannameler, satış ve alış kayıtları ile yüklenim hesapları başlangıçta incelenir.'],['KDV iadesi ne kadar sürer?','Dosyanın niteliği, eksiklikler, seçilen iade yolu ve idari inceleme süreci etkili olur. Sabit bir süre veya kesin iade sonucu taahhüt edilmez.']],diagram:'tax'
    },
    'veri-analiz-sistemleri':{definition:'Veri analiz sistemleri, farklı kaynaklardaki bilgiyi ortak tanımlar ve kontrol adımlarıyla yönetim kararlarında kullanılabilir hale getiren yapıdır.',explanation:'Bir göstergenin yararlı olması için kaynağı, hesaplama yöntemi, dönemi ve sorumlusu bilinmelidir. Önce verinin niteliği incelenir; sonra işletmenin ihtiyaç duyduğu rapor ve izleme düzeni tasarlanır.',prepare:['Mevcut sistemler ve veri kaynakları','Kullanılan rapor ve gösterge örnekleri','Karar soruları, dönemler ve erişim sorumluları'],output:'Kaynağı ve tanımı belli göstergeler için bir veri ve raporlama çerçevesi.',diagram:'data'},
    'muhasebe-sistemleri':{definition:'Muhasebe sistemi kurma çalışması, hesap planını, belge akışını ve dönem kapanışını işletmenin günlük işleyişiyle ilişkilendirir.',explanation:'Bir yazılım seçmek bu çalışmanın yalnızca bir parçası olabilir. Kimin hangi belgeyi ne zaman hazırladığı, kaydın nasıl kontrol edildiği ve kapanışta hangi mutabakatların yapıldığı da belirlenmelidir.',prepare:['Mevcut hesap planı ve sistem bilgisi','Belge akışı ve kapanış örnekleri','Görev dağılımı ve yönetim raporları'],output:'Belge, kayıt, kontrol ve raporlama adımları birbiriyle bağlantılı muhasebe düzeni.',diagram:'data'},
    'mali-danismanlik':{definition:'Mali danışmanlık, işletmenin nakit akışı, işletme sermayesi ve finansal planlama ihtiyaçlarını karar seçenekleriyle birlikte değerlendirir.',explanation:'Kârlı görünen bir faaliyet döneminde de nakit ihtiyacı oluşabilir. Tahsilat, ödeme, stok ve yatırım zamanlamasını birlikte görmek; finansman ihtiyacının nedenini anlamaya yardımcı olur. Çalışma, belgelendirilen varsayımlar ve alternatif senaryolar üzerinden ilerler.',prepare:['Finansal tablolar ve nakit akışları','Alacak, borç ve stok vadeleri','Bütçe, yatırım ve finansman beklentileri'],output:'Varsayımları açık bir mali değerlendirme ve karar çerçevesi.',diagram:'finance'},
    'yonetim-danismanligi':{definition:'Yönetim danışmanlığı, organizasyonun karar alma, planlama ve kontrol süreçlerini işletmenin hedefleriyle birlikte ele alır.',explanation:'Öncelikler, sorumlular ve takip göstergeleri aynı yapıda tanımlanır. Amaç, çok sayıda rapor üretmekten önce hangi kararın hangi bilgiyle, kim tarafından alınacağını açıklığa kavuşturmaktır.',prepare:['Organizasyon ve görev dağılımı','Mevcut plan, toplantı ve rapor düzeni','Öncelikli sorunlar ve hedeflenen kararlar'],output:'Hedef, sorumlu ve takip adımları belli bir çalışma yol haritası.',diagram:'management'}
  };
  for(const s of D.services){
    const extra=detail[s.id]||{};Object.assign(s,extra);
    s.needs=needs[s.id]||['İlgili dönem hazırlığında','Mevcut süreç değerlendirmesinde','Belge ve kontrol planlamasında'];
    s.definition ||= s.title+', '+s.scope.map(x=>x[0].toLocaleLowerCase('tr')).join(', ')+' başlıklarını birlikte ele alan bir çalışma alanıdır.';
    s.prepare ||= s.scope.map(([title,body])=>title+': '+body);
    s.output ||= s.scope.at(-1)[1];
    s.description ||= s.title+' kapsamında '+s.scope.map(x=>x[0].toLocaleLowerCase('tr')).join(', ')+'. Boraden ile işletmenize uygun çalışma kapsamını belirleyin.';
    s.seoTitle ||= s.title+' | Boraden';
    s.diagram ||= ({vergi:'tax',denetim:'audit',danismanlik:'management',insan:'flow',sistem:'data',akademi:'learning'})[s.group];
    s.faqs ||= [[s.title+' kapsamında ilk görüşmede neyi netleştiririz?',s.lead+' Öncelikle '+s.scope[0][0].toLocaleLowerCase('tr')+' başlığı ve çalışmanın kullanılacağı karar değerlendirilir.'],['Çalışmanın kapsamı ve takvimi nasıl belirlenir?',s.scope.map(x=>x[1]).join(' ')+' Veri hazırlığı ve ilgili dönem dikkate alınarak sorumlular ve takvim birlikte kararlaştırılır.']];
  }
  const education={
    'muhasebe-ve-vergi':'Muhasebe kayıtları, vergi uygulamaları ve beyan kontrolleri için kurumunuza uygun bir öğrenme çerçevesi.',
    ufrs:'Finansal tablo, muhasebe politikası ve dipnot yaklaşımını anlamak için kurumsal UFRS/TFRS eğitimi.',
    'finansal-analiz':'Finansal tabloları, oranları ve bütçe ilişkilerini birlikte okumaya yönelik bir eğitim başlığı.',
    'ic-denetim':'Risk değerlendirmesi, saha çalışması ve bulgu raporlaması etrafında iç denetim eğitimi.',
    'insan-kiymetleri-egitimi':'Özlük, ücret ve çalışan süreçlerini açık sorumluluklarla ele alan insan kaynakları eğitimi.'
  };
  for(const s of D.services.filter(s=>s.group==='akademi')){s.lead=education[s.id]||s.lead;s.definition=s.lead;s.description=s.lead+' İçerik ve planlama için Boraden ile görüşün.';}
})();
