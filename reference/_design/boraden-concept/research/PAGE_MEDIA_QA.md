# Page-specific imagery — 6 September 2026

## Delivered

- 25 newly generated selected images: 20 general/category/calculator headers, four article covers and a separate About second scene. Existing 47 service scenes, six sector scenes, three core campaign images and three licensed/public-domain thinker portraits remain.
- 83 public routes now have 83 distinct visible primary-image hashes. A shared filename or duplicate bytes cannot pass the media test. Related-content thumbnails can still point to the corresponding page's image; this is intentional navigation, not repetition of the current article's hero.
- All 84 JPEGs have responsive WebP encodings. Total largest-size WebP set is approximately 6.35 MB; pages request their relevant images, not the whole set.
- Text stays on a solid reading surface. New headers use either a split composition or an editorial panorama, with mobile stacking and separate captions.

## Intentional refinement

1. Four selected images were corrected after inspection: business scenario evidence replaced design swatches, editorial proofs replaced photo proofs, the fiscal news sheet lost unrelated travel/architecture photographs, and valuation question cards gained actual financial-analysis cues.
2. Browser review showed that the first panoramic archive header delayed access to the archive. Its heading and description now sit beside one another on desktop; a shallower image preserves the visual idea while shortening the opening.
3. Browser screenshots confirmed legible mobile publishing principles, balanced tablet blog, salary header, contact and archive. Control-specific results are in `CONTROL_OVERLAP_QA.md`.

## Video status — incomplete

No original per-page videos were generated. The available toolset supplied image generation but no connected video generator. The user was asked which video provider can be connected; that answer is still needed.

The one existing licensed Pressmaster/Pexels example is retained only on About. Its real desktop seeking and pause/resume were verified. Other pages do not reuse it. `video-production-queue.json` contains 83 distinct route briefs, intended output paths, still fallbacks and explicit pending-provider status. No empty video URLs or fabricated generated clips are shipped.

## Validation

- `python3 research/seo-tests.py`: 8 tests passed.
- `python3 research/page-media-tests.py`: 3 tests passed.
- Browser geometry: all 83 public routes at 320, 390, 820 and 1440 px; no detected scoped collisions or horizontal overflow. Representative screenshots were reviewed separately.
- Only the isolated concept directory changed. No production deployment or commit.
