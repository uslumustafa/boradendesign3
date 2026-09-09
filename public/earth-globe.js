// Boraden Photorealistic 3D WebGL Earth Engine (Three.js powered)
// Features: NASA Blue Marble Surface, Night City Lights, Floating Cloud Layer,
// Cyan Atmosphere Halo, Interactive 3D Orbit, and Türkiye HQ Beacon.

import * as THREE from '/assets/vendor/three.module.js';

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
  const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
  camera.position.set(0, 0.2, 5.2);

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
  renderer.toneMappingExposure = 1.15;
  container.appendChild(renderer.domElement);

  // 2. Texture Loader
  const textureLoader = new THREE.TextureLoader();
  const surfaceTex = textureLoader.load('/assets/earth/earth_surface.jpg');
  const lightsTex = textureLoader.load('/assets/earth/earth_lights.png');
  const cloudsTex = textureLoader.load('/assets/earth/earth_clouds.png');

  // Globe Radius
  const RADIUS = 1.85;

  // 3. Earth Group (Rotates in 3D)
  const earthGroup = new THREE.Group();
  scene.add(earthGroup);

  // Initial Orientation: Center on Mediterranean / Turkey [Lat: 39° N, Lon: 35° E]
  // In spherical coords, longitude 35° E corresponds to rotation:
  earthGroup.rotation.y = 4.25;
  earthGroup.rotation.x = 0.32;

  // 4. Earth Surface Mesh
  const sphereGeo = new THREE.SphereGeometry(RADIUS, 64, 64);
  const surfaceMat = new THREE.MeshStandardMaterial({
    map: surfaceTex,
    roughness: 0.7,
    metalness: 0.05
  });
  const earthMesh = new THREE.Mesh(sphereGeo, surfaceMat);
  earthGroup.add(earthMesh);

  // 5. Night City Lights Layer
  const lightsMat = new THREE.MeshBasicMaterial({
    map: lightsTex,
    blending: THREE.AdditiveBlending,
    transparent: true,
    opacity: 0.95
  });
  const lightsMesh = new THREE.Mesh(sphereGeo, lightsMat);
  earthGroup.add(lightsMesh);

  // 6. Atmospheric Clouds Layer
  const cloudsGeo = new THREE.SphereGeometry(RADIUS * 1.012, 64, 64);
  const cloudsMat = new THREE.MeshStandardMaterial({
    map: cloudsTex,
    transparent: true,
    opacity: 0.38,
    blending: THREE.AdditiveBlending
  });
  const cloudsMesh = new THREE.Mesh(cloudsGeo, cloudsMat);
  earthGroup.add(cloudsMesh);

  // 7. Luminous Cyan Atmosphere Halo
  const atmoGeo = new THREE.SphereGeometry(RADIUS * 1.18, 64, 64);
  const atmoMat = new THREE.ShaderMaterial({
    vertexShader: `
      varying vec3 vNormal;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec3 vNormal;
      void main() {
        float intensity = pow(0.68 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.8);
        gl_FragColor = vec4(0.02, 0.55, 0.95, 1.0) * intensity * 1.5;
      }
    `,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide,
    transparent: true
  });
  const atmoMesh = new THREE.Mesh(atmoGeo, atmoMat);
  scene.add(atmoMesh);

  // 8. Türkiye / Boraden Genel Merkez Beacon [Lat: 39° N, Lon: 35° E]
  const beaconGroup = new THREE.Group();
  earthGroup.add(beaconGroup);

  function latLonToVector3(lat, lon, r) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    return new THREE.Vector3(
      -r * Math.sin(phi) * Math.cos(theta),
      r * Math.cos(phi),
      r * Math.sin(phi) * Math.sin(theta)
    );
  }

  const turkeyPos = latLonToVector3(39.0, 35.0, RADIUS);
  beaconGroup.position.copy(turkeyPos);

  // Core Diamond Point
  const pointGeo = new THREE.SphereGeometry(0.035, 16, 16);
  const pointMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const pointMesh = new THREE.Mesh(pointGeo, pointMat);
  beaconGroup.add(pointMesh);

  // Pulse Wave Ring
  const ringGeo = new THREE.RingGeometry(0.04, 0.07, 32);
  const ringMat = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.9
  });
  const ringMesh = new THREE.Mesh(ringGeo, ringMat);
  ringMesh.lookAt(turkeyPos.clone().multiplyScalar(2));
  beaconGroup.add(ringMesh);

  const ringGeo2 = new THREE.RingGeometry(0.07, 0.10, 32);
  const ringMat2 = new THREE.MeshBasicMaterial({
    color: 0x22c55e,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.7
  });
  const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
  ringMesh2.lookAt(turkeyPos.clone().multiplyScalar(2));
  beaconGroup.add(ringMesh2);

  // 9. Lighting Setup
  const ambientLight = new THREE.AmbientLight(0x182436, 1.4);
  scene.add(ambientLight);

  const sunLight = new THREE.DirectionalLight(0xffffff, 2.6);
  sunLight.position.set(5, 3, 5);
  scene.add(sunLight);

  // Subtle blue fill light from the opposite side
  const fillLight = new THREE.DirectionalLight(0x0284c7, 0.8);
  fillLight.position.set(-5, -2, -2);
  scene.add(fillLight);

  // 10. Starfield Background (Deep Space Particles)
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

  // 11. Mouse & Touch Drag Interaction (Orbit)
  let isDragging = false;
  let previousMousePosition = { x: 0, y: 0 };
  let autoRotate = true;
  let rotateVelocity = { x: 0, y: 0 };

  function onPointerDown(e) {
    isDragging = true;
    autoRotate = false;
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
      autoRotate = true;
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

  // Scroll Pull-back Effect
  let scrollY = 0;
  window.addEventListener('scroll', () => {
    scrollY = window.scrollY || window.pageYOffset;
  }, { passive: true });

  // Animation Loop
  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    const time = clock.getElapsedTime();

    // Slow atmospheric cloud drift
    cloudsMesh.rotation.y += delta * 0.018;

    // Earth auto-rotation
    if (autoRotate && !isDragging) {
      earthGroup.rotation.y += delta * 0.045;
    } else if (!isDragging) {
      // Inertia decay
      rotateVelocity.x *= 0.94;
      rotateVelocity.y *= 0.94;
      earthGroup.rotation.x += rotateVelocity.x;
      earthGroup.rotation.y += rotateVelocity.y;
    }

    // Pulse Turkey Ring Beacon
    const pulse1 = (time * 1.5) % 1;
    ringMesh.scale.set(1 + pulse1 * 2.2, 1 + pulse1 * 2.2, 1);
    ringMat.opacity = Math.max(0, 1 - pulse1);

    const pulse2 = (time * 1.5 + 0.5) % 1;
    ringMesh2.scale.set(1 + pulse2 * 2.6, 1 + pulse2 * 2.6, 1);
    ringMat2.opacity = Math.max(0, 1 - pulse2);

    // Camera scroll response (pull back slightly as user scrolls down)
    const scrollFactor = Math.min(1, scrollY / (height || 800));
    camera.position.z = 5.2 + scrollFactor * 2.5;
    camera.position.y = 0.2 - scrollFactor * 0.8;

    renderer.render(scene, camera);
  }

  animate();
}
