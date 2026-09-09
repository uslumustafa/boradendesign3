# MODERN WEB MİMARİSİ VE KUSURSUZ TASARIM BİBLE (2025–2026)

Bu belge; Google Web Dev, W3C Baseline standartları, Reddit kreatif geliştirici toplulukları (`r/webdev`, `r/Frontend`), Awwwards & FWA ödüllü ajanslar (Locomotive, Active Theory, Apple, Stripe) ve 2026 modern CSS/JS mühendislik ilkelerinden derlenerek hafızaya kaydedilmiştir.

---

## 1. 2026 Modern Web Araç Kiti (Native W3C Baseline Standartları)

Artık harici, ağır JavaScript kütüphanelerine duyulan ihtiyaç %80 oranında azalmıştır. Modern tarayıcılar (Chromium, WebKit, Gecko) aşağıdaki yetenekleri donanımsal olarak desteklemektedir:

| Standart | Ne İşe Yarar? | Neden Kritik? |
| :--- | :--- | :--- |
| **Container Queries (`@container`)** | Ekran genişliğine değil, bileşenin ebeveyn genişliğine göre tepki verir. | Bento grid ve modüler kartlarda kırılma noktalarını kusursuz kılar. |
| **Subgrid (`grid-template-rows: subgrid`)** | İç içe grid öğelerinin üst ızgara çizgilerine doğrudan hizalanmasını sağlar. | Farklı uzunluktaki kart başlıklarına rağmen buton ve etiketleri aynı hizada kilitler. |
| **View Transitions API** | Sayfalar veya durumlar arasında kesintisiz görsel biçim değiştirme (morphing). | Yapboz parçasına tıklanınca parçanın büyüyüp hizmet başlığına akıcı dönüşümü. |
| **Popover API & `<dialog>`** | Menü, arama paneli ve modal pencereleri native yönetir. | Harici JS olmadan odak yakalama (focus-trap) ve ESC tuşuyla kapanma sağlar. |
| **`@starting-style`** | `display: none`'dan çıkan öğelere başlangıç stili tanımlar. | `setTimeout` veya JS olmadan modal ve menülere yumuşak fade-in/slide-in sağlar. |
| **Scroll-Driven Animations** | `animation-timeline: view()` ve `scroll()` ile kaydırmaya bağlı animasyon. | JS dinleyicisi çalıştırmadan doğrudan GPU thread üzerinde 120 FPS akıcılık. |

---

## 2. "Vaow" Dedirten Tasarım Estetiği (Awwwards & Luxury Consulting)

### A. "Tactile Brutalism & Engineered Precision" (Mühendislik Hassasiyeti)
- **1px Hairline Kenarlıklar:** Bulanık ve hantal gölgeler yerine, `border: 1px solid rgba(255, 255, 255, 0.1)` veya kurumsal tonlarda ince mikro kılavuz çizgileri.
- **Cam Dokusu (Frosted Glassmorphism):** `backdrop-filter: blur(24px) saturate(180%)` ile arkadaki hareketli içerikleri derinlikli ve saygın bir mat cam arkasında hissettirme.
- **Akrilik Işık Yansıması (Specular Sheen):** Kartların ve yapboz parçalarının üzerinden dönemsel geçen organik ışık huzmesi.

### B. Mimari Tipografi (Typography as Architecture)
- Metin sadece okunmaz, sayfanın heykelsi strüktürüdür.
- **Birincil Font:** Keskin, modern, geometrik grotesk sans (**Manrope** veya **Plus Jakarta Sans**) — rakamlar, metrikler, başlıklar.
- **Editoryal Kontrast:** İtalik klasik serif dokunuşu (**Instrument Serif** veya **Newsreader**) — *"birlikte, bütüne"*, *"bir adım ileriyi görün"*.
- **Kinetic Typography:** `overflow: hidden` maskelerinden harf veya kelime bazında yukarı süzülen başlıklar.

### C. Bento Grid 2.0 (Etkileşimli Modüler Matris)
- Eşit kutular yerine ritmi olan asimetrik kutular (1x2, 2x1, 2x2).
- **Mouse Spotlight Glow:** Fare kart üzerinde gezinirken, kartın kenarlığında fareyi takip eden yumuşak radyal ışık huzmesi (`radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(0,84,124,0.35), transparent 70%)`).

### D. Canlı Metrik Odometreleri (Live Rolling Counters)
- `45 GÜN`, `%100 UYUM`, `3.500+ PERSONEL`, `33+ YIL` gibi kritik güven kanıtları, ekrana girdiği anda mekanik saat hassasiyetiyle dönerek sayar.

---

## 3. Performans ve "Görünmez Mimari" (Zero-Jank & CWV)

1. **Yalnızca GPU Compositor:** Animasyonlarda asla `width`, `height`, `left`, `top`, `margin`, `padding` kullanılmaz (layout reflow tetiklemez). Yalnızca `transform3d()` ve `opacity` çalıştırılır.
2. **Eğri (Easing):** Standart `ease` yerine Apple ve lüks sitelerin tercih ettiği sürtünmeli yay eğrisi: `cubic-bezier(0.16, 1, 0.3, 1)`.
3. **`content-visibility: auto`:** Ekran dışındaki alt bölümler render ağacında bekletilir, ilk yükleme ve kaydırma gecikmesi (INP) sıfıra iner.
4. **`prefers-reduced-motion`:** Harekete duyarlı kullanıcılar için tüm animasyonlar anında son kareye zıplar, erişilebilirlik %100 korunur.

---

## 4. Boraden Design 3 Yol Haritası & Uygulama Planı

```
1. ULTRA-LÜKS HERO SAHNESİ:
   - 3D Işıltılı Cam Yapboz (Levitation + Mouse Parallaksı)
   - Dinamik "İşinizin Hangi Parçası?" Hızlı Odak Çipleri
   - Scroll ile Bütünleşen Sinematik Marka Filmi

2. BENTO-GRID HİZMET MATRİSİ:
   - 6 Uzmanlık Alanı ve 47 Hizmetin Fare Işığıyla Aydınlanan İnteraktif Kartları
   - Tıklanan parçanın View Transitions ile doğrudan hizmet detayına morph olması

3. DELOITTE-GRADE ETKİ HİKAYELERİ & CANLI ODOMETRE:
   - Rolling number sayıcıları, SPK/KGK uyum rozetleri, sektörel başarı mimarisi

4. FİNANSAL HESAPLAMA ARAÇLARI & SÖZLEŞMELİ VERİ KATMANI:
   - Gelir vergisi, KDV, brüt-net maaş hesaplayıcılarının modern bento arayüzü
   - 7 resmi akreditasyon kurumu ve 14 dünya perspektifi karuseli
```
