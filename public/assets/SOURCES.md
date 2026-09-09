# Boraden — image assets

- `boraden-logo.png`: original logo, https://boraden.com.tr/upload/logo.png. Proportions retained.
- `font-0.ttf` through `font-5.ttf`: Instrument Serif and Manrope, locally stored; OFL licenses retained.
- Three original photographs were created using the built-in Imagegen tool on 2026-09-06. They are representative campaign images, not photographs of actual Boraden staff, premises or client facilities. No secret/API key was read. JPEG delivery copies preserve the composition; generated PNG originals remain at the tool output paths.
- The earlier architectural/glass studies were replaced and removed from the delivered prototype.

## decision-room.jpg

Workspace: `/Users/mustafauslu/Desktop/Boraden/_design/boraden-concept/assets/decision-room.jpg`

Generated images are saved to /Users/mustafauslu/.codex/generated_images/01a072d8-63da-7472-8b57-f54f3a461fc4 as /Users/mustafauslu/.codex/generated_images/01a072d8-63da-7472-8b57-f54f3a461fc4/exec-4ba107d4-2e6d-458b-aa6b-a25d401d08db.png by default.

Prompt:

Use case: photorealistic-natural. Create an original premium corporate brand campaign photograph for Boraden, a Turkish independent audit, financial advisory and business consulting firm. Wide cinematic 16:9 landscape, 2048px quality. A contemplative evening decision-making scene: on the RIGHT HALF of the image, three experienced adult business professionals in a refined contemporary meeting room, candidly studying printed financial analysis together at a long walnut table. Natural authentic gestures, no handshake, no looking at camera, understated tailoring, credible serious business. Window beyond them reveals a softly blurred Istanbul-like waterfront city in dusk light, no identifiable company premises or landmarks required. Frame from outside a dark glass partition for subtle elegant reflections and a feeling of depth. LEFT 50 percent is a nearly black charcoal-green softly graduated wall/negative space, unobstructed for huge white HTML typography. Lighting: soft silver-blue city dusk, champagne rim light on table and faces, rich natural shadows, desaturated muted sage tones. A world-class editorial advertising photograph, tactile, human, confident, cinematic, expensive yet natural. No decorative architecture sculptures, no floating glass shapes, no gold objects, no neon, no purple or lavender, no visible logos, no text, no readable documents, no financial numbers, no watermark. This is representative campaign imagery, not a depiction of actual Boraden staff or offices.

## expertise-table.jpg

Workspace: `/Users/mustafauslu/Desktop/Boraden/_design/boraden-concept/assets/expertise-table.jpg`

Generated images are saved to /Users/mustafauslu/.codex/generated_images/01a072d8-63da-7472-8b57-f54f3a461fc4 as /Users/mustafauslu/.codex/generated_images/01a072d8-63da-7472-8b57-f54f3a461fc4/exec-b6bfa77c-e84d-4a5f-bd7a-d3bf7f495402.png by default.

Prompt:

Use case: photorealistic-natural. Original editorial campaign photograph for an established Turkish independent audit and consulting brand, Boraden. Wide 3:2 landscape composition. Overhead-oblique perspective of a beautifully lit oak meeting table, four experienced adult colleagues seen candidly at the edges, carefully reviewing an orderly spread of financial working papers, a restrained silver laptop displaying an abstract non-legible spreadsheet, notebooks and a single glass of water. One hand points to a clean chart, another makes notes, natural anatomically correct hands. Faces secondary; the composition is about thoughtful collaboration, evidence, expertise and human trust. The image should feel like Monocle magazine art direction meets premium professional-services campaign, not generic smiling corporate stock. Soft daylight with long window shadows, pale sage and warm ivory paper, charcoal tailoring, subtle muted blue, authentic grain and realistic material texture. Substantial breathing room; calm asymmetrical arrangement and beautiful geometry created by papers and light. No readable text, no company branding, no identifying information, no impossible interfaces, no decorative abstract sculptures, no purple, no lavender, no handshake, no posing. Representative imagery, not actual employees.

## enterprise-landscape.jpg

Workspace: `/Users/mustafauslu/Desktop/Boraden/_design/boraden-concept/assets/enterprise-landscape.jpg`

Generated images are saved to /Users/mustafauslu/.codex/generated_images/01a072d8-63da-7472-8b57-f54f3a461fc4 as /Users/mustafauslu/.codex/generated_images/01a072d8-63da-7472-8b57-f54f3a461fc4/exec-d486e3f3-cfc0-4063-bfd5-e4cc96d3c270.png by default.

Prompt:

Use case: photorealistic-natural. Original premium editorial photograph for a Turkish independent audit and business advisory website. Cinematic wide landscape 16:9. Aerial oblique view across a real-looking contemporary logistics and manufacturing business campus at soft early morning, long clean pale roofs, ordered loading bays with a few trucks, industrial buildings and a distant coastal city horizon. Beautiful architectural rhythm and purposeful economic activity, viewed as a whole rather than dramatic futuristic megacity. Strong diagonal composition from lower left to upper right. Atmospheric desaturated sage, soft blue sky, warm ivory sunlight, charcoal shadows. Photography quality of a global business journal cover, sophisticated, credible, restrained. No visible logos, no text, no fake charts, no sci-fi elements, no purple or lavender, no promotional metrics. No identifiable company facility; representative sector illustration, not a Boraden owned site. This image illustrates seeing the full operating picture of a business.

## Technology and references

Tailwind CSS 4.3.3, official standalone CLI: https://github.com/tailwindlabs/tailwindcss/releases/tag/v4.3.3. No root dependency change. New service research and editorial limitations are recorded in `../CONTENT_SOURCES.md`. Sistem Global was inspected for information architecture and service scope; its images, identity, layout and text were not copied.


## Expanded media set — 2026-09-06

53 additional generated scenes (47 service/learning areas and 6 sectors), three attributed thinker portraits and one licensed scroll-video sample are documented in [../research/MEDIA_LICENSES.md](../research/MEDIA_LICENSES.md). Individual prompts/video shot plans are in [../research/media-plan.json](../research/media-plan.json), with output provenance in [../research/generated-media.json](../research/generated-media.json).

## Responsive variants — 2026-09-06

`research/optimize-media.py` resizes the current 84 JPGs to WebP widths 640 / 1280 / up to 1672, quality 82. No crop or color adjustment was applied during encoding. `research/image-variants.json` records exact source dimensions and files. The static export uses picture/srcset and retains JPG fallbacks. All original license and attribution obligations also apply to these resized variants.

## Distinct general-page scenes — 2026-09-06

25 new selected scenes are stored in `pages/`, including separate article covers and an About second scene. Four were refined with the built-in image editing tool to better match fiscal, valuation, editorial and business-process subjects. All selected originals and edit prompts are recorded in `../research/page-media-generated.json`; initial prompts are in `../research/page-media-plan.json`. No real company facts, employee identities or financial results are claimed by these illustrations.
