// Boraden 6 Core Services Architecture
// Pure corporate services data without geographic continent nomenclature.

export const CONTINENT_MAP = {
  denetim: {
    id: 'denetim',
    group: 'denetim',
    name: 'Bağımsız Denetim',
    serviceTitle: '02 Bağımsız Denetim & Raporlama',
    badge: 'KGK, SPK, BDDK &bull; Bağımsız Denetim Güvencesi',
    lead: 'KGK, SPK ve BDDK yetkileriyle UFRS/TFRS uluslararası denetim güvencesi.',
    accent: '#cb6651'
  },
  vergi: {
    id: 'vergi',
    group: 'vergi',
    name: 'Vergi & Danışmanlık',
    serviceTitle: '01 Vergi & Mali Müşavirlik',
    badge: 'Tam Tasdik &bull; Küresel Vergi Mimarisi',
    lead: 'Transfer fiyatlandırması, tam tasdik ve uluslararası vergi planlaması.',
    accent: '#356e91'
  },
  danismanlik: {
    id: 'danismanlik',
    group: 'danismanlik',
    name: 'Kurumsal Danışmanlık',
    serviceTitle: '03 Kurumsal Danışmanlık & Değerleme',
    badge: 'M&A &bull; Şirket Değerleme &amp; Finans',
    lead: 'Şirket birleşmeleri, due diligence ve stratejik kurumsal değerleme.',
    accent: '#41885f'
  },
  insan: {
    id: 'insan',
    group: 'insan',
    name: 'Bordro & İK',
    serviceTitle: '04 İnsan Kaynakları & Bordro',
    badge: 'BPO Bordrolama &bull; SGK Teşvik Yönetimi',
    lead: 'Bordro dış kaynak yönetimi, SGK teşvik optimizasyonu ve iş hukuku uyumu.',
    accent: '#3c7a9c'
  },
  sistem: {
    id: 'sistem',
    group: 'sistem',
    name: 'Sistemler & BI',
    serviceTitle: '05 Sistemler & İş Zekâsı',
    badge: 'ERP Entegrasyonu &bull; Finansal İş Zekâsı',
    lead: 'ERP entegrasyonu, finansal veri ambarı ve analitik iş zekâsı raporlamaları.',
    accent: '#c46c57'
  },
  akademi: {
    id: 'akademi',
    group: 'akademi',
    name: 'Boraden Akademi',
    serviceTitle: '06 Boraden Akademi',
    badge: 'Mali Mevzuat &bull; Üst Yönetici Eğitimi',
    lead: 'Kurumsal finans, vergi mevzuatı ve denetim standartları yönetici eğitimleri.',
    accent: '#488c65'
  }
};

export function continentWatermark() {
  // Purged: No continent watermarks rendered in the background of cards.
  return '';
}

export function continentMetaBadge(groupId) {
  const c = CONTINENT_MAP[groupId];
  if (!c) return '';
  return `<span class="service-meta-pill" style="--pill-color:${c.accent}">
    <span class="pill-radar-dot" aria-hidden="true"></span>
    <span>${c.badge}</span>
  </span>`;
}
