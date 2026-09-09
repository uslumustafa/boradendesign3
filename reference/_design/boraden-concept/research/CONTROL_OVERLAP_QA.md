# Control / text overlap follow-up

6 September 2026. Status: corrected and checked in the actual in-app browser. Direct browser-tab access worked; the earlier native Mac-lock limitation no longer blocked this review.

## Corrections

- Home service cards: headings, descriptions and actions participate in normal layout. The footer reserves the action's full expanded width and wraps when necessary. Cards can grow, and the full-card link and keyboard focus remain.
- Sector arrows occupy their own flow position after the description.
- Motion pause sits in the header instead of floating over reading content. Tablet navigation switches to the menu before controls run out of room.
- Circular icons keep their allocated width. The calculator year badge is now an in-flow label rather than a large absolute-positioned marker.

## Actual browser evidence

- 351 recorded scoped geometry evaluations, including every one of the 83 public routes at 320, 390, 820 and 1440 px. No detected control/text-block collisions, clipped card labels or horizontal overflow.
- Home additional checks at 360, 430, 768, 1024, 1280 and 1920 px; all four category filters, keyboard focus and actual pointer hover on all four featured cards.
- The reported company-formation card was visually inspected at 1440 and 390 px. Its expanded action stays below the title. Clicking it opened the correct company-formation route.
- Screenshot review included home cards, a long service hero, an expanded long TFRS FAQ question, mobile/tablet open menus, About heading, the video interval at 1440×700, the new service directory, salary calculator, publishing principles on mobile, blog on tablet, circular archive and contact.
- About video: actual currentTime progressed from 0 to 14.37139 seconds after scroll. The caption and footer had separate vertical areas. Header pause changed its accessible label and hid the moving video; resume was exercised.
- Local editor additionally inspected at 1440×900 and 320×740; no detected collisions or horizontal overflow. No test content was created.
- No browser error entries were returned in the reviewed log snapshot.

## Method and limits

`control-overlap-audit.js` uses read-only rendered element rectangles, not source-code estimates. This browser evaluation surface does not expose DOM Range or TreeWalker, so this is a conservative element/label geometry check, not an exact glyph-by-glyph text-line proof. Unwrapped button/FAQ labels were additionally checked in screenshots. Transient resize samples were validated against the reported viewport; the missing 430 px sample was repeated separately.

Geometry checks cover all routes; detailed screenshot review covers representative page families and the reported failure, rather than every scroll position on every browser. Native browser zoom, separate Safari/Firefox engines and a physical-device lab were not exercised. These results should not be represented as universal compatibility certification.

## Local checks and scope

- Static export: 83 routes. Existing eight HTML/HTTP regressions passed.
- Three media regressions passed: distinct visible primary images by file hash, responsive delivery assets and no reuse of the real meeting video across routes.
- New renderer scripts and the audit passed syntax checks.
- No Gemini worker, subagent, root package installation, commit or push. Secrets were not read.
