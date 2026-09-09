# Boraden — Perspective

Isolated frontend prototype. From the Boraden project root:

```sh
node _design/boraden-concept/build.mjs
python3 _design/boraden-concept/serve.py
```

Open http://127.0.0.1:4173/. Rebuild after editing source files. The server serves `_site/`, supports video byte ranges and redirects the older query-based prototype addresses. It deliberately sends `X-Robots-Tag: noindex, nofollow` and blocks preview indexing in robots.txt.

## Review routes

- `/?intro=1` — existing 3.1-second opening, cinematic hero, dark/light transition and 1993 story.
- `/hakkimizda/` — company story and values; `#yakindan` opens the real scroll-video example.
- `/hizmetler/` — 47 service/learning pages, search and six linked categories.
- `/hizmetler/ufrs-tfrs-raporlama/` — unique hero, service definition, scope, reporting diagram, preparation and FAQs.
- `/hizmetler/insan-kaynaklari-ve-bordro/` — sourced 2026 minimum-wage breakdown and calculator link.
- `/perspektifler/` — three Turkish editorial readings with licensed portraits, short translated extracts, source summaries and separate Boraden applications.
- `/sektorler/` — six sector discovery pages with individual representative photographs.
- `/blog/`, `/haberler/` — original editorial proposals, dated sourced news and local additions.
- `/sirkuler/` — 247 PDFs with keyword/year filtering; historical dates are distinguished from unknown dates.
- `/hesaplama/gelir-vergisi/`, `/hesaplama/kdv/`, `/hesaplama/brut-net-maas/` — independent calculator addresses, methods and sources; historical 7326 Excel remains explicitly dated 2021.
- `/basari-hikayeleri/` — illustrative scenarios, not invented client achievements. Excluded from indexing until real approved material replaces them.
- `/duyurular/` — empty publishing-ready area, currently noindex.
- `/yayin-ilkeleri/` — source, translation, date and correction principles.
- `/admin.html` — local editorial studio; no login, shared database or live publishing.

## Architecture and SEO

`page-renderer.js` and the view modules are shared by a dependency-free Node build and the browser. `_site/` contains 83 complete HTML pages, 80 indexable candidates, unique titles/descriptions, canonical/OG tags, JSON-LD, sitemap, redirect map, 404 page and public assets. JavaScript adds interaction; meaningful text and links are already present in the HTTP response.

`routes.js` maps clean paths and older prototype queries. `seo.js` builds metadata from visible content. `content.js`, `growth-content.js`, `experience-content.js` and `perspectives.js` hold editorial data. Historical paragraphs are retained in the noindex `/kurumsal-arsiv/` reference instead of being repeated as current service guidance.

The public export copies the required document PDFs, not raw crawl HTML or research files. `_site/` is disposable generated output: rebuilding replaces only that directory. Source assets and browser data are preserved.

The export prepares https://boraden.com.tr canonical addresses and production robots/sitemap files; it has **not been deployed**. Before launch, the actual host must apply redirects and 404 responses; `_redirects` is a candidate path map, not a universal server configuration. Prototype query redirects currently run in `serve.py`. Review the complete legacy URL inventory before a domain migration; old blog/news paths without replacements are not redirected indiscriminately to the homepage. Search Console ownership, sitemap submission, field Core Web Vitals and Google Business Profile remain live-site work. No ranking position is guaranteed.

## Local publishing

The editor supports blog, news, circulars, announcements and stories: title, summary, paragraphs, date, category, status, sources, cover and optional document URL. Save, preview, edit, delete, import/export. Drafts and future records stay out of normal lists.

Records use this browser's `boraden.editor.v1` localStorage (100 records / 3.5 MB). Uploaded covers resize to at most 1000 px. Export a JSON backup before clearing browser data. A local record hydrates editorial views and has a noindex preview; it does **not** change generated HTML or publish to the internet. A locally created article can render over the server's 404 fallback because its data exists only in that browser. Production CMS integration and server regeneration are a later phase.

## Art direction and media

The ink, sage, ivory and champagne palette is retained. Repeated pale B monograms were removed from content pages. Service photos appear once in the primary page narrative; explanatory diagrams and preparation sheets provide useful depth. Small reading labels and placeholders have stronger contrast.

There are 53 generated service/sector scenes, three home photographs and three attributed thinker portraits. They do not depict actual Boraden staff, offices or clients. 59 responsive WebP image sets preserve the original framing; JPG fallbacks remain. Largest WebP variants total 4,135,114 bytes versus 16,922,910 original JPG bytes (about 76% less for that media set, not a measured whole-page speed score).

One licensed 16.48-second meeting clip demonstrates real scroll scrubbing on About and Management Consulting. Other services use photographs and conceptual diagrams. Individual original videos have not been produced. Mobile and reduced-motion contexts use static media; the motion button also pauses effects. Quote navigation supports manual advancement and pause.

## Validation

```sh
node --test _design/boraden-concept/research/calculator-tests.cjs _design/boraden-concept/research/studio-tests.cjs
python3 _design/boraden-concept/research/seo-tests.py
```

The HTTP checks need the preview server running. The final browser/SEO audit is in `research/SEO_UI_QA.md`; earlier media/editor checks remain in `research/QA.md`. Research and keyword intent are in `research/SEO_STRATEGY.md`; factual sources and media provenance are linked from `CONTENT_SOURCES.md` and `assets/SOURCES.md`.

No root package, production backend, Gemini worker, subagent, commit or push was used for this iteration.
