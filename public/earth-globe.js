// Boraden 3D Earth & Global Service Network Engine
// Interactive 3D Canvas Globe with Night Lights, Türkiye Central Beacon & Continents

export function initBoradenEarth() {
  const container = document.getElementById('earth-canvas-container');
  if (!container) return;

  const canvas = document.createElement('canvas');
  canvas.id = 'earth-canvas';
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = container.clientWidth || window.innerWidth);
  let height = (canvas.height = container.clientHeight || window.innerHeight);

  // Geographic Nodes (Türkiye is Boraden HQ; Continents are Global Services)
  const TURKEY = { name: 'Türkiye (Boraden Merkez)', lat: 39.0, lon: 35.2, isHQ: true };

  const CONTINENTS = [
    { id: 'vergi', name: 'Avrupa Kıtası', service: '01 Vergi & Mevzuat Danışmanlığı', lat: 50.5, lon: 10.5, color: '#356e91', tag: 'Vergi, KDV & Tam Tasdik' },
    { id: 'denetim', name: 'Kuzey Amerika Kıtası', service: '02 Bağımsız Denetim & UFRS', lat: 40.7, lon: -95.0, color: '#cb6651', tag: 'SPK, KGK, SEC & US GAAP' },
    { id: 'danismanlik', name: 'Orta Doğu & Körfez', service: '03 Kurumsal Danışmanlık & M&A', lat: 25.2, lon: 55.3, color: '#41885f', tag: 'Şirket Değerleme & Birleşme' },
    { id: 'insan', name: 'Afrika Kıtası', service: '04 Bordro & İK Operasyonu', lat: 2.0, lon: 24.0, color: '#3c7a9c', tag: '3.500+ Personel & SGK Teşvik' },
    { id: 'sistem', name: 'Asya-Pasifik Kıtası', service: '05 Sistemler & İş Zekâsı (BI)', lat: 34.0, lon: 125.0, color: '#c46c57', tag: 'ERP, Finansal Modelleme' },
    { id: 'akademi', name: 'Güney Amerika Kıtası', service: '06 Boraden Akademi', lat: -16.0, lon: -54.0, color: '#488c65', tag: 'Kurumsal Finansal Seminerler' }
  ];

  // Procedural Earth Landmass Dots (Simplified world coastlines for crisp 3D projection)
  const landPoints = generateLandmassGrid();
  const stars = generateStarfield(180);

  let rotY = -0.55; // Initial rotation focusing on Europe / Mediterranean / Turkey
  let rotX = 0.28;
  let targetRotY = rotY;
  let targetRotX = rotX;
  let autoRotate = true;
  let hoveredNode = null;
  let pulseTime = 0;
  let isDragging = false;
  let lastMouseX = 0;
  let lastMouseY = 0;
  let scrollProgress = 0;

  function generateLandmassGrid() {
    // Generate realistic continent cluster coordinates [lat, lon, density]
    const clusters = [
      // Europe & Anatolia (detailed)
      { lat: 39, lon: 35, r: 8, count: 40 }, // Turkey
      { lat: 48, lon: 14, r: 16, count: 65 }, // Central Europe
      { lat: 55, lon: -3, r: 10, count: 25 }, // UK
      { lat: 60, lon: 20, r: 15, count: 35 }, // Scandinavia
      { lat: 40, lon: -4, r: 9, count: 30 },  // Iberia
      // North America
      { lat: 42, lon: -85, r: 24, count: 85 },
      { lat: 52, lon: -105, r: 25, count: 50 },
      { lat: 30, lon: -90, r: 18, count: 45 },
      // South America
      { lat: -10, lon: -55, r: 22, count: 60 },
      { lat: -25, lon: -60, r: 16, count: 40 },
      // Asia
      { lat: 35, lon: 105, r: 28, count: 90 }, // China/East Asia
      { lat: 22, lon: 80, r: 18, count: 50 },  // India
      { lat: 58, lon: 85, r: 35, count: 70 },  // Siberia/Russia
      { lat: 36, lon: 138, r: 10, count: 30 }, // Japan
      // Middle East
      { lat: 26, lon: 48, r: 14, count: 40 },
      // Africa
      { lat: 10, lon: 22, r: 26, count: 80 },
      { lat: -20, lon: 25, r: 18, count: 45 },
      // Australia
      { lat: -25, lon: 135, r: 18, count: 45 }
    ];

    const pts = [];
    clusters.forEach(c => {
      for (let i = 0; i < c.count; i++) {
        const u = Math.random();
        const v = Math.random();
        const rad = Math.sqrt(u) * c.r;
        const angle = v * 2 * Math.PI;
        const lat = c.lat + rad * Math.sin(angle);
        const lon = c.lon + (rad * Math.cos(angle)) / Math.cos((c.lat * Math.PI) / 180 || 1);
        pts.push({ lat, lon, intensity: 0.4 + Math.random() * 0.6 });
      }
    });
    return pts;
  }

  function generateStarfield(count) {
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        x: Math.random() * 2 - 1,
        y: Math.random() * 2 - 1,
        z: Math.random(),
        size: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.7 + 0.3
      });
    }
    return arr;
  }

  // Convert Spherical Lat/Lon to 3D Cartesian [x, y, z] on sphere of radius R
  function latLonTo3D(lat, lon, radius) {
    const phi = ((90 - lat) * Math.PI) / 180;
    const theta = ((lon + 180) * Math.PI) / 180;
    return {
      x: -radius * Math.sin(phi) * Math.cos(theta),
      y: radius * Math.cos(phi),
      z: radius * Math.sin(phi) * Math.sin(theta)
    };
  }

  // Rotate 3D vector by rotX (around X axis) and rotY (around Y axis)
  function rotate3D(v, rx, ry) {
    // Rotate Y
    const cosY = Math.cos(ry), sinY = Math.sin(ry);
    const x1 = v.x * cosY + v.z * sinY;
    const z1 = -v.x * sinY + v.z * cosY;

    // Rotate X
    const cosX = Math.cos(rx), sinX = Math.sin(rx);
    const y2 = v.y * cosX - z1 * sinX;
    const z2 = v.y * sinX + z1 * cosX;

    return { x: x1, y: y2, z: z2 };
  }

  // 3D Point to Screen Coordinate Projection
  function project(p, radius, cx, cy) {
    const scale = 1100 / (1100 + p.z);
    return {
      x: cx + p.x * scale,
      y: cy - p.y * scale,
      visible: p.z > -radius * 0.15,
      scale: scale,
      depth: p.z
    };
  }

  // Draw Great Circle Curving Arc between two lat/lon points
  function drawCurvedBeam(from, to, radius, cx, cy, active) {
    const steps = 36;
    const pts = [];
    const p1 = latLonTo3D(from.lat, from.lon, radius);
    const p2 = latLonTo3D(to.lat, to.lon, radius);

    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      // Spherical linear interpolation with parabolic altitude lift
      const altitude = Math.sin(t * Math.PI) * (radius * 0.28);
      const curRadius = radius + altitude;

      const lx = p1.x + (p2.x - p1.x) * t;
      const ly = p1.y + (p2.y - p1.y) * t;
      const lz = p1.z + (p2.z - p1.z) * t;
      const mag = Math.sqrt(lx * lx + ly * ly + lz * lz) || 1;

      const norm = {
        x: (lx / mag) * curRadius,
        y: (ly / mag) * curRadius,
        z: (lz / mag) * curRadius
      };

      const rot = rotate3D(norm, rotX, rotY);
      const prj = project(rot, radius, cx, cy);
      pts.push(prj);
    }

    // Render beam path
    ctx.beginPath();
    let started = false;
    for (let i = 0; i < pts.length; i++) {
      if (pts[i].visible) {
        if (!started) {
          ctx.moveTo(pts[i].x, pts[i].y);
          started = true;
        } else {
          ctx.lineTo(pts[i].x, pts[i].y);
        }
      }
    }

    if (active) {
      ctx.strokeStyle = 'rgba(255, 235, 160, 0.85)';
      ctx.lineWidth = 2.4;
      ctx.shadowColor = '#e2b153';
      ctx.shadowBlur = 14;
      ctx.stroke();

      // Pulsing energy particle along the beam
      const pulseT = (pulseTime * 1.5) % 1;
      const pIdx = Math.floor(pulseT * (pts.length - 1));
      const pPoint = pts[pIdx];
      if (pPoint && pPoint.visible) {
        ctx.beginPath();
        ctx.arc(pPoint.x, pPoint.y, 4.5, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#ffe394';
        ctx.shadowBlur = 18;
        ctx.fill();
      }
    } else {
      ctx.strokeStyle = 'rgba(100, 180, 240, 0.18)';
      ctx.lineWidth = 1.0;
      ctx.shadowBlur = 0;
      ctx.stroke();
    }
  }

  // Animation Loop
  function render() {
    pulseTime += 0.025;

    // Smooth rotation towards target
    if (autoRotate && !isDragging) {
      targetRotY += 0.0018;
    }
    rotY += (targetRotY - rotY) * 0.06;
    rotX += (targetRotX - rotX) * 0.06;

    // Viewport & Scale adjustments based on scroll
    const baseRadius = Math.min(width, height) * 0.38;
    // As user scrolls down, Earth slowly zooms out and recedes
    const currentRadius = baseRadius * Math.max(0.65, 1.0 - scrollProgress * 0.35);
    const cx = width * 0.5;
    const cy = height * 0.52 - scrollProgress * 80;

    ctx.clearRect(0, 0, width, height);

    // 1. Draw Starfield
    stars.forEach(s => {
      const sx = (s.x * width * 0.5 + cx + width) % width;
      const sy = (s.y * height * 0.5 + cy + height) % height;
      const flicker = Math.sin(pulseTime * 2 + s.z * 10) * 0.25;
      ctx.beginPath();
      ctx.arc(sx, sy, s.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200, 225, 255, ${Math.max(0.1, s.alpha + flicker)})`;
      ctx.fill();
    });

    // 2. Earth Sphere Backdrop & Atmospheric Rim Glow
    const atmosGrad = ctx.createRadialGradient(cx, cy, currentRadius * 0.85, cx, cy, currentRadius * 1.25);
    atmosGrad.addColorStop(0, 'rgba(14, 42, 71, 0.28)');
    atmosGrad.addColorStop(0.7, 'rgba(56, 140, 200, 0.12)');
    atmosGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.beginPath();
    ctx.arc(cx, cy, currentRadius * 1.25, 0, Math.PI * 2);
    ctx.fillStyle = atmosGrad;
    ctx.fill();

    // Dark Earth Body
    const globeGrad = ctx.createRadialGradient(cx - currentRadius * 0.3, cy - currentRadius * 0.3, currentRadius * 0.1, cx, cy, currentRadius);
    globeGrad.addColorStop(0, '#0a1d30');
    globeGrad.addColorStop(0.65, '#050f1a');
    globeGrad.addColorStop(1, '#02060c');
    ctx.beginPath();
    ctx.arc(cx, cy, currentRadius, 0, Math.PI * 2);
    ctx.fillStyle = globeGrad;
    ctx.fill();

    // Globe Limiting Border / Thin Rim
    ctx.beginPath();
    ctx.arc(cx, cy, currentRadius, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(90, 160, 220, 0.32)';
    ctx.lineWidth = 1.2;
    ctx.stroke();

    // 3. Draw Continent Night City Lights (Golden Dots)
    landPoints.forEach(pt => {
      const p3d = latLonTo3D(pt.lat, pt.lon, currentRadius);
      const r = rotate3D(p3d, rotX, rotY);
      if (r.z > 0) { // Front side only
        const prj = project(r, currentRadius, cx, cy);
        const depthAlpha = Math.min(1, Math.max(0, r.z / currentRadius));
        ctx.beginPath();
        ctx.arc(prj.x, prj.y, 1.1 * prj.scale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(235, 195, 115, ${pt.intensity * depthAlpha * 0.85})`;
        ctx.fill();
      }
    });

    // 4. Draw Beams connecting Türkiye (Boraden HQ) to Global Continents
    CONTINENTS.forEach(cont => {
      const isActive = hoveredNode && (hoveredNode.id === cont.id || hoveredNode.isHQ);
      drawCurvedBeam(TURKEY, cont, currentRadius, cx, cy, isActive);
    });

    // 5. Draw Continents Nodes
    CONTINENTS.forEach(cont => {
      const p3d = latLonTo3D(cont.lat, cont.lon, currentRadius);
      const r = rotate3D(p3d, rotX, rotY);
      if (r.z > -currentRadius * 0.1) {
        const prj = project(r, currentRadius, cx, cy);
        const isHovered = hoveredNode && hoveredNode.id === cont.id;
        const depthAlpha = Math.min(1, Math.max(0.2, (r.z + currentRadius * 0.2) / currentRadius));

        // Node Glow Ring
        ctx.beginPath();
        ctx.arc(prj.x, prj.y, (isHovered ? 8 : 5) * prj.scale, 0, Math.PI * 2);
        ctx.fillStyle = cont.color;
        ctx.shadowColor = cont.color;
        ctx.shadowBlur = isHovered ? 20 : 8;
        ctx.globalAlpha = depthAlpha;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;

        // Label on Node
        if (r.z > currentRadius * 0.2) {
          ctx.font = `${isHovered ? 'bold 12px' : '10px'} Manrope, sans-serif`;
          ctx.fillStyle = isHovered ? '#ffffff' : 'rgba(230, 240, 255, 0.85)';
          ctx.textAlign = 'center';
          ctx.fillText(cont.name, prj.x, prj.y - 12);
        }
      }
    });

    // 6. Draw Türkiye (Boraden HQ) Central Beacon
    const tr3d = latLonTo3D(TURKEY.lat, TURKEY.lon, currentRadius);
    const trR = rotate3D(tr3d, rotX, rotY);
    if (trR.z > -currentRadius * 0.1) {
      const trPrj = project(trR, currentRadius, cx, cy);
      const depthAlpha = Math.min(1, Math.max(0.3, (trR.z + currentRadius * 0.2) / currentRadius));

      // Concentric Expanding Pulse Rings
      const ringRadius = 8 + (pulseTime * 20) % 24;
      const ringAlpha = (1 - (ringRadius - 8) / 24) * depthAlpha;

      ctx.beginPath();
      ctx.arc(trPrj.x, trPrj.y, ringRadius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(226, 177, 83, ${ringAlpha})`;
      ctx.lineWidth = 1.6;
      ctx.stroke();

      // Central HQ Core
      ctx.beginPath();
      ctx.arc(trPrj.x, trPrj.y, 6.5, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#e2b153';
      ctx.shadowBlur = 24;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Headquarters Badge
      ctx.font = 'bold 11px Manrope, sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.fillText('BORADEN MERKEZ', trPrj.x, trPrj.y - 14);
      ctx.font = '9px Manrope, sans-serif';
      ctx.fillStyle = '#e2b153';
      ctx.fillText('Türkiye', trPrj.x, trPrj.y + 18);
    }

    requestAnimationFrame(render);
  }

  // Resize handler
  function handleResize() {
    width = canvas.width = container.clientWidth || window.innerWidth;
    height = canvas.height = container.clientHeight || window.innerHeight;
  }
  window.addEventListener('resize', handleResize);

  // Mouse interaction & rotation
  canvas.addEventListener('mousedown', e => {
    isDragging = true;
    autoRotate = false;
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  window.addEventListener('mousemove', e => {
    if (isDragging) {
      const dx = e.clientX - lastMouseX;
      const dy = e.clientY - lastMouseY;
      targetRotY += dx * 0.005;
      targetRotX = Math.max(-0.6, Math.min(0.6, targetRotX + dy * 0.005));
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    }
  });

  // Hover detection on Continents
  canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const baseRadius = Math.min(width, height) * 0.38;
    const currentRadius = baseRadius * Math.max(0.65, 1.0 - scrollProgress * 0.35);
    const cx = width * 0.5;
    const cy = height * 0.52 - scrollProgress * 80;

    let found = null;
    CONTINENTS.forEach(cont => {
      const p3d = latLonTo3D(cont.lat, cont.lon, currentRadius);
      const r = rotate3D(p3d, rotX, rotY);
      if (r.z > 0) {
        const prj = project(r, currentRadius, cx, cy);
        const dist = Math.hypot(prj.x - mx, prj.y - my);
        if (dist < 28) found = cont;
      }
    });

    if (found !== hoveredNode) {
      hoveredNode = found;
      updateHudCard(found);
    }
  });

  // Update HUD Card in HTML
  const hudCard = document.getElementById('earth-hud-card');
  const hudTitle = document.getElementById('hud-continent-title');
  const hudService = document.getElementById('hud-service-name');
  const hudTag = document.getElementById('hud-service-tag');

  function updateHudCard(node) {
    if (!hudCard) return;
    if (node) {
      hudCard.classList.add('is-active');
      if (hudTitle) hudTitle.textContent = node.name;
      if (hudService) hudService.textContent = node.service;
      if (hudTag) hudTag.textContent = node.tag;
    } else {
      hudCard.classList.remove('is-active');
    }
  }

  // External trigger (from navbar or service buttons)
  window.focusContinent = function(serviceId) {
    if (serviceId === 'all' || serviceId === 'hq') {
      hoveredNode = TURKEY;
      targetRotY = -0.55;
      targetRotX = 0.28;
      updateHudCard({ name: 'BORADEN MERKEZ (TÜRKİYE)', service: '7 Kıtaya Yayılan Çözüm Mimarisi', tag: 'Vergi, Denetim, Danışmanlık & Bordro' });
      return;
    }
    const node = CONTINENTS.find(c => c.id === serviceId);
    if (node) {
      hoveredNode = node;
      autoRotate = false;
      // Rotate globe so target lon faces viewer
      targetRotY = -((node.lon + 90) * Math.PI) / 180;
      targetRotX = (node.lat * Math.PI) / 360;
      updateHudCard(node);
    } else {
      hoveredNode = null;
      updateHudCard(null);
    }
  };

  // Scroll tracking: updates zoom and background curtain transition
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const vh = window.innerHeight;
    scrollProgress = Math.max(0, Math.min(1, scrollY / (vh * 0.95)));

    // Update tone transition curtain
    const curtain = document.getElementById('space-tone-curtain');
    if (curtain) {
      curtain.style.opacity = scrollProgress.toFixed(3);
    }
  }, { passive: true });

  render();
}
