// Pure scroll sampling also lets the existing Node checks cover both endpoints.
export function serviceMotionAt(distance, viewportHeight, reduced = false, sceneTravel = viewportHeight * 3) {
  if (reduced) return {arrival:1, depth:1, opacity:.3, tint:.4};
  const span = Math.max(280, Math.min(520, viewportHeight * .46));
  const progress = Math.min(1, Math.max(0, distance / span));
  const remaining = progress - 1;
  // The upper edge starts above the hero; its label is already visible on entry.
  const arrival = .76 + .24 * (1 + 2.4 * remaining ** 3 + 1.4 * remaining ** 2);
  const retreat = Math.min(1, Math.max(0, (distance - span * .1) / (span * .5)));
  const depth = retreat * retreat * (3 - 2 * retreat);
  // Colour arrives with the piece, then washes out over the whole reading length.
  const reading = Math.min(1, Math.max(0, (distance - span) / Math.max(viewportHeight, sceneTravel - span)));
  const tint = progress * progress * (3 - 2 * progress) * (1 - .8 * reading * reading * (3 - 2 * reading));
  return {arrival, depth, opacity:.78 - depth * .48, tint};
}

if (typeof document !== 'undefined') {
  const scene = document.querySelector('[data-service-scene]');
  const backdrop = scene?.querySelector('[data-service-backdrop]');
  if (backdrop) {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const header = document.querySelector('.header');
    let frame = 0;
    function draw() {
      frame = 0;
      const start = Math.max(0, scene.getBoundingClientRect().top + scrollY - (header?.offsetHeight || 0));
      const state = serviceMotionAt(scrollY - start, innerHeight, reduced.matches, scene.offsetHeight - innerHeight);
      for (const [key, value] of Object.entries(state)) scene.style.setProperty('--service-' + key, value.toFixed(4));
    }
    function schedule() { if (!frame) frame = requestAnimationFrame(draw); }
    addEventListener('scroll', schedule, {passive:true});
    addEventListener('resize', schedule, {passive:true});
    addEventListener('pageshow', schedule);
    reduced.addEventListener('change', schedule);
    draw();
  }
}
