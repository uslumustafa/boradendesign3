# Editorial and media handoff

This is a frontend prototype, not a running Wagtail backend.

- **PerspectivePage**: slug, person, topic, title, summary, intro, portrait (ImageChooser), portrait attribution/source/license, source URL/title/summary, quotation label, body sections (StreamField), takeaway, questions, related service, publication date, status, ordering.
- **NewsPage**: slug, title, summary, cover (ImageChooser), category, publication date, original source date, status, body (StreamField), sources, related service. Homepage latest-six is a presentation limit; the news index has no fixed record limit. Local Studio already supports adding news.
- **ServicePage media**: independent hero, scope image, ordered photographic story shots, optional video/poster, alt text and credit. Stored per service in `media-content.js`; no image is repeated across those slots within a service page. Current secondary scenes are curated by service discipline; they are not 47 bespoke video productions.
- **SectorPage media**: independent hero, scope image and two story shots follow the same ordered media structure as services; six sector pages currently use it.
- **Homepage service network**: ordered service groups, heading, description, image and destination. Six slots today; no count is hardcoded in the carousel.
- Publication state, future scheduling, previews, image renditions and server pagination belong to the Wagtail implementation. Preserve existing URLs.
- `editorial-content.js` contains 11 additional source-based perspectives and five dated editorial news notes. These are summaries and original editorial commentary, not fabricated quotations or company endorsements.
- `assets/editorial/` contains eleven new AI-generated illustrative photographs (six service scenes and five distinct news covers). Scroll sequences are photographic motion, not newly generated live-action video. Video fields remain null until actual clips are supplied.
- Preserve reduced-motion/static mobile fallbacks; do not require animation to access text or links.
- Optional story clips use `video`, `poster`, `videoCredit` and `videoMode` (`visible` by default; `scroll` for an explicitly selected scrub treatment). `section-video.js` owns video loading/playback; photographic scroll code must not seek those videos separately. Keep the existing padded frame and full-opacity text. Do not assign production-queue targets until reviewed files actually exist.
- The current video queue covers 99 page briefs and 160 existing section-media briefs. These are pending production, not generated assets. A future publishing system should retain per-block credit/alt text and separate still fallbacks, and validate actual media availability before publication.
