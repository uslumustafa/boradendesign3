# Boraden — okunabilirlik, medya ve içerik değerlendirmesi

6 Eylül 2026. Yalnız izole tasarım prototipi; mevcut tasarım yönü ve sayfa sırası korunur.

## Tasarım kararı

1993 → mevcut logo → BORADEN → hero açılışı korunuyor. Yeni bir site kompozisyonu önerilmiyor. Manrope ve Instrument Serif birlikteliği korunuyor; sorun ağırlıklı olarak küçük destek metinlerinin boyutu, tonu ve bazı breakpoint kurallarıydı. Bağımsız, salt okunur tasarım incelemesi de aynı önceliği belirledi.

- “Boraden’i tanıyın”: 14 px, 600 ağırlık, koyu yeşil.
- Hikâye sekmeleri: masaüstü 15 px, mobil 14 px; bölüm işareti 13 px.
- Bölüm açıklamaları: masaüstü 17 px, mobil 16 px; opaklık 1, `#40584e`.
- Karar kartlarının açıklamaları: düzende 18 px, sabitlenen masaüstü sahnede 17 px; CTA 15 px. Koyu kartların açık metinleri korunur.
- Haber filtreleri, hizmet filtreleri, kategori ve alt bağlantıların okunabilirliği güçlendirildi. Sarı vurgu yerine mevcut yeşil/pastel sistemle uyumlu tonlar kullanıldı.
- Hizmetler menüsünde altı kategori fareyle önizlenir; tıklanan kategori yeşil kalır. Fare menüden ayrılınca tıklanan kategori geri gelir. Klavye seçimi de sabitlenir.

## Video ve görsel durumu

Mevcut gerçek toplantı videosu yalnız Hakkımızda sayfasında kullanılıyor: Pressmaster/Pexels kaynaklı temsili klip. Yeni veya Boraden'e ait çekim olarak sunulmuyor.

- Masaüstünde 22–48 px, mobilde 18 px dış boşluk; mevcut asimetrik köşe dili.
- Video görünürlüğü %64; üzerindeki metinler tam opak. Video ile poster üst üste karışmıyor.
- Mevcut varsayım: bölüm görünürken sessiz oynat, ekran dışında durdur. Kullanıcıya oynatma/scroll-scrub tercihi soruldu; yanıt gelmeden bu varsayım uygulandı. `data-video-mode="scroll"` seçeneği altyapıda var, bu turda kullanıcıya açık mod olarak etkinleştirilmedi veya tarayıcıda doğrulanmadı.
- Görünür videoyu durdurma düğmesi, genel hareket kapatma ve mobil/reduced-motion sabit görsel desteği var. Aynı anda yalnız en görünür uygun klip oynatılır.
- Hizmet ve sektörlerin fotoğraf anlatımları da çerçevelendi; bunlar gerçek video değildir. Sayfa içindeki farklı görseller korunur.

**Eksik:** Her sayfa/bölüm için ayrı gerçek video üretimi tamamlanmadı. Bağlı bir video üretim aracı yok. Üretim kuyruğu 99 sayfa ve mevcut medya alanlarına karşılık gelen 160 bölüm briefi olarak güncellendi; bunlar oynatılabilir dosyalar değildir. Yeni klipler gelmeden aynı toplantı videosu tüm sayfalara çoğaltılmamalı.

## İnceleme kapsamı ve belge önceliği

`BORADEN_PRODUCT_SPEC.md`, `BORADEN_REFERENCE.md`, araştırma raporu, motion incelemesi, medya lisansları, sayfa medyası QA ve Wagtail içerik sözleşmesi değerlendirildi. Legacy belge yalnız içerik kaynağıdır; sonraki kullanıcı tasarım kararları önceliklidir.

Bu turda iki sitenin ana sayfaları gerçek tarayıcıda; aşağıdaki ilgili alt sayfalar web içerikleri üzerinden tekrar incelendi. Bu, iki sitenin bütün sayfalarının yeniden tarandığı anlamına gelmez. Eski arşiv adres sayıları benzersiz içerik sayılarıyla karıştırılmamalıdır. Daha eski QA belgelerindeki 83 rota geçmiş durumdur; son build 99 sayfa, 96 indekslenebilir sayfa üretir.

## Referanslardan alınabilecek yapı

[Sistem Global ana sayfasında](https://sistemglobal.com.tr/) hizmet keşfi, popüler konu bağlantıları, servis grupları ve medya erişimi öne çıkıyor. Boraden için alınabilecek fikir, kullanıcıyı ihtiyacından uygun hizmete ulaştırmak; rakip ürünleri, sayısal iddiaları veya yapay zekâ danışmanı görünümünü kopyalamak değil.

[Şirket değerleme](https://sistemglobal.com.tr/servisler/vergi-finans/kurumsal-finansman/sirket-degerleme/) sayfasındaki ihtiyaç, süreç, hazırlık ve çıktı ayrımı yararlı. Boraden'de bunların karşılıkları zaten var; geliştirme, özgün hazırlık listesi ve teslim edilecek raporun kapsamını netleştirmek olmalı.

[Şirket kuruluşu](https://sistemglobal.com.tr/servisler/muhasebe-bordro/sirket-kurulusu-danismanligi/) ve [bordro yönetimi](https://sistemglobal.com.tr/servisler/muhasebe-bordro/outsource-bordro-yonetimi/) sayfaları hedef kitle, kapsam ve ilgili hizmet bağlantıları için incelendi. Yurt dışı kuruluş danışmanlığı, Boraden'in doğrulanmış hizmet kapsamına otomatik eklenmemeli. Vergi oranı, yasal süre veya kapsam garantisi bu karşılaştırmadan türetilmedi.

[Medya merkezi](https://sistemglobal.com.tr/medya/) farklı yayın türlerini ayrıştırıyor. Boraden için haber, blog ve sirküleri bir kaynak merkezinden keşfetmek; ileride gerçek içerik geldikçe rehber ve etkinlik eklemek uygun.

[Legacy Boraden](https://boraden.com.tr/index.html) hizmet ağı, iletişim, arşiv ve kurumsal bağlantılar için bilgi kaynağı. [Biz kimiz](https://boraden.com.tr/biz-kimiz), [ekip](https://boraden.com.tr/ekibimiz.html), [kariyer](https://boraden.com.tr/kariyer) ve [takvim](https://boraden.com.tr/takvim.html) sayfaları tekrar kontrol edildi. Takvimdeki 2020 belgesi güncel takvim olarak taşınmamalı. İsim, rol, personel sayısı ve sertifika iddiaları yayın öncesi şirketle güncellik açısından teyit edilmeli.

## Mevcut olanlar ve öncelikli eksikler

| Alan | Mevcut durum | Önerilen sonraki adım |
|---|---|---|
| Hizmetler | 47 hizmet, altı grup; üç zorunlu yeni hizmet dahil | Üç soruluk ihtiyaç seçici ve uygun hizmete yönlendirme. Yeni hizmet uydurmadan mevcut kapsamı keşfettir. |
| Hizmet detayları | Tanım, ihtiyaç, kapsam, hazırlık, sorular ve ilgili hizmetler | Değerleme, kuruluş ve bordro için özgün indirilebilir hazırlık notları; şirketçe onaylı teslimat kapsamı. |
| Kaynaklar | Blog, altı haber, 14 perspektif ve 247 PDF | Tek kaynak merkezi ve hizmet/haber/sirküler arasında arama. PDF tam metin araması ayrı backend işi. |
| Takvim | Güncel resmî takvime bağlantı veren haber var | Kaynağı ve kontrol tarihi görünen yaklaşan tarihler modülü; eski tarihleri güncelmiş gibi göstermeme. |
| Kurumsal güven | 1993 hikâyesi ve yaklaşım içeriği | Güncel ekip portreleri, uzmanlık ve onaylı yazar bilgileri. Başka kurum logolarını müşteri/iş ortaklığı gibi sunmama. |
| Başarı hikâyeleri | Temsili çalışma senaryoları; gerçek vaka eksik | İzinli gerçek vaka: sorun → yaklaşım → kanıtlanabilir sonuç. İsim ve sonuç verileri müşteriden gelmeli. |
| Yayın yönetimi | Yerel Studio ve Wagtail içerik sözleşmesi | Tarihli yayın, önizleme, planlama, taslak/onay, görsel kredisi ve ilgili hizmet ilişkileri. Canlı Wagtail henüz yok. |
| İletişim/kariyer | Ön yüz ve e-posta yönlendirmeleri | Güvenilir form teslimi, spam koruması, onay metinleri ve CV işleme akışı backend aşamasında. |
| Diller | Türkçe içerik | İngilizce kapsamı ve şirketçe onaylı çeviri süreci; boş dil düğmesi eklememe. |

Duyuruların boş olması kullanıcının kararıdır. Bu alan sahte duyurularla doldurulmaz. Blog içerikleri rakipten kopyalanmaz. Daha fazla içerik eklemek tek başına premium algı yaratmaz: önce okunabilirlik, sayfaya uygun medya ve güvenilir hizmet çıktıları.

## Wagtail medya aktarımı

Mevcut `wagtail-content-contract.md` temel alınmalı. Sıralanabilir medya bloklarında ayrı hero/scope/story dosyaları, gerçek video, poster, alt metin, kaynak/lisans, dış boşluk, görünürlük, oynatma modu ve mobil sabit alternatif saklanmalı. Aynı görseli bir sayfanın bütün bölümlerine bağlayan tek alan yeterli değil. Yeni backend kodu bu görevde yazılmadı.

## Bu turdaki doğrulama

- Build: 99 sayfa, 96 indekslenebilir sayfa, 247 belge.
- SEO/rota/asset testleri: 8/8; sayfa medyası testleri: 3/3.
- Gerçek tarayıcı: 1440×960, 1019×778 ve 390×844; seçilen hikâye, karar kartı, Hakkımızda ve hizmet medya alanlarında yatay taşma yok. Karar kartlarının CTA'ları metin kutusu içinde. Bu turda her sayfanın her breakpoint'i yeniden görsel olarak taranmadı.
- Altı menü kategorisinde hover önizlemesi, yeşil seçili durum ve menüden ayrılınca sabit seçime dönüş doğrulandı.
- Gerçek video süresi ilerliyor; yerel durdurma ve genel hareket durdurma çalışıyor. Genel durdurmada posterin görünmeme hatası tespit edilip düzeltildi. Ekran dışındaki video duruyor; mobilde video gizli ve poster görünür. Kontrol edilen video sayfasında tarayıcı hata kaydı yok.
- Yeni paket, Gemini çağrısı, production uygulama değişikliği veya commit yok.

## Ek kontrol — ortak bileşenler ve video aktarımı

- Gerçek tarayıcıda arşiv tarihleri 11 px; hesaplama açıklamaları ve kaynak bağlantıları 12–13 px bulundu. Tarihler ve etiketler 14 px, hesaplama açıklamaları ve kaynak bağlantıları 15 px yapıldı. Sonuç tablosu 14 px. Hesaplama mantığı veya mevzuat verileri değiştirilmedi.
- Arşiv ve hesaplama düzenleri 320 px mobilde yatay taşma oluşturmuyor; arşiv tarihleri 14 px olarak doğrulandı. Hesaplama açıklaması/sonucu 390 px mobilde görsel olarak incelendi; tablo sonuç kutusunun içinde kalıyor.
- Hizmet/ sektör medya şablonundaki isteğe bağlı video artık tek `section-video.js` denetleyicisine bağlı. Eski fotoğraf kaydırma kodunun videoya ayrıca seek uygulaması kaldırıldı. Klip yokken 53 hizmet/sektör sahnesi fotoğraf alternatifi olarak kalıyor.
- Yayınlanmayan bellek içi bir şablon örneğiyle isteğe bağlı video, durdurma düğmesi, kaynak etiketi, poster etiketi ve oynatma modu kontrol edildi. Gerçek hizmet klipleri olmadığı için bu dalın yeni kliplerle tarayıcı kabulü hâlâ yapılmalı.
- Üretim kuyruğu: 99 rota manifest ile birebir eşleşiyor; 160 bölüm briefi var. Toplam 259 hedef yolu benzersiz ve bütün referans görselleri mevcut. Üretilmiş özgün video sayısı **0**. Video üretim servisi bilgisi kullanıcıdan bekleniyor.
