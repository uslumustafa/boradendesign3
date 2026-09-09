# Boraden Legacy Reference

IMPORTANT:

This document describes the verified legacy Boraden website.

It is a content and information-architecture reference only.
It is NOT a visual specification and the legacy design must NOT be
reproduced unless explicitly requested.

The new Boraden website will be redesigned from scratch.

Future user decisions about colors, typography, layout, banners,
cards, videos, animations, transitions, interactions and responsive
design override the legacy site's visual choices.

Do not invent factual company information.

# Boraden Verified Reference

## Source

- Taranan URL / sayfa adı: [https://boraden.com.tr/](https://boraden.com.tr/) — BORADEN.
- Taramanın kapsamı: Bağlantılar üzerinden 97 HTML adresi arşivlendi; bu sayı benzersiz sayfa sayısı değildir. Ana sayfa masaüstü tarayıcıda görsel olarak incelendi. Aşağıdaki bölüm sırası ana sayfaya aittir.

## Page Structure

1. İletişim, dil ve sosyal medya şeridi.
2. Logo, kurumsal ifadeler ve iletişim butonu.
3. Ana navigasyon.
4. Hero / slayt alanı.
5. Üç hizmet yaklaşımı kartı.
6. Hizmet Ağımız.
7. İletişim çağrısı.
8. Başarı Hikayeleri.
9. Modern Finans ve performans alanı.
10. Excel indirme çağrısı.
11. Alıntı alanı.
12. Güncel Haberler.
13. Deneyim Referansları.
14. Başarı Hikayemiz ve sayaçlar.
15. Geri aranma formu.
16. Footer.

## Header / Navigation

- Üst şerit: Tr/En, İstanbul/Ankara, çalışma saatleri, telefon, WhatsApp, e-posta ve sosyal bağlantılar.
- Logo yanında “#165 TÜV İndeksi”, “ISO 20022 Standartlar” ve “İLETİŞİM” bulunuyor.
- Masaüstü menüsü: Ana Sayfa, Hakkımızda, Hizmetlerimiz, Sektörler, Takvim, Sirküler, Duyurular, Blog.
- Arama ikonu ve kaynakta arama formu mevcut.
- Hakkımızda ve Hizmetlerimiz altında çok seviyeli bağlantılar var; açılma davranışları test edilmedi.
- /en/ adresi HTTP 404 döndü.

## Hero

- Gözlemlenen başlık: “Tam, doğru, zamanında”.
- Alt metin: “Performans yönetiminize finans ve teknik alanlarda profesyonel çözümler sunmaktayız.”
- CTA’lar: “Detaylı Bilgi” → /biz-kimiz; “İletişim” → /iletisim.html.
- Tokalaşma ve tablet içeren geniş fotoğraf üzerinde mavi/lacivert tonlama.
- Büyük beyaz başlık, açıklama ve yan yana butonlar sola hizalı.
- Kaynakta ikinci slayt metni de bulunuyor; slayt geçişi doğrudan test edilmedi.

## Sections

- Yaklaşım kartları: Sürekli Hizmet, Deneyimli Uzmanlık, Farkındalık Bilinci.
- Hizmet Ağımız: Vergi, Denetim, Danışmanlık, İnsan Kıymetleri, Çözüm Prosedürleri ve İş Zekası; açıklamalar ve bağlantılar.
- İletişim çağrısı: “Sizi yakından tanıyalım” başlığı ve iletişim CTA’sı.
- Başarı Hikayeleri: Görselli örnek çalışma öğeleri; bazı açıklamalar taslak metin.
- Modern Finans / performans: Açıklama, maddeler ve “Üye Girişi” bağlantısı.
- İndirme: 7326 sayılı kanun için Excel hesaplama dosyası.
- Alt içerikler: Alıntı, haberler, referanslar ve performans sayaçları.
- Formlar: Geri aranma alanı ve footer mesaj formu.
- Footer: Adres, iletişim, haberler, faydalı bağlantılar, yasal bağlantılar ve sosyal ikonlar.

## Visual System

Bu bölüm yalnızca eski sitede gözlemlenenleri kaydeder.
Yeni Boraden tasarımı için bağlayıcı değildir.

- Renkler: Beyaz üst şerit; koyu lacivert navigasyon; mavi tonlu hero; beyaz hero metni; mor/mavi CTA.
- Tipografi: Büyük ve kalın sans-serif hero başlığı. Kaynakta Montserrat, Open Sans ve Asap font bağlantıları var; öğe bazında kullanım doğrulanmadı.
- Container/grid: Navigasyon yatay ve ekran kenarlarından içeride; hero metni solda. Kesin grid ölçüleri doğrulanmadı.
- Spacing: Header, navigasyon ve hero metni arasında geniş boşluklar gözlemlendi; piksel değerleri ölçülmedi.
- Radius/border: Hero CTA’ları yuvarlatılmış; “Detaylı Bilgi” beyaz çerçeveli, “İletişim” dolgu renkli.
- Gölge: Kesin gölge değerleri doğrulanmadı.

## Assets

- /upload/logo.png ve /upload/footer-logo.png kaynakta mevcut.
- Hero fotoğrafları, hizmet görselleri, referans görselleri ve ekip portreleri kaynaklarda bulundu.
- Telefon, WhatsApp, sosyal medya, arama ve yukarı ok ikonları gözlemlendi.
- 455 dosya indirildi; bunlara 246 PDF ve bir Excel dosyası dahil.
- 26 asset isteği HTTP 404 döndü; eksik ekip portreleri de var.
- Video kullanımı doğrulanmadı.

## Responsive

- Yalnız masaüstü görünümü incelendi.
- Mobil/tablet düzeni, breakpoint’ler ve mobil menü davranışı test edilmedi.
- Yeni Boraden sitesinin responsive sistemi daha sonra ayrıca tasarlanacaktır.

## Interactions

- Bağlantı hedefleri ve HTTP yanıtları taramada kontrol edildi.
- Hero kaynaklarında Revolution Slider yapılandırması bulundu; otomatik geçiş, oklar ve parallax davranışı kullanıcı etkileşimiyle doğrulanmadı.
- Hover, sticky header, sayaç animasyonu ve yukarı çıkma butonu test edilmedi.
- Form gönderimi ve arama çalıştırılmadı.
- Bazı CTA’lar # veya boş JavaScript bağlantısı içeriyor.
- Blog sayfalama bağlantılarının href alanları boş.

## Legacy Information Priorities

Bu maddeler eski sitenin bilgi yapısını korumak içindir;
yeni sitenin görsel tasarımını belirlemez.

1. Mevcut hizmet, sektör, kurumsal ve içerik bilgilerinin kaybolmamasını sağlamak.
2. Kullanılabilir eski asset ve dokümanları gerektiğinde kaynak olarak değerlendirmek.
3. Eksik veya doğrulanmamış şirket bilgisini uydurmamak.
4. /haber/–/Haber/ gibi eski rota farklılıklarını yeni mimari hazırlanırken dikkate almak.
5. Sirküler/PDF arşivini ve diğer önemli dokümanları yeni bilgi mimarisine taşırken kaynak olarak kullanmak.

## Unknowns

- Kesin eski renk kodları, font eşlemeleri, genişlikler, spacing ve gölge değerleri.
- Mobil düzenler ve etkileşimlerin gerçek davranışı.
- Altı adresin ana içeriği, iki boş blog adresinin yazıları ve İngilizce içerik.
- Formların backend davranışı ve üyelik işlevi.
- Kurumsal iddiaların, ekip bilgilerinin ve sosyal hesapların güncelliği.
- Sirkülerlerin gerçek yayın tarihleri: listede eski belgeler için tarama günü gösteriliyordu.

## New Boraden Design Authority

Yeni Boraden web sitesi sıfırdan tasarlanacaktır.

Aşağıdaki konularda bu legacy doküman karar kaynağı değildir:

- renk paleti
- gradient ve renk geçişleri
- typography
- header tasarımı
- hero/banner tasarımı
- video kullanımı
- card sistemleri
- section düzenleri
- spacing ve grid
- hover efektleri
- scroll animasyonları
- motion ve transition sistemi
- responsive tasarım
- mobil navigasyon
- yeni CTA'lar
- yeni içerik blokları
- yeni özellikler

Bu konulardaki gelecek kullanıcı kararları legacy referansın üzerinde
önceliğe sahiptir.

DOSYA SONU.
