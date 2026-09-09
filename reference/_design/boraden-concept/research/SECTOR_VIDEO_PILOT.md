# Boraden — Sektörel Bakış video pilotu

## Onaylanan yön

Kullanıcı: dışarıdan tesise yaklaşan, ofise giren, ardından depo, muhasebe ve toplantı süreçlerini gösteren bir kamera yolculuğu. Mevcut tasarım, metinler ve sayfa sırası korunacak. Tam akış ayrı kısa çekimlerle kurulacak.

İlk pilot: **tek 8 saniyelik, 16:9, 1080p “tesise yaklaşma → ofise giriş” klibi.** Önce bu geçişin görsel kalitesi değerlendirilecek. Bu onay toplu/otomatik tekrar üretim yetkisi olarak kullanılmayacak.

## Bağlantı

- Mevcut Gemini API kimlik bilgisi: yalnız `node --env-file=.gemini/.env` ile yüklenir; dosya okunmaz, içerik/anahtar loglanmaz.
- Gemini implementation worker ve CLI çalıştırılmaz. Video modeli ayrı bir üretim akışıdır.
- Hedef model: `veo-3.1-generate-preview`, bir çıktı, 8 saniye, 1080p.
- Google AI Pro'nun Flow/Gemini kullanım hakları ve API faturalandırması ayrı doğrulanır. Model metadata erişimi tek başına üretim kotasını kanıtlamaz.
- API yolu kullanılırsa yalnız bir üretim gönderimi; başarısızlıkta otomatik tekrar yok. Bir başarılı 8 saniyelik Standard üretimin listelenen bedeli 3,20 USD; ek üretimler bu pilotta başlatılmaz.

## Kareler

- Başlangıç: `assets/enterprise-landscape.jpg` — sayfadaki yazısız orijinal tesis manzarası.
- Bitiş: aynı endüstriyel yerleşkenin alçak ofis ekinde, açık girişin hemen içinden görülen sade ve gerçekçi çalışma alanı. Yeni bir gökdelen, lüks otel veya farklı tesis yaratılmamalı.
- Başlıklar/CTA video dosyasına gömülmez. Görsel ve video temsili; Boraden'in gerçek mülkü veya çalışanı olarak sunulmaz.

## Üretim promptu

Create one coherent 8-second cinematic shot for a professional advisory firm's website. Use the supplied first frame as the exact opening industrial campus and the supplied last frame as the destination office interior. An aerial camera advances and descends toward the low two-storey office annex at the front-right corner of the warehouse, follows its facade, and enters through an already open doorway. Maintain recognizable warehouse roof geometry, facade materials, the direction of the late-afternoon daylight, and a restrained sage/ivory/charcoal color grade. A controlled forward movement begins briskly and eases smoothly into the interior; the sense is a physical camera travelling through a real place. Keep buildings rigid, horizons stable and perspective coherent. No passing through solid glass, walls or roofs; no melting architecture, teleporting, surreal morphing, random cuts or excessive speed blur. End just inside the understated office with natural working materials, ready for a later separate accounting/meeting shot. Anonymous illustrative environment. No logos, no added signage or captions, no readable personal or financial information. No spoken dialogue or music is needed; the web delivery will be silent. Output 16:9, 1080p, eight seconds.

## Kabul kriterleri

1. Gerçek video dosyası; sabit görselin pan/zoom kaydı değil.
2. İlk kare mevcut tesisle, son kare onaylanan ofis referansıyla tutarlı.
3. Bina/kapı/masa geometrisinde belirgin erime veya duvar içinden geçme yok.
4. Kamera yönü ve ışık tutarlı; video üzerinde web metni yok.
5. Klip önce araştırma/önizleme alanında incelenir. Başarısız video sessizce ana sayfaya alınmaz.
6. Entegrasyonda padding, tam opak metin, kaydırmaya bağlı ileri/geri oynatma, mobil/reduced-motion sabit alternatif korunur.

## Sonraki çekimler

Depo ve stok akışı → belge/muhasebe incelemesi → değerlendirme toplantısı. Her biri ayrı kamera konumu ve doğal insan/iş hareketi içerecek; ilk pilot kalite kontrolünden sonra planlanacak.

## Kaynaklar

- https://ai.google.dev/gemini-api/docs/veo
- https://ai.google.dev/gemini-api/docs/pricing#veo-3.1
- https://support.google.com/googleone/answer/14534406

## Durum

2026-09-06: Google AI Pro hesabıyla Flow üzerinden tek pilot başlatıldı. UI'da Veo 3.1 Quality, 16:9 ve tek çıktı seçildi; 8 saniye ve ilk/son kare kontrolü üretim isteğinde belirtildi. Flow'un **1 video / 100 kredi** onayı kabul edildi. Sonuç henüz kalite kontrolünden geçmedi; ana sayfaya eklenmedi.

- Proje: https://flow.google.com/project/3500d74c-1576-4b1a-b47a-e86cd2acfd26
- Yüklenen başlangıç karesi: `assets/enterprise-landscape.jpg`.
- Yüklenen bitiş karesi: `research/sector-video-pilot/office-end-frame.png`; bu pilot için Imagegen ile üretilmiş temsili ofis.
- Gemini API'de yalnız model metadata kontrolü yapıldı; API video üretimi veya Gemini implementation worker çalıştırılmadı.
- Ek klip, varyasyon veya otomatik yeniden deneme başlatılmadı.

## Pilot sonucu

- Flow'da tek video başarıyla oluştu; oynatıcı süresi **8 saniye**, indirme menüsündeki orijinal çözünürlük **720p**. 1080p hedefi henüz sağlanmadı; menüde ayrı upscale seçeneği var ve başlatılmadı.
- Önizleme: https://flow.google.com/project/3500d74c-1576-4b1a-b47a-e86cd2acfd26/edit/79be03b4-4183-4293-9d9b-195fc4ee27f4
- Tarayıcıda başlangıç, yaklaşık 3, 4.5, 5.5 ve 8. saniye kareleri incelendi. Tesis yaklaşması, açık kapı ve ofise varış oluşmuş; başlangıç ve bitiş referansları tanınabilir. Dış kapının kotu/cephe geometrisi hâlâ sanat yönetimi incelemesi gerektiriyor; nihai yayın onayı verilmedi.
- Flow sahne dışa aktarımı ve orijinal indirme işlemleri yerel dosya sonucu vermedi. Görünür video için desteklenen tarayıcı asset export işlemi de `Failed to fetch` ile sonuçlandı. Yerel MP4 teslimi doğrulanamadı.
- Ana sayfa değiştirilmedi; scroll entegrasyonu yapılmadı. Video pilotu Flow'da korunuyor. Depo, muhasebe ve toplantı devam klipleri üretilmedi.

## Kullanıcı revizyonu — mimari süreklilik ve yaşayan ofis

İlk pilot kullanıcı tarafından reddedildi: yaklaşırken bina değişiyor. Kullanıcı ayrıca içeride daha uzun kamera gezintisi ve insanların görünmesini istiyor. Bu karar önceki pilotun yayın değerlendirmesinin yerine geçer; ilk pilot sitede kullanılmayacak.

### Yeni çekim planı

İki ayrı 8 saniyelik çekim; kurgu sonrası yaklaşık 14–16 saniye. Tek üretimde dış cepheden farklı bir iç mekân bitiş karesine zorunlu dönüşüm istenmeyecek. Bu yöntem hata riskini azaltmayı amaçlar; mimari sadakati garanti etmez.

1. **Dış yaklaşma / 8 saniye:** Yalnız orijinal tesis görselinden hareket. Mevcut ofis ekine ölçülü yaklaşma; aynı çatı, kat sayısı, pencere ritmi, cephe ve giriş konumu korunacak. Olmayan bir kapı oluşturulmayacak; görünmeyen girişin içinden geçme zorlanmayacak. Son bölümde mevcut bir cephe dikmesi kadrajı örter; iç çekime örtülme üzerinden kurgu yapılabilir.
2. **Ofiste dolaşma / 8 saniye:** Mevcut temsili ofis referansıyla göz hizasında yavaş kamera hareketi. İlk 3 saniye koridorda ilerleme, sonraki 3 saniye belgeleri birlikte değerlendiren iki çalışan ve bilgisayarda çalışan üçüncü kişi, son 2 saniye cam bölmenin ardındaki küçük toplantıya doğru yumuşak yönelme. Aynı oda düzeni korunur; insanlarda küçük ve doğal hareketler. Sahne kapasitesi yetmezse yeni odalara dönüşmek yerine aynı çalışma alanındaki insanlara odaklanılır.

### Çekim A — hazır üretim promptu

Generate exactly one 8-second 16:9 video using the supplied original industrial campus image as the opening frame. Architecture preservation is the highest priority. Make a restrained, physically plausible forward and descending camera move toward the existing low office annex at the front-right of the nearest warehouse. Preserve the exact roof silhouettes, number of storeys, window spacing, facade panels, road and parking arrangement throughout. Do not redesign, add, remove or morph any building, door or window. Do not use an interior image as the last frame. Do not enter the building or invent an entrance. End near the existing facade with a real facade pillar progressively occluding the view for an editorial cut to a separately filmed interior. Stable perspective, natural late-afternoon light, restrained sage and charcoal grade. No captions, branding or readable private data. No dialogue or music. If the proposed camera travel requires inventing unseen geometry, reduce the travel distance. One output, no retries.

### Çekim B — hazır üretim promptu

Generate exactly one 8-second 16:9 cinematic office shot using the supplied office reference as the opening environment. The camera begins just inside the office and travels slowly at human eye level along the existing aisle. Preserve the room dimensions, windows, desks and partition layout without transformations. During seconds 0–3 establish the workspace; during seconds 3–6 gently reveal two anonymous adult colleagues reviewing paperwork together and a third colleague working at a monitor; during seconds 6–8 ease toward a small discussion visible through an existing glass partition, only if the reference layout supports it. Otherwise stay with the established workers in the same room. Natural restrained gestures and believable anatomy, no exaggerated acting, duplicated people or people appearing from nowhere. Keep people clearly visible in the middle distance. No room morphing, impossible wall crossings, whip pans, sudden cuts or abrupt camera turns. Consistent daylight, sage/ivory/charcoal tones, professional everyday office atmosphere. Documents and screens must contain no legible text or personal or financial information. No logos, captions, dialogue or music. This is an illustrative fictional workplace, not footage of Boraden staff. One output, no retries.

### Revizyon kontrolü ve üretim sınırı

- Dış çekim, referansla başlangıç/orta/son karelerde karşılaştırılacak; bina değişirse yayınlanmayacak.
- İç çekimde insanların gerçekten hareket ettiği ve kamera ilerledikçe yeni bir bakış açısı oluştuğu doğrulanacak.
- Kurgu geçişi açıkça bir çekim bağlantısı olarak hazırlanabilir; kesintisiz fiziksel geçiş gibi hatalı bir dönüşüm kullanılmayacak.
- Yeni öneri: Flow Veo 3.1 Quality, iki çıktı için toplam **en fazla 200 kredi**.

### Mevcut krediyle devam yetkisi

Kullanıcı, mevcut haklar dahilinde devam edilmesini; ek ücret istenirse durulmasını istedi. Flow hesap panelinde **950 kredi** görüldü. İki revizyon çekimi bu bakiyeden, toplam en fazla 200 krediyle hazırlanacak. Ek kredi satın alma, abonelik yükseltme ve ücretli API üretimi yapılmayacak. Her çekim maliyeti onay ekranında kontrol edilecek; bu çalışma tüm bakiyeyi tüketme talimatı olarak yorumlanmayacak.

### Revizyon A/B çalışma kaydı

- A: 100 kredi onayıyla üretildi. Önizleme: https://flow.google.com/project/3500d74c-1576-4b1a-b47a-e86cd2acfd26/edit/0ca4ef23-baef-4ebe-8fc6-3234e7d510b3
- A görsel kontrolü: 0, yaklaşık 4, 6 ve 8. saniyelerde incelendi. Genel bina kütlesi korunmaya çalışılsa da yakınlaşmada pencere ve cephe ayrıntıları değişiyor. **Mimari süreklilik kriteri geçmedi; sitede kullanılmayacak.**
- B: ilk deneme Flow ekranında `Audio generation failed` ile başarısız oldu. Aynı ekran kredi alınmadığını belirtiyor. Başarısız sahne: https://flow.google.com/project/3500d74c-1576-4b1a-b47a-e86cd2acfd26/edit/9235d8e2-f085-4634-b92a-0734f25be90f
- B için sessiz çıktı/kurtarma seçeneği araştırıldı. Mevcut video kurtarılamadı. Kullanıcının mevcut kredilerle devam yetkisi kapsamında yalnız B için bir kontrollü yeniden deneme 100 kredi onayıyla başlatıldı. Güvenlik filtreleri değiştirilmedi; satın alma veya plan yükseltme yapılmadı. Başarısız B denemesinin ücretlendirilmediği bildirildiği için iki ücretlendirilebilir çıktı için 200 kredi sınırı korunuyor.
- B yeniden denemesi de aynı `Audio generation failed` hatasıyla sonuçlandı; bu kartta da kredi alınmadığı yazıyor. Üçüncü B denemesi başlatılmadı.
- Son hesap paneli: **850 Flow kredisi**. Bu revizyon çalışmasında görünen bakiye 950 → 850; net 100 kredi azalma. Ek ödeme, kredi satın alma, abonelik yükseltme veya API üretimi yok.
- Google'ın resmi açıklaması ses üretimi hatasında video oluşmayabileceğini ve kredilerin iade edildiğini belirtiyor: https://support.google.com/flow/answer/16353333
- Sonuç: ücret engeli yok; dış çekimde mimari tutarlılık, iç çekimde Flow ses üretim hatası engeli var. İki revizyon da siteye eklenmedi. Sadece aynı isteği yeniden göndererek devam edilmeyecek.

## Doğrudan Gemini uygulaması denemesi

Kullanıcı Flow yerine doğrudan Gemini'den üretim istedi. Mevcut Google hesabıyla `https://gemini.google.com/videos` açıldı. Arayüzde video aracı **Gemini Omni**, sohbet modu **Flash**, en-boy oranı **16:9** olarak görünüyor; bu deneme Veo 3.1 Quality veya Gemini implementation worker çalıştırması olarak raporlanmayacak.

`office-end-frame.png` referansıyla tek 8 saniyelik ofis içi kamera gezintisi istendi: aynı mekân içinde belgeleri birlikte inceleyen iki yetişkin çalışan ve bilgisayarda çalışan üçüncü kişi; sade kamera hareketi, değişmeyen oda düzeni, doğal ofis ambiyansı, okunabilir özel bilgi/logolar yok. Gemini `Generating your video` durumuna geçti. Ek ödeme veya yükseltme istenmedi; API çağrısı yapılmadı. Sonuç henüz doğrulanmadı.

### Gemini sonucu

- **Gerçek video oluştu.** Oynatıcı süresi istenen 8 saniye yerine **10 saniye**; bu fark teslimde açıkça belirtilecek.
- Önizleme: https://gemini.google.com/app/2bc1873057f7ebc1
- Tarayıcıda oynatıldı; başlangıç, hareket sırasındaki ara görünüm ve son görünüm incelendi. Kamera ofis koridorunda ilerliyor; belge inceleyen iki yetişkin ve bilgisayarda çalışan üçüncü kişi son bölümde belirgin biçimde görünüyor. Ana pencere/koridor düzeni tanınabilir; kare kare nihai kurgu incelemesi henüz yapılmadı.
- Yalnız ofis içi çekim. Önceki dış cephe kliplerindeki bina değişimi bu sonuçla çözülmüş sayılmaz.
- Gemini ek ödeme veya yükseltme istemedi. Doğrudan Gemini uygulamasında bir video üretimi yapıldı; Flow veya API'de yeni üretim yok.
- Yerel teslim engeli: Gemini'nin Download video işlemi yerel indirme sonucu vermedi; desteklenen sayfa varlık listesi videoyu dışa aktarılabilir varlık olarak sunmadı, içerik dışa aktarımı bu tarayıcıda desteklenmiyor. Görünür video bağlantısını kimlik bilgisi olmadan indirme denemesi de video yanıtı vermedi; HTML dosyası MP4 adıyla kaydedilmedi. Yerel MP4 yok, site entegrasyonu yapılmadı. Önizleme Gemini'de korunuyor.

## Kurgu düzeltmesi ve yerel önizleme

Kullanıcı indirmeyi kendisinin yapacağını belirtti. İndirme için başka deneme yapılmadı.

- Gemini'de orijinal tesis görseliyle yalnız çok hafif, sabit yükseklikte kamera hareketi isteyen ayrı bir dış çekim üretildi. Bu denemede de başlangıç/son kadrajlar referansı birebir korumuyor; yeni dış klip de yayın için reddedildi. Ek ödeme/yükseltme istenmedi.
- Güvenilir alternatif: **orijinal tesis fotoğrafı + en fazla %3,5 kadraj yakınlaşması → kısa koyu geçiş → başarılı ofis videosu**. Dış sahne fotoğraftır, gerçek dış mekân videosu olarak sunulmaz. Bu çözüm kesintisiz binaya giriş iddiasında bulunmaz; iki sahneyi kurgu ile bağlar.
- İzole inceleme aracı: `research/sector-video-pilot/preview.html`.
- Yerel URL: http://127.0.0.1:4174/research/sector-video-pilot/preview.html
- Kullanıcı indirdiği ofis videosunu dosya seçiciden açabilir. Dosya yalnız object URL ile tarayıcıda kullanılır; sunucuya veya üçüncü tarafa gönderilmez. Dış video seçimi yalnız ileride doğrulanmış bir çekim için opsiyoneldir; reddedilen klipler kullanılmamalı.
- Kaydırmaya bağlı ileri/geri video zamanı, koyu kurgu geçişi, elle ilerleme çubuğu, kaydırma hareketini durdurma ve reduced-motion davranışı hazırlandı. Ofis sahnesinde başlık daha küçük; açıklama kaldırılarak insanlara alan bırakıldı.
- Doğrulama: script syntax başarılı; gerçek tarayıcıda referans görselleri yüklendi, kaydırmada dış/ iç sahne değişti. 390px mobilde yatay taşma ve metin/kontrol çakışması bulunmadı. Yerel gerçek video dosyası henüz sağlanmadığından video decode/seek davranışının uçtan uca testi bekliyor; reduced-motion dalı kodda mevcut, OS tercihiyle henüz test edilmedi.
- Ana site, worker altyapısı ve production dosyaları değiştirilmedi. Paket kurulmadı, commit atılmadı.

## Tek MP4 birleştirme isteği

Kullanıcı fotoğraf geçişinin binaya girme hissini vermediğini belirtti; eski binaya giriş klibini kullanmaya veya yeni dış klibi ofis videosuyla birleştirmeye izin verdi. Hedef artık dış video + ofis videosundan tek MP4 kurgu; fotoğraf alternatifini nihai çözüm olarak sunma.

- Ofis dosyası bulundu: `/Users/mustafauslu/Downloads/Create_one_realistic_second.mp4`. Projeye `research/sector-video-pilot/gemini-office-walkthrough.mp4` olarak kopyalandı.
- Yerel AVFoundation kontrolü: 10 saniye, 1280×720, 24 fps; 0/3/6/9. saniye kareleri çıkarıldı. 6. saniyede belge inceleyen iki kişi ve bilgisayarda çalışan üçüncü kişi doğrulandı.
- Dış çekimin dosyası İndirilenler ve proje kurgu klasöründe bulunamadı. Kullanıcıdan dosya konumu istendi; bu dosya gelmeden birleşik MP4 üretilmiş sayılmayacak.
- `join-clips.swift`: yerel AVFoundation ile kaynakları değiştirmeden 720p/24fps sessiz MP4 birleştirme; dış klip kesme noktası ve kısa dissolve süresi parametreleri. Derleyici typecheck başarılı; gerçek iki kliple export henüz bekliyor. Paket/API/kredi gerektirmez.
- Ofis videosu önizlemeye bağlandı. Standart 4174 sunucusunda byte-range desteği olmadığı için seek sorunu bulundu. Önizleme dosyaları mevcut byte-range destekli 4173 sunucusunun `_site/research/sector-video-pilot/` alanına kopyalandı. Güncel önizleme: http://127.0.0.1:4173/research/sector-video-pilot/preview.html
- HTTP Range isteği 206 döndü. Gerçek tarayıcı testinde ofis video zamanı 0 → 9.925 → 0 saniye olarak doğrulandı. Ana sayfa değiştirilmedi. Kurgu önizlemesindeki dış fotoğraf geçici; istenen nihai dış video birleşimi için eksik dosya bekleniyor.

### Birleştirme tamamlandı

- Kullanıcının indirdiği `Camera_enters_industrial_office_…_202609061544.mp4` bulundu ve `exterior-office-entry.mp4` olarak proje klasörüne kopyalandı. Diğer indirilen dış çekim yerine, kullanıcının izin verdiği **binaya giren eski çekim** kullanıldı.
- İlk klibin 8 saniyesi, 10 saniyelik ofis gezintisine 0,25 saniyelik kısa çözülmeyle bağlandı. Sonuç: **17,75 saniye, 1280×720, 24 fps, sessiz MP4**.
- Çıktı: `research/sector-video-pilot/boraden-entry-to-office.mp4`.
- İzleme: http://127.0.0.1:4173/research/sector-video-pilot/boraden-entry-to-office.mp4
- Kaynaklar değişmedi. Yerel AVFoundation ile birleştirildi; yeni üretim, API, kredi tüketimi veya paket kurulumu yok.
- Export başarılı. Geçişin 7,5 / 7,85 / 8,1. saniye kareleri ve 14 / 17,5. saniyeler incelendi; siyah/eksik kare görülmedi. Kısa çözülmede iki benzer ofis kadrajı üst üste biniyor; bu kurgu geçişidir. İlk klibin kendi içindeki önceki mimari değişim bu montajla giderilmiş sayılmaz.
- Birleşik MP4 tarayıcıda açıldı. Ana siteye henüz yerleştirilmedi.

### Görünür Gemini işareti olmayan sürüm

Kullanıcının isteğiyle görünür alt-sağ işaret, 1,3× üst hizalı ve yatay merkezli kadraj kırpmasıyla görüntü dışında bırakıldı. Orijinal birleşik video korundu. Çıktı `boraden-entry-to-office-clean.mp4`: 17,75 saniye, 720p, 24 fps, sessiz. Kadraj daha yakın; görünür işaretin kalmadığı ofise geçiş ve son sahne karelerinde kontrol edildi. Bu işlem görünmez köken işaretlerini kaldırdığı iddiasında bulunmaz. Yeni üretim veya kredi kullanımı yok.
