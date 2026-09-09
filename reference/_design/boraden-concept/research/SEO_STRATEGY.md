# Boraden — arama, içerik ve deneyim çalışması

Araştırma: 6 Eylül 2026. Kapsam: kamuya açık arama sonuçları, kurumların kendi hizmet sayfaları, Google Search Central ve resmî bilgi kaynakları. Search Console / Keyword Planner erişimi kullanılmadı. Aşağıdaki öncelikler hizmet kapsamı ve gözlemlenen arama niyetine dayanan editoryal değerlendirmedir; arama hacmi, CPC, zorluk veya mevcut Google sırası ölçülmüş değildir.

## Arama niyeti haritası

| Öncelik | Sorgu kümesi | Ziyaretçinin ihtiyacı | Hedef |
|---|---|---|---|
| 1 | şirket değerleme, şirket değerleme danışmanlığı, şirket değeri nasıl hesaplanır | Ortaklık / pay devri öncesi değeri, yöntemi ve gerekli veriyi anlamak | Şirket değerlemesi hizmeti + hazırlık rehberi |
| 1 | şirket kuruluş danışmanlığı, limited şirket kuruluşu, anonim şirket kuruluşu | Kuruluş yapısını ve tescil sonrası sorumlulukları planlamak | Kuruluş hizmeti + şirket türlerini karşılaştıran açıklama |
| 1 | bordro hizmeti, bordro dış kaynak, bordrolama, insan kaynakları ve bordro | Veri toplama, hesap, kontrol ve onay akışını yönetmek | İK ve bordro ana hizmeti; hesaplama alt sayfasına bağlantı |
| 1 | bağımsız denetim şirketi İstanbul, bağımsız denetim hizmetleri | Raporlama / denetim ihtiyacına uygun çalışma bulmak | Bağımsız denetim; doğrulanmış İstanbul adresi |
| 1 | UFRS TFRS raporlama, TFRS dönüşüm, finansal raporlama danışmanlığı | Hangi çerçeve, hangi dönüşüm kayıtları, hangi rapor seti? | UFRS/TFRS hizmeti |
| 1 | yeminli mali müşavir, YMM tam tasdik, tam tasdik hizmeti | Vergi beyanı ve tasdik kapsamını değerlendirmek | Tam tasdik; bağımsız denetimden farkı |
| 1 | KDV iadesi, KDV iade danışmanlığı, KDV iadesi gerekli belgeler | İşlem türüne uygun iade dosyası hazırlamak | KDV iade hizmeti; kesin sonuç / süre taahhüdü yok |
| 2 | gelir vergisi hesaplama 2026, KDV dahil hariç hesaplama, brütten nete maaş hesaplama | Hızlı ve açıklanabilir hesap | Ayrı hesaplama adresleri; yöntem ve kapsam görünür |
| 2 | muhasebe sistemleri, veri analizi, yönetim raporlama | Kaynak, kontrol, rapor ve karar ilişkisini kurmak | İlgili hizmet sayfaları + veri akışı şemaları |
| 2 | transfer fiyatlandırması, Ar-Ge teknokent danışmanlığı | Kapsamı ve belge hazırlığını anlamak | İlgili hizmet sayfaları; güncel resmî düzenlemeye yönlendirme |
| 3 | sirküler, vergi haberleri, mevzuat gündemi | Tarihli ve kaynaklı yayın bulmak | Haberler ve arşiv; tarihi belgeyi güncel fırsat gibi sunmamak |
| 3 | Boraden, Boraden iletişim, Boraden İstanbul | Şirketi ve iletişim yolunu doğrulamak | Hakkımızda ve tek tutarlı iletişim kaydı |

Eş anlamlı sorgular için ayrı zayıf sayfalar üretilmez. Özellikle mali / finansal tablo denetimi ve bordrolama / İK-bordro başlıklarında ana hizmet ile alt kapsam ayrımı açıklanmalıdır. Aynı metni şehir adlarıyla çoğaltmak, anahtar kelime doldurmak, doğrulanmamış müşteri / başarı sayıları kullanmak yok.

## İncelenen sektör örnekleri

- [Sistem Global — bordro](https://www.sistemglobal.com.tr/outsource-bordro-yonetimi/): tanım, kapsam, uygun işletme profili, ilgili hizmetler. Gerçek tarayıcı görünümünde girişte yoğun form, altta kapsam akışı incelendi. Boraden'e vaat, metin, müşteri veya teknoloji iddiası aktarılmaz.
- [Sistem Global — şirket değerleme](https://sistemglobal.com.tr/medya/makaleler/sirket-degerleme/): yöntem / zaman / veri soruları. Süre ve sonuç vaatleri Boraden için kullanılmaz.
- [Sistem Global — kuruluş](https://www.sistemglobal.com.tr/servisler/muhasebe-bordro/sirket-kurulusu-danismanligi/): hizmet organizasyonu referansı.
- [PwC — değerleme](https://www.pwc.com.tr/degerleme-hizmetleri): müşterinin karar sorularına göre anlatım.
- [PwC — raporlama](https://www.pwc.com.tr/tr/hizmetlerimiz/denetim/finansal-raporlama-ve-muhasebe-danismanligi-hizmetleri/finansal-raporlama-danismanligi-hizmetleri.html): rapor hazırlama / dönüşüm ayrımı.
- [KPMG — CFO danışmanlığı](https://kpmg.com/tr/tr/services/advisory/cfo-danismanligi.html): raporlama, süreç ve karar ihtiyaçlarının birlikte sunulması.

## Teknik hedefler

Her anlamlı sayfa için kalıcı yol, ilk HTML yanıtında tam içerik, tek açıklayıcı H1, özgün title / description, tutarlı canonical, sosyal paylaşım metaverisi, breadcrumb ve görünür içerikle uyumlu JSON-LD. Bağlantılar gerçek a/href olmalı. Sitemap yalnız dizine uygun gerçek sayfaları içermeli. Bilinmeyen URL 404; eski URL yeni karşılığına kalıcı yönlendirme. Önizleme, yerel editör, taslak ve araştırma arşivi dizine kapalı kalır.

- [Google — geliştirici rehberi](https://developers.google.com/search/docs/fundamentals/get-started-developers)
- [Google — canonical](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Google — faydalı ve güvenilir içerik](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [Google — yerel işletme verisi](https://developers.google.com/search/docs/appearance/structured-data/local-business)
- [Google — sıralama garantisi yoktur](https://developers.google.com/search/docs/fundamentals/do-i-need-seo)

Canlıya geçişte Search Console sahiplik doğrulaması, sitemap gönderimi, URL Inspection, Google Business Profile adres tutarlılığı ve gerçek kullanıcı Core Web Vitals ölçümü gerekir. Bunlar yerel prototipte yapılmış gibi raporlanamaz. Yeni site yayımlanmadan mevcut boraden.com.tr arama performansı değişmiş sayılmaz.
