/* Read-only browser audit. Pass this function to the browser's evaluate tool.
 * Run after fonts load, then repeat in hover/focus/filter/open-menu states.
 * Geometry alone does not replace screenshot review.
 */
function auditControlLayout() {
  const rules = [
    ['.service-card', '.card-action,.card-index', '.card-copy,.card-reveal,.card-tag'],
    ['.sector-tile', '.sector-tile-arrow', 'h2,p,.eyebrow'],
    ['.directory-service', 'svg,small', ':scope>span'],
    ['.network-row', '.row-number,.row-arrow', 'h3,p'],
    ['.faq-list summary', ':scope>span', ':scope'],
    ['.button', '.button-orb,:scope>svg', ':scope'],
    ['.ex-button,.ex-link,.text-link', 'svg,[aria-hidden="true"]', ':scope'],
    ['.conversation-heading', '.conversation-arrow', 'h2'],
    ['.about-head', '.about-head-note', 'h1,.eyebrow'],
    ['.about-image', '.about-year', 'figcaption'],
    ['.scene-sticky', '.scene-footer', '.scene-caption'],
    ['.expertise-compass', ':scope>span', 'p,:scope>span'],
    ['.thinker-controls', 'button', ':scope'],
    ['.insight-card', 'figure>span', 'h3,p,.insight-meta'],
    ['.publication-portal', 'svg', 'h3,p,.eyebrow'],
    ['.legacy-document,.archive-row', ':scope>svg,:scope>.doc-pdf,:scope>span:last-child', 'h2,h3,p,small,time'],
    ['.post-row', '.post-status,:scope>span:last-child', 'h3,p,.post-type'],
    ['.studio-header', '.studio-primary', 'h1,p'],
    ['.calculator-hero', '.calc-year', 'h1,p']
  ];
  const laidOut = el => { const r=el.getBoundingClientRect(); return r.width>0 && r.height>0 && getComputedStyle(el).visibility!=='hidden' && !el.closest('[hidden]'); };
  const intersects = (a,b) => Math.min(a.right,b.right)-Math.max(a.left,b.left)>1 && Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top)>1;
  const label = el => (el.id ? '#'+el.id : el.tagName.toLowerCase()+'.'+String(el.className).trim().replace(/\s+/g,'.')).slice(0,100);
  const textRects = (el,exclude) => {
    if(el===exclude || exclude?.contains(el) || el.closest('svg,.sr-only,[aria-hidden="true"]') || !laidOut(el)) return [];
    if((exclude && el.contains(exclude)) || el.children.length) return [...el.children].flatMap(child=>textRects(child,exclude));
    return el.textContent.trim() ? [{rect:el.getBoundingClientRect(),text:el.textContent.trim().slice(0,90)}] : [];
  };
  const collisions=[],counts={},clipping=[];
  for(const [scopeSelector,controlSelector,textSelector] of rules) {
    for(const scope of document.querySelectorAll(scopeSelector)) {
      if(!laidOut(scope)) continue;
      for(const control of scope.querySelectorAll(controlSelector)) {
        if(!laidOut(control)) continue;
        counts[scopeSelector]=(counts[scopeSelector]||0)+1;
        const texts=textSelector===':scope'?[scope]:[...scope.querySelectorAll(textSelector)];
        for(const el of texts) for(const text of textRects(el,control)) {
          if(intersects(control.getBoundingClientRect(),text.rect)) collisions.push({scope:label(scope),control:label(control),text:text.text});
        }
      }
    }
  }
  const nav=document.querySelector('.navigation');
  const navItems=nav?[...nav.children].filter(el=>el.matches('.brand,.nav-links,.nav-contact,.motion-toggle,.menu-toggle')&&laidOut(el)):[];
  for(let i=0;i<navItems.length;i++) for(let j=i+1;j<navItems.length;j++) {
    if(intersects(navItems[i].getBoundingClientRect(),navItems[j].getBoundingClientRect())) collisions.push({scope:'navigation',control:label(navItems[i]),text:label(navItems[j])});
  }
  for(const card of document.querySelectorAll('.service-card,.sector-tile')) {
    if(!laidOut(card)) continue;
    const bounds=card.getBoundingClientRect();
    for(const text of textRects(card,null)) if(text.rect.left<bounds.left-1 || text.rect.right>bounds.right+1 || text.rect.bottom>bounds.bottom+1) clipping.push({scope:label(card),text:text.text});
  }
  return {
    path:location.pathname,viewport:[innerWidth,innerHeight],counts,
    collisions:[...new Map(collisions.map(c=>[JSON.stringify(c),c])).values()],clipping,
    overflow:document.documentElement.scrollWidth>innerWidth+1,
    motionControls:document.querySelectorAll('.motion-toggle').length,
    motionInHeader:!!document.querySelector('.navigation>.motion-toggle')
  };
}
