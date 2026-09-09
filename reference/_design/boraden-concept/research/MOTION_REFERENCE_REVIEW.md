# Boraden — motion and navigation review

Date: 6 September 2026. Scope: the isolated design prototype only.

## What was actually examined

- [Sistem Global homepage](https://sistemglobal.com.tr/): desktop page from hero to footer, timed hero slides, service discovery, category mega menu, moving digital-investment logos, stories, analysis/publication cards and news. The Muhasebe & Bordro menu was opened and its category behaviour observed.
- Selected service references: [outsource payroll](https://sistemglobal.com.tr/servisler/muhasebe-bordro/outsource-bordro-yonetimi/) and [company valuation](https://sistemglobal.com.tr/servisler/vergi-finans/kurumsal-finansman/sirket-degerleme/). This was not a fresh crawl of every Sistem Global subpage.
- [Legacy Boraden homepage](https://boraden.com.tr/index.html): navigation, six service areas, contact prompts, public-institution logo carousel, legacy testimonials and lower content. This does not claim every legacy subpage was re-read in this pass.
- Sistem Global's digital-product logos belong to that firm. They were not imported as Boraden products, clients or partners. No testimonial, client count or commercial result was invented.
- Seven original institution images were observed on the legacy homepage and saved with their provenance in `institution-assets.json`. Visual inspection found that legacy banner-2 linked to HMB but depicted GİB. The new label and destination identify [Gelir İdaresi Başkanlığı](https://www.gib.gov.tr/).

## Implemented direction

- Visible navigation at every width: one row on wide screens; two rows on narrower screens; a horizontal navigation strip plus full-menu button on phones. All six categories and 47 services are in the keyboard-operable menu.
- A continuous ribbon of six original SVG discipline icons and service links.
- The business at the centre of an animated service orbit. Hover/focus connects each service row with its icon. The 06 and 47 counters describe the actual page inventory, not company performance.
- Three horizontally unfolding editorial scenarios for valuation, formation and people/payroll. Distinct imagery and ivory/sage/ink surfaces. These are working scenarios, not fabricated success stories.
- On sufficiently tall desktop screens, scroll drives the horizontal sequence. Shorter screens and phones use a normal horizontal carousel with buttons, keyboard access and touch scrolling.
- A seven-institution logo flow with accurate external destinations and pause control. These are public-information links, not endorsements.
- Restrained scroll parallax on page-specific hero imagery. Offscreen loops pause. Global motion pause and reduced-motion fallbacks remain available.
- Static exports fingerprint local JS/CSS URLs so newly rendered markup cannot pick up a stale interaction file from browser cache.

## Visual refinement

1. Increased small desktop navigation and mega-menu text; differentiated the three story surfaces and increased desktop story body type.
2. Fixed inherited interior-header sizing, the oversized tablet navigation row, and insufficient sector breadcrumb clearance. Short viewports use an unconstrained carousel so cards and controls cannot be clipped by a pinned viewport.
3. Fixed pause/resume context loss. The same story remains selected when changing motion mode; paused carousels disable scroll snapping to stale transformed positions.

## Verification

- Real browser renders inspected on desktop, tablet and phone. The three story states, mobile menu, service orbit and institution band were visually inspected.
- All 83 public routes checked at actual widths 320, 390, 820 and 1440: 332 route/viewport checks passed for visible navigation, header child geometry, breadcrumb clearance and document overflow. This is a scoped DOM-rectangle check, not a claim of inspecting every text glyph or every page pixel.
- All six mega-menu categories opened: 10 + 8 + 6 + 15 + 3 + 5 = 47 service links. Single active tab/panel, Home/arrow keys and Escape tested; mobile tab orientation checked.
- Desktop and mobile story controls reached 01, 02 and 03. Keyboard Tab reached the third service. Card CTA bounds were inside their reading surfaces at 320 and 1440 pixels.
- The actual 1019 × 778 preview window also received a compact pinned composition. At the 1001 × 760 lower desktop boundary all three reading surfaces contained their text/CTA, the controls ended at y=738, and pause retained story 02. Below 1001 pixels wide or 760 pixels high, the ordinary carousel is used. The 870-pixel two-row navigation and scrollable mega menu were also inspected visually.
- Institution images loaded; carousel transform changed between observations. Local pause reported a paused animation. Global pause stopped loops and preserved the selected story after the pause fix; resume restored the same scene.
- Eight static SEO/link/route tests and three media tests passed. Syntax checks passed for the changed JavaScript and build files.

## Remaining media boundary

83 routes retain distinct primary image assets. This work does not turn still-image parallax into real video. The existing About video remains; original per-page video generation is pending a connected video provider. The 83-entry production queue remains in `video-production-queue.json`.

No Gemini worker, subagent, root package change, production backend, commit or push was used.
