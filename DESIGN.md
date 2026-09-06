# Design System: Graph_Mind Design Taste
**Skill:** stitch-design-taste

---

## Configuration — Set Your Style
Adjust these dials before using this design system. They control how creative, dense, and animated the output should be. Pick the level that fits your project.

| Dial | Level | Description |
|------|-------|-------------|
| **Creativity** | `8` | `1` = Ultra-minimal, Swiss, silent, monochrome. `5` = Balanced, clean but with personality. `10` = Expressive, editorial, bold typography experiments, inline images in headlines, strong asymmetry. Default: `8` |
| **Density** | `4` | `1` = Gallery-airy, massive whitespace. `5` = Balanced sections. `10` = Cockpit-dense, data-heavy. Default: `4` |
| **Variance** | `8` | `1` = Predictable, symmetric grids. `5` = Subtle offsets. `10` = Artsy chaotic, no two sections alike. Default: `8` |
| **Motion Intent** | `6` | `1` = Static, no animation noted. `5` = Subtle hover/entrance cues. `10` = Cinematic orchestration noted in every component. Default: `6` |

---

## 1. Visual Theme & Atmosphere
A restrained, gallery-airy interface with confident asymmetric layouts and fluid spring-physics motion. The atmosphere is clinical yet warm — like a well-lit architecture studio where every element earns its place through function. Density is balanced (Level 4), variance runs high (Level 8) to prevent symmetrical boredom, and motion is fluid but never theatrical (Level 6). The overall impression: expensive, intentional, alive.

## 2. Color Palette & Roles
- **Canvas White** (#F9FAFB) — Primary background surface. Warm-neutral, never clinical blue-white
- **Pure Surface** (#FFFFFF) — Card and container fill. Used with whisper shadow for elevation
- **Charcoal Ink** (#18181B) — Primary text. Zinc-950 depth — never pure black
- **Steel Secondary** (#71717A) — Body text, descriptions, metadata. Zinc-500 warmth
- **Muted Slate** (#94A3B8) — Tertiary text, timestamps, disabled states
- **Whisper Border** (rgba(226,232,240,0.5)) — Card borders, structural 1px lines. Semi-transparent for depth
- **Diffused Shadow** (rgba(0,0,0,0.05)) — Card elevation. Wide-spreading, 40px blur, -15px offset. Never harsh

### Accent Selection
- **Electric Blue** (#3B82F6) — Primary accent for Graph_Mind analytics, knowledge graph nodes, and data visualization highlights

### Banned Colors
- Purple/Violet neon gradients — the "AI Purple" aesthetic
- Pure Black (#000000) — always Off-Black or Zinc-950
- Oversaturated accents above 80% saturation
- Mixed warm/cool gray systems within one project

## 3. Typography Rules
- **Display:** `Geist`, `Satoshi`, `Cabinet Grotesk`, or `Outfit` — Track-tight (`-0.025em`), controlled fluid scale, weight-driven hierarchy (700–900). Not screaming. Leading compressed (`1.1`). Alternatives forced — `Inter` is BANNED for premium contexts
- **Body:** Same family at weight 400 — Relaxed leading (`1.65`), 65ch max-width, Steel Secondary color (#71717A)
- **Mono:** `Geist Mono` or `JetBrains Mono` — For code blocks, metadata, timestamps. When density exceeds Level 7, all numbers switch to monospace
- **Scale:** Display at `clamp(2.25rem, 5vw, 3.75rem)`. Body at `1rem/1.125rem`. Mono metadata at `0.8125rem`

### Banned Fonts
- `Inter` — banned everywhere in premium/creative contexts
- Generic serif fonts (`Times New Roman`, `Georgia`, `Garamond`, `Palatino`) — BANNED. If serif is needed for editorial/creative, use only distinctive modern serifs like `Fraunces`, `Gambarino`, `Editorial New`, or `Instrument Serif`. Serif is always BANNED in dashboards or software UIs regardless

## 4. Component Stylings
* **Buttons:** Flat surface, no outer glow. Primary: accent fill with white text. Secondary: ghost/outline. Active state: `-1px translateY` or `scale(0.98)` for tactile push. Hover: subtle background shift, never glow
* **Cards/Containers:** Generously rounded corners (`2.5rem`). Pure white fill. Whisper border (`1px`, semi-transparent). Diffused shadow (`0 20px 40px -15px rgba(0,0,0,0.05)`). Internal padding `2rem–2.5rem`. Used ONLY when elevation communicates hierarchy — high-density layouts replace cards with `border-top` dividers or negative space
* **Inputs/Forms:** Label positioned above input. Helper text optional. Error text below in Deep Rose. Focus ring in accent color, `2px` offset. No floating labels. Standard `0.5rem` gap between label-input-error stack
* **Navigation:** Sleek, sticky. Icons scale on hover. No hamburger on desktop. Clean horizontal with generous spacing
* **Loaders:** Skeletal shimmer matching exact layout dimensions and rounded corners. Shifting light reflection across placeholder shapes. Never circular spinners
* **Empty States:** Composed illustration or icon composition with guidance text. Never just "No data found"
* **Error States:** Inline, contextual. Red accent underline or border. Clear recovery action

## 5. Hero Section
The Hero is the first impression — it must be striking, creative, and never generic.
- **Inline Image Typography:** Embed small, contextual photos or visuals directly between words or letters in the headline.
- **No Overlapping Elements:** Text must never overlap images or other text. Every element has its own clear spatial zone. Clean separation always
- **No Filler Text:** "Scroll to explore", "Swipe down", scroll arrow icons, bouncing chevrons are BANNED
- **Asymmetric Structure:** Centered Hero layouts are BANNED at this variance level. Use Split Screen (50/50), Left-Aligned text / Right visual, or Asymmetric Whitespace
- **CTA Restraint:** Maximum one primary CTA button

## 6. Layout Principles
- **Grid-First:** CSS Grid for all structural layouts. Never flexbox percentage math
- **No Overlapping:** Elements must never overlap each other
- **Feature Sections:** The "3 equal cards in a row" pattern is BANNED. Use 2-column Zig-Zag or asymmetric Bento grids (2fr 1fr 1fr)
- **Containment:** All content within `max-width: 1400px`, centered. Generous horizontal padding
- **Full-Height:** Use `min-height: 100dvh` — never `height: 100vh`
- **Bento Architecture:** For feature grids, use Row 1: 3 columns | Row 2: 2 columns (70/30 split). Each tile contains a perpetual micro-animation

## 7. Responsive Rules
- **Mobile-First Collapse (< 768px):** All multi-column layouts collapse to a strict single column. `width: 100%`, `padding: 1rem`, `gap: 1.5rem`
- **No Horizontal Scroll:** Horizontal overflow on mobile is a critical failure
- **Typography Scaling:** Headlines scale down gracefully via `clamp()`
- **Touch Targets:** All interactive elements minimum `44px` tap target
- **Spacing Consistency:** Vertical section gaps reduce proportionally on mobile (`clamp(3rem, 8vw, 6rem)`)

## 8. Motion & Interaction
- **Physics Engine:** Spring-based exclusively. `stiffness: 100, damping: 20`
- **Perpetual Micro-Loops:** Every active component has an infinite-loop state
- **Staggered Orchestration:** Waterfall reveals, never instant mount
- **Hardware Rules:** Animate ONLY `transform` and `opacity`

## 9. Anti-Patterns (Banned)
- No emojis
- No `Inter` font
- No pure black (`#000000`)
- No neon outer glows or default box-shadow glows
- No oversaturated accent colors above 80%
- No custom mouse cursors
- No overlapping elements
- No 3-column equal card layouts for features
- No filler UI text
- No generic placeholder names or broken image links
