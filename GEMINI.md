# BORADEN DESIGN 3 — PROJE KURALLARI & OTONOM GELİŞTİRME YÖNERGESİ

## 1. Otonom Geliştirme Yetkisi (Tam Yetki)
- Kullanıcıdan her tasarım veya kod adımı için plan onayı veya soru sorma kapısı (`ask_question`, bekleme) açma.
- İstenen tasarım vizyonunu doğrudan koda dök, dosyaları düzenle ve uygula.
- Değişiklik sonrasında `npm test` ve `npm run build` komutlarıyla derleme ve test doğrulamalarını otomatik çalıştır.
- Yalnızca geri dönülemez bir veri kaybı veya kritik güvenlik riski olduğunda durup kullanıcıya danış.

## 2. Kurumsal Veri & Yasal Bütünlük (Master Data Retention)
- Boraden Bağımsız Denetim ve Danışmanlık A.Ş. 33 yıllık kurumsal geçmişe sahiptir (1993'ten bugüne).
- 6 temel uzmanlık alanı (`vergi`, `denetim`, `danismanlik`, `insan`, `sistem`, `akademi`) ve merkezdeki `BORADEN` yapboz geometrisi korunmalıdır.
- 47 hizmet, 6 sektör, 14 perspektif/düşünür ve 7 resmî akreditasyon (SPK, KGK, TCMB, GİB, EPDK, TSPB, TDUB) doğrulanmış gerçek verilerdir.
- Doğrulanmamış müşteri sonucu, kişi veya ciro uydurulamaz. Finansal hesaplama parametreleri (Gelir Vergisi, KDV, Brüt-Net) mevzuat harici bozulamaz.
- Başka firmaların (Sistem Global vb.) metinleri birebir kopyalanamaz.

## 3. "WOW" Faktörü & Görsel Mükemmellik
- Tasarım sıradan kurumsal sitelerin çok ötesinde; Apple, Dyson, Stripe, McKinsey/Deloitte kalitesinde olmalıdır.
- 3D derinlik, cam dokuları (frosted glassmorphism), mikro kenarlıklar (1px hairline precision) ve mimari tipografi kullanılmalıdır.
- Scroll-driven motion, pinning, live odometer sayaçları ve View Transitions API desteklenmelidir.
- Tüm animasyonlar GPU Compositor thread üzerinde (`transform`, `opacity`) 120 FPS akıcılıkta çalışmalı, jank oluşturmamalıdır.
- `prefers-reduced-motion` ve tam klavye erişilebilirliği (a11y) daima korunmalıdır.
