# Boraden — Birlikte, bütüne.

Boraden’ın ikinci tasarım çalışması. Açık yüzeyler, Manrope ve italik Instrument Serif ile önceki 4173 tasarımının tipografisi korunur. Yapboz, özgün logonun mavi, kırmızı ve yeşil ailelerinden gelen altı tonu kullanır; beyaz etiketlerin okunabilirliği için parça renkleri koyulaştırılmıştır. SVG yüzeyleri, kenarlar, gölgeler ve CSS perspektifi derinlik sağlar.

## Yerel önizleme

Node.js ile `npm run build`, ardından `npm start` çalıştırın. Adres: http://127.0.0.1:4174/. Paket kurulumu gerekmez. `npm test`, yapboz geometrisini, aktarılan rotaları ve hesaplama araçlarının yeniden kullanımını kontrol eder.

## Güncel akış

“Her parça uzmanlık” hero alanı doğal kaydırmayla bütünüyle yukarı çıkar. Menü aşağı kaydırmada gizlenir, yukarı kaydırmada görünür; yön değişimi için 20 piksel eşik kullanılır. Sayfanın ilk 96 pikselinde, imleç üst kenara geldiğinde, menü/arama açıkken veya menü klavye odağı taşırken görünür kalır. Azaltılmış hareket tercihinde geçiş anlıktır.

Uzmanlık bölümünde geniş, etkileşimli yapboz üstte; altı hizmet alanı kartı alttadır. Kartlar masaüstünde altı, tablette üç, mobilde iki sütuna yerleşir. Kartın veya parçanın üzerine gelmek ya da klavyeyle odaklanmak eşini vurgular; ikisi de doğrudan ilgili hizmet alanına açılır. Merkezdeki BORADEN, Hakkımızda sayfasına açılır. Altı uzun bölüm ve kaydırmayla sırayla parça düşürme akışı kaldırılmıştır.

47 hizmet sayfası ve altı hizmet alanı sayfasında, seçilen hizmetin kendi başlığını taşıyan parça korunur: girişte görünür, kaydırmayla yerleşir, okuma boyunca hafif ve bulanık bir arka plan olur. Mobil, azaltılmış hareket ve JavaScript olmadan kullanım için görünür içerik ve bağlantılar korunur.

Açılış ana sayfanın ilk bölümüdür; ayrı siyah bekleme ekranı kaldırılmıştır. Masaüstünde yatay ve geniş, mobilde kare yapboz kullanılır; yüzeyler genişlerken hizmet etiketleri gerilmez. Altı hizmet parçası ekranın sol, sağ, üst ve alt köşelerinden merkezdeki BORADEN çevresine gelir. Yaklaşık 3,7 saniyelik akışın sonunda şirket kimliği belirir. Animasyon, bölüm gerçekten görünür olduğunda başlar; sekmeye, açılışa veya farklı ekran düzenine geçildiğinde yeniden oynar. Azaltılmış hareket tercihinde ve JavaScript olmadan tamamlanmış yapboz gösterilir. Menü, bağlantılar ve kaydırma her zaman kullanılabilir.

Ana sayfadaki 14 dünya perspektifinin okuma bağlantıları, özgün kaynakları ve portre künyeleri korunur. 1,5 saniyelik karusel; üzerine gelindiğinde, klavye odağında, sekme gizliyken, ekran dışında ve azaltılmış hareket tercihinde durur. Elle gezinme kontrolleri mevcuttur. Yayınlar ve iletişim çağrısı da akışta yer alır.

Perspektifler daha kompakt sunulur; alttaki iletişim bölümünde geniş yapboz ve ihtiyaca göre yönlendirme bulunur. Hizmet adları ile yedi resmî kurum/meslek kuruluşu ayrı, durdurulabilir şeritlerde akar. TSPB logosu ve bağlantısı eklenmiştir.

Onaylanmış binadan ofise giriş filmi, footer öncesindeki son bölüm olarak korunur. Önceki görünürlük tabanlı oynatma motoru yeniden kullanılır: ihtiyaç anında yükleme, sessiz ve satır içi oynatma, ekran dışında durma, mobil ve azaltılmış hareket için poster görünümü.

Türkiye temalı iş hayatı filmi, hero ile uzmanlık bölümü arasındadır. Flow/Veo 3.1 Fast ile üretilen üç klipten 20 saniyelik sessiz, 720p kurgu hazırlandı. İstanbul siluetindeki belirgin coğrafi hata nedeniyle ilk dört saniye kullanılmadı. Film temsili yapay zekâ görüntüleridir; gerçek Boraden çalışanlarını/ofislerini veya doğrulanmış şehir çekimlerini göstermez. Alt kısımdaki beş HTML mesajı video süresine göre değişir; görüntüye yakılmamıştır. Mevcut paketten 60 kredi kullanıldı (900 → 840), ek satın alma yapılmadı. Ayrıntılar: [BRAND_FILM_BRIEF.md](BRAND_FILM_BRIEF.md).

## İçerik ve kapsam

İlk prototip `reference/`, aktif içerik kopyası `data/`, medya ve arşiv PDF’leri `public/assets/` içindedir. Arşiv kaynak fotoğrafları ikinci kez eklenmek yerine bu medya dosyalarına referans verir. İçerik aktarım kaydı `data/migration.json` dosyasındadır. Tarayıcıda yerel tutulan editör kayıtları Git’te değildir ve bu kopyaya dahil edilmez.

Şirket bilgileri, yayın kaynakları, tarihler, medya atıfları ve kapsam notları korunmalıdır. Ekip üyesi veya müşteri sonucu uydurulmaz. Hesaplama mantığı, tarihli kaynakları ve kapsam notları finansal parametreler değiştirilmeden yeniden kullanılır.

Bu çalışma yerel tasarım önizlemesidir; canlı yayın değildir ve bilinçli olarak `noindex` kullanır. Wagtail, yayın onayları, arama motoru indeksleme, kariyer başvurularının ve e-postaların teslimi sonraki entegrasyon kapsamındadır. Önceki Boraden deposu değiştirilmez.

## Devam notu — 9 Eylül 2026

Hizmet sonlarındaki sorumlu kişi alanı hazırdır. `data/service-contacts.json` içindeki isim, unvan, e-posta ve fotoğraf alanları kullanıcıdan gelecek; şimdilik genel iletişim çağrısı gösterilir. Hizmet özelinde kayıtlar `services` altında tanımlanabilir. Kontrol: `node --test test.mjs service-contact.test.mjs`.

Son görsel durum: daha belirgin açık zeminler, geniş uzmanlık ve kapanış yapbozları, kompakt perspektifler, hizmet renginde arka plan geçişleri ve görünürlükle başlayan açılış birleşmesi. Yeni müşteri geri bildirimleri buradan sürdürülecek; gerçek kişi bilgileri ve canlı Wagtail bağlantısı henüz tamamlanmış değildir.

9 Eylül 2026 tarihli kaynaklı tasarım önerileri: [DESIGN_RECOMMENDATIONS.md](DESIGN_RECOMMENDATIONS.md).
