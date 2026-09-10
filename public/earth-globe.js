// Boraden Photorealistic 3D WebGL Earth Engine (Three.js powered)
// Features: NASA Blue Marble Surface, Night City Lights, Floating Cloud Layer,
// Turkey/Boraden Central Hub, 6-Continent Global Services Network,
// Animated Great-Circle Light Arcs with Traveling Photon Pulses,
// Interactive Solar God-Ray (Güneş Işını) Beam System on Logo Hover.

import * as THREE from '/assets/vendor/three.module.js';

export const SERVICES_NETWORK = [
  {
    id: 'vergi',
    aliasId: 'kuzey-amerika',
    code: '01',
    serviceCode: '01 VERGİ &amp; MALİ MÜŞAVİRLİK',
    name: '01 Vergi & Mali Müşavirlik',
    group: 'vergi',
    lat: 38.0,
    lon: -97.0,
    color: 0x356e91,
    colorHex: '#356e91',
    heading: 'Vergi, Tasdik ve Mevzuat Yönetimi',
    desc: 'Tam tasdik, KDV iadesi, transfer fiyatlandırması ve kurumsal vergi mimarisi güvencesi.',
    tags: ['Tam Tasdik', 'KDV İadesi', 'Transfer Fiyatlandırması']
  },
  {
    id: 'denetim',
    aliasId: 'avrupa',
    code: '02',
    serviceCode: '02 BAĞIMSIZ DENETİM &amp; RAPORLAMA',
    name: '02 Bağımsız Denetim & Raporlama',
    group: 'denetim',
    lat: 48.0,
    lon: 14.0,
    color: 0xcb6651,
    colorHex: '#cb6651',
    heading: 'Finansal Tablo Denetimi ve Raporlama',
    desc: 'Uluslararası UFRS/TFRS standartlarında KGK, SPK ve BDDK yetkili bağımsız denetim güvencesi.',
    tags: ['KGK &amp; SPK Yetkili', 'UFRS / TFRS / BOBİ FRS', 'İç Kontrol Güvencesi']
  },
  {
    id: 'danismanlik',
    aliasId: 'guney-amerika',
    code: '03',
    serviceCode: '03 KURUMSAL DANIŞMANLIK &amp; DEĞERLEME',
    name: '03 Kurumsal Danışmanlık & Değerleme',
    group: 'danismanlik',
    lat: -14.0,
    lon: -58.0,
    color: 0x41885f,
    colorHex: '#41885f',
    heading: 'Şirket Değerleme &amp; M&A Birleşmeler',
    desc: 'Şirket birleşme & devralmaları, İNA değerleme modellemeleri ve finansal due diligence.',
    tags: ['Şirket Değerleme', 'M&A Birleşme & Devralma', 'Due Diligence']
  },
  {
    id: 'insan',
    aliasId: 'afrika',
    code: '04',
    serviceCode: '04 İNSAN KAYNAKLARI &amp; BORDRO',
    name: '04 İnsan Kaynakları & Bordro',
    group: 'insan',
    lat: 2.0,
    lon: 24.0,
    color: 0x3c7a9c,
    colorHex: '#3c7a9c',
    heading: 'Bordrolama &amp; SGK Teşvik Yönetimi',
    desc: 'Bordrolama dış kaynak (BPO), 3.500+ personel operasyonu, SGK teşvik optimizasyonu ve iş hukuku.',
    tags: ['BPO Bordrolama', 'SGK İstihdam Teşviki', 'İş Hukuku Uyumu']
  },
  {
    id: 'sistem',
    aliasId: 'asya',
    code: '05',
    serviceCode: '05 SİSTEMLER &amp; İŞ ZEKÂSI',
    name: '05 Sistemler & İş Zekâsı',
    group: 'sistem',
    lat: 34.0,
    lon: 100.0,
    color: 0xc46c57,
    colorHex: '#c46c57',
    heading: 'ERP Entegrasyonu &amp; Finansal Analitik',
    desc: 'ERP muhasebe entegrasyonu, veri ambarı modelleme, süreç otomasyonu ve yönetici BI.',
    tags: ['ERP Entegrasyonu', 'Yönetici BI Raporlama', 'Süreç Otomasyonu']
  },
  {
    id: 'akademi',
    aliasId: 'okyanusya',
    code: '06',
    serviceCode: '06 BORADEN AKADEMİ',
    name: '06 Boraden Akademi',
    group: 'akademi',
    lat: -25.0,
    lon: 134.0,
    color: 0x488c65,
    colorHex: '#488c65',
    heading: 'Yönetici Finans ve Mevzuat Eğitimi',
    desc: 'Şirket yönetim kurulları ve CFO’lar için güncel mevzuat, TFRS ve denetim standartları eğitimleri.',
    tags: ['Mali İşler Eğitimi', 'Güncel Vergi Mevzuatı', 'UFRS Tablo Analizi']
  }
];

export const HQ_NODE = {
  id: 'hq',
  code: '00',
  serviceCode: 'GENEL MERKEZ HUB &bull; TÜRKİYE',
  name: 'Boraden Genel Merkez Hub',
  colorHex: '#38bdf8',
  heading: 'Boraden Bağımsız Denetim ve Danışmanlık A.Ş.',
  desc: '33 yıllık bağımsız kurumsal güven, SPK, KGK ve BDDK yetkili denetim ve stratejik danışmanlık üssü.',
  tags: ['Tam Bağımsız', 'SPK &bull; KGK &bull; BDDK', '1993’ten Bugüne']
};

export const CONTINENTS = SERVICES_NETWORK;

export function initBoradenEarth() {
  if (typeof document === 'undefined') return;
  const container = document.getElementById('earth-canvas-container');
  if (!container) return;

  // Clear previous canvases
  container.innerHTML = '';

  let width = container.clientWidth || window.innerWidth;
  let height = container.clientHeight || window.innerHeight;

  // 1. Scene, Camera, WebGL Renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 1000);
  camera.position.set(0, 0, 7.0);

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
  } catch (e) {
    console.warn('WebGL not supported, falling back:', e);
    return;
  }

  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.95;
  container.appendChild(renderer.domElement);

  // 2. Texture Loader
  const textureLoader = new THREE.TextureLoader();
  const surfaceTex = textureLoader.load('/assets/earth/earth_surface.jpg');
  const lightsTex = textureLoader.load('/assets/earth/earth_lights.png');
  const cloudsTex = textureLoader.load('/assets/earth/earth_clouds.png');

  // Globe Radius
  const RADIUS = 1.52;

  // 3. Earth Group (Rotates in 3D)
  const earthGroup = new THREE.Group();
  earthGroup.position.y = -0.72;
  scene.add(earthGroup);

  // Initial Orientation: Center on Mediterranean / Turkey [Lat: 39° N, Lon: 35° E]
  earthGroup.rotation.y = 4.28;
  earthGroup.rotation.x = 0.36;

  // 4. Earth Surface Mesh (NASA Blue Marble)
  const sphereGeo = new THREE.SphereGeometry(RADIUS, 64, 64);
  const surfaceMat = new THREE.MeshStandardMaterial({
    map: surfaceTex,
    roughness: 0.75,
    metalness: 0.05
  });
  const earthMesh = new THREE.Mesh(sphereGeo, surfaceMat);
  earthGroup.add(earthMesh);

  // 5. Night City Lights Layer
  const lightsMat = new THREE.MeshBasicMaterial({
    map: lightsTex,
    blending: THREE.AdditiveBlending,
    transparent: true,
    opacity: 0.62
  });
  const lightsMesh = new THREE.Mesh(sphereGeo, lightsMat);
  earthGroup.add(lightsMesh);

  // 6. Atmospheric Clouds Layer
  const cloudsGeo = new THREE.SphereGeometry(RADIUS * 1.012, 64, 64);
  const cloudsMat = new THREE.MeshStandardMaterial({
    map: cloudsTex,
    transparent: true,
    opacity: 0.22,
    blending: THREE.AdditiveBlending
  });
  const cloudsMesh = new THREE.Mesh(cloudsGeo, cloudsMat);
  earthGroup.add(cloudsMesh);

  // 7. Spherical Coordinate Helper
  function latLonToVector3(lat, lon, r) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    return new THREE.Vector3(
      -r * Math.sin(phi) * Math.cos(theta),
      r * Math.cos(phi),
      r * Math.sin(phi) * Math.sin(theta)
    );
  }

  // 8. Türkiye / Boraden Genel Merkez Hub [Lat: 39° N, Lon: 35° E]
  const turkeyPos = latLonToVector3(39.0, 35.0, RADIUS);
  const hqGroup = new THREE.Group();
  hqGroup.position.copy(turkeyPos);
  earthGroup.add(hqGroup);

  // Diamond Point at Turkey
  const hqCoreGeo = new THREE.SphereGeometry(0.04, 16, 16);
  const hqCoreMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const hqCoreMesh = new THREE.Mesh(hqCoreGeo, hqCoreMat);
  hqGroup.add(hqCoreMesh);

  // Vertical Light Beacon Pillar from Turkey into Space
  const beaconPillarGeo = new THREE.CylinderGeometry(0.006, 0.024, 0.38, 16);
  beaconPillarGeo.translate(0, 0.19, 0);
  const beaconPillarMat = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending
  });
  const beaconPillarMesh = new THREE.Mesh(beaconPillarGeo, beaconPillarMat);
  beaconPillarMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), turkeyPos.clone().normalize());
  hqGroup.add(beaconPillarMesh);

  // Dual Concentric Radar Pulse Rings at Turkey
  const ringGeo1 = new THREE.RingGeometry(0.045, 0.08, 32);
  const ringMat1 = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.95
  });
  const ringMesh1 = new THREE.Mesh(ringGeo1, ringMat1);
  ringMesh1.lookAt(turkeyPos.clone().multiplyScalar(2));
  hqGroup.add(ringMesh1);

  const ringGeo2 = new THREE.RingGeometry(0.08, 0.12, 32);
  const ringMat2 = new THREE.MeshBasicMaterial({
    color: 0x22c55e,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.75
  });
  const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
  ringMesh2.lookAt(turkeyPos.clone().multiplyScalar(2));
  hqGroup.add(ringMesh2);

  // 9. 6 Continents Network & Great-Circle Subtle Light Arcs
  const networkArcs = [];
  const continentPins = [];

  CONTINENTS.forEach((cont, index) => {
    const contPos = latLonToVector3(cont.lat, cont.lon, RADIUS);

    // Continent Node Pin
    const pinGroup = new THREE.Group();
    pinGroup.position.copy(contPos);
    earthGroup.add(pinGroup);

    const pinCoreGeo = new THREE.SphereGeometry(0.024, 16, 16);
    const pinCoreMat = new THREE.MeshBasicMaterial({ color: cont.color });
    const pinCoreMesh = new THREE.Mesh(pinCoreGeo, pinCoreMat);
    pinGroup.add(pinCoreMesh);

    const pinRingGeo = new THREE.RingGeometry(0.03, 0.055, 24);
    const pinRingMat = new THREE.MeshBasicMaterial({
      color: cont.color,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.55
    });
    const pinRingMesh = new THREE.Mesh(pinRingGeo, pinRingMat);
    pinRingMesh.lookAt(contPos.clone().multiplyScalar(2));
    pinGroup.add(pinRingMesh);

    continentPins.push({ pinGroup, pinRingMesh, pinRingMat, cont });

    // Great-Circle Curved Subtle Light Arc between Turkey and Continent
    const arcPoints = [];
    const steps = 42;
    for (let s = 0; s <= steps; s++) {
      const t = s / steps;
      const p = new THREE.Vector3().lerpVectors(turkeyPos, contPos, t).normalize();
      const altitude = RADIUS + Math.sin(t * Math.PI) * 0.32;
      p.multiplyScalar(altitude);
      arcPoints.push(p);
    }

    const arcGeo = new THREE.BufferGeometry().setFromPoints(arcPoints);
    const arcMat = new THREE.LineBasicMaterial({
      color: cont.color,
      transparent: true,
      opacity: 0.28,
      blending: THREE.AdditiveBlending
    });
    const arcLine = new THREE.Line(arcGeo, arcMat);
    earthGroup.add(arcLine);

    // Delicate Traveling Photon Dot along Arc (Hafif Soluk Işın)
    const pulseGeo = new THREE.SphereGeometry(0.012, 10, 10);
    const pulseMat = new THREE.MeshBasicMaterial({
      color: cont.color,
      transparent: true,
      opacity: 0.75
    });
    const pulseMesh = new THREE.Mesh(pulseGeo, pulseMat);
    pulseMesh.position.copy(arcPoints[0]);
    earthGroup.add(pulseMesh);

    networkArcs.push({ arcPoints, pulseMesh, arcMat, index });
  });

  // 10. Lighting Setup (Cinematic Daylight / Night Terminator - No Overexposure)
  const ambientLight = new THREE.AmbientLight(0x081b2e, 0.5);
  scene.add(ambientLight);

  const sunLight = new THREE.DirectionalLight(0xffffff, 1.25);
  sunLight.position.set(6, 2.5, 4.5);
  scene.add(sunLight);

  // Subtle blue fill light from opposite side
  const fillLight = new THREE.DirectionalLight(0x0284c7, 0.35);
  fillLight.position.set(-5, -2, -2);
  scene.add(fillLight);

  // 12. Starfield Background (Deep Space Particles)
  const starCount = 350;
  const starGeo = new THREE.BufferGeometry();
  const starPos = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount * 3; i += 3) {
    starPos[i] = (Math.random() - 0.5) * 80;
    starPos[i + 1] = (Math.random() - 0.5) * 80;
    starPos[i + 2] = (Math.random() - 0.5) * 80 - 10;
  }
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
  const starMat = new THREE.PointsMaterial({ color: 0x94a3b8, size: 0.14, transparent: true, opacity: 0.7 });
  const starPoints = new THREE.Points(starGeo, starMat);
  scene.add(starPoints);

  // 13. Mouse & Touch Drag Interaction (Orbit)
  let isDragging = false;
  let previousMousePosition = { x: 0, y: 0 };
  let autoRotate = true;
  let rotateVelocity = { x: 0, y: 0 };

  function onPointerDown(e) {
    isDragging = true;
    autoRotate = false;
    targetRotation = null;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    previousMousePosition = { x: clientX, y: clientY };
  }

  function onPointerMove(e) {
    if (!isDragging) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const deltaX = clientX - previousMousePosition.x;
    const deltaY = clientY - previousMousePosition.y;

    rotateVelocity.y = deltaX * 0.005;
    rotateVelocity.x = deltaY * 0.003;

    earthGroup.rotation.y += rotateVelocity.y;
    earthGroup.rotation.x += rotateVelocity.x;
    earthGroup.rotation.x = Math.max(-1.1, Math.min(1.1, earthGroup.rotation.x));

    previousMousePosition = { x: clientX, y: clientY };
  }

  function onPointerUp() {
    isDragging = false;
    clearTimeout(window._earthResumeTimer);
    window._earthResumeTimer = setTimeout(() => {
      if (!targetRotation) autoRotate = true;
    }, 3500);
  }

  const dom = renderer.domElement;
  dom.addEventListener('mousedown', onPointerDown);
  window.addEventListener('mousemove', onPointerMove, { passive: true });
  window.addEventListener('mouseup', onPointerUp);

  dom.addEventListener('touchstart', onPointerDown, { passive: true });
  window.addEventListener('touchmove', onPointerMove, { passive: true });
  window.addEventListener('touchend', onPointerUp);

  // Resize Handler
  window.addEventListener('resize', () => {
    width = container.clientWidth || window.innerWidth;
    height = container.clientHeight || window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }, { passive: true });

  // Scroll Tracking & Service Focus Controller
  let scrollY = 0;
  let lastScrollIdx = -1;

  const serviceAngles = {
    'hq': { x: 0.36, y: 4.28 },
    'turkiye': { x: 0.36, y: 4.28 },
    'vergi': { x: 0.35, y: 6.45 },
    'denetim': { x: 0.44, y: 4.52 },
    'danismanlik': { x: -0.12, y: 5.75 },
    'insan': { x: 0.04, y: 4.35 },
    'sistem': { x: 0.32, y: 3.12 },
    'akademi': { x: -0.25, y: 2.58 },
    // Aliases
    'kuzey-amerika': { x: 0.35, y: 6.45 },
    'avrupa': { x: 0.44, y: 4.52 },
    'guney-amerika': { x: -0.12, y: 5.75 },
    'afrika': { x: 0.04, y: 4.35 },
    'asya': { x: 0.32, y: 3.12 },
    'okyanusya': { x: -0.25, y: 2.58 }
  };

  const scrollSequence = [
    HQ_NODE,
    SERVICES_NETWORK[0], // 01 Vergi
    SERVICES_NETWORK[1], // 02 Denetim
    SERVICES_NETWORK[2], // 03 Danışmanlık
    SERVICES_NETWORK[3], // 04 İK & Bordro
    SERVICES_NETWORK[4], // 05 Sistemler
    SERVICES_NETWORK[5]  // 06 Akademi
  ];

  function updateScrollServiceHud(item) {
    if (!item) return;
    const hud = document.getElementById('earth-scroll-service-hud');
    if (!hud) return;
    if (hud.dataset.activeId === item.id) return;
    hud.dataset.activeId = item.id;
    hud.classList.add('is-active');

    const dot = document.getElementById('hud-radar-node');
    const num = document.getElementById('hud-service-num');
    const tag = document.getElementById('hud-service-tag');
    const heading = document.getElementById('hud-service-heading');
    const summary = document.getElementById('hud-service-summary');
    const features = document.getElementById('hud-features-row');

    if (dot) {
      dot.style.setProperty('--node-color', item.colorHex || '#38bdf8');
      dot.style.background = item.colorHex || '#38bdf8';
      dot.style.boxShadow = `0 0 16px ${item.colorHex || '#38bdf8'}`;
    }
    if (num) num.textContent = item.code;
    if (tag) tag.innerHTML = item.serviceCode;
    if (heading) heading.textContent = item.heading;
    if (summary) summary.textContent = item.desc;
    if (features && item.tags) {
      features.innerHTML = item.tags.map(t => `<span class="hud-feat-badge">${t}</span>`).join('');
    }

    document.querySelectorAll('.solar-sector-chip').forEach(chip => {
      const focus = chip.dataset.sectorFocus;
      chip.classList.toggle('is-focused', focus === item.id);
    });
  }

  window.addEventListener('scroll', () => {
    scrollY = window.scrollY || window.pageYOffset;
    
    // As user scrolls through the earth scene (0 to 700px),
    // automatically orient the globe toward each service node!
    if (scrollY < 720 && !isDragging) {
      let idx = 0;
      if (scrollY < 70) idx = 0;
      else if (scrollY < 170) idx = 1;
      else if (scrollY < 270) idx = 2;
      else if (scrollY < 370) idx = 3;
      else if (scrollY < 470) idx = 4;
      else if (scrollY < 570) idx = 5;
      else idx = 6;

      if (idx !== lastScrollIdx) {
        lastScrollIdx = idx;
        const targetItem = scrollSequence[idx];
        if (targetItem && serviceAngles[targetItem.id]) {
          targetRotation = serviceAngles[targetItem.id];
          autoRotate = false;
          beaconBoost = (targetItem.id === 'hq');
          updateScrollServiceHud(targetItem);
        }
      }
    }
  }, { passive: true });

  // Initial HUD load
  updateScrollServiceHud(HQ_NODE);

  // 14. Global Interactive Controls & Service Targeting
  let targetRotation = null;
  let beaconBoost = false;

  window.focusContinent = function(target) {
    if (!target || target === 'all') {
      beaconBoost = false;
      targetRotation = null;
      clearTimeout(window._earthResumeTimer);
      window._earthResumeTimer = setTimeout(() => {
        autoRotate = true;
      }, 2500);
      return;
    }

    autoRotate = false;
    beaconBoost = (target === 'hq' || target === 'turkiye');
    if (serviceAngles[target]) {
      targetRotation = serviceAngles[target];
      const match = scrollSequence.find(s => s.id === target || s.aliasId === target);
      if (match) updateScrollServiceHud(match);
    }
  };

  window.focusService = window.focusContinent;

  // Safe dummy for compatibility
  window.triggerSunbeam = function() {};

  // Wire solar-sector-chips on click/hover
  document.querySelectorAll('.solar-sector-chip').forEach(chip => {
    chip.addEventListener('mouseenter', () => {
      const focus = chip.dataset.sectorFocus;
      if (focus && window.focusContinent) window.focusContinent(focus);
    });
    chip.addEventListener('click', () => {
      const focus = chip.dataset.sectorFocus;
      if (focus && window.focusContinent) window.focusContinent(focus);
    });
  });

  // 15. Animation Loop
  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    const time = clock.getElapsedTime();

    // Slow atmospheric cloud drift
    cloudsMesh.rotation.y += delta * 0.018;

    // Target rotation (when triggered by navbar or interactive HUD chips)
    if (targetRotation && !isDragging) {
      earthGroup.rotation.x += (targetRotation.x - earthGroup.rotation.x) * 0.07;
      earthGroup.rotation.y += (targetRotation.y - earthGroup.rotation.y) * 0.07;
    } else if (autoRotate && !isDragging) {
      earthGroup.rotation.y += delta * 0.038;
    } else if (!isDragging) {
      rotateVelocity.x *= 0.94;
      rotateVelocity.y *= 0.94;
      earthGroup.rotation.x += rotateVelocity.x;
      earthGroup.rotation.y += rotateVelocity.y;
    }

    // Pulse Turkey Ring Beacon (Calm radar pulse)
    const pulseSpeed = beaconBoost ? 1.8 : 1.2;
    const pulse1 = (time * pulseSpeed) % 1;
    ringMesh1.scale.set(1 + pulse1 * 1.8, 1 + pulse1 * 1.8, 1);
    ringMat1.opacity = Math.max(0, (1 - pulse1) * 0.7);

    const pulse2 = (time * pulseSpeed + 0.5) % 1;
    ringMesh2.scale.set(1 + pulse2 * 2.0, 1 + pulse2 * 2.0, 1);
    ringMat2.opacity = Math.max(0, (1 - pulse2) * 0.5);

    // Pulse Continent Pins & Animate Subtle Photon Light Pulses along Great-Circle Arcs
    networkArcs.forEach(item => {
      const { arcPoints, pulseMesh, index } = item;
      const progress = ((time * 0.22 + index * 0.16) % 1);
      const ptIndex = Math.min(arcPoints.length - 1, Math.floor(progress * arcPoints.length));
      pulseMesh.position.copy(arcPoints[ptIndex]);
      const fade = Math.sin(progress * Math.PI);
      pulseMesh.scale.setScalar(0.8 + fade * 0.4);
      pulseMesh.material.opacity = fade * 0.75;
    });

    continentPins.forEach((pin, i) => {
      const ringPulse = (time * 1.2 + i * 0.3) % 1;
      pin.pinRingMesh.scale.set(1 + ringPulse * 1.5, 1 + ringPulse * 1.5, 1);
      pin.pinRingMat.opacity = Math.max(0, (1 - ringPulse) * 0.45);
    });

    // Camera & Earth scroll response: Earth pulls back smoothly into deep space as user scrolls
    const scrollRange = window.innerHeight || height || 800;
    const scrollFactor = Math.min(1, Math.max(0, scrollY / scrollRange));
    camera.position.z = 7.0 + scrollFactor * 9.5;
    camera.position.y = 0 - scrollFactor * 1.8;
    if (earthGroup) {
      const globeZoom = Math.max(0.42, 1.0 - scrollFactor * 0.58);
      earthGroup.scale.setScalar(globeZoom);
    }

    // Smoothly fade and lift the top brand lockup during the initial scroll
    const brandStage = document.getElementById('space-hero-brand-stage');
    if (brandStage) {
      const fadeFactor = Math.min(1, Math.max(0, scrollY / 300));
      brandStage.style.opacity = String(Math.max(0, 1 - fadeFactor * 1.15));
      brandStage.style.transform = `translateY(-${fadeFactor * 45}px)`;
    }

    renderer.render(scene, camera);
  }

  animate();
  initAppleBrandFilm();
}

// ==========================================================================
// BORADEN APPLE & DELOITTE COMMERCIAL FILM INTERACTIVE CONTROLLER
// ==========================================================================
export function initAppleBrandFilm() {
  if (typeof document === 'undefined') return;
  const video = document.getElementById('brand-film-video');
  const stage = document.querySelector('.apple-cinema-stage');
  if (!video || !stage) return;

  const chapterTabs = document.querySelectorAll('.apple-chapter-tab');
  const timeDisplay = document.getElementById('cinema-time-display');
  const replayBtn = document.getElementById('cinema-replay');
  const soundBtn = document.getElementById('cinema-sound-btn');

  const chapters = [
    { start: 0, end: 4 },
    { start: 4, end: 8 },
    { start: 8, end: 12 },
    { start: 12, end: 16 },
    { start: 16, end: 20 }
  ];

  function updateTimeline() {
    const curTime = video.currentTime || 0;
    const dur = Number.isFinite(video.duration) && video.duration > 0 ? video.duration : 20;

    if (timeDisplay) {
      const curM = String(Math.floor(curTime / 60)).padStart(2, '0');
      const curS = String(Math.floor(curTime % 60)).padStart(2, '0');
      const durM = String(Math.floor(dur / 60)).padStart(2, '0');
      const durS = String(Math.floor(dur % 60)).padStart(2, '0');
      timeDisplay.textContent = `${curM}:${curS} / ${durM}:${durS}`;
    }

    chapterTabs.forEach((tab, idx) => {
      const ch = chapters[idx];
      if (!ch) return;
      const fill = tab.querySelector('.chapter-fill');
      const isActive = curTime >= ch.start && (idx === chapters.length - 1 ? curTime <= ch.end + 0.5 : curTime < ch.end);

      tab.classList.toggle('is-active', isActive);
      tab.setAttribute('aria-selected', String(isActive));

      if (fill) {
        if (curTime < ch.start) {
          fill.style.width = '0%';
        } else if (curTime >= ch.end) {
          fill.style.width = '100%';
        } else {
          const progress = Math.min(100, Math.max(0, ((curTime - ch.start) / (ch.end - ch.start)) * 100));
          fill.style.width = progress + '%';
        }
      }
    });
  }

  video.addEventListener('timeupdate', updateTimeline);
  video.addEventListener('loadedmetadata', updateTimeline);

  chapterTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const targetTime = Number(tab.dataset.jumpTo || 0);
      if (!video.src && video.dataset.src) {
        video.src = video.dataset.src;
      }
      video.currentTime = targetTime;
      video.play().catch(() => {});
      updateTimeline();
    });
  });

  if (replayBtn) {
    replayBtn.addEventListener('click', () => {
      video.currentTime = 0;
      video.play().catch(() => {});
      updateTimeline();
    });
  }

  let audioCtx = null;
  let masterGain = null;
  let synthNodes = [];
  let isSoundActive = false;

  function initAmbientSynth() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return false;
      audioCtx = new AudioContext();

      masterGain = audioCtx.createGain();
      masterGain.gain.setValueAtTime(0.001, audioCtx.currentTime);

      const filter = audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(480, audioCtx.currentTime);
      filter.Q.setValueAtTime(1.2, audioCtx.currentTime);

      const lfo = audioCtx.createOscillator();
      const lfoGain = audioCtx.createGain();
      lfo.frequency.setValueAtTime(0.12, audioCtx.currentTime);
      lfoGain.gain.setValueAtTime(140, audioCtx.currentTime);
      lfo.connect(filter.frequency);
      lfo.start();

      const chordFreqs = [65.41, 130.81, 196.00, 293.66, 329.63];
      chordFreqs.forEach((freq, i) => {
        const osc = audioCtx.createOscillator();
        const oscGain = audioCtx.createGain();
        osc.type = i === 0 ? 'sine' : (i % 2 === 0 ? 'triangle' : 'sine');
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        osc.detune.setValueAtTime((i - 2) * 3.5, audioCtx.currentTime);

        const volume = i === 0 ? 0.35 : 0.18 / (i + 1);
        oscGain.gain.setValueAtTime(volume, audioCtx.currentTime);

        osc.connect(oscGain);
        oscGain.connect(filter);
        osc.start();
        synthNodes.push(osc);
      });

      filter.connect(masterGain);
      masterGain.connect(audioCtx.destination);
      return true;
    } catch (e) {
      console.warn('Web Audio Ambient Synth unavailable:', e);
      return false;
    }
  }

  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      if (!isSoundActive) {
        if (!audioCtx) {
          initAmbientSynth();
        }
        if (audioCtx && audioCtx.state === 'suspended') {
          audioCtx.resume();
        }
        if (masterGain && audioCtx) {
          masterGain.gain.cancelScheduledValues(audioCtx.currentTime);
          masterGain.gain.setTargetAtTime(0.18, audioCtx.currentTime, 0.6);
        }
        isSoundActive = true;
        soundBtn.setAttribute('aria-pressed', 'true');
        soundBtn.innerHTML = '<span class="sound-icon">🔊</span><span class="sound-label">Atmosfer Ses: Açık</span>';
        video.muted = false;
      } else {
        if (masterGain && audioCtx) {
          masterGain.gain.cancelScheduledValues(audioCtx.currentTime);
          masterGain.gain.setTargetAtTime(0.0001, audioCtx.currentTime, 0.4);
        }
        isSoundActive = false;
        soundBtn.setAttribute('aria-pressed', 'false');
        soundBtn.innerHTML = '<span class="sound-icon">🔇</span><span class="sound-label">Atmosfer Ses</span>';
        video.muted = true;
      }
    });
  }

  updateTimeline();
}

