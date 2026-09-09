// Boraden 6 Continents Metaphor Architecture
// Maps Boraden's 6 core services to 6 continents, with Turkey as the central Boraden hub.

export const CONTINENT_MAP = {
  denetim: {
    id: 'avrupa',
    group: 'denetim',
    name: 'Avrupa',
    serviceTitle: '02 Bağımsız Denetim & Raporlama',
    badge: 'Avrupa Standartları &bull; Bağımsız Denetim',
    lead: 'KGK, SPK ve BDDK yetkileriyle UFRS/TFRS uluslararası denetim güvencesi.',
    accent: '#cb6651',
    // Stylized Europe silhouette vector
    svgPath: 'M48 18c-3-1-6 2-8 5-4 1-9 4-11 8-2 4-1 9 1 13 3 5 7 9 12 11 5 1 11-1 15-4 4-3 7-7 9-12 2-6 1-13-3-18-3-3-8-4-15-3z'
  },
  vergi: {
    id: 'kuzey-amerika',
    group: 'vergi',
    name: 'Kuzey Amerika',
    serviceTitle: '01 Vergi & Mali Müşavirlik',
    badge: 'Kuzey Amerika &bull; Küresel Vergi Mimarisi',
    lead: 'Transfer fiyatlandırması, tam tasdik ve uluslararası vergi planlaması.',
    accent: '#356e91',
    // Stylized North America silhouette vector
    svgPath: 'M30 15c-6 2-12 6-16 11-4 6-6 14-4 22 2 8 8 15 15 19 8 4 17 5 25 2 7-3 13-9 16-16 3-8 2-17-2-24-5-7-12-12-20-14-5-1-19-1-14 0z'
  },
  danismanlik: {
    id: 'guney-amerika',
    group: 'danismanlik',
    name: 'Güney Amerika',
    serviceTitle: '03 Kurumsal Danışmanlık & Değerleme',
    badge: 'Güney Amerika &bull; M&A ve Şirket Değerleme',
    lead: 'Şirket birleşmeleri, due diligence ve stratejik kurumsal değerleme.',
    accent: '#41885f',
    // Stylized South America silhouette vector
    svgPath: 'M38 22c-7 4-12 11-13 19-1 9 3 18 8 25 5 7 11 13 17 17 4 3 9 4 13 1 5-4 7-10 8-16 1-8-1-16-5-23-4-8-10-15-18-20-3-2-7-4-10-3z'
  },
  insan: {
    id: 'afrika',
    group: 'insan',
    name: 'Afrika',
    serviceTitle: '04 İnsan Kaynakları & Bordro',
    badge: 'Afrika &bull; Bordro & İK Operasyonları',
    lead: 'Bordro dış kaynak yönetimi, SGK teşvik optimizasyonu ve iş hukuku uyumu.',
    accent: '#3c7a9c',
    // Stylized Africa silhouette vector
    svgPath: 'M42 16c-8 1-16 5-21 11-5 7-6 16-4 25 3 9 9 17 16 23 7 5 16 8 25 7 8-1 16-5 21-12 5-7 7-16 5-25-2-9-8-17-15-22-8-5-18-8-27-7z'
  },
  sistem: {
    id: 'asya',
    group: 'sistem',
    name: 'Asya',
    serviceTitle: '05 Sistemler & İş Zekâsı',
    badge: 'Asya &bull; Teknoloji ve İş Zekâsı',
    lead: 'ERP entegrasyonu, finansal veri ambarı ve analitik iş zekâsı raporlamaları.',
    accent: '#c46c57',
    // Stylized Asia silhouette vector
    svgPath: 'M25 25c-8 6-13 15-14 25-1 11 4 22 12 30 9 8 21 12 33 11 12-1 23-7 30-16 7-9 9-21 7-32-3-11-10-20-20-25-10-5-22-6-33-3-6 2-10 5-15 10z'
  },
  akademi: {
    id: 'okyanusya',
    group: 'akademi',
    name: 'Okyanusya',
    serviceTitle: '06 Boraden Akademi',
    badge: 'Okyanusya &bull; Küresel Finans Eğitimi',
    lead: 'Kurumsal finans, vergi mevzuatı ve denetim standartları yönetici eğitimleri.',
    accent: '#488c65',
    // Stylized Oceania silhouette vector
    svgPath: 'M32 30c-7 3-12 9-14 16-2 8 1 17 6 23 6 6 15 9 23 8 9-1 17-6 21-14 4-8 3-18-2-25-5-7-13-11-22-11-4 0-8 1-12 3z'
  }
};

export function continentWatermark(groupId) {
  const c = CONTINENT_MAP[groupId];
  if (!c) return '';
  return `<div class="continent-watermark continent-${c.id}" aria-hidden="true" title="${c.badge}">
    <svg viewBox="0 0 100 100" class="continent-svg-shape">
      <path d="${c.svgPath}" fill="currentColor" fill-opacity="0.08" stroke="currentColor" stroke-width="1.2" stroke-dasharray="3 3" stroke-opacity="0.22"/>
      <circle cx="50" cy="50" r="3" fill="${c.accent}" fill-opacity="0.8"/>
      <circle cx="50" cy="50" r="7" stroke="${c.accent}" stroke-width="0.8" fill="none" stroke-opacity="0.5"/>
    </svg>
    <span class="continent-watermark-label">${c.name} &bull; ${c.serviceTitle}</span>
  </div>`;
}

export function continentMetaBadge(groupId) {
  const c = CONTINENT_MAP[groupId];
  if (!c) return '';
  return `<span class="continent-meta-pill" style="--pill-color:${c.accent}">
    <span class="pill-radar-dot"></span>
    <span>${c.badge}</span>
  </span>`;
}
