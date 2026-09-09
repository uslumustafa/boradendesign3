# Frontend verification — 2026-09-06

## Visual review and refinements

Actual in-app browser screenshots were the review source. Inspected the home hero and featured cards, service hero/reading transition, About video, calculator UI, quote portraits and all 53 generated images in a contact-sheet page.

1. Replaced the repeated service photograph with 47 subject-specific scenes and six sector images. Built full-bleed service openings, editorial scope rows and a connected moving-scene interval. Preserved the established opening/1993/B motif.
2. Fixed inherited dark emphasis text on dark video/quote sections; strengthened small text and card-pill contrast. Reading surfaces are nearly opaque, so photography cannot undermine paragraph contrast. Fixed compact admin heading composition.
3. Corrected the Buffett portrait framing and credit spacing; reserved quote-stage height to reduce layout shift. Reviewed the actual video after adding HTTP range support.

## Browser checks

- All 47 service/learning detail routes: 1440×1000 and 390×844; one H1, populated scope, no horizontal overflow and all hero photographs loaded on desktop.
- 320×740: Blog, calculators, news, sectors, About, long HR/bordro title and admin. No horizontal overflow.
- Local editor: created draft, verified absence from blog; published locally, refreshed and found in blog; edited/deleted, refreshed and confirmed removal. A reload/seed classification bug found by this test was fixed.
- Uploaded a generated JPEG cover through the real file picker. Editor stored a 1000 px image; opened draft preview with correct heading, cover and preview banner. Deleted the test record.
- Imported an actual JSON fixture through the file picker; future-dated news stayed hidden. Deleted the imported test record and fixture.
- Export renders a valid portable JSON containing the four seed records and their source links; no QA records remain. The in-app download event was not observable, so export also provides a visible, selectable JSON text and a copy option rather than claiming the download completed. Native download remains available.
- KDV included example: 12,000 TL → 10,000 net + 2,000 VAT, visibly confirmed on mobile.
- Sirküler: 247 links; “Altın Cinsinden” search returned one document, with PDF-derived 25 March 2022 date and 2022/13 number.
- Quote manual navigation: Buffett → Kahneman → Thaler; pause state verified.
- Real video: original static server exposed seekable [0,0] despite a fully buffered clip. Range-capable server now exposes [0,16.48]; scroll changed currentTime to 8.862291 seconds. This is actual seeking, not a CSS still-image imitation.

## Local logic checks

- 7 calculator tests passed: official tariff edges, wage/non-wage distinction, VAT arithmetic, all 12 minimum-wage months, 50,000 TL sample payroll, 9× SGK ceiling, reverse solver, invalid inputs.
- 5 storage tests passed (including the local/seed reload regression): round-trip text/source preservation, invalid dates/URLs/oversized input, draft/future visibility, corrupt storage handling.
- JS syntax checks passed for all changed executable scripts; Python preview-server syntax passed.

## Scope and limits

- One licensed video example; 53 original per-page videos have NOT been produced. Other moving scenes use still images. Individual video shot plans are ready.
- The admin is localStorage-only and is not live publishing or secure multi-user CMS infrastructure.
- Financial tools explicitly use 2026 rates and the documented standard-employee assumptions. Historical 7326 data is clearly identified as 2021.
- Legacy gaps and failed requests are enumerated in RESEARCH_REPORT.md and legacy/inventory.json.
- No production code, root package, worker or secret files were modified. No Gemini/API worker, subagent, commit or push.
- Final workspace inspection found untracked `_design/` and a root `.DS_Store`; the latter was not present at the start and was left untouched. `.gemini/.env` remains ignored; its contents were not read.
