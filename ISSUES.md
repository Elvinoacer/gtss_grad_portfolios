# GTSS Graduate Portfolios — Screen-Recording Issue Audit

**Audit date:** 9 October 2026  
**Source:** `Peek 2026-10-09 12-53.mp4` (53 seconds, approximately 1364 × 674 browser recording)  
**Observed environment:** Desktop Chromium browser at `localhost:3000/#/`  
**Scope:** The visible landing-page scroll-through, including hero, collection statistics, editorial sections, featured portfolio examples, schools, process, FAQ and footer.  
**Audit method:** Frame-by-frame visual review of the supplied recording, including a second pass focused on background texture and motion. The reviewer also reported persistent, distracting flicker/drift from firsthand viewing of the live page. No source code, network logs, device testing or button-click tests were supplied.

**Revision:** 9 October 2026 — Added **GP-25: continuous background flicker, jitter and drifting texture (P1)**. This is a separate concern from the moving hero portfolio preview (GP-10) and decorative marquee (GP-11).

> **Evidence standard:** `OBSERVED` means the relevant visual or copy is present in the recording. `USER-REPORTED` identifies a problem perceived during live viewing that cannot be fully characterized from individual video frames. `UX FINDING` is an evaluation of what is visibly present, not proof of a software defect. `VERIFY` means the recording cannot establish whether something works. Timestamps are approximate and refer to the supplied recording, **not** to playback time on the webpage.
>
> **Important:** This audit does not claim there are runtime crashes, broken links, failed requests, a measured FPS problem, or a confirmed mobile bug. The recording contains a desktop scroll-through, not an interaction or performance test. It is approximately 6.6 frames per second: **do not infer flashing frequency or a definitive CSS/JS cause from the video**. The flicker/drift concern is additionally supported by the user’s direct report of viewing the page.

---

## 1. Executive summary

The page has a distinctive art direction, but the recording and firsthand viewer feedback identify a **distracting, unstable-looking background** alongside problems with **message completion, numerical consistency, first-screen conversion, information density, scroll pacing, content legibility and intrusive persistent UI**. The most effective improvements will preserve the brand's editorial feel while making the website easier to understand, skim, and use.

**Highest-priority fixes:**

1. **Stop the persistent background flicker/drift.** Make the entire decorative backdrop static and visually stable by default, including while scrolling; investigate its underlying animation layers before optimizing any optional motion.
2. Complete the incomplete hero promise: **“what you can” → “what you can do.”**
3. Reconcile **“40 degree paths”** in the stat strip with **“42+ degree paths”** in the evidence section (and ensure every instance comes from a single source).
4. Make the main hero action and a complete value proposition visible on a common desktop viewport without requiring an initial scroll; retain the header CTA as a secondary convenience.
5. Reduce prolonged low-information scrolling and oversized transitional sections, especially around the hero exit, manifesto, collection evidence and single-portfolio showcase.
6. Increase minimum text size and contrast for descriptions, tabs, chapter labels, item metadata, link labels, and the footer.
7. Stop the floating WhatsApp pill from covering nearby content and controls.
8. Make the featured portfolio carousel and portfolio comparison imagery easier to navigate, understand and inspect.

**Severity definitions:** `P1` = high impact to clarity, trust or conversion; `P2` = moderate usability, accessibility or design impact; `P3` = editorial or polish improvement. No `P0` blocker is established by this video.

## 2. Findings register

**Register total: 25 findings, including the newly identified background issue (GP-25).**

| ID | Priority | Status | Finding | Evidence |
| --- | --- | --- | --- | --- |
| GP-25 | **P1** | **USER-REPORTED / VISUAL CONTEXT** | Continuous-looking grain/grid background flicker, shimmer or drift distracts from reading throughout the page. | Broadly throughout; notably 00:00–00:06, 00:13–00:23 |
| GP-01 | P1 | OBSERVED | Hero headline ends with “what you can,” omitting “do.” | 00:02–00:06 |
| GP-02 | P1 | OBSERVED | Inconsistent degree-path figures: 40 vs. 42+. | 00:10–00:11, 00:24 |
| GP-03 | P1 | UX FINDING | Main hero CTA and complete hero context sit below the first desktop viewport. | 00:00–00:06 |
| GP-04 | P1 | UX FINDING | Large low-information gap between hero and following section. | 00:06–00:10 |
| GP-05 | P1 | UX FINDING | Scroll-heavy manifesto dominates multiple screen heights before the next meaningful action. | 00:13–00:20 |
| GP-06 | P1 | UX FINDING | “Collection in numbers” spends substantial screen area on near-empty presentation before figures are visible. | 00:20–00:24 |
| GP-07 | P2 | UX FINDING | Small, tracked metadata and secondary copy are difficult to read at normal desktop scale. | Throughout |
| GP-08 | P2 | UX FINDING | Muted text and border contrast are too subtle in multiple important sections. | 00:10–00:53 |
| GP-09 | P2 | UX FINDING | Decorative photography behind and between headline lines reduces hero readability. | 00:02–00:06 |
| GP-10 | P2 | UX FINDING | Automatically changing hero portfolio previews compete with the main sales message. | 00:00–00:06 |
| GP-11 | P2 | UX FINDING | Oversized discipline ticker crops its own words and offers little context. | 00:10–00:12 |
| GP-12 | P2 | UX FINDING | Left-side chapter rail is too subtle to serve as useful navigation/progress feedback. | Throughout |
| GP-13 | P2 | UX FINDING | Large decorative “PROOF” lettering competes with the manifesto copy. | 00:13–00:19 |
| GP-14 | P2 | UX FINDING | The single-portfolio exhibit is undersized and isolated within a large dark canvas. | 00:28–00:32 |
| GP-15 | P2 | UX FINDING | Featured portfolio gallery cuts off cards and gives weak navigation affordances. | 00:32–00:36 |
| GP-16 | P2 | UX FINDING | Portfolio screenshot mosaic is visually rich but lacks immediately scannable identity and action labels. | 00:40–00:43 |
| GP-17 | P2 | UX FINDING | School-card links and important metadata are visually overshadowed by the image and heading. | 00:37–00:40 |
| GP-18 | P2 | OBSERVED | Persistent WhatsApp pill occupies the lower-right content area, overlapping material in some views. | 00:22–00:53 |
| GP-19 | P2 | UX FINDING | Several section descriptions and process steps are too understated relative to large headings. | 00:25–00:28, 00:44–00:46 |
| GP-20 | P2 | UX FINDING | “10 live portfolios” vs. “six portfolios” lacks visible *featured-versus-total* clarification. | 00:10 and 00:32–00:36 |
| GP-21 | P2 | UX FINDING | The independent-project/non-affiliation disclaimer is visually buried in the footer. | 00:50–00:52 |
| GP-22 | P2 | UX FINDING | End-of-page action hierarchy includes competing request/WhatsApp buttons plus the persistent widget. | 00:49–00:52 |
| GP-23 | P3 | UX FINDING | “Most of it dies in a lecture hall” introduces an unnecessarily negative tone for some audiences. | 00:14–00:19 |
| GP-24 | P3 | UX FINDING | Dense chapter-based storytelling repeats the core premise more often than necessary. | 00:00–00:49 |

### Detailed findings

#### GP-25 — Flickering / drifting background makes the entire page feel unstable

- **Priority/status:** **P1 / USER-REPORTED + VISIBLE TEXTURED BACKDROP.** The reviewer directly observed a background that **keeps flickering and moving around**, describing it as annoying. The visual recording confirms that full-width dark grain/noise, grid lines and other decorative background layers occur under the content; it does **not**, at ~6.6 captured frames/s, isolate the responsible rendering layer or reliably measure flashing speed.
- **Where:** Site-wide ambient background rather than a specific button or card. Look at the hero (roughly 00:00–00:06), manifesto (00:13–00:20), and dark gridded collection section (00:20–00:23). [Hero still](evidence/t02.jpg) · [Manifesto still](evidence/t15.jpg) · [Grid/texture still](evidence/t22.jpg) · [4-second video excerpt](evidence/background_motion_excerpt_20_to_24s.mp4). **A still image cannot prove flicker; reproduce the live page to observe the actual movement.**
- **Actual user-facing problem:** The background feels as if it is perpetually shifting, trembling, shimmering or flashing, competing with static typography. Users should not have to watch moving surface texture while reading ordinary page content. This is **not the same** as the automatically changing featured example (GP-10) or the oversized discipline ticker (GP-11).
- **Impact:** Persistent visual distraction, a sense of poor rendering/polish, reduced concentration and readability, and potential discomfort for motion-sensitive users. Continuously animated full-viewport layers might also increase rendering work, **but no performance regression or photosensitivity threshold is established from this recording**.
- **Expected behavior / design decision:** Keep the site’s brand color, dark aesthetic, subtle static grid and optional static grain, **but make the ambient background visually still**. During idle, scrolling, and navigating between sections, it must not pulse, shimmer, randomly jump position or appear to flash. Preserve only purposeful, controlled motion in foreground elements where it genuinely improves comprehension.
- **Investigation checklist (root cause is not yet confirmed):**
  1. Search the app/layout and global styles for any full-page `::before`/`::after` overlay, noise/grain layer, SVG `feTurbulence` / `feDisplacementMap`, animated gradient, background-position keyframes, `opacity`/`filter` keyframes, CSS `mix-blend-mode`, `backdrop-filter`, canvas/WebGL shader, parallax, scroll timeline, and any `requestAnimationFrame`-driven background.
  2. Temporarily disable background layers **one at a time** using browser DevTools. Wait stationary for ~30 seconds with no pointer movement, then perform slow and fast scroll tests. Identify exactly which layer causes perceived flicker/drift; distinguish intentional animation from compositor/paint artifacts.
  3. Inspect whether the grid/noise is attached to the viewport, a section, a scrolling ancestor, or pointer position. Look for subpixel `transform` changes, opacity updates, image tiling/seam movement, and GPU compositing instability.
  4. Re-test with hardware acceleration on/off and in another browser **only if flicker persists after disabling deliberate motion**; do not attribute it to the GPU without evidence.
- **Recommended fix:** Replace perpetually animated noise/grain with a **static image/texture** or very subtle unanimated CSS grid/gradient. Remove continuous background transforms and opacity pulses. Avoid viewport-wide repaint animation. Keep animation of actual *content* isolated from the background. Implement targeted `prefers-reduced-motion: reduce` styles so all non-essential atmospheric movement is disabled; do not indiscriminately disable functional disclosure/opening transitions or hide meaningful content.
- **Acceptance criteria:**
  - [ ] On a freshly loaded landing page, with mouse and scroll stationary for 30 seconds, the decorative background appears **completely stable**, not drifting, jittering, flashing or pulsing.
  - [ ] During normal/rapid scrolling, underlying texture and grid do not jump, re-tile abruptly, shimmer, or visibly change brightness frame to frame.
  - [ ] Foreground headings/cards remain readable and stable over the backdrop; no repeated fullscreen flashes.
  - [ ] In `prefers-reduced-motion: reduce`, ambient motion is absent while all content, links and interactions remain available.
  - [ ] Verify at representative desktop and mobile sizes, zoom levels, and at least two browser/graphics configurations; capture an **after** recording with the same viewport and scroll sequence.
  - [ ] If any residual brightness flash exists, separately test against applicable WCAG flashing criteria using suitable measurement tools; **do not use the ~6.6 FPS source recording as a flash-frequency measurement.**

#### GP-01 — Incomplete hero headline

- **Priority/status:** P1 / OBSERVED
- **Where:** Hero, approximately 00:02–00:06. [Screenshot](evidence/t06.jpg)
- **Actual:** The prominent phrase reads **“but your portfolio shows them what you can”**, and the next visible element is the descriptive paragraph; **“do”** is absent.
- **Impact:** The most prominent sales statement finishes ungrammatically and appears accidentally truncated. This hurts polish and clarity at the most important conversion point.
- **Fix:** Change the sentence to: **“Your degree tells people what you studied. Your portfolio shows what you can do.”** Preserve desired editorial styling without sacrificing syntax.
- **Acceptance:** Full sentence remains legible, semantically complete and not clipped at common desktop and mobile widths.

#### GP-02 — Conflicting collection statistics

- **Priority/status:** P1 / OBSERVED
- **Where:** Metrics strip at 00:10–00:11 and evidence section near 00:24. [40 screenshot](evidence/t10.jpg) · [42+ screenshot](evidence/t24.jpg)
- **Actual:** The strip says **“40 DEGREE PATHS”** while a later section displays **“42+ DEGREE PATHS MAPPED.”** Other copy uses “forty-plus,” which does not resolve the exact-number conflict.
- **Impact:** Even a small inconsistency weakens trust in advertised figures and makes future content maintenance harder.
- **Fix:** Select a verified metric and formatting rule (for example, one audited number or a consistently rounded **“40+”**) and derive both representations from a shared data constant or CMS record.
- **Acceptance:** Hero/metrics, collection sections, footer and any SEO/schema claims use consistent, currently verified figures.

#### GP-03 — Important hero content and body CTA fall below the fold

- **Priority/status:** P1 / UX FINDING
- **Where:** Initial load 00:00–00:05 vs. the scrolled view at 00:06. [Initial screen](evidence/t02.jpg) · [Scrolled CTA](evidence/t06.jpg)
- **Actual:** At the captured viewport height, the hero heading takes nearly all the available room; supporting copy is partly below view and the on-page **“Explore the Portfolios”** and **“Request My Portfolio”** actions only appear after scrolling. A separate request button **is** visible in the sticky header.
- **Impact:** A visitor receives a dramatic introduction but not the complete above-the-fold offer and clear choice of actions.
- **Fix:** Reduce hero heading line count/size or visual occupancy, place a one-line explanation and at least one high-priority action in the initial viewport, and avoid duplicate equally prominent requests.
- **Acceptance:** At approximately 1366×768, 1440×900, 1024×768 and representative mobile viewports, visitors can immediately see what the service does and one clear next step.

#### GP-04 — Low-information spacing at the hero transition

- **Priority/status:** P1 / UX FINDING
- **Where:** 00:06–00:10. [Screenshot](evidence/t08.jpg)
- **Actual:** Significant dark negative space appears while the hero clears and the numeric/discipline section begins. The section transition carries little explanatory content.
- **Impact:** The page can feel longer or emptier than the amount of information warrants, particularly to fast scanners.
- **Fix:** Tighten section boundaries, shorten decorative transition scroll distance and introduce the next section before the prior context disappears completely.
- **Acceptance:** No normal scroll interval requires prolonged movement through a largely empty screen without meaningful new information or a deliberate, short transition.

#### GP-05 — Manifesto occupies excessive scroll time

- **Priority/status:** P1 / UX FINDING
- **Where:** Approximately 00:13–00:20. [Screenshot](evidence/t15.jpg) · [Later view](evidence/t18.jpg)
- **Actual:** Very large manifesto copy fills consecutive scroll views while maintaining essentially the same message about portfolios proving capability.
- **Impact:** The effect draws attention but may delay the tangible portfolio evidence users came to see, raising the chance of abandonment.
- **Fix:** Limit the editorial text to one well-composed section or a compact staggered reveal; place a real portfolio example or outcome alongside it. Keep motion optional.
- **Acceptance:** The section communicates its central proposition without requiring multiple near-identical viewports.

#### GP-06 — Weak immediate information yield in collection-evidence section

- **Priority/status:** P1 / UX FINDING
- **Where:** Approximately 00:20–00:24. [Opening view](evidence/t22.jpg) · [Later figures](evidence/t24.jpg)
- **Actual:** “The collection, in numbers that live in the scroll” initially sits beside a mostly dark presentation area; meaningful numbers become clear only deeper into the sequence.
- **Impact:** The stats section asks for attention before supplying the promised evidence.
- **Fix:** Display at least the core data values immediately; use scroll effects for emphasis rather than for revealing all the essential meaning.
- **Acceptance:** Collection figures are understandable even with reduced motion, JavaScript animation disabled, or fast scrolling.

#### GP-07 — Unreadable micro-labels and body details

- **Priority/status:** P2 / UX FINDING
- **Where:** Nav labels, hero metadata, metrics, ticker category pills, preview captions, school card tags, process labels and footer throughout. [Example 1](evidence/t11.jpg) · [Example 2](evidence/t51.jpg)
- **Actual:** Multiple important phrases are rendered in tiny uppercase/tracked type. At 1364px width, secondary text often requires zooming for comfortable reading.
- **Impact:** Poor scanning, especially for users with reduced visual acuity, browser zoom or mid-sized laptops.
- **Fix:** Define responsive type tokens. Prefer ~14–16px minimum for meaningful metadata/body copy, larger primary descriptions, normal letter spacing for long labels, and avoid using ultra-small type as the only way to convey critical information.
- **Acceptance:** Important text remains readable at normal zoom and 200% zoom without content loss or horizontal scrolling.

#### GP-08 — Overly muted contrast for informative text

- **Priority/status:** P2 / UX FINDING
- **Where:** Secondary copy and thin outlines throughout; especially the manifesto, school tags, process and footer. [Example](evidence/t51.jpg)
- **Actual:** Gray-on-near-black copy and subtly colored borders are difficult to distinguish from the backdrop in the recording.
- **Impact:** Users may miss important qualifiers, school descriptions, links and the legal disclaimer.
- **Fix:** Strengthen readable text tokens, distinguish decorative lines from functional controls, and audit actual CSS values against WCAG contrast targets (4.5:1 for normal text, 3:1 for large text and essential UI indicators as applicable).
- **Acceptance:** Instrumented contrast and human readability checks pass on all theme states; do not rely solely on visual intuition from the video.

#### GP-09 — Hero imagery competes with headline and paragraphs

- **Priority/status:** P2 / UX FINDING
- **Where:** Hero around 00:02–00:06. [Screenshot](evidence/t02.jpg)
- **Actual:** A small photo appears inline within the headline and another photograph floats behind the left copy, including the transition into “what you can.”
- **Impact:** An otherwise strong statement is harder to read, with competing visual focal points and a less predictable responsive composition.
- **Fix:** Move decorative imagery outside the text flow or into a deliberate reserved grid cell; reserve a clear text-safe area; use responsive rules so ornaments never collide with important glyphs.
- **Acceptance:** Headline, description and action remain cleanly separated at all supported widths and browser zoom settings.

#### GP-10 — Hero's changing preview demands attention

- **Priority/status:** P2 / UX FINDING
- **Where:** First 6 seconds. [Early state](evidence/t02.jpg) · [Later state](evidence/t06.jpg)
- **Actual:** The showcased portfolio on the right changes from one graduate example to another while the visitor is reading the opening copy.
- **Impact:** Automatic motion can distract from the primary value proposition; it also requires motion-accessibility checks.
- **Fix:** Consider a stable first showcase, slower non-disruptive crossfades, or user-triggered navigation. Pause on hover/focus and support `prefers-reduced-motion`.
- **Acceptance:** No layout jumps; users have enough time to read; reduced-motion users can access the same information.

#### GP-11 — Discipline marquee is substantially cropped

- **Priority/status:** P2 / UX FINDING
- **Where:** 00:10–00:12. [Screenshot](evidence/t11.jpg)
- **Actual:** Very large changing labels such as “BIOCHEMISTRY” dominate while adjoining course/discipline names are cut off at viewport edges.
- **Impact:** It works as decorative kinetic typography but not as a reliably readable list of supported degree areas.
- **Fix:** Keep the marquee ornamental; provide a nearby readable, searchable taxonomy or a clear “View all degree paths” action, and pause/disable motion for accessibility.
- **Acceptance:** Every supported discipline can be found through an accessible non-animated control.

#### GP-12 — Chapter progress rail lacks clear utility

- **Priority/status:** P2 / UX FINDING
- **Where:** Left edge throughout. [Example](evidence/t38.jpg)
- **Actual:** The slim progress track uses tiny chapter marks / Roman numerals and decorative rules with minimal explanation.
- **Impact:** A persistent element takes visual space but communicates little to unfamiliar visitors. Whether it is clickable cannot be determined from the video.
- **Fix:** Either make it a genuine labeled section navigator with focus states and tooltips, or simplify it to a non-interactive progress indicator, hidden where screen space is scarce.
- **Acceptance:** Its purpose is obvious; if interactive, it works with keyboard and screen-reader navigation.

#### GP-13 — Decorative background wording competes with manifesto

- **Priority/status:** P2 / UX FINDING
- **Where:** 00:13–00:19. [Screenshot](evidence/t15.jpg)
- **Actual:** Huge dim “PROOF” lettering and photographic textures sit behind primary manifesto text.
- **Impact:** The editorial feel is memorable, but background text and foreground text fight for the same reading path.
- **Fix:** Lower the visual prominence of decorative words beneath active body lines or confine background graphics to a separate side panel.
- **Acceptance:** Main copy is the obvious first reading target on desktop and mobile.

#### GP-14 — One-portfolio exhibition is spatially underused

- **Priority/status:** P2 / UX FINDING
- **Where:** 00:28–00:32. [Screenshot](evidence/t30.jpg)
- **Actual:** “One portfolio is one person” accompanies a relatively small browser-style preview floating in a mostly empty dark field before it grows.
- **Impact:** The strongest actual deliverable receives less immediately legible real estate than surrounding editorial sections.
- **Fix:** Present the portfolio larger from the beginning, with a graduate name, discipline, 2–3 proof points and a clear “View full portfolio” link. Use scale animation only as supplementary polish.
- **Acceptance:** An unfamiliar visitor recognizes the showcased product and can open it without hunting.

#### GP-15 — Featured gallery navigation and cropping

- **Priority/status:** P2 / UX FINDING
- **Where:** 00:32–00:36. [Screenshot](evidence/t34.jpg)
- **Actual:** Wide portfolio cards visibly extend beyond the viewport on both sides; small arrow icons and tiny fraction-like indicators do not strongly explain how to browse the full set.
- **Impact:** Users may mistake the partial cards for poor cropping or fail to discover additional portfolios.
- **Fix:** Provide clear previous/next controls, touch-swipe and keyboard controls, visible item count, sensible snap positions and a deliberate peek amount for the next card. Prefer fully readable card names and professions.
- **Acceptance:** Every example can be reached without losing context, on mouse, touch and keyboard; controls are visible and adequately sized.

#### GP-16 — Portfolio screenshot mosaic lacks scannable metadata

- **Priority/status:** P2 / UX FINDING
- **Where:** 00:40–00:43. [Screenshot](evidence/t41.jpg) · [Later view](evidence/t43.jpg)
- **Actual:** Multiple miniature, full-page-looking portfolio screenshots compete for attention. Names and departments mostly live *inside* the thumbnail designs, often in text too small to read.
- **Impact:** Visitors see aesthetic variety but cannot quickly identify who each portfolio belongs to or which disciplines it represents.
- **Fix:** Add an external label for each tile (name, degree, school, differentiating work), an obvious “Open example” action, and a hover/focus state that does not depend on animation.
- **Acceptance:** A user can identify and select any visible example without reading tiny text within the screenshot.

#### GP-17 — School cards under-emphasize navigation

- **Priority/status:** P2 / UX FINDING
- **Where:** 00:37–00:40. [Screenshot](evidence/t38.jpg)
- **Actual:** Attractive photography and large slogans dominate each school panel. Small category chips, descriptions and the “ENTER ENGINEERING” action sit low in the hierarchy.
- **Impact:** The cards sell the mood more clearly than the destination, slowing course discovery.
- **Fix:** Make each card's school name unmistakable; increase the action affordance and contrast; show the number and examples of degree paths; make the whole appropriate card surface clickable if semantics allow.
- **Acceptance:** Users can distinguish the schools and reach a degree-category page with one clear action.

#### GP-18 — Floating WhatsApp widget overlaps page content

- **Priority/status:** P2 / OBSERVED
- **Where:** Lower-right corner from approximately 00:22 onward; especially gallery, evidence grid and footer. [Screenshot](evidence/t47.jpg) · [Footer](evidence/t51.jpg)
- **Actual:** The persistent pill “Ask GTSS on WhatsApp” and its dismiss button sit over the lower-right content surface and visually cover part of underlying content in some captured views. The recording does **not** prove that clicks are blocked.
- **Impact:** Reduces usable space and can conceal details, particularly on shorter viewports and mobile.
- **Fix:** Reserve safe spacing near page edges; automatically collapse the pill to a smaller icon when it overlaps interactive cards; respect safe-area insets; offer accessible close/reopen behavior.
- **Acceptance:** No readable content or interactive control is obscured at standard responsive widths or at 200% zoom.

#### GP-19 — Explanatory and process content is too visually quiet

- **Priority/status:** P2 / UX FINDING
- **Where:** Portfolio-versus-CV comparison and process timeline, 00:25–00:28 and 00:44–00:46. [Comparison](evidence/t26.jpg) · [Process](evidence/t45.jpg)
- **Actual:** Micro-descriptions and step labels appear subordinate to large headings, backgrounds and decorative timelines.
- **Impact:** Users can remember the slogan but miss what GTSS actually asks them to provide and what GTSS delivers.
- **Fix:** Give each step a short verb-led title plus one legible outcome; make the required inputs, deliverables and sequence clear. Keep the graphic as accompaniment, not the only explanatory layer.
- **Acceptance:** A first-time graduate can summarize how to request a portfolio and what happens next after skimming the process section.

#### GP-20 — Unexplained total-versus-featured counts

- **Priority/status:** P2 / UX FINDING
- **Where:** Metric strip 00:10 and gallery headline 00:32–00:36. [Metric](evidence/t10.jpg) · [Gallery](evidence/t34.jpg)
- **Actual:** The site advertises **10 live portfolios**, then introduces **six portfolios, six professions**. These are not logically inconsistent if the gallery is a curated subset, but the distinction is not stated near the latter heading.
- **Impact:** A careful visitor may reasonably wonder why four examples are missing.
- **Fix:** Use wording such as **“Six featured portfolios from our growing collection”** and provide a direct route to all 10 live examples if that total is accurate.
- **Acceptance:** Every showcase count is clearly defined as *featured*, *live*, *total* or *sampled*.

#### GP-21 — Independent initiative disclosure is hard to discover

- **Priority/status:** P2 / UX FINDING
- **Where:** Footer at approximately 00:50–00:52. [Screenshot](evidence/t51.jpg)
- **Actual:** The footer explains that GTSS Graduate Portfolios is an independent initiative, not affiliated with or endorsed by Moi University. The qualification is shown in a very low-emphasis footer line.
- **Impact:** Visitors encountering a strongly Moi-University-branded collection may not notice this material clarification.
- **Fix:** Preserve the footer disclaimer and provide a concise, readable independence note near the top-level “Moi University Collection” label or the About section. Do not visually imply formal university endorsement.
- **Acceptance:** Visitors can identify the service operator and university relationship without having to read microscopic footer copy.

#### GP-22 — End-of-page CTAs lack an intentional hierarchy

- **Priority/status:** P2 / UX FINDING
- **Where:** 00:49–00:52. [Screenshot](evidence/t51.jpg)
- **Actual:** A request button appears in the sticky header, another large “Request My Portfolio” CTA appears above the footer, “Ask GTSS on WhatsApp” appears next to it, and the floating WhatsApp widget also remains open.
- **Impact:** Repetition can be useful, but this arrangement gives unnecessary duplication to the WhatsApp path and weakens the distinction between consultation and submitting a request.
- **Fix:** Give the concluding section one primary conversion and one clearly secondary path; shrink or suppress the floating CTA while the same action is visible in the content.
- **Acceptance:** A user sees one obvious next step and one alternative, without overlapping duplicated controls.

#### GP-23 — Manifesto wording may alienate the audience

- **Priority/status:** P3 / UX FINDING (editorial judgment)
- **Where:** 00:14–00:19. [Screenshot](evidence/t15.jpg)
- **Actual:** “Most of it dies in a lecture hall” is rhetorically strong but frames classroom work negatively.
- **Impact:** May be less welcoming to lecturers, departments and graduates who want their educational work celebrated.
- **Fix:** Test warmer, equally assertive copy: **“Too much of that work never gets the audience it deserves.”** Preserve the emphasis on showing authentic evidence.
- **Acceptance:** Copy clearly values university learning and positions the portfolio as an amplifier, not as a dismissal of academic work.

#### GP-24 — Repetition increases scroll length without proportional substance

- **Priority/status:** P3 / UX FINDING
- **Where:** Full recording. [Manifesto](evidence/t15.jpg) · [One-person exhibit](evidence/t30.jpg) · [School card](evidence/t38.jpg)
- **Actual:** Multiple chapters reiterate that a portfolio communicates ability, while tangible details about formats, example outcomes, request process and expected turnaround are comparatively scarce in the recorded views.
- **Impact:** The site can feel like a design presentation rather than an efficient product/service discovery flow.
- **Fix:** Retain the strongest emotional message once, move evidence and examples earlier, and replace redundant statements with meaningful details: included sections, disciplines, graduate inputs, review rounds, timelines, delivery process and clear next steps. Only publish actual, verified commercial terms.
- **Acceptance:** Each major section answers a distinct visitor question rather than restating the primary slogan.

---

## 3. Issues that **must be tested**, not marked as confirmed bugs

The video contains scrolling, not systematic clicks. These checks are important but **remain unverified**:

| Test | What to validate | Pass criterion |
| --- | --- | --- |
| T-01 — All navigation | Logo, Explore, Schools menu, How It Works, For Graduates, For Departments, footer links | Every destination resolves correctly, including direct loads and refreshes |
| T-02 — Hero CTAs | Explore the Portfolios; Request My Portfolio; header CTA | Correct route, focus state and eventual conversion form/contact outcome |
| T-03 — WhatsApp | Floating pill, dismiss/reopen, inline Ask GTSS links | Correct contact deep link, prefilled message if intended, no popup or mobile handling failures |
| T-04 — Collection filters | Discipline chips and school/category filters if interactive | Selected state and displayed results stay consistent; keyboard navigation works |
| T-05 — Featured gallery | Next/previous, cards, hover, swipe, drag, keyboard and focus behavior | All items reachable; no trapped focus, unexpected autoplay or clipped targets |
| T-06 — Portfolio previews | Preview URLs, names, loading states, images and `LIVE` badges | Each published example opens the correct live portfolio, including failures handled gracefully |
| T-07 — School cards | Entry links and path lists | Labels, path counts and destinations match the actual degree taxonomy |
| T-08 — CV comparison tabs | “Final-year project” vs. “Industrial attachment” | Content and semantics update correctly, including ARIA-selected and keyboard operation |
| T-09 — FAQ accordions | Expand/collapse, link behavior, announcements | Answers are complete, accurate and screen-reader accessible |
| T-10 — Scroll behavior | Scroll snapping/pinning, animation performance, browser back/forward, anchor offsets | No trapped scroll, frozen input, content disappearance or nav-covered headings |
| T-11 — Reduced motion | `prefers-reduced-motion: reduce` | Core content visible without mandatory animation; no inaccessible motion dependency |
| T-12 — Mobile/tablet | 320, 375, 390, 430, 768, 1024px and short-height landscape | No heading truncation, text collisions, horizontal overflow, hidden CTAs or occluded links |
| T-13 — Accessibility | Keyboard-only, screen readers, zoom 200%/400%, contrast checks | Perceivable, operable and understandable controls with usable focus and text contrast |
| T-14 — Web performance | Lighthouse + actual low-end Android testing; LCP, CLS, INP | Targets selected and met; avoid claiming current metrics from a video alone |
| T-15 — Accuracy | Live portfolio total, featured count, schools, degree paths, example identities and affiliation | Only verified, centrally managed claims published |
| T-16 — Media robustness | Slow network, image load failures, responsive image crops, layout shift | Useful fallbacks, reserved aspect ratios, lazy-loading where appropriate |
| T-17 — Conversion funnel | Request entry, input validation, submit feedback, success/error handling | A student can complete the inquiry/request flow on desktop and mobile |
| T-18 — SEO/discoverability | Page title, description, canonical URLs, OG images, indexing rules, links for individual categories | Correct metadata and crawlable content; requires technical inspection |
| T-19 — Contact/terms | Price, scope, turnaround, revisions, privacy handling and FAQ claims | Key commercial terms are findable and accurate; don't assume absence from this recording |
| T-20 — Functional stability | Browser console, network errors, hydration and route transitions | No reproducible runtime errors; requires a live test and logs |
| T-21 — Background flicker isolation | Isolate static/animated backdrop layers, hover/pointer, stationary idle, scrolling and page transitions | Root cause identified and removed or replaced with a truly static surface; confirm with before/after recordings |
| T-22 — Motion safety | Continuous atmosphere under standard and reduced-motion OS settings; browser/graphics configurations | No persistent background flicker/drift or repeated flash; meaningful content remains usable |

**Not established by this recording:** broken images, network timeouts, HTTP errors, failed payments, nonfunctional buttons, a measured slow load, layout shift scores, specific React bugs, mobile overflow, or broken keyboard support. Any of these needs its own test evidence before being logged as a confirmed defect.

## 4. Proposed design and content improvements

### A. Reconstruct the first screen

- Compact navigation with readable labels and one primary header action.
- Complete hero value statement: **“Your degree tells people what you studied. Your portfolio shows what you can do.”**
- One concise supporting sentence explaining that GTSS creates profession-specific portfolios from real coursework, internships, research and projects, assuming that description is accurate for the service.
- Primary: **Explore real examples**. Secondary: **Request my portfolio** (or reverse based on measured conversion objectives).
- One real, stable, legible portfolio example, ideally with the graduate's name, discipline and one proof point.
- Keep ornamental imagery out of the text-safe zone.

### B. Replace scroll theatrics with an information hierarchy

Suggested order:

1. Hero: what it is and what the visitor can do.
2. Portfolio gallery: 3–6 usable examples, plus view-all link.
3. Disciplines/schools: searchable, navigable categories.
4. Proof: authentic work a graduate can include.
5. CV vs. portfolio: concise, interactive demonstration.
6. Process: what users send, what GTSS does, what they receive.
7. FAQ, terms and honest affiliation clarification.
8. Conversion CTA and footer.

Preserve distinctive typography, yellow accents, photography and transitions **inside** this clearer sequence; avoid relying on oversized blanks or long pinned scroll as the primary storytelling mechanic.

### C. Visual system fixes

- Define minimum body, caption and metadata sizes with responsive type scales.
- Use high-contrast foreground tokens for informative text; reserve muted values for purely decorative elements.
- Reserve text-safe regions, especially in cards mixing photography and overlays.
- Standardize card structures: **image/preview → identity/title → profession/school → unique proof → clear action**.
- Give the portfolio gallery visible controls and a predictable card width across devices.
- Use readable default states, not hover-only information.
- Configure sticky-nav anchor offsets and responsive widget safe zones.

### D. Motion discipline

- **First fix GP-25:** eliminate continuous full-page background grain/grid shimmer, parallax drift, brightness pulsing and any background flicker. A static textured backdrop is preferable to a moving one.
- Treat ambient background motion separately from short, intentional interactive/foreground transitions.
- Include idle-state, scroll-state and reduced-motion recordings in visual regression testing.
- Prefer short, purposeful transitions that communicate state rather than forcing visitors to watch narration.
- Avoid scroll-controlled sections that leave key information invisible until the user traverses a long distance.
- Support reduced motion, keyboard scrolling and quick successive scroll inputs.
- If there is an autoplay showcase, pause it on hover/focus and consider user control.

---

## 5. Implementation sequence

### Sprint 1 — Trust and above-the-fold usability

**Must deliver:** **GP-25 (background stability)**, GP-01, GP-02, GP-03, GP-07, GP-08, GP-18.

- **Remove the flickering/moving background effect first**, while preserving a static dark/grain/grid visual style. Identify the actual culprit rather than masking the symptom; verify in-browser and with fresh video evidence.
- Correct hero copy and all degree counts; centralize statistics.
- Fit the proposition and at least one clear conversion action into the first usable viewport.
- Raise typography and contrast; fix floating chat obstruction.
- Capture before/after screenshots at desktop and mobile widths.

**Exit criteria:** Stable, non-flickering background on idle and scroll; clear first-screen offering, numerically consistent statistics, legible controls and no obstructed CTA.

### Sprint 2 — Scroll pacing and real portfolio evidence

**Must deliver:** GP-04, GP-05, GP-06, GP-10, GP-11, GP-13, GP-14, GP-15, GP-16.

- Shorten over-long cinematic sections and show core stats without mandatory scroll animation.
- Promote real examples earlier; clarify which portfolios are featured vs. all live.
- Improve card navigation, metadata and thumbnail inspectability.

**Exit criteria:** Every content section has immediate information value, and every showcased portfolio is identifiable and reachable.

### Sprint 3 — School discovery, conversion and polish

**Must deliver:** GP-09, GP-12, GP-17, GP-19, GP-20, GP-21, GP-22, GP-23, GP-24 plus relevant `T-*` tests.

- Strengthen card actions, process copy, trust presentation and FAQ.
- Align end-of-page CTAs and reduce duplicate WhatsApp controls.
- Complete mobile, keyboard, reduced-motion, performance and live-link verification.

**Exit criteria:** A new graduate can find their discipline, inspect a relevant example, understand the service and complete a request without confusion.

---

## 6. Final QA / acceptance checklist

- [ ] **No continuous background flicker, moving grain, shifting grid, opacity pulsing or full-page shimmer** anywhere in the site, at rest or during scroll.
- [ ] Background issue GP-25 reproduced, causative layer identified, and **before/after video** captured at matching viewport.
- [ ] Reduced-motion preference disables atmospheric motion without hiding content or breaking interactions.
- [ ] Hero headline grammatically complete and wholly visible at target viewport sizes.
- [ ] All school, path and portfolio counts agree and are validated.
- [ ] First screen has a clear value proposition and usable primary CTA.
- [ ] No major blank/under-informative scroll segment remains without a documented purpose.
- [ ] Section headings, descriptions and metadata have comfortable sizes and contrast.
- [ ] Hero ornaments never touch, cross or visually obscure text.
- [ ] Carousel labels/actions and school destinations are easy to scan.
- [ ] Floating chat never covers content or interactive controls.
- [ ] Portfolio examples have clear identity, discipline and direct destinations.
- [ ] Header/footer/FAQ/process/request links are tested, not assumed functional.
- [ ] School menu, comparison tabs, FAQ and gallery pass keyboard tests.
- [ ] Reduced-motion presentation preserves all key content.
- [ ] Desktop, tablet and mobile responsive screenshots reviewed manually.
- [ ] No meaningful horizontal overflow at supported breakpoints.
- [ ] Independent-service disclaimer remains readable and accurately positioned.
- [ ] All statistics, showcased identities, destinations and service promises are truthful.
- [ ] Technical Lighthouse/field measurements collected after remediation.

---

## 7. Evidence index

These are still frames extracted from the user-supplied recording. The relative links work when this report is opened **inside the accompanying ZIP evidence bundle**.

| Timestamp | Screenshot | What it documents |
| --- | --- | --- |
| 00:02 | [t02.jpg](evidence/t02.jpg) | Hero headline, overlapping ornamentation and below-fold CTA |
| 00:06 | [t06.jpg](evidence/t06.jpg) | Missing “do,” body buttons after scroll, hero preview change |
| 00:08 | [t08.jpg](evidence/t08.jpg) | Hero transition and large empty canvas |
| 00:10 | [t10.jpg](evidence/t10.jpg) | Stat strip reading 40 degree paths |
| 00:11 | [t11.jpg](evidence/t11.jpg) | Discipline marquee and typography scale |
| 00:15 | [t15.jpg](evidence/t15.jpg) | Manifesto, large background “PROOF” |
| 00:18 | [t18.jpg](evidence/t18.jpg) | Prolonged manifesto presentation |
| 00:22 | [t22.jpg](evidence/t22.jpg) | Sparse evidence-section entry; textured/grid backdrop for GP-25 (a still cannot capture flicker) |
| 00:24 | [t24.jpg](evidence/t24.jpg) | 42+ degree-path claim |
| 00:26 | [t26.jpg](evidence/t26.jpg) | CV-to-portfolio comparison |
| 00:30 | [t30.jpg](evidence/t30.jpg) | Single-portfolio exhibit scale |
| 00:34 | [t34.jpg](evidence/t34.jpg) | Featured carousel cards and partial edges |
| 00:38 | [t38.jpg](evidence/t38.jpg) | School card and understated CTA |
| 00:41 | [t41.jpg](evidence/t41.jpg) | Preview mosaic without external labels |
| 00:43 | [t43.jpg](evidence/t43.jpg) | Many small portfolio thumbnails |
| 00:45 | [t45.jpg](evidence/t45.jpg) | Process/timeline presentation |
| 00:47 | [t47.jpg](evidence/t47.jpg) | Evidence section and floating WhatsApp pill |
| 00:49 | [t49.jpg](evidence/t49.jpg) | FAQ and contrast |
| 00:51 | [t51.jpg](evidence/t51.jpg) | Footer, duplicate CTA opportunity and independence disclosure |

| 00:20–00:24 | [Short video excerpt](evidence/background_motion_excerpt_20_to_24s.mp4) | Temporal context for textured collection backdrop; replay alongside live-browser check (low-FPS recording does not prove precise motion behavior) |

**End of revised audit — 25 findings, 22 follow-up verification checks.**
