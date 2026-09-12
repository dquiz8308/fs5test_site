# FS5 Global Interface Design Audit

Read-only implementation audit completed 2026-08-02. No website HTML, CSS, JavaScript, data, or artwork was changed. This document is the only audit-created file.

## 1. Executive summary

FS5 has a recognizable shared interface: header artwork, a white page name, a dark-blue navigation bar, red interaction accents, a full-screen mobile menu, and a dark-blue footer. Sixteen primary pages repeat the same header/navigation/footer contract. All use root `mobile-menu.js`; 15 standard-header pages use root `common.css` (including Brackets), while Hall of Champions uses its intentional gold-themed `commonchamp.css` variant.

Sections 1-15 preserve the initial audit state and recommendations. Sections 19-24 record the owner-approved permanent header, stylesheet consolidation, navigation, footer/page-shell, and final footer-polish implementation. Sections 25-27 record the later completed Owners, H2H, and Hall of Champions page-specific redesigns and supersede older current-state statements where they differ; none changed the approved global interface.

The current header appearance can be preserved, but its layout mechanics should not be. The page name is an `<h1 class="website-title">`, not an `<h2>`, and is placed in normal inline flow with fixed `margin-left` values. That can align a particular title by eye at a particular width, but it cannot mathematically center different titles in the header or viewport. Mobile CSS does not hide this title in the current repository: it changes it to `display: block`, gives it another fixed left margin, and uses an invalid `translateY` declaration. If the deployed title is hidden, the deployed files differ from this checkout or another runtime factor is involved.

The highest-priority corrections are functional and accessibility-related: replace the fragile title positioning; make desktop dropdowns operable without hover; give the mobile menu real button/menu semantics and state; support Escape, focus management, scroll containment, and explicit submenu control; repair active-page metadata; and remove malformed shared CSS. The footer content is identical on all 16 primary pages, but its absolute positioning and the global `main { min-height: 180vh; }` are brittle.

Recommended direction: keep the static architecture and header art, establish one canonical global chrome contract, render a three-zone header whose center is independent of side widths, use buttons for submenu disclosure, and standardize copied markup through an owner-approved maintenance workflow. A build system or framework is not required.

Recommendation labels used below:

- **[Functional]** Necessary functional correction
- **[Accessibility]** Accessibility improvement
- **[Maintainability]** Maintainability improvement
- **[Polish]** Optional visual polish

## 2. Current global interface inventory

### Primary pages and dependencies

| Page | Header title | Shared chrome CSS | Mobile-menu JS | Recorded active link(s) |
|---|---|---|---|---|
| `/` | Home | `styles.css`, `common.css` | `mobile-menu.js` | none |
| `/owners/` | Owners | `owners/ownerstyle.css`, `common.css` | copied `owners/mobile-menu.js` | Owners |
| `/h2h/` | Head to Head | `h2h/h2hstyle.css`, `common.css` | root copy | H2H |
| `/nextgenstats/` | NextGenStats | `nextgenstats/nextgen-styles.css`, `common.css` | root copy | NextGenStats |
| `/nextgenstats/currentyear/` | Season Records | page CSS, `common.css` | root copy | **Owners (wrong)** |
| `/nextgenstats/seasonrecords/` | Season Records | page CSS, `common.css` | root copy | Season Records |
| `/nextgenstats/singlegame/` | Single Game Records | page CSS, `common.css` | root copy | Single Game Records |
| `/nextgenstats/alltime/` | All-Time Records | page CSS, `common.css` | root copy | **Owners and All-Time (two active links)** |
| `/fs5book/` | FS5 Sportsbook | page CSS, `common.css` | root copy | **Owners (wrong)** |
| `/vault/` | Vault | `styles.css`, `common.css` | root copy | **Owners (wrong)** |
| `/vault/archive/` | Archive | `styles.css`, `common.css`, page CSS | root copy | **Owners (wrong)** |
| `/vault/brackets/` | Playoff Brackets | page CSS, `styles.css`, `commonbrackets.css` at audit time; consolidated later | root copy | **Owners (wrong)** |
| `/vault/bowls/` | Bowl Games | `styles.css`, `common.css`, page CSS | root copy | **Owners (wrong)** |
| `/vault/probowl/` | Pro Bowl | page CSS, `styles.css`, `common.css` | root copy | **Owners (wrong)** |
| `/divisions/` | Divisions | `styles.css`, `common.css` | root copy | **Owners (wrong)** |
| `/hallofchampions/` | empty | `styles.css`, `commonchamp.css`, page CSS | root copy | **Owners (wrong)** |

All 16 have the same footer text: `FastStrongFive Fantasy. Founded 2012.` Each primary navigation contains 16 anchors: eight top-level destinations plus four NextGenStats and four Vault submenu destinations. Relative URLs differ by folder depth.

The 2012-2025 archive replay wrappers, `vault/archive/OLD2013.html`, and `vault/archive/2012/2012.html` are special-purpose or unlinked pages and do not use the primary chrome. They should not be forced into the normal template without an explicit product decision.

### Shared and copied assets

- Root `common.css` is the active shared chrome stylesheet for 14 primary pages.
- At initial audit time, `hallofchampions/commonchamp.css` and `vault/brackets/commonbrackets.css` were active divergent copies. The Brackets copy was later consolidated into root `common.css`; Hall of Champions remains intentionally separate.
- `hallofchampions/common.css`, `vault/common.css`, and `vault/probowl/common.css` are additional divergent copies not referenced by current primary HTML.
- Root `styles.css`, `vault/styles.css`, and `vault/probowl/styles.css` are byte-identical. `vault/archive/styles.css` differs. The local Vault copies are not referenced by the primary Vault pages audited here.
- Root `mobile-menu.js` and `owners/mobile-menu.js` are byte-identical. Only Owners uses the copy.
- Canonical header artwork is root `artwork/header3.png`; mobile chrome requests `artwork/header2.png`. Copied CSS changes relative paths, and some unused copies point mobile art at a page-local `header2.png` that is not established as canonical.
- Root `artwork/logo.png` is repeated as the mobile navigation logo. Several headers retain a hidden logo `<img style="display:none">`; other headers omit it.

**[Maintainability]** Treat the root shared files and canonical root art as the eventual source of truth; classify the other copies as active exceptions or unused compatibility material before deleting anything.

## 3. Header and title analysis

### Exact current approach

The header has a cover background image and `60px 0` padding (`50px 0` below 768px). Its `.container` is `width: 85%; margin: 0 auto`. The title is an inline-block in normal flow. At up to 1200px it receives `margin-left: 110px`; above 1200px it receives `margin-left: 90px`. A hidden logo element precedes it on some pages, but inline `display:none` removes that logo from layout. The mobile toggle is fixed to the viewport at `top: 10px; left: 20px`.

At 768px and below, `.website-title` becomes block-level, remains white, uses `text-align: center`, `margin-left: 70px`, and `font-size: 30px`. `transform: translateY (0px)` is invalid because of the space before the parentheses and has no effect.

### Why centering fails

The title's left margin positions its left edge after the preceding inline-flow position. It does not relate the title's midpoint to the header, container, or viewport midpoint. A longer title extends farther right; a shorter title appears farther left. The 85%-wide container also changes the reference area, and asymmetric fixed controls do not reserve equal space.

Visual centering is an optical judgment that may account for the background art, letter shapes, or intentionally asymmetric controls. Mathematical centering means the title's center coordinate equals the chosen box's center coordinate. Fixed left margins provide neither invariant. Centering a flex child between unequal left/right siblings also centers it only in the remaining space, not necessarily in the full header.

### Title hierarchy and variations

- The global page name is consistently an `<h1>`, despite references to an `<h2>` in the request.
- Record pages add content `<h2>` headings below navigation; these are separate from the header title.
- Brackets and Pro Bowl add a second content `<h1>`, producing two `<h1>` elements.
- Hall of Champions has an empty global `<h1>` and only team-name `<h2>` headings, so it lacks a meaningful page-level heading.
- Current Year and historical Season Records both say `Season Records` in the header, although the former has a `2025 Season Records` content `<h2>`.

### Recommended header solution

**[Functional]** Retain the header art and approximate height, but replace inline-flow/margin positioning with an explicit three-zone layout. Put the title in the geometrically centered zone (CSS Grid such as `1fr auto 1fr`, or absolute center within a positioned header), and reserve collision-safe side zones for the menu/logo. The title needs `min-width: 0`, a bounded width, controlled wrapping, and a long-title policy.

**[Functional]** Use responsive type via `clamp()` and allow at most two lines on narrow screens, or choose owner-approved truncation/short labels. Do not hide the only page heading.

**[Accessibility]** Keep one meaningful page `<h1>`. Demote duplicate content titles to `<h2>` where appropriate, or make the header title the sole page heading.

**[Maintainability]** Remove inline `style="display:none"` remnants only after confirming no future header-logo plan depends on them.

**[Polish]** After mathematical centering works, allow a small tokenized optical offset if the artwork makes exact center look wrong; document it rather than encoding title-specific margins.

## 4. Desktop navigation analysis

The desktop navigation is one horizontal flex row with 25px right margins, 18px links, and no wrapping or overflow strategy. NextGenStats and Vault are anchors with absolutely positioned nested lists shown only by parent `:hover`. The submenu is centered under its parent with `left: 50%` and `translateX(-50%)`.

Findings:

- **[Functional]** At constrained desktop/tablet widths, 8 top-level labels plus margins can overflow before the 768px mobile breakpoint. There is no intermediate compact state.
- **[Accessibility]** Hover is the only disclosure mechanism. Keyboard focus does not open dropdowns, and no `:focus-within` rule exists.
- **[Accessibility]** There are no shared `:focus` or `:focus-visible` navigation styles. Browser defaults may remain, but consistency and contrast are not guaranteed.
- **[Functional]** Parent category anchors both navigate and serve as implied dropdown triggers; this is ambiguous for touch and keyboard users.
- **[Functional]** Active classes are wrong on 10 pages and duplicated on All-Time. There is no shared `.active` link styling, so the metadata currently has little or no visible effect but remains semantically misleading.
- **[Maintainability]** Relative paths and active classes are hand-maintained in 16 copies, making drift predictable.
- **[Polish]** Hover scaling can cause visual crowding and motion; color/underline alone would be calmer and more stable.

Recommended organization: retain the existing destinations, but separate a category link from an adjacent disclosure button or make the category a disclosure control with an explicit “Overview” submenu item. Which model is preferred requires an owner decision.

## 5. Mobile navigation analysis

At 768px the `nav` becomes a fixed full-viewport-height overlay whose inline width is toggled between `0%` and `100%`. The logo appears inside the overlay and menu links become 30px block items. The same hover-only submenus remain in force.

The hamburger is a `<button>` containing three non-semantic `<div>` bars, with inline `onclick`. It has no `type`, accessible name, `aria-controls`, or `aria-expanded`. The script queries the first `nav` and first `.menu-toggle`, compares only `nav.style.width`, writes inline width, and toggles an `.active` animation class.

Findings:

- **[Accessibility]** Screen readers receive an unnamed button and no open/closed state.
- **[Accessibility]** Opening does not move focus into the menu; closing does not restore focus; Tab is not contained; Escape is unsupported.
- **[Functional]** There is no close-on-link, outside-click, resize, or history behavior. The only visible close mechanism is the same fixed button.
- **[Functional]** Background scroll is not locked. Overlay vertical scrolling is implicit rather than deliberately defined; long submenu expansion and short viewports need explicit `overflow-y: auto` and safe-area handling.
- **[Functional]** Submenus depend on hover. On touch devices, tapping the parent may navigate instead of reliably revealing children.
- **[Functional]** Script state depends on inline width rather than a single semantic class/attribute, making CSS/JS state easy to desynchronize.
- **[Accessibility]** The fixed toggle's black bars can have uncertain contrast over varying header/overlay artwork and lack a defined focus ring.
- **[Polish]** A 0.5-second full-width transition is relatively slow and has no shared reduced-motion handling.

**[Functional]** Replace inline-width state with one class/attribute contract, explicit submenu buttons, and deterministic open/close routines. **[Accessibility]** Add naming/state attributes, Escape support, focus entry/return, focus containment or inert background behavior, 44px minimum targets, and visible focus. **[Maintainability]** use one root script, event listeners, and resilient selectors scoped to the global header/nav.

## 6. Footer analysis

All 16 primary pages use identical footer structure and content. Shared styling gives the footer dark blue (`#00376b`), white bold text, centered 10px vertical padding, full width, and absolute positioning at the bottom of a relatively positioned body. Global `main` has `min-height: 180vh`.

- **[Functional]** Absolute positioning plus artificial 180vh main height is a brittle page-height mechanism and creates unnecessary whitespace on short pages. It can complicate overlays and future layout changes.
- **[Accessibility]** Footer contrast is strong in the core blue/white combination; no footer-specific landmark label is necessary for a single footer.
- **[Maintainability]** Markup is standardized but not centralized. In a no-build static site, a documented canonical snippet plus an audit/update script is lower risk than introducing runtime HTML injection.
- **[Polish]** Standardize container width and vertical rhythm with the future global tokens.

Recommended eventual layout: `body { min-height: 100vh; display: flex; flex-direction: column; }`, `main { flex: 1; }`, and a normal-flow footer. Validate every long page before removing existing minimum heights.

## 7. Shared visual-system analysis

### Current vocabulary

- Typography: predominantly Arial/sans-serif; SportsBook also uses Arial Black. No web-font dependency is needed for the shared chrome.
- Core colors: navy `#00376b`, red `#d30908`, white `#fff`/`#ffffff`, black `#000`, dark gray `#333`, gold `#d6b018`, and light grays such as `#ccc`/`#ddd`. Page systems introduce additional blues, golds, and neutrals.
- Spacing: global container width 85%; header padding 60/50px; nav padding 10px 20px; desktop item gap simulated with 25px margins; mobile item margins 20px.
- Borders/radii/shadows: the global nav uses a subtle 0 2px 4px shadow; dropdowns use a larger 0 8px 16px shadow. Page cards and controls use many unrelated 4-14px radii and shadow recipes.
- Buttons: no global button primitive. Page-specific controls vary widely.
- Breakpoints: shared chrome uses 1200/1201 and 768px. Page CSS also uses 1200, 1050, 980, 960, 900, 820, 800, 767, 765, 760, 700, 600, 540, 470, and 420px.

### Proposed initial tokens

```css
:root {
  --color-brand-navy: #00376b;
  --color-brand-red: #d30908;
  --color-brand-gold: #d6b018;
  --color-surface: #fff;
  --color-text: #000;
  --color-surface-dark: #333;
  --color-border: #ccc;
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --shadow-nav: 0 2px 4px rgb(0 0 0 / 10%);
  --shadow-menu: 0 8px 16px rgb(0 0 0 / 20%);
  --content-width: 85%;
  --tap-target: 2.75rem;
}
```

**[Maintainability]** Introduce only tokens confirmed across multiple components. Preserve page-owned palettes and card systems until each is reviewed. Do not globally normalize every radius, table, modal, or button: Owners, SportsBook, records, Bowls, Brackets, Pro Bowl, and Hall of Champions have intentional local systems.

## 8. Responsive and accessibility findings

Source-level checks cover wide desktop (>1200), desktop/tablet (769-1200), and mobile (<=768), with page breakpoints noted above. Browser-based localhost validation was attempted, but the in-app browser could not connect to the local server; therefore pixel placement, actual artwork contrast, and device-specific touch behavior remain unverified and must be tested during implementation.

Global risks:

- Long titles are not bounded and fixed offsets cannot prevent collisions.
- Desktop navigation has no 769-approximately-1100 overflow strategy.
- Mobile title is present in repository CSS, not hidden; its 70px left margin makes genuine centering impossible.
- Touch submenu behavior is undefined.
- Interactive navigation lacks deliberate keyboard/focus behavior and screen-reader state.
- The hamburger's visual bars are below the recommended 44px target unless button padding happens to provide enough hit area; verify computed size.
- No shared reduced-motion handling exists for nav transitions, although several newer page components handle it locally.
- White on navy and white/red usage should be measured in context; red should not be the sole state signal.
- Several pages contain heading-hierarchy defects, and Hall of Champions has an empty main heading.

**[Accessibility]** During implementation, test keyboard-only navigation, screen-reader announcements, 200% zoom, forced colors, reduced motion, 320/375/390/768px mobile widths, 820/1024px tablet widths, and 1280/1440px desktop widths.

## 9. Inconsistencies and technical debt

1. Six shared-chrome CSS files have different hashes; three are active and three appear unused.
2. Two mobile-menu scripts exist and are byte-identical.
3. Four `styles.css` copies exist; three are identical, one differs, and most local copies are not current dependencies.
4. Header markup varies in hidden logo presence, title text, and heading quality.
5. Active states are mostly copied from Owners and are incorrect.
6. Shared CSS contains malformed or inert declarations: `vertical-align: center`, `translateY (0px)`, missing semicolon after `width: 100%` in the mobile submenu block, a selector containing the literal token `STOP`, duplicated `overflow-x`, and duplicated font-weight declarations.
7. Desktop and mobile dropdown behavior is encoded only in CSS hover rules.
8. Inline `onclick` is repeated across pages.
9. Global class names such as `.container`, `nav`, `header`, `main`, and `footer` are broad and collision-prone with page CSS.
10. Breakpoints differ by only 1-8px in many older page systems, increasing boundary surprises.

**[Maintainability]** Preserve historical/unlinked material until ownership is decided, but do not copy it forward into the new global contract.

## 10. Design and functional improvement options

### Header/title

- Option A: centered CSS Grid title with equal flexible side tracks. Best default when side controls can occupy mirrored zones.
- Option B: title absolutely centered over a positioned header, with reserved side padding and collision detection/wrapping. Strongest mathematical centering, but needs careful overlap protection.
- Option C: two-row mobile header (controls first row, title second). Most robust for long titles, but changes the mobile silhouette more.

Recommendation: A on desktop and either A or C on mobile; use B only if the owner insists the title center never move under any side-content asymmetry.

### Navigation

- Preserve current categories but use link + disclosure-button pairs.
- Add an intermediate compact desktop/tablet state before full mobile overlay.
- Represent current page with both a visual treatment and `aria-current="page"`.

### Mobile menu

- Full-screen overlay can remain if it gains explicit state, scrolling, focus management, and nested disclosures.
- An off-canvas drawer is an optional visual alternative, not required to correct functionality.

### Footer

- Keep content and color; move to normal flow within a flex-column page shell.

## 11. Recommended global architecture

Use one canonical `common.css` and one `mobile-menu.js`, with global classes prefixed or component-scoped (for example `.site-header`, `.site-nav`, `.site-footer`). Maintain a canonical HTML snippet for header/nav/footer and a small repository audit script that verifies link labels, destination sets, active state, footer text, and correct relative paths on every primary page.

Because deployment is a direct static upload with no build system, avoid client-side fetching/injection of shared chrome: it adds a failure mode, delays navigation rendering, and complicates relative URLs. If the owner later accepts a lightweight build/predeployment step, generated includes would be the strongest long-term solution. Until then, standardized copied markup plus automated validation is appropriate.

Keep page CSS after the canonical global stylesheet only where intentional overrides are required, and document every active exception. Use cascade layers or stronger component scoping only if browser support and rollout testing justify it; no dependency is necessary.

## 12. Proposed implementation sequence

1. **Global structure decisions** — confirm title center reference, mobile title wrapping, category-link behavior, and menu presentation. Inventory active exceptions. **[Functional/decision]**
2. **Header/title prototype** — implement the new geometry on copies or one representative shallow page and one deep page; preserve art. **[Functional]**
3. **Desktop navigation** — implement disclosure semantics, keyboard/focus states, active state, and constrained-width behavior. **[Functional/Accessibility]**
4. **Mobile navigation** — implement robust state, focus, Escape, scrolling, submenus, touch targets, reduced motion, and resize handling. **[Functional/Accessibility]**
5. **Footer** — move to normal flow and remove the global 180vh workaround only after page testing. **[Functional/Maintainability]**
6. **Tokens and reusable components** — add conservative brand/spacing/focus/shadow tokens and scoped chrome classes. **[Maintainability]**
7. **Representative testing** — root Home; Owners; All-Time; SportsBook; Archive; Brackets; Bowls; Pro Bowl; Hall of Champions; and empty Vault/Divisions shells at the width matrix. **[Functional]**
8. **Site-wide rollout** — update all 16 primary HTML copies, verify relative paths and active state automatically, then manually smoke-test. **[Maintainability]**
9. **Compatibility cleanup** — only with owner approval, remove or archive confirmed-unused CSS/JS copies. **[Maintainability]**

## 13. Risks and pages requiring special testing

- All-Time, Season, Current Year, and Single Game: content `<h2>` plus header heading, wide tables, and deep relative paths.
- Brackets and Pro Bowl: duplicate `<h1>` hierarchy and newer page-specific responsive systems.
- Hall of Champions: empty global title, custom active common CSS, large prototype content, and custom header art paths.
- Owners: copied JS dependency and very large page-specific stylesheet.
- SportsBook: live interactive controls and third-party scripts; global focus rules must not regress forms.
- Bowls: very long names, modal behavior, profanity in an existing title, and multiple local breakpoints.
- Archive: external replay links and a separate page stylesheet; yearly wrappers intentionally lack global chrome.
- Vault and Divisions: sparse shells expose footer/page-height behavior.
- 765/767/768px boundaries: page and shared breakpoints disagree.
- 1200/1201px title margin switch: current title jumps by 20px.

Global changes to broad `header`, `nav`, `.container`, `main`, `footer`, `button`, `h1`, or `h2` selectors could affect page-local components. Scope the new chrome before rollout.

## 14. Questions requiring owner decisions

1. Should “centered” mean exact viewport/header centering, or optical centering relative to the header artwork?
2. On narrow mobile screens, may long page titles wrap to two lines, should abbreviated labels be supplied, or should the header use a separate title row?
3. Should clicking NextGenStats or Vault navigate to its landing page, open its submenu, or should a separate chevron button open the submenu?
4. Should mobile navigation remain a full-screen overlay or become an off-canvas drawer?
5. Is the Hall of Champions header intended to have visible text, and if so, what exact title?
6. Should Home display an active navigation state like other pages?
7. Is a small predeployment generation/validation script acceptable, or must shared markup remain manually copied with validation only?
8. After parity is proven, may confirmed-unused common/style copies be removed in a separate cleanup task?

No answer is required to accept this audit. These decisions should be resolved before implementation because they materially determine header geometry and navigation interaction.

## 15. Follow-up: verified header-art and title-zone geometry

Read-only follow-up completed 2026-08-02. The source images, active shared stylesheets, representative page markup, and CSS cover calculations were inspected. A localhost browser pass was attempted again, but the in-app browser could not reach the preview endpoint even though the host could; the remaining browser-validation items are called out below. No website file was changed.

### What the active CSS actually does

For 14 of the 16 primary pages, root `common.css` supplies the header treatment:

- Above 768px, `header3.png` (4414 x 354, aspect ratio 12.47:1) is used with `background-size: cover`, the initial `background-position: 0% 0%`, and 60px top/bottom padding.
- At 768px and below, the image switches to `header2.png` (4218 x 448, aspect ratio 9.42:1), remains `cover` and top-left aligned, and header padding becomes 50px top/bottom.
- Neither image is proportionally distorted. `cover` always scales uniformly. At every representative width the rendered header is much less wide, relative to its height, than either source image, so height is the limiting dimension: the image is scaled to the header height and its right side is cropped. The left edge, baked-in logo, stripe alignment, and top edge remain anchored; there is no centered two-sided crop.
- The title does not control the artwork alignment directly, but an unexpectedly wrapped title increases header height. That increases the image scale, enlarges the baked-in logo, moves the usable navy area's left edge farther right, and crops more of the image's right side. Title wrapping is therefore part of the background geometry, not merely a text-layout concern.
- At 1200/1201px only the title's fixed left margin changes (110px to 90px). The artwork does not switch or realign there.

The two active exceptions are material:

- Hall of Champions uses `hallofchampions/commonchamp.css`, local 1696 x 237 desktop and 1672 x 941 mobile artwork, 120px mobile vertical padding, and hides `.website-title` on mobile.
- At this audit stage, Playoff Brackets used `vault/brackets/commonbrackets.css`, canonical root art, 80px mobile vertical padding, and hid `.website-title` on mobile. Sections 19-20 record the later geometry rollout and stylesheet consolidation.

Those exceptions should be normalized as part of a later implementation only after confirming their intentional appearance; they should not be treated as evidence that the canonical title zone needs page-specific offsets.

### Source-image landmarks and cover mapping

The canonical desktop art's continuous navy band is source y=126-227, and the logo/crest stops disturbing the repeating stripe field at approximately source x=300. The canonical mobile art's navy band is source y=182-265, and the logo stops at approximately source x=336. The images contain no transparent positioning metadata; these are baked pixels.

With the current one-line heading and default heading metrics, the canonical header is expected to render at approximately 200px high on desktop and 175px on mobile (exact normal-line-height rounding is browser-dependent). That yields these practical landmarks:

- Desktop: image scale about 0.565; logo/right disturbance boundary about 170px; navy band approximately y=71-129, about 58px high.
- Mobile: image scale about 0.391; logo/right disturbance boundary about 131px; navy band approximately y=71-104, about 33px high.

This explains why viewport centering is wrong: the intended title area begins after a nearly fixed rendered-pixel landmark while the viewport continues to grow. Its center naturally moves from far right of viewport center on a 320px screen toward only slightly right of viewport center on desktop.

### Recommended safe title zones

Use an explicit title zone, not a title-specific margin and not a single percentage center. Preserve top-left background alignment and define the title area's horizontal boundaries independently of the 85% content container:

- Canonical desktop (>768px): left boundary `185px`; right boundary `calc(100% - 24px)`.
- Canonical mobile (<=768px): left boundary `145px`; right boundary `calc(100% - 16px)`.

The 15px/14px clearances beyond the measured logo disturbance absorb interpolation, antialiasing, and one-pixel browser rounding. The right inset keeps glyphs away from the viewport edge without sacrificing scarce mobile width. If browser screenshots show that the visible crest edge differs by more than a few pixels from the calculated boundary, adjust these two shared tokens once; do not add title- or page-specific margins.

Representative zone centers are:

| Viewport | Treatment | Safe zone (px) | Zone center (px) | Center as viewport % |
|---:|---|---:|---:|---:|
| 320 | mobile | 145-304 | 224.5 | 70.2% |
| 375 | mobile | 145-359 | 252.0 | 67.2% |
| 390 | mobile | 145-374 | 259.5 | 66.5% |
| 768 | mobile | 145-752 | 448.5 | 58.4% |
| 820 | desktop | 185-796 | 490.5 | 59.8% |
| 1024 | desktop | 185-1000 | 592.5 | 57.9% |
| 1280 | desktop | 185-1256 | 720.5 | 56.3% |
| 1440 | desktop | 185-1416 | 800.5 | 55.6% |

These values demonstrate that a percentage-only center is unsuitable: the appropriate center changes by almost 15 percentage points between 320 and 1440px. Breakpoint-specific left boundaries are justified because the site changes both the source image and header height at 768px. Within each treatment, center the title in the remaining zone with grid/flex or absolute-zone geometry; no additional width breakpoints are needed for positioning.

### Long-title policy inside the navy band

The title should remain a single line in this particular artwork treatment. On canonical mobile the navy band is only about 33px tall at the preserved header height, so two normal text lines cannot remain inside it. Allowing two lines would also increase header height, enlarge the baked logo, and invalidate the proposed zone boundary.

Recommended policy:

1. Center all titles in the shared zone and use `white-space: nowrap`, `line-height: 1`, and overflow protection.
2. Use responsive base type, but add one maintainable compact-title modifier for labels that do not fit the available zone at 320px. Target approximately 16-18px for the longest current labels at 320-390px and approximately 30-32px for short labels/desktop, subject to browser font measurement.
3. Prefer an owner-approved shorter mobile label where a title cannot remain legible at the minimum size. Do not ellipsize the only page heading and do not encode a separate horizontal offset for each title.
4. Keep the full semantic page name in the heading/accessibility contract if a shorter visual label is used.

`Single Game Records` is the limiting current title and must be explicitly tested at 320px. `Playoff Brackets` currently hides the title under its copied mobile CSS, so it must also be tested when the global contract is eventually applied.

### Recommended implementation approach (not implemented)

Preserve the canonical art, `cover`, top-left alignment, desktop/mobile image switch, and approximate current header heights. Give the header an explicit stable block size (or a stable inner title row) so text cannot alter background scaling. Position a `.site-header__title-zone` from the appropriate left/right tokens and center the `<h1>` inside that zone. Use two geometry modes only: desktop and mobile at the existing 768px art switch. Treat compact typography as a content-fit policy, not a positioning breakpoint.

Before rollout, validate screenshots at all eight widths in Chromium and at least one second engine. Confirm: actual one-line header height; rendered logo right edge; navy band's vertical bounds; title baseline and glyph containment; 320px fit for `Single Game Records`; the 768/769 transition; and the Hall of Champions and Brackets exceptions. These checks may move the recommended pixel tokens slightly, but they should not change the zone-based approach.

## 16. Limited header/title geometry prototype

Prototype implemented and locally validated 2026-08-02 on root Home, `/nextgenstats/singlegame/`, and `/vault/brackets/`. Hall of Champions was not changed. No navigation, menu JavaScript, footer, heading hierarchy, page content, data behavior, artwork, or relative path was altered.

### Implementation

- The three prototype pages opt in with `body.header-geometry-prototype`; all other pages continue to use the existing shared rules.
- At prototype time, Home and Single Game Records used narrowly scoped rules in root `common.css`, while Brackets used equivalent rules in its then-active `commonbrackets.css`. Section 20 records the later consolidation.
- The prototype header is a stable 200px on desktop. Home and Single Game Records use a stable 175px mobile header, matching the measured current height. Brackets retains its existing approximate 160px mobile silhouette rather than inheriting the canonical height.
- Background art remains `cover`, top-left (`0% 0%`), and switches from `header3.png` to `header2.png` at the existing 768px breakpoint. Stable header height prevents title metrics from changing background scale.
- The title is absolutely bounded to `left: 185px; right: 24px` on desktop and `left: 145px; right: 16px` on mobile, then centered within that box. It uses zero margin, `white-space: nowrap`, line-height 1, and responsive type.
- `.website-title--compact` is a reusable typography modifier applied to Single Game Records and Playoff Brackets. It changes font sizing only; it does not introduce title-specific positioning. Its mobile formula is `clamp(13px, 4.35vw, 24px)`.
- Brackets' prior mobile `display: none` is overridden only when its page has the prototype class, allowing its title to participate in this test without changing the Hall of Champions exception.

### Local HTTP validation

Chromium DOM/computed-style validation ran through local HTTP at 320, 375, 390, 768, 820, 1024, 1280, and 1440px for all three pages (24 page/width combinations).

| Width | Art | Prototype header | Title zone | Result |
|---:|---|---:|---:|---|
| 320 | mobile `header2.png` | 175px; Brackets 160px | x=145 to layout-right minus 16px | Pass; compact stress title renders at 13.92px and no longer overflows |
| 375 | mobile `header2.png` | 175px; Brackets 160px | x=145 to layout-right minus 16px | Pass; compact title 16.31px |
| 390 | mobile `header2.png` | 175px; Brackets 160px | x=145 to layout-right minus 16px | Pass; compact title 16.97px |
| 768 | mobile `header2.png` | 175px; Brackets 160px | x=145 to layout-right minus 16px | Pass; compact title reaches 24px |
| 820 | desktop `header3.png` | 200px | x=185 to layout-right minus 24px | Pass; 26px title |
| 1024 | desktop `header3.png` | 200px | x=185 to layout-right minus 24px | Pass; 26px title |
| 1280 | desktop `header3.png` | 200px | x=185 to layout-right minus 24px | Pass; 30.72px title |
| 1440 | desktop `header3.png` | 200px | x=185 to layout-right minus 24px | Pass; 32px title |

At every width, computed `background-size` remained `cover`, position remained `0% 0%`, the correct art URL was selected, and title `margin-left` computed to 0. All titles computed as a single-line block. The desktop title vertical range was y=84-116px at maximum type, inside the approximately y=71-129px navy band. Canonical mobile ranged from y=72.5-102.5px for Home and y=75.5-99.5px for compact titles, inside the approximately y=71-104px band. Brackets mobile ranged from y=68-92px at 768 and remained inside its approximately y=65-95px band.

The initial 320px Single Game check exposed 11px of text overflow at a 15px minimum. Reducing only the reusable compact-type formula resolved it; the final 320px measurement has equal client and scroll widths. Classic desktop scrollbar width reduces the measured layout box by approximately 15px in the browser emulator, so this validation is slightly more conservative than a typical overlay-scrollbar mobile device.

### Remaining review and rollout status

The geometry is technically ready for a broader staged rollout: zone placement, breakpoint selection, background treatment, vertical containment, and one-line behavior are stable across the requested matrix. Before site-wide rollout, the owner should visually approve the relatively small 13.92px `Single Game Records` label at 320px and the decision to show Playoff Brackets on mobile. A shorter approved mobile label would allow larger type, but is not required for fit.

The in-app browser's localhost screenshot capture did not paint the local background image or white title even though the DOM, computed styles, loaded URLs, dimensions, and overflow measurements were correct and no browser loading errors were reported. Consequently, final pixel-level antialiasing and optical balance should still be viewed in a normal local browser before global rollout. A second browser engine remains untested.

Files changed for this prototype:

- `common.css`
- `index.html`
- `nextgenstats/singlegame/index.html`
- `vault/brackets/commonbrackets.css`
- `vault/brackets/index.html`
- `docs/GLOBAL_INTERFACE_DESIGN_AUDIT.md`

## 17. Optical correction: bounded title box

Follow-up completed 2026-08-02 using the supplied normal-browser Brackets screenshot as the visual reference, followed by local HTTP computed-layout validation across the full width matrix. The screenshot confirmed that the previous zone began safely after the logo but extended to the viewport's right inset, placing the title near the middle of a wide screen and making it feel detached from the crest.

### Corrected geometry

The audited logo-side boundaries remain unchanged:

- Desktop title box starts at x=185px.
- Mobile title box starts at x=145px.

The box no longer extends to the far-right inset. Both geometry modes now use a shared 360px maximum width and shrink only when the available safe width is smaller:

```css
/* Desktop */
left: 185px;
width: min(360px, calc(100% - 209px));

/* Mobile */
left: 145px;
width: min(360px, calc(100% - 161px));
```

The subtracted totals preserve the earlier 24px desktop and 16px mobile minimum right clearances on narrow layouts. No title-specific horizontal values were introduced. Home uses the normal responsive type; Single Game Records and Playoff Brackets retain the shared compact typography modifier.

The attached Brackets screenshot places the visible desktop crest edge at approximately 240 captured-image pixels. Its 200px CSS header appears approximately 300 captured pixels high, indicating roughly 1.5 captured pixels per CSS pixel; the crest edge therefore corresponds to about 160 CSS pixels, consistent with the prior 170px source-art calculation. The 185px title-box start retains approximately 15-25 CSS pixels of clearance after the visible crest.

### Validation results

All three prototype pages were rechecked through local HTTP at 320, 375, 390, 768, 820, 1024, 1280, and 1440px:

- At 320/375/390px, the title box consumes only the safe remaining width and centers at x=217/244.5/252px in the scrollbar-conservative emulator.
- At 768px, the box reaches its 360px cap and centers at x=325px.
- At every tested desktop width from 820 through 1440px, the box remains x=185-545px and its center remains fixed at x=365px. The title therefore does not drift toward viewport center as the screen grows.
- All titles remained one line with no measured horizontal overflow. Single Game Records remains readable but compact at 13.92px in the conservative 320px test.
- Canonical mobile title bounds remained inside the navy band; Brackets remained inside its shorter mobile navy band. Desktop bounds remained y=84-116px at maximum type, inside the calculated y=71-129px band.
- Artwork URLs, `background-size: cover`, `background-position: 0% 0%`, the 768px art switch, and header heights were unchanged.

The normal-browser screenshot demonstrates the before-state and supports the corrected cap selection. Direct control of the external browser was unavailable in this session, so a refreshed after-screenshot in the owner's normal browser is still recommended for final optical approval. The geometry is ready for site-wide rollout only after confirming that the fixed x=365px desktop center feels appropriately attached on Home as well as on the two longer titles.

## 18. Final CDP visual correction

Final prototype correction completed 2026-08-02 through a dedicated local HTTP server and direct Chrome DevTools Protocol viewport/screenshot inspection. This section supersedes the 360px cap in section 17.

### Final shared geometry

The logo-side boundaries and narrow-screen right safety calculations remain unchanged, but the bounded title area is capped at 300px:

```css
/* Desktop */
left: 185px;
width: min(300px, calc(100% - 209px));

/* Mobile */
left: 145px;
width: min(300px, calc(100% - 161px));
```

This places the capped-box center at x=335px on desktop and x=295px at 768px. At 320/375/390px the box contracts to the safe remaining width and centers at x=217/244.5/252px in the scrollbar-conservative test viewport. It no longer changes position as desktop width increases.

Home retains the normal responsive title scale. The existing reusable compact modifier now also applies on desktop to the two long prototype titles with `clamp(24px, 2vw, 28px)`; its established mobile override remains `clamp(13px, 4.35vw, 24px)`. This is typography-only and introduces no title-specific horizontal geometry.

### CDP screenshot findings

Actual rendered header screenshots were captured at 320, 375, 390, 768, 820, 1024, 1280, and 1440px. Mobile screenshots used Single Game Records as the longest-title stress case at every requested mobile width, with additional Home and Brackets spot checks at 320px and Brackets at 768px. Desktop screenshots used Home at every requested desktop width, with separate 1440px screenshots of Single Game Records and Playoff Brackets.

Visual findings:

- The baked logo's visible right edge is approximately x=130px in the canonical mobile treatment and x=167px in the desktop treatment.
- The title box begins 15px after the mobile crest and approximately 18px after the desktop crest.
- Home now reads as attached to the logo-side header composition rather than centered across the header. Its desktop box center is x=335px at every width from 820 through 1440px.
- Single Game Records begins close to the crest at desktop widths and fits the 300px box at 24-28px. At 320px it remains legible at 13.92px and does not touch the logo or right edge.
- Playoff Brackets has comfortable horizontal clearance at desktop and mobile widths and remains centered in the same shared box.
- All title glyphs remain vertically inside the navy band. No screenshot showed overlap, clipping, wrapping, or wide-screen drift.

The complete 24-case computed validation matrix also reported zero failures: correct `header2.png`/`header3.png` selection, `cover`, `0% 0%`, preserved 175px canonical mobile/160px Brackets mobile/200px desktop heights, one-line titles, and no horizontal overflow. Hall of Champions was unchanged and no non-prototype page received the opt-in class.

The three-page prototype now looks visually correct and is suitable for owner review. No known geometry defect remains; the only subjective review item is whether the owner prefers the smallest 320px long-title type to be larger, which would require an abbreviated mobile label or a different artwork/title-height decision.

Files changed in this final CDP correction:

- `common.css`
- `vault/brackets/commonbrackets.css`
- `docs/GLOBAL_INTERFACE_DESIGN_AUDIT.md`

## 19. Approved site-wide rollout

Owner approval was received on 2026-08-02 after normal-browser review. This section is the current implementation authority and supersedes the prototype-only geometry, centered-box behavior, 300/360px desktop caps, desktop compact typography, pending-review language, and rollout recommendations in sections 16-18. Those sections remain as an audit trail of the iterations.

### Final shared geometry

The final implementation uses a shared left-aligned text boundary immediately beside the baked-in logo. The approved 80px desktop and 50px mobile values are the outer positioned-box offsets, not the visible glyph boundary:

```css
/* Desktop */
left: 80px;
width: min(480px, calc(100% - 104px));
padding-left: 105px; /* visible text begins at x=185px */

/* 768px and below */
left: 50px;
width: min(300px, calc(100% - 66px));
padding-left: 95px; /* visible text begins at x=145px */
```

Titles use `text-align: left`, `white-space: nowrap`, line-height 1, and vertical centering at 50% of the stable header. The wider 480px desktop cap provides rightward capacity without moving the shared text start. Every desktop title, including `Single Game Records`, uses the normal `clamp(26px, 2.4vw, 32px)` scale. The reusable compact modifier applies only within the mobile media query at `clamp(13px, 4.35vw, 19px)`.

The artwork remains proportional and cropped by `background-size: cover`, anchored top-left, and switches from `header3.png` to `header2.png` at the existing 768px breakpoint. Standard headers remain approximately 200px desktop and 175px mobile. Brackets retains its approximately 160px mobile header while mirroring the same title geometry. Its shared stylesheet was subsequently consolidated as recorded in section 20. Hall of Champions remains completely unchanged with its intentional different artwork and no-title treatment.

### Rollout scope

The geometry applies to 15 standard-header primary pages: Home, Owners, H2H, NextGenStats, Current Year, Season Records, Single Game Records, All-Time Records, FS5 SportsBook, Vault, Archive, Brackets, Bowls, Pro Bowl, and Divisions. Old fixed title-margin positioning was removed where the shared implementation replaces it. No page-specific horizontal title values were added, copied CSS was not consolidated, and navigation, mobile-menu JavaScript, footer behavior, heading hierarchy, content, data logic, artwork, and relative paths were preserved.

### Final validation and approval

Representative browser validation covered 320, 375, 390, 768, 820, 1024, 1280, and 1440px using Home, Owners, Single Game Records, All-Time Records, and Brackets. Actual screenshots confirmed the optical result on Home at 1440px, Single Game Records at 320px, and Brackets at 1024px. At every checked width the title remained vertically inside the navy band, clear of the crest, single-line, readable, and unclipped. Computed text starts were consistently x=145px in mobile mode and x=185px in desktop mode; desktop long titles retained full-size typography.

The owner reviewed the local HTTP result and approved it as visually correct. The header/title geometry is ready as the site-wide standard, with no remaining visual review item recorded. The review server used during implementation was `http://127.0.0.1:8785/`; it is a local development address, not a deployment URL.

Files changed for the site-wide implementation and final correction:

- `common.css`
- `fs5book/index.html`
- `h2h/index.html`
- `nextgenstats/index.html`
- `nextgenstats/currentyear/index.html`
- `nextgenstats/seasonrecords/index.html`
- `nextgenstats/singlegame/index.html`
- `nextgenstats/alltime/index.html`
- `vault/brackets/brackets.css`
- `vault/brackets/index.html`

## 20. Brackets shared-stylesheet consolidation

Completed and owner-approved on 2026-08-02. Brackets now loads root `../../common.css` directly, followed by its page stylesheet `brackets.css`. The redundant `vault/brackets/commonbrackets.css` copy was deleted only after the migrated page passed browser review and the owner approved removal.

The four genuine Brackets exceptions moved into scoped rules under `body.brackets-layout` in `brackets.css`:

- flex-column page shell with viewport minimum height;
- flexible Brackets main content without the global artificial main padding/minimum-height behavior;
- a static footer that follows the variable-height bracket content;
- the retained 160px mobile header height.

No shared header geometry was duplicated. Root `common.css` now supplies the artwork URLs, `cover` treatment, top-left alignment, 768px artwork switch, title positioning and typography, navigation, mobile menu styling, and base footer appearance. Stylesheet order is `styles.css`, root `common.css`, then `brackets.css`, allowing narrowly scoped page exceptions to win without affecting other pages.

Validation through local HTTP covered 320, 375, 390, 768, 820, 1024, 1280, and 1440px. The expected `header2.png`/`header3.png` files loaded from root artwork, title wrapping and clipping remained zero, the mobile/desktop header heights remained 160px/200px, the Brackets main retained its flex behavior, and the footer remained after the main content in normal flow. Visual screenshots at 320px and 1024px matched the approved appearance. The owner then confirmed the page looked correct and authorized deletion of the copied stylesheet.

Files changed for consolidation:

- `vault/brackets/index.html`
- `vault/brackets/brackets.css`
- deleted `vault/brackets/commonbrackets.css`

## 21. Approved global navigation implementation

Completed and owner-approved on 2026-08-02. The permanent navigation applies to all 16 primary pages, including Brackets and Hall of Champions. It preserves the direct static-site architecture: each HTML page contains the same navigation tree with relative paths adjusted for folder depth, while behavior comes from canonical root `mobile-menu.js`.

### Markup and visual contract

- The tree contains eight top-level destinations and two expandable categories: NextGenStats and Vault, each with four submenu destinations.
- NextGenStats and Vault each use a landing-page anchor beside an independent disclosure button with `aria-expanded` and `aria-controls`. Current pages use `aria-current="page"`; parent categories receive a section-active treatment on their descendants.
- All destinations have meaningful lightweight inline SVG icons. Icons are dependency-free and decorative (`aria-hidden="true"`, `focusable="false"`) because visible link text supplies the accessible name.
- Header titles and navigation use `Arial, Helvetica, sans-serif`. Standard pages use white/red icon accents; Hall of Champions uses white/gold and retains its premium dark theme.
- Desktop navigation is 48px high. The active underline sits 7px above the link bottom, closer to its label. Resting disclosure buttons are transparent and borderless but retain separate 34px-by-48px targets and the existing hover/focus background treatment.

### Desktop behavior

Each expandable category wrapper contains its landing link, disclosure control, and dropdown panel. The panel begins at `top: 100%`, producing no physical gap between the category row and panel. CSS hover/focus-within and the shared script's explicit open state allow mouse, keyboard, and click operation. Outside click closes submenus, Escape closes the open submenu and restores disclosure focus, and link activation closes open navigation state.

### Mobile behavior

At 768px and below, navigation becomes a fixed full-viewport overlay using `100vh`/`100dvh`, full-width list rows, contained vertical scrolling, and body scroll locking. The closed menu is `aria-hidden` and inert; opening moves focus to the first link, Tab is contained within visible controls, and closing returns focus to the toggle. Viewport-mode changes reset open states.

Primary mobile rows have a 54px minimum height and `20px` horizontal content padding. Disclosure buttons remain separate 44px square controls with a visible border/background at touch widths. Expanded submenu containers exactly match their parent row width; submenu links have a 44px minimum height and `30px` left padding, only 10px beyond the primary content boundary. Opening one submenu closes the other.

The existing logo is centered above the list at up to 132px wide and layered over a CSS-drawn horizontal stripe. The logo section ends 12px before the first row. A separate 8px theme stripe immediately follows the final navigation row instead of being anchored to the viewport bottom. Standard navigation uses red/white stripes; Hall of Champions uses gold/white.

### Validation

Local HTTP and browser validation covered 320, 375, 390, 768, 820, 1024, 1280, and 1440px, plus 568px-short mobile viewports. Verified results include full viewport coverage, edge-aligned rows/submenus, zero navigation horizontal overflow, short-height scrolling, one-open-submenu behavior, pointer access and link activation in both desktop panels, Enter/Space disclosure activation, Escape/focus restoration, focus containment, correct fonts, decorative SVG semantics, and correct standard/Hall theme colors. Existing link-hover backgrounds, paths, active states, page content, footer behavior, and unrelated page systems were preserved.

### Low-priority future artwork option

The approved standard header continues to use the existing artwork with its crest baked into the image. As a future design option only, the artwork could be separated into a background/stripe asset and an independently positioned transparent logo. That approach could simplify logo-aware title geometry and provide more direct responsive control, but it is not required to correct the current approved result and would need separately prepared artwork, breakpoint validation, and owner approval before implementation.

Permanent implementation files:

- `common.css`
- `hallofchampions/commonchamp.css`
- root `mobile-menu.js`
- the 16 primary `index.html` files listed in `SITE_STRUCTURE.md`

## 22. Approved global footer and page-shell implementation

The footer recommendation from the initial audit is implemented across all 16 primary pages. Root `common.css` and Hall's `commonchamp.css` now make `body` a viewport-minimum flex column, allow `main` to grow with `flex: 1 0 auto`, and keep the footer static in normal flow. Short pages place the footer at the viewport bottom; long pages place it after content.

The obsolete global `main { min-height: 180vh; }`, the copied `130vh !important` rule in root `styles.css`, Single Game's absolute footer override, Brackets' shell-level viewport-height main workaround, and Archive's 380px mobile bottom-padding compensation were removed. Brackets retains its scoped zero footer margin and main padding; Hall retains its black/gold footer styling. Genuine component-level minimum heights remain where required, but the redundant Brackets and Hall page-container `100vh` minimums are not part of the final shell.

Each primary footer contains permanent HTML brand/fallback text plus a live status span. Root `footer-status.js` reuses root `supabase-config.js` and calls no-parameter RPC `public.site_website_data_status()`. A strict valid `data_updated_through` ISO date is formatted as month, ordinal day, and year with no time. The validated response `2026-08-02` renders as two lines: `FastStrongFive`, then `Founded 2012 · Last Updated August 2nd, 2026`.

Loading is temporary. Configuration failure, RPC error, an empty response, or an invalid date removes the separator and dynamic date and leaves the permanent `FastStrongFive` / `Founded 2012` fallback rather than displaying inferred or stale metadata.

Validation used local HTTP with cache disabled. Responsive short-page checks passed at 320, 375, 390, 820, and 1440px. A 16-case mobile/desktop matrix covered Home, Vault, Owners, SportsBook, Brackets, Hall of Champions, All-Time Records, and Season Records. Every footer followed main content without overlap and ended at the document bottom; Vault's sparse shell ended exactly at the viewport. Mobile-menu open/close retained body scroll locking and restored normal scrolling. A deliberately blocked metadata RPC produced the required permanent-text-only fallback.

## 23. Approved footer polish and final shell corrections

The owner-approved footer presentation is shared by all 16 primary pages. The first line is exactly `FastStrongFive`—without `Fantasy` or a trailing period—and uses stronger type hierarchy. The smaller, lower-emphasis second line is `Founded 2012 · Last Updated Month D{ordinal}, YYYY`; mobile uses balanced wrapping without changing the content order. Standard pages retain the blue/white theme, and Hall of Champions retains its dark/gold theme.

The separator is the U+00B7 centered dot, not a hyphen. Root `footer-status.js` creates a dedicated, accessibility-hidden `.footer-separator` span only when loading or valid dynamic detail exists. Shared standard and Hall CSS render only that character at `1.18em`; footer spacing and surrounding metadata typography remain unchanged. Failure fallback contains no orphan separator.

The remaining page-shell gaps were removed with scoped corrections. `vault/brackets/brackets.css` no longer gives `.bracket-page` a redundant `100vh` minimum, so its themed content meets its zero-margin footer directly. Hall's inner visual wrapper is now a `div` rather than an invalid nested `main`, its redundant page-level viewport minimum is removed, and its full-width canvas uses `width: 100%; margin: 0` instead of `100vw` plus a viewport-based compensating margin. That smallest Hall-specific width correction eliminates the scrollbar-induced horizontal overflow while preserving the approved timeline layout and dark/gold footer.

Browser validation covered the shared footer at 320px and 1280px and Hall at 320, 390, 768, 1280, and 1440px. The separator was verified as code point 183 and 1.18 times the metadata size. Hall reported zero document/body horizontal overflow at every tested width, and the Supabase success and deliberately blocked-RPC fallback states both remained correct. The preceding 32-case 390px/1280px all-primary-page matrix and 320px short-height checks also passed without footer overlap, clipping, or footer overflow.

## 24. Approved final global-interface cleanup

Completed with owner approval on 2026-08-02. Seven repository-wide reference checks confirmed the following copies were inactive before removal: `owners/mobile-menu.js`, `vault/styles.css`, `vault/common.css`, `vault/archive/styles.css`, `vault/probowl/styles.css`, `vault/probowl/common.css`, and `hallofchampions/common.css`. Root `mobile-menu.js` and root `common.css` remain canonical; Hall of Champions retains its active themed `commonchamp.css`.

Root `common.css` and Hall's `commonchamp.css` were reduced only by removing obsolete pre-redesign navigation/mobile-navigation blocks, superseded title-margin rules, duplicated declarations, and malformed inactive declarations. Active header artwork, title geometry, current navigation, footer/page shell, and Hall theme rules were retained. Hidden legacy logo/header elements were deliberately retained for separate future maintenance review.

Heading cleanup now gives every primary page exactly one nonempty meaningful H1. Owners' empty H3 was removed. Brackets and Pro Bowl retain their visible content titles as H2 below the global header H1. Hall of Champions has a visually hidden `Hall of Champions` H1, preserving its intentional no-visible-title appearance. Current Year now uses the approved page title `2025 Season Records`.

Local HTTP browser validation covered all 16 primary pages at 390x568 and 1280x700, with focused mobile and desktop inspection of Owners, Current Year, Brackets, Pro Bowl, and Hall of Champions. The matrix found no title clipping, horizontal overflow, footer overlap, or empty/multiple H1 defects. Home and Hall full-screen mobile menus opened correctly with body scroll locking; Hall's visual title remained hidden; browser console inspection reported no errors.

The remaining audit work is separate maintenance and content normalization, not unfinished primary-page redesign review. Hall of Champions and all other primary pages have completed their owner-approved page-by-page redesigns.

### Hall of Champions desktop artwork correction

Follow-up visual review found that Hall's fixed 120px desktop header was shorter than the rendered 1696x237 artwork at wide viewports. With `background-size: cover`, a 1280px viewport scaled the image to approximately 179px high and vertically cropped the baked-in crest. Hall's scoped desktop header now uses `height: clamp(120px, 13.974vw, 237px)` and `background-position: center top`, matching the artwork ratio between its practical minimum and native height. The existing 768px breakpoint, `header2.png`, `cover` treatment, and 240px mobile header are preserved.

Local HTTP browser validation passed at 320, 390, 768, 820, 1024, 1280, and 1440px. Desktop header heights were 120px at 820, approximately 143px at 1024, 179px at 1280, and 201px at 1440; mobile remained 240px. Screenshots confirmed the complete crest and lower gold artwork at 1280 and the preserved mobile composition at 390, with no horizontal overflow.

## 25. Owners page-specific redesign

Completed and approved as a separate page-owned review after the global-interface work. All implementation remained in `owners/index.html`, `owners/ownerstyle.css`, and `owners/ownerscript.js`. The shared header, navigation, footer, `common.css`, shared JavaScript, Supabase configuration, and RPC/database objects were not changed.

The placeholder `Owner` value now hides the full dashboard and makes zero `public.site_owner_page(text)` requests. Its `<main>` contains only a larger centered selector state with the approved prompt `Select an owner to view career statistics`, descriptor `Career History · Records · Postseason · H2H`, low-contrast navy geometry, and a faint canonical FS5 watermark. Selecting a valid owner restores the populated dashboard and detached selector; returning to the placeholder resets the page and Season History expansion.

The populated profile is a compact unified light card with the current team name as its heading, divided primary/secondary statistics, restrained semantic value colors, and approved responsive ordering. Real current-team and yearly team images use contained image frames; missing images use deliberate equal-size initials fallbacks.

Career Streaks, Scoring Profile, Playoff Performance, and Championship Performance now use a consistent responsive card hierarchy. Season History is a compact newest-first list that shows six recent seasons on desktop or four on mobile before an accessible cached-data expansion. Team Game Records is a compact top-10 responsive table for all existing categories, with its dynamic Team Score/Margin heading and table-local mobile scrolling. H2H uses all 11 ordered records in an intentional six-card/centered-five-card desktop grid and a two-column mobile grid, with restrained win/loss/tie colors.

Final conservative cleanup removed 725 obsolete lines from `owners/ownerstyle.css` and dead background-handling statements from `owners/ownerscript.js` without changing the approved appearance or behavior. The one-request-per-valid-owner path, placeholder no-request behavior, stale-response protection, loading/empty/error states, IDs, returned values, formatting, ranks, ties, null handling, category behavior, and footer metadata remain intact.

Validation passed across all 12 owners, blank → owner → blank and rapid switching, real and missing images, long team names, interrupted season histories, expand/collapse behavior, every Team Game Records category, H2H win/loss/tie states, keyboard/focus behavior, and desktop plus 320, 375, 390, and 768px widths. No page-level horizontal overflow or global-interface regression was found.

## 26. H2H page-specific redesign

Completed and approved as the next page-owned review after Owners. Implementation remained in `h2h/index.html`, `h2h/h2hstyle.css`, and `h2h/h2hsummary.js`; the obsolete presentation-only `h2h/h2hsummarystyle.js` was removed. The shared header, navigation, footer, `common.css`, shared JavaScript, Supabase configuration, and database objects were not changed.

The blank state now hides the comparison dashboard and Game Log until two valid distinct owners are selected. A compact canonical FS5 crest and `Head 2 Head` / `Choose Your Matchup` hierarchy replaced the oversized field-artwork centerpiece. Two labeled native owner controls and an accessible swap button preserve ordered-pair selection while making reversal clearer.

The populated summary repeats both owner names in a navy/red VS header, makes Wins the hero statistic, and renders the rare historical tie only as a restrained conditional row. Ordinary metrics use readable three-column light bands with restrained green/red/gold treatments and secondary league-rank metadata. Highest and Lowest Combined Score use structured natural-language detail cards rather than dense presentation strings.

Desktop retains a compact newest-first table. Mobile uses compact stacked matchup cards. Both initially show the 10 most recent meetings, expand and collapse entirely from the existing RPC response, and reset to the collapsed state when owners change. Heavy gradients, invalid H2H-only CSS, fixed computed widths, and JavaScript presentation/sizing hacks were removed.

The one-request-per-valid-ordered-pair `public.site_h2h_page` contract, returned values, rank/order/null rules, historical tie, request states, stale-response protection, and selected-owner score/margin perspective remain unchanged. Validation covered the Jordan-Matthew tie, long-history and no-tie matchups, reversed owners, swapping, expansion/reset behavior, desktop, 768px, and approximately 390px mobile with no horizontal overflow or global-interface regression.

A later focused cleanup audit retained the approved result while removing inert Game Log placeholder rows, obsolete iterative comments, duplicate stat-grid markup and breakpoint selectors, numbered ranked-value wrappers, and unnecessary hidden-state placeholder-value resets. Ranked comparisons now use reusable semantic hooks, the separate presentation script remains correctly removed, and a rendered stylesheet audit found no unconsumed selectors beyond expected pseudo-element and conditional loading/error/empty/tie/hidden states. Repeat browser validation confirmed one RPC per valid ordered-pair change, zero expansion requests, collapse reset on owner change, loading/error recovery, desktop/mobile mode switching, no horizontal overflow, and no console errors on a clean run.

## 27. Hall of Champions page-specific redesign

Completed and owner-approved. Authoritative 2012-2025 champion details replace the former placeholders, and the approved artwork, alternating timeline, museum/plaque presentation, and responsive mobile behavior remain intact. This section supersedes earlier prototype and pending-review language.
