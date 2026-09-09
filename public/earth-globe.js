// Boraden Photorealistic 3D Earth Globe Engine
// Canvas-based 3D Spherical Earth with Real Continental Landmasses,
// Night City Lights, Atmospheric Limb Scattering, Türkiye HQ Beacon, and Interactive Orbit.

export function initBoradenEarth() {
  if (typeof document === 'undefined') return;
  const container = document.getElementById('earth-canvas-container');
  if (!container) return;

  const canvas = document.createElement('canvas');
  canvas.id = 'earth-canvas';
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = container.clientWidth || window.innerWidth);
  let height = (canvas.height = container.clientHeight || window.innerHeight);

  // Boraden Headquarters (Ankara/Istanbul, Turkey)
  const TURKEY = { name: 'Boraden Genel Merkez', lat: 39.0, lon: 35.0, isHQ: true };

  // Realistic Continental Landmass Polygons & Coastlines (Lat/Lon)
  const CONTINENTS_GEOMETRY = getEarthCoastlines();
  const CITY_LIGHTS = getGlobalCityLights();
  const STARS = generateStarfield(160);

  // Rotation State: Center on Mediterranean / Turkey [39° N, 35° E]
  let rotY = -0.65; // Longitude angle
  let rotX = 0.32;  // Latitude tilt
  let targetRotY = rotY;
  let targetRotX = rotX;
  let autoRotate = true;
  let isDragging = false;
  let lastMouseX = 0;
  let lastMouseY = 0;
  let pulseTime = 0;
  let scrollProgress = 0;

  // Window resize handler
  function handleResize() {
    width = canvas.width = container.clientWidth || window.innerWidth;
    height = canvas.height = container.clientHeight || window.innerHeight;
  }
  window.addEventListener('resize', handleResize, { passive: true });

  // Mouse & Touch Drag Controls for 3D Globe
  function onPointerDown(e) {
    isDragging = true;
    autoRotate = false;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    lastMouseX = clientX;
    lastMouseY = clientY;
  }

  function onPointerMove(e) {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    if (isDragging) {
      const dx = clientX - lastMouseX;
      const dy = clientY - lastMouseY;
      targetRotY += dx * 0.006;
      targetRotX += dy * 0.004;
      targetRotX = Math.max(-1.1, Math.min(1.1, targetRotX));
      lastMouseX = clientX;
      lastMouseY = clientY;
    }
  }

  function onPointerUp() {
    isDragging = false;
    // Resume slow auto-rotation after 3 seconds of inactivity
    clearTimeout(window._earthResumeTimer);
    window._earthResumeTimer = setTimeout(() => {
      autoRotate = true;
    }, 3200);
  }

  canvas.addEventListener('mousedown', onPointerDown);
  window.addEventListener('mousemove', onPointerMove, { passive: true });
  window.addEventListener('mouseup', onPointerUp);

  canvas.addEventListener('touchstart', onPointerDown, { passive: true });
  window.addEventListener('touchmove', onPointerMove, { passive: true });
  window.addEventListener('touchend', onPointerUp);

  // Scroll listener to smoothly scale globe as user scrolls down
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY || window.pageYOffset;
    const heroH = container.clientHeight || 800;
    scrollProgress = Math.min(1, Math.max(0, scrolled / heroH));
  }, { passive: true });

  // Expose focus function for external triggers
  window.focusContinent = function(type) {
    autoRotate = false;
    if (type === 'hq' || type === 'all') {
      targetRotY = -0.65;
      targetRotX = 0.32;
    }
    clearTimeout(window._earthResumeTimer);
    window._earthResumeTimer = setTimeout(() => {
      autoRotate = true;
    }, 4500);
  };

  // Convert Spherical Lat/Lon to 3D Cartesian Coordinate
  function latLonTo3D(lat, lon, radius) {
    const phi = ((90 - lat) * Math.PI) / 180;
    const theta = ((lon + 180) * Math.PI) / 180;
    return {
      x: -radius * Math.sin(phi) * Math.cos(theta),
      y: radius * Math.cos(phi),
      z: radius * Math.sin(phi) * Math.sin(theta)
    };
  }

  // 3D Matrix Rotation (rx around X, ry around Y)
  function rotate3D(v, rx, ry) {
    const cosY = Math.cos(ry), sinY = Math.sin(ry);
    const x1 = v.x * cosY + v.z * sinY;
    const z1 = -v.x * sinY + v.z * cosY;

    const cosX = Math.cos(rx), sinX = Math.sin(rx);
    const y2 = v.y * cosX - z1 * sinX;
    const z2 = v.y * sinX + z1 * cosX;

    return { x: x1, y: y2, z: z2 };
  }

  // 3D to 2D Orthographic Screen Projection
  function project(v3d, cx, cy) {
    return {
      x: cx + v3d.x,
      y: cy - v3d.y,
      visible: v3d.z > 0
    };
  }

  // Main Render Loop
  function renderFrame() {
    pulseTime += 0.025;

    if (autoRotate && !isDragging) {
      targetRotY += 0.0018;
    }

    // Smooth inertia lerp
    rotY += (targetRotY - rotY) * 0.08;
    rotX += (targetRotX - rotX) * 0.08;

    ctx.clearRect(0, 0, width, height);

    // Dynamic Globe Dimensions
    const baseRadius = Math.min(width, height) * 0.36;
    const scale = Math.max(0.45, 1 - scrollProgress * 0.52);
    const radius = baseRadius * scale;
    const cx = width * (width > 900 ? 0.64 : 0.5);
    const cy = height * 0.5 + scrollProgress * (height * 0.22);

    // 1. Draw Deep Space Background Stars
    drawStarfield(ctx, STARS, width, height);

    // 2. Atmospheric Outer Glow Ring (Rayleigh Scattering)
    const atmoGradient = ctx.createRadialGradient(cx, cy, radius * 0.95, cx, cy, radius * 1.25);
    atmoGradient.addColorStop(0, 'rgba(14, 165, 233, 0.28)');
    atmoGradient.addColorStop(0.35, 'rgba(2, 132, 199, 0.12)');
    atmoGradient.addColorStop(0.75, 'rgba(3, 105, 161, 0.04)');
    atmoGradient.addColorStop(1, 'rgba(2, 6, 23, 0)');
    ctx.fillStyle = atmoGradient;
    ctx.beginPath();
    ctx.arc(cx, cy, radius * 1.25, 0, Math.PI * 2);
    ctx.fill();

    // 3. Realistic Oceanic Globe Sphere with 3D Depth
    const oceanGradient = ctx.createRadialGradient(
      cx - radius * 0.35, cy - radius * 0.35, radius * 0.1,
      cx, cy, radius
    );
    oceanGradient.addColorStop(0, '#0a3264');     // Sub-solar sunlit ocean
    oceanGradient.addColorStop(0.4, '#062044');   // Deep ocean abyss
    oceanGradient.addColorStop(0.8, '#031228');   // Oceanic terminator
    oceanGradient.addColorStop(1, '#010814');     // Night limb darkening

    ctx.fillStyle = oceanGradient;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fill();

    // 4. Subtle Latitude & Longitude Coordinate Graticule Lines
    drawGraticule(ctx, cx, cy, radius, rotX, rotY);

    // 5. Draw Continents & Landmasses
    drawContinents(ctx, CONTINENTS_GEOMETRY, cx, cy, radius, rotX, rotY);

    // 6. Draw Night City Lights (Warm golden glow on dark hemisphere)
    drawCityLights(ctx, CITY_LIGHTS, cx, cy, radius, rotX, rotY, pulseTime);

    // 7. Inner Atmospheric Limb Scattering (Luminous Horizon Glow)
    const innerRim = ctx.createRadialGradient(cx, cy, radius * 0.78, cx, cy, radius);
    innerRim.addColorStop(0, 'rgba(56, 189, 248, 0)');
    innerRim.addColorStop(0.85, 'rgba(14, 165, 233, 0.15)');
    innerRim.addColorStop(1, 'rgba(186, 230, 253, 0.45)');
    ctx.fillStyle = innerRim;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fill();

    // 8. Türkiye / Boraden Genel Merkez Beacon & Global Radiation Arcs
    drawTurkeyBeacon(ctx, TURKEY, cx, cy, radius, rotX, rotY, pulseTime);

    requestAnimationFrame(renderFrame);
  }

  // Draw Starfield
  function drawStarfield(ctx, stars, w, h) {
    ctx.save();
    for (let i = 0; i < stars.length; i++) {
      const s = stars[i];
      const sx = (s.x + 1) * 0.5 * w;
      const sy = (s.y + 1) * 0.5 * h;
      const twinkle = 0.5 + 0.5 * Math.sin(pulseTime * 2 + i);
      ctx.fillStyle = `rgba(226, 232, 240, ${s.alpha * twinkle})`;
      ctx.beginPath();
      ctx.arc(sx, sy, s.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  // Draw Subtle Graticule Lines (3D wire grid for depth)
  function drawGraticule(ctx, cx, cy, radius, rx, ry) {
    ctx.save();
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.06)';
    ctx.lineWidth = 0.75;

    // Latitudes (-60 to +60)
    for (let lat = -60; lat <= 60; lat += 30) {
      ctx.beginPath();
      let first = true;
      for (let lon = -180; lon <= 180; lon += 6) {
        const v3 = rotate3D(latLonTo3D(lat, lon, radius), rx, ry);
        if (v3.z > 0) {
          const p = project(v3, cx, cy);
          if (first) { ctx.moveTo(p.x, p.y); first = false; }
          else { ctx.lineTo(p.x, p.y); }
        } else {
          first = true;
        }
      }
      ctx.stroke();
    }
    ctx.restore();
  }

  // Draw Continents (Filled landmass paths + subtle glowing borders)
  function drawContinents(ctx, landmasses, cx, cy, radius, rx, ry) {
    ctx.save();

    for (let l = 0; l < landmasses.length; l++) {
      const poly = landmasses[l];
      if (poly.length < 3) continue;

      ctx.beginPath();
      let visiblePoints = 0;
      let first = true;

      for (let i = 0; i < poly.length; i++) {
        const pt = poly[i];
        const v3 = rotate3D(latLonTo3D(pt[0], pt[1], radius), rx, ry);
        if (v3.z > -radius * 0.15) {
          const p = project(v3, cx, cy);
          if (first) {
            ctx.moveTo(p.x, p.y);
            first = false;
          } else {
            ctx.lineTo(p.x, p.y);
          }
          if (v3.z > 0) visiblePoints++;
        }
      }

      if (visiblePoints > 1) {
        ctx.closePath();
        // Land gradient (subtle illumination)
        ctx.fillStyle = 'rgba(28, 58, 92, 0.75)';
        ctx.fill();

        ctx.strokeStyle = 'rgba(56, 189, 248, 0.45)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    ctx.restore();
  }

  // Draw Night City Lights
  function drawCityLights(ctx, cities, cx, cy, radius, rx, ry, time) {
    ctx.save();
    for (let i = 0; i < cities.length; i++) {
      const c = cities[i];
      const v3 = rotate3D(latLonTo3D(c.lat, c.lon, radius), rx, ry);
      if (v3.z > 0) {
        const p = project(v3, cx, cy);
        const flicker = 0.7 + 0.3 * Math.sin(time * 3 + i);
        const lightAlpha = Math.min(1, Math.max(0.2, (1 - v3.z / radius) * 1.2)) * flicker;

        ctx.fillStyle = `rgba(253, 224, 71, ${lightAlpha * 0.85})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, c.size || 1.4, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.restore();
  }

  // Draw Türkiye Beacon (Boraden Genel Merkez)
  function drawTurkeyBeacon(ctx, hq, cx, cy, radius, rx, ry, time) {
    const v3 = rotate3D(latLonTo3D(hq.lat, hq.lon, radius), rx, ry);
    if (v3.z <= 0) return; // Behind globe

    const p = project(v3, cx, cy);
    const zScale = 0.5 + (v3.z / radius) * 0.5;

    ctx.save();

    // 1. Concentric Expanding Radar Waves
    for (let i = 0; i < 3; i++) {
      const phase = (time * 0.8 + i * 0.33) % 1;
      const ringR = (8 + phase * 42) * zScale;
      const alpha = (1 - phase) * 0.75;

      ctx.strokeStyle = i % 2 === 0 ? `rgba(2, 132, 199, ${alpha})` : `rgba(34, 197, 94, ${alpha})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(p.x, p.y, ringR, 0, Math.PI * 2);
      ctx.stroke();
    }

    // 2. Global Radiation Arc Lines to Financial Centers
    const TARGETS = [
      { name: 'Londra', lat: 51.5, lon: -0.1 },
      { name: 'Frankfurt', lat: 50.1, lon: 8.6 },
      { name: 'Dubai', lat: 25.2, lon: 55.3 },
      { name: 'New York', lat: 40.7, lon: -74.0 },
      { name: 'Tokyo', lat: 35.6, lon: 139.6 }
    ];

    TARGETS.forEach(target => {
      const tv3 = rotate3D(latLonTo3D(target.lat, target.lon, radius), rx, ry);
      if (tv3.z > -radius * 0.1) {
        const tp = project(tv3, cx, cy);
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.22)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        const midX = (p.x + tp.x) * 0.5 - (p.y - tp.y) * 0.12;
        const midY = (p.y + tp.y) * 0.5 + (p.x - tp.x) * 0.12;
        ctx.quadraticCurveTo(midX, midY, tp.x, tp.y);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    });

    // 3. Central Core Glowing Diamond
    const coreGrad = ctx.createRadialGradient(p.x, p.y, 1, p.x, p.y, 14 * zScale);
    coreGrad.addColorStop(0, '#ffffff');
    coreGrad.addColorStop(0.4, '#38bdf8');
    coreGrad.addColorStop(0.8, '#0284c7');
    coreGrad.addColorStop(1, 'rgba(2, 132, 199, 0)');

    ctx.fillStyle = coreGrad;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 14 * zScale, 0, Math.PI * 2);
    ctx.fill();

    // Solid inner point
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(p.x, p.y, 3.5 * zScale, 0, Math.PI * 2);
    ctx.fill();

    // 4. Professional HUD Label Box
    const labelX = p.x + 36 * zScale;
    const labelY = p.y - 32 * zScale;

    // Leader line
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.75)';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(p.x + 6, p.y - 6);
    ctx.lineTo(p.x + 24 * zScale, p.y - 24 * zScale);
    ctx.lineTo(p.x + 85 * zScale, p.y - 24 * zScale);
    ctx.stroke();

    // Label Text
    ctx.fillStyle = '#38bdf8';
    ctx.font = '700 9px Manrope, sans-serif';
    ctx.fillText('BORADEN GENEL MERKEZ', p.x + 28 * zScale, p.y - 28 * zScale);

    ctx.fillStyle = '#ffffff';
    ctx.font = '800 12px Manrope, sans-serif';
    ctx.fillText('TÜRKİYE (1993)', p.x + 28 * zScale, p.y - 12 * zScale);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '500 8.5px Manrope, sans-serif';
    ctx.fillText('Bağımsız Denetim • KGK • SPK • BDDK', p.x + 28 * zScale, p.y - 2 * zScale);

    ctx.restore();
  }

  // Start Animation
  requestAnimationFrame(renderFrame);
}

// Generate Starfield Coordinates
function generateStarfield(count) {
  const arr = [];
  for (let i = 0; i < count; i++) {
    arr.push({
      x: Math.random() * 2 - 1,
      y: Math.random() * 2 - 1,
      size: Math.random() * 1.4 + 0.6,
      alpha: Math.random() * 0.7 + 0.3
    });
  }
  return arr;
}

// Realistic Earth Coastlines & Continental Polygons [Lat, Lon]
function getEarthCoastlines() {
  return [
    // Europe & Scandinavia & Anatolia
    [
      [36, -6], [43, -9], [44, -1], [49, -2], [51, 2], [54, 8], [55, 12], [58, 11], [63, 11], [69, 16],
      [71, 26], [68, 30], [60, 28], [54, 20], [54, 14], [46, 14], [41, 15], [38, 15], [40, 19], [37, 22],
      [40, 26], [42, 29], [41, 36], [41, 41], [37, 36], [36, 32], [37, 28], [37, 22], [41, 13], [44, 8],
      [43, 3], [37, -2], [36, -6]
    ],
    // Anatolia / Turkey (Detail)
    [
      [42, 28], [42, 35], [41, 41], [37, 44], [37, 36], [36, 32], [37, 27], [40, 26], [42, 28]
    ],
    // British Isles
    [
      [50, -5], [54, -3], [58, -5], [58, -3], [54, 0], [51, 1], [50, -1], [50, -5]
    ],
    // Africa
    [
      [37, 10], [33, 11], [31, 25], [31, 32], [27, 34], [22, 37], [12, 44], [12, 51], [2, 45],
      [-5, 39], [-15, 40], [-25, 33], [-34, 26], [-34, 18], [-23, 14], [-12, 13], [5, 9], [4, 7],
      [5, 1], [5, -4], [10, -13], [15, -17], [21, -17], [28, -13], [35, -6], [36, -1], [37, 10]
    ],
    // Asia & Middle East & India & China
    [
      [41, 41], [40, 50], [37, 53], [30, 48], [25, 56], [22, 59], [17, 54], [13, 45],
      [15, 43], [28, 34], [31, 35], [34, 36], [37, 36], [41, 41]
    ],
    [
      [24, 68], [19, 73], [10, 76], [8, 77], [13, 80], [17, 83], [22, 89], [21, 92], [16, 96],
      [8, 100], [1, 104], [6, 108], [11, 109], [22, 108], [22, 114], [25, 119], [32, 121],
      [37, 120], [40, 122], [40, 128], [42, 131], [48, 135], [55, 137], [60, 143], [60, 160],
      [66, 170], [70, 178], [72, 140], [73, 110], [76, 95], [70, 60], [67, 55], [55, 60],
      [50, 50], [43, 47], [37, 53], [28, 62], [24, 68]
    ],
    // Japan
    [
      [31, 131], [35, 136], [40, 140], [44, 144], [43, 141], [37, 137], [34, 132], [31, 131]
    ],
    // North America
    [
      [25, -80], [30, -81], [35, -75], [41, -71], [45, -66], [47, -53], [52, -56], [58, -63],
      [62, -64], [68, -82], [72, -95], [70, -130], [71, -156], [65, -168], [60, -165], [55, -160],
      [58, -135], [50, -125], [40, -124], [32, -117], [23, -110], [24, -107], [20, -105], [16, -93],
      [15, -88], [21, -87], [29, -89], [30, -84], [25, -80]
    ],
    // South America
    [
      [12, -72], [10, -62], [5, -52], [-3, -40], [-8, -35], [-18, -39], [-23, -43], [-32, -52],
      [-40, -62], [-54, -68], [-55, -66], [-46, -75], [-35, -72], [-18, -71], [-5, -81], [5, -77],
      [9, -79], [12, -72]
    ],
    // Australia
    [
      [-12, 132], [-12, 136], [-16, 140], [-25, 153], [-33, 151], [-38, 147], [-37, 140],
      [-35, 136], [-32, 132], [-35, 116], [-30, 115], [-22, 114], [-17, 122], [-15, 129], [-12, 132]
    ]
  ];
}

// Major World City Lights [Lat, Lon, Size]
function getGlobalCityLights() {
  return [
    // Turkey & Eastern Med
    { lat: 41.0, lon: 29.0, size: 2.2 }, // Istanbul
    { lat: 39.9, lon: 32.8, size: 2.0 }, // Ankara
    { lat: 38.4, lon: 27.1, size: 1.8 }, // Izmir
    { lat: 37.0, lon: 35.3, size: 1.5 }, // Adana
    { lat: 36.8, lon: 30.7, size: 1.5 }, // Antalya
    { lat: 40.2, lon: 29.0, size: 1.6 }, // Bursa
    { lat: 37.9, lon: 32.5, size: 1.4 }, // Konya
    { lat: 37.1, lon: 37.4, size: 1.5 }, // Gaziantep
    // Europe
    { lat: 48.8, lon: 2.3, size: 2.0 },  // Paris
    { lat: 51.5, lon: -0.1, size: 2.2 }, // London
    { lat: 50.1, lon: 8.6, size: 1.8 },  // Frankfurt
    { lat: 52.5, lon: 13.4, size: 1.8 }, // Berlin
    { lat: 41.9, lon: 12.5, size: 1.8 }, // Rome
    { lat: 40.4, lon: -3.7, size: 1.8 }, // Madrid
    { lat: 48.2, lon: 16.3, size: 1.6 }, // Vienna
    { lat: 50.8, lon: 4.3, size: 1.6 },  // Brussels
    { lat: 52.3, lon: 4.9, size: 1.7 },  // Amsterdam
    { lat: 55.7, lon: 37.6, size: 2.0 }, // Moscow
    // Middle East & Gulf
    { lat: 25.2, lon: 55.3, size: 2.0 }, // Dubai
    { lat: 24.5, lon: 54.4, size: 1.8 }, // Abu Dhabi
    { lat: 24.7, lon: 46.7, size: 1.8 }, // Riyadh
    { lat: 29.3, lon: 48.0, size: 1.6 }, // Kuwait
    { lat: 25.3, lon: 51.5, size: 1.7 }, // Doha
    // North America
    { lat: 40.7, lon: -74.0, size: 2.2 },// NYC
    { lat: 34.0, lon: -118.2, size: 2.0 },// LA
    { lat: 41.8, lon: -87.6, size: 1.8 },// Chicago
    { lat: 29.7, lon: -95.3, size: 1.7 },// Houston
    { lat: 37.7, lon: -122.4, size: 1.8 },// SF
    { lat: 43.6, lon: -79.4, size: 1.8 },// Toronto
    // Asia
    { lat: 35.6, lon: 139.6, size: 2.4 },// Tokyo
    { lat: 37.5, lon: 127.0, size: 2.0 },// Seoul
    { lat: 31.2, lon: 121.5, size: 2.2 },// Shanghai
    { lat: 22.3, lon: 114.1, size: 2.0 },// Hong Kong
    { lat: 1.3, lon: 103.8, size: 2.0 },  // Singapore
    { lat: 28.6, lon: 77.2, size: 2.0 }, // Delhi
    { lat: 19.0, lon: 72.8, size: 2.0 }  // Mumbai
  ];
}
