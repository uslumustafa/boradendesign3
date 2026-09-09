# Boraden — final editorial, SEO and browser audit

6 September 2026. Scope: the isolated local frontend prototype and its static export. Tests ran in the actual Codex in-app browser, with local HTTP checks and generated-HTML inspection. No live deployment, Google indexing or ranking result is claimed.

## Delivered

- Three Turkish perspective pages: Warren Buffett, Daniel Kahneman and Richard Thaler. Home links open these pages. Licensed portraits, short translated extracts, primary-source summaries and clearly separated original Boraden applications. Nobel press-release wording is not attributed as a direct personal quotation.
- Seven primary services received deeper definitions, decision triggers, preparation, original FAQs and official sources; all 47 service/learning pages have structured needs, scope and metadata.
- UFRS/TFRS explains reporting-framework selection and the distinction from an independent audit. Formation, valuation, payroll, tasdik and KDV copy avoids fixed outcomes or blanket legal obligations.
- Historic prose is retained in the noindex reference archive, not repeated as current service guidance. The old approximate staff count is not asserted as the current company headcount.
- Subject-specific service diagrams and a factual 2026 minimum-wage breakdown. Conceptual diagrams are not fake Boraden performance charts.
- 83 complete HTML routes, 80 indexable candidates, 50 candidate legacy-path redirects, clean internal links, canonical/social metadata, JSON-LD and sitemap. Preview indexing remains blocked.

## Intentional visual / UX refinements

1. Removed repeated pale B monograms from content pages. Replaced repeated service-photo blocks with readable definitions, editorial scope rows, topic-specific diagrams and preparation sheets. The established palette and directed home opening remain.
2. Browser inspection found the service subsection menu behind the fixed navigation and a missing video anchor. Corrected both. Improved small breadcrumb/contact/search-label contrast. Confirmed image framing after introducing responsive picture elements.
3. Real rapid navigation exposed skipped cross-document view-transition errors and an interrupted second click. Replaced the document overlay with a short interior-page CSS entry animation. Re-tested category → UFRS/TFRS → contact immediately: all three correct destinations, no new transition errors. No blanket error suppression remains.

Visually inspected screenshots of the home hero, dark/light transition, 1993 / expertise narrative, About, service hero and reading/diagram regions, payroll graph, sector template, Turkish perspective hero/body, blog, news article, circular archive, contact, mobile menu and calculator. Premium hierarchy comes from typography, editorial layouts and distinct photographic compositions; no extra card grids were added merely to fill space.

## Browser evidence

- 83 routes at 1440×1000 and 390×844: exactly one H1, populated main content, no document horizontal overflow, no completed non-lazy image reported broken. This is route-wide DOM/geometry inspection, not a claim that every page received a full screenshot review.
- Ten representative routes at 320×740: home, About, long tam-tasdik and HR/bordro services, production sector, Buffett, income calculator, blog, circular archive and contact. No horizontal overflow.
- 1920×1080: production-sector hero, home hero, dark/light bridge and 1993 composition visually inspected. The updated expertise scene was also inspected at 1440×1000.
- Mobile menu opens, scrolls and closes with Escape; focus returns to its toggle.
- Service search “değerleme”: one result. Denetim category navigation: eight services at its own clean URL.
- Service-to-contact CTA preserves “UFRS / TFRS Raporlama” as visible topic and encoded email subject.
- Home perspective next/pause controls work. Visible “Türkçe okuyun” opened the Kahneman article on the local site.
- Circular keyword “altın”: two documents. All 247 exported PDF links resolve in the generated-HTML test.
- KDV included example: 12,000 TL = 10,000 TL net + 2,000 TL VAT. Salary form: 33,030 TL gross = 28,075.50 TL net under stated assumptions. Calculator route changes select the correct panel; Enter submits the salary form.
- Created a uniquely named temporary local blog record through the real editor. It appeared in the blog, opened at its clean article URL and survived reload with noindex. Removed only that record; three seed blog cards remain.
- Real About clip: duration 16.48 seconds, readyState 4, seekable range available. Scroll changed currentTime from 0 to 16.239973. Motion pause hid video and held its time; motion was restored after testing.
- Responsive hero images actually select WebP URLs. 59 sets have checked srcset paths. Original JPGs remain fallbacks.

## Automated checks

- 8 generated-HTML / HTTP tests passed: metadata uniqueness; single H1 and unique DOM IDs; local links, anchors, scripts, image and srcset files; schema consistency; sitemap exclusions; internal Turkish perspective links; no repeated service image within a page; calculator deep links; 50 legacy-path redirects and prototype query redirects; real 404; video byte-range 206; preview noindex.
- 7 calculator tests and 5 local-storage tests passed. Tests cover tariff edges, employee assumptions, reverse solver, invalid inputs, record validation, draft/future visibility and preservation across reload.
- Syntax checks passed for 18 JavaScript/module files and three Python files. Static rendering executed successfully in the Node build.
- First HTTP responses contain page-specific body content without requiring JavaScript. No-JS reading CSS and a calculator explanation are supplied; a separate JavaScript-disabled browser session was not performed.
- Final git status: untracked `_design/` and pre-existing `.DS_Store`. No tracked root change. `.gemini/.env` is still ignored; its contents were not read.

## Publication boundary

The original keyword investigation is in [SEO_STRATEGY.md](SEO_STRATEGY.md). It uses qualitative intent, not invented volume/rank data. Live Search Console, real-user Core Web Vitals, complete legacy migration sign-off, Google Business Profile and production CMS publishing are not local prototype checks. The export needs the actual production host to implement redirects and status codes.

This is not a formal WCAG certification, an all-browser/device lab audit or legal publication sign-off. The existing calculator source notes define supported 2026 assumptions. Case examples are explicitly illustrative; empty announcements and historic reference pages remain noindex. One licensed real video exists; there are no 53 newly generated original videos.

No Gemini worker, subagent, root package change, commit or push. The preview server remains running on port 4173.
