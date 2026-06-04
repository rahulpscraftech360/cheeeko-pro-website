# Cheeko Pro — Website Build Prompts
> Two-shot system: Prompt 1 = Hero + 3D Experience · Prompt 2 = All Content Sections  
> Framework: Next.js 14 (App Router, TypeScript) · Use these prompts sequentially in the same project

---

## HOW TO USE

1. Drop the Cheeko brand palette image into the AI first, then paste **PROMPT 1**. It generates the full hero, 3D model viewer, and scroll-driven intro experience.
2. After Prompt 1 builds, paste **PROMPT 2** into the same conversation (or a fresh one referencing the generated codebase). It builds all content sections, FAQ, footer, and wires everything together.
3. Supply your `.glb` or `.gltf` 3D model of the Cheeko device — replace every instance of `PUBLIC_MODEL_PATH` with the actual path under `/public/`.

---

---

# PROMPT 1 — Hero, 3D Scene & Scroll Journey

```markdown
You are building the hero section and scroll-driven 3D experience for **Cheeko Pro** — a premium AI-powered language companion toy for children aged 3–10, made in Bangalore, India. The parent is the buyer; the child is the end user. The site must feel premium enough that a parent instinctively wants to gift it, while being warm and joyful enough that they imagine their child's delight.

---

## BRAND & TONE

**Brand identity**: Cheeko is not a screen. It is a physical companion — tactile, alive, safe, and smart. Think: the warmth of a children's picture book art director crossed with the restraint of an Apple product page. No cartoon clip-art energy. No loud toy-store palette. Premium-but-playful.

**Brand color palette**: Extract exact hex values from the reference brand image provided. Use those as your CSS custom properties. If the image is unavailable, fall back to this palette:
- `--c-bg: #0D0D0D` — near-black canvas (primary background)
- `--c-surface: #161616` — section backgrounds
- `--c-orange: #FF6B2C` — Cheeko's primary brand accent (warm, energetic, safe)
- `--c-cream: #FFF4E6` — warm off-white for primary text
- `--c-gold: #FFB830` — secondary highlight / card accents
- `--c-muted: #888580` — captions, fine print
- `--c-glass: rgba(255,255,255,0.05)` — glassmorphism surface
- `--c-glass-border: rgba(255,255,255,0.08)` — glassmorphism border

**Typography**:
- Display / Hero: **DM Serif Display** (Google Fonts) — for big emotional headlines only
- Sub-headings & UI: **Nunito** (Google Fonts, 400/600/700) — friendly, rounded, readable for parents
- Body: **Nunito** 400, 18px, 1.75 line-height
- Captions / nav / labels: **Nunito** 600 uppercase, +120 letter-spacing, 11px

**Voice**: Short sentences. Warm but confident. Never jargon. Never medical or learning-outcome claims. Address the parent directly in marketing copy; describe the child experience in product copy.

---

## TECH STACK — NON-NEGOTIABLE

```bash
npx create-next-app@latest cheeko-pro --typescript --tailwind --app --no-src-dir
npm install @react-three/fiber @react-three/drei three @react-spring/three
npm install motion framer-motion gsap @studio-freight/lenis
npm install leva  # only for dev-mode debug panel, tree-shake in prod
```

- **Next.js 14 App Router, TypeScript** — all components in `/app` and `/components`
- **Three.js via @react-three/fiber + @react-three/drei** — for 3D model, particle system, post-processing
- **GSAP + ScrollTrigger** — all dynamic scroll-driven values (progress, pinning)
- **Framer Motion (`motion/react`)** — UI-level animations (section reveals, card hovers, text staggers)
- **Lenis (`@studio-freight/lenis`)** — smooth scroll wrapper, wired to GSAP ticker, duration 1.4s
- **NO external UI libraries** — pure custom components
- All GSAP and Lenis imports inside `useEffect` with dynamic import to prevent SSR errors
- `'use client'` on every component that uses hooks, refs, or browser APIs

---

## FILE STRUCTURE

```
/app
  layout.tsx          ← Lenis provider + font imports
  page.tsx            ← assembles all sections
/components
  canvas/
    CheekoCanvas.tsx  ← R3F Canvas wrapper (no SSR)
    CheekoModel.tsx   ← useGLTF loader + scroll-driven rotation
    ParticleField.tsx ← ambient floating particles
    PostFX.tsx        ← Bloom + subtle vignette
  hero/
    HeroSection.tsx   ← full-bleed, pins canvas, layered text
    HeroText.tsx      ← staggered word reveal
    ScrollIndicator.tsx
  ui/
    CustomCursor.tsx  ← dot cursor, grows on hover
    Navbar.tsx
/public
  cheeko.glb          ← 3D model (replace PUBLIC_MODEL_PATH below)
/lib
  useLenis.ts
  useScrollProgress.ts
```

---

## SECTION 1 — HERO (Full-Bleed, Scroll-Pinned)

### Layout

The hero is **scroll-pinned for 300vh** of scroll. During those 300vh, a GSAP ScrollTrigger drives all animation progress. After the pin releases, the user continues to the next section normally.

**Background**: A deep `#0D0D0D` canvas. Subtle noise texture overlay (SVG `feTurbulence` or CSS `@layer` grain) at 3% opacity — not visible, just adds skin to the dark surface.

**Three layers (z-index stacking)**:

```
z: 0  → R3F Canvas (full-bleed, position: fixed while pinned, pointer-events: none)
z: 10 → Gradient overlays (bottom vignette, edge darkening)
z: 20 → Hero text and UI elements
z: 30 → Navbar
z: 40 → Custom cursor
```

### The 3D Cheeko Model

```tsx
// CheekoModel.tsx
import { useGLTF, useAnimations, Float } from '@react-three/drei'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useSpring, animated } from '@react-spring/three'

const PUBLIC_MODEL_PATH = '/cheeko.glb'  // ← replace with actual path

export function CheekoModel({ scrollProgress }: { scrollProgress: number }) {
  const { scene } = useGLTF(PUBLIC_MODEL_PATH)
  const ref = useRef<THREE.Group>(null)

  useFrame(() => {
    if (!ref.current) return
    // Scroll-driven Y rotation: 0 → 360° over full scroll journey
    ref.current.rotation.y = scrollProgress * Math.PI * 2
    // Gentle breathe: bob up-down independent of scroll
    ref.current.position.y = Math.sin(Date.now() * 0.001) * 0.04
  })

  return (
    <animated.group ref={ref} scale={1.4} position={[0, -0.3, 0]}>
      <primitive object={scene} />
    </animated.group>
  )
}
```

**Camera**: `fov={45}`, position `[0, 0.5, 3.5]`. `OrbitControls` disabled (scroll controls everything). `Environment preset="city"` for realistic reflections. Add `ContactShadows` at y=-0.8, opacity 0.4, blur 2.5.

**Lighting**:
- Ambient: intensity 0.3
- Key light: `<directionalLight position={[2, 4, 3]} intensity={1.8} color="#FFF4E6" castShadow />`
- Rim light: `<directionalLight position={[-3, 1, -2]} intensity={0.6} color="#FF6B2C" />` — warm orange rim from behind to make Cheeko glow
- Point light: `<pointLight position={[0, 2, 1]} intensity={0.5} color="#FFB830" />` — gold fill light from above

**Post-processing**:
```tsx
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
<EffectComposer>
  <Bloom luminanceThreshold={0.6} luminanceSmoothing={0.9} intensity={0.4} />
  <Vignette eskil={false} offset={0.3} darkness={0.6} />
</EffectComposer>
```

### Particle Field

```tsx
// ParticleField.tsx — ambient floating dust/glow particles
// 300 points, random positions in sphere r=4
// Each particle: size 0.012, color cycles between #FF6B2C and #FFB830
// useFrame: particles drift upward slowly (y += 0.0003), wrap at y=2
// On pointer move: nearest 30 particles repel gently from mouse position
// Reduced-motion safe: if window.matchMedia('(prefers-reduced-motion: reduce)').matches, freeze drift
```

Implement the full particle system using `THREE.Points` and a custom `Float32Array` buffer. Do not use any library for this — raw Three.js geometry.

### Hero Text Layers

The hero text appears in three phases driven by scroll progress (0 → 1):

**Phase 1 (progress 0 → 0.15)**: Hero text entrance — stagger in word by word using Framer Motion `variants` with `staggerChildren: 0.06`. Words translate from `y: 40, opacity: 0` to `y: 0, opacity: 1`.

```
[large DM Serif Display, 96px clamp, centered]
Give them wonder,
not another feed.
```

Below it, a single line in Nunito 600 uppercase 11px tracked:
```
AI Language Companion · Multilingual · Card-Activated · Built for India
```

**Phase 2 (progress 0.15 → 0.5)**: Hero text fades out (`opacity: 1 → 0`, `y: 0 → -30px`). Simultaneously, the Cheeko model drifts to the left half of the canvas (`x: 0 → -1.2` in Three.js world units). A feature panel slides in from the right.

**Phase 3 (progress 0.5 → 1.0)**: Three feature cards cycle in and out, each tied to a scroll range. The model rotates to show the corresponding face. Cards use glassmorphism panels.

Feature card sequence:
1. **progress 0.5–0.65** → "RFID Cards" — "Tap a card, start an adventure. Stories, songs, and learning — activated by touch."
2. **progress 0.65–0.82** → "Your Mother Tongue" — "Talk to Cheeko in Hindi, Tamil, Telugu, Kannada, Malayalam, Bengali — or English."
3. **progress 0.82–1.0** → "Parent App" — "Set content boundaries, manage languages, and stay in control — from your phone."

Each card:
```tsx
// Glassmorphism panel
// background: rgba(255,255,255,0.04)
// border: 1px solid rgba(255,255,255,0.08)
// backdrop-filter: blur(24px)
// border-radius: 24px
// padding: 40px 48px
// max-width: 420px

// Top: small category pill — e.g. "RFID · Tap to Play"
// Nunito 600 uppercase 10px, color: var(--c-orange)
// background: rgba(255,107,44,0.1)
// border: 1px solid rgba(255,107,44,0.2)
// border-radius: 100px
// padding: 6px 16px

// Middle: headline in DM Serif Display 48px
// Bottom: body in Nunito 400 18px, color: var(--c-cream) at 70% opacity
// Bottom-right: small forward arrow icon (SVG)
```

Cards animate in: `opacity: 0 → 1`, `x: 40px → 0`. Cards animate out: `opacity: 1 → 0`, `x: 0 → -40px`. Use Framer Motion `AnimatePresence` with `mode="wait"`.

### Scroll Indicator

A thin vertical line at bottom-center. A dot rides up and down the line at a sine wave pace. Label "Scroll to explore" in Nunito 11px uppercase tracked. Fades to `opacity: 0` when `scrollProgress > 0.05`.

### Pointer Motion

Implement a pointer-based soft parallax on the R3F canvas: as the user moves the mouse, the camera position X and Y shift by `±0.08` of mouse position (normalized -1 to 1). Smooth with `lerp(current, target, 0.05)` per frame. Does not apply on mobile (touch device detection).

### Custom Cursor

```tsx
// CustomCursor.tsx
// Small filled dot (8px, var(--c-orange)) that follows mouse with lerp(0.12)
// On hover over interactive element: expands to 40px outlined circle, dot shrinks to 0
// On mousedown: scale 0.7
// Use CSS custom cursor: none on body
// Transition: all 200ms cubic-bezier(0.16, 1, 0.3, 1)
// NOT rendered on touch devices
```

### Navbar

Position: `fixed`, top 0, full width. `background: transparent`. On scroll > 60px: `backdrop-filter: blur(20px)` + `background: rgba(13,13,13,0.85)`. Transition 300ms.

Left: `CHEEKO` wordmark in Nunito 700, 20px + a small fox icon (SVG, 22×22px — use a simple geometric fox silhouette: two triangular ears, oval face, no fill, 1.5px stroke in `var(--c-orange)`).

Right nav items in Nunito 600 uppercase 11px tracked: `Product · Safety · FAQ · ₹3,990` — last item is the price, styled as a quiet pill button. On hover: underline draws from left, 2px, `var(--c-orange)`.

Far right: `Join Waitlist` — pill button, 14px, Nunito 600. Background: `var(--c-orange)`. Color: `#0D0D0D`. Hover: scale 1.03, background lightens to `#FF8450`. Transition cubic-bezier(0.16, 1, 0.3, 1) 200ms. Border-radius: 100px. Padding: 10px 24px.

---

## SECTION 2 — SCROLL TRANSITION OUT OF HERO

After the pin releases (after 300vh), a full-width section with `min-height: 30vh` and a very subtle `background: linear-gradient(to bottom, #0D0D0D, #111)`. This acts as a breathing pause and lets the R3F canvas gracefully dissolve. The canvas should `opacity: 1 → 0` over this zone (driven by GSAP ScrollTrigger).

---

## LENIS + GSAP WIRING

```tsx
// app/layout.tsx or a LenisProvider component

'use client'
import { useEffect } from 'react'

export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let lenis: any
    let rafId: number

    const init = async () => {
      const { default: Lenis } = await import('@studio-freight/lenis')
      const gsap = (await import('gsap')).default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      lenis = new Lenis({ duration: 1.4, smoothWheel: true })

      gsap.ticker.add((time) => lenis.raf(time * 1000))
      gsap.ticker.lagSmoothing(0)

      lenis.on('scroll', ScrollTrigger.update)
    }

    init()
    return () => {
      lenis?.destroy()
    }
  }, [])

  return <>{children}</>
}
```

---

## SCROLL PROGRESS HOOK

```tsx
// lib/useScrollProgress.ts
import { useState, useEffect } from 'react'

export function useScrollProgress(start: number, end: number): number {
  // Returns 0→1 as window scroll moves from `start`px to `end`px
  // Clamps to [0, 1]
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const handler = () => {
      const raw = (window.scrollY - start) / (end - start)
      setProgress(Math.max(0, Math.min(1, raw)))
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [start, end])
  return progress
}
```

---

## PERFORMANCE RULES

1. The R3F canvas is dynamically imported with `{ ssr: false }`. It never SSR-renders.
2. `useGLTF.preload(PUBLIC_MODEL_PATH)` called at module level.
3. The particle system uses `useMemo` for geometry — never recreated on re-render.
4. GSAP ScrollTrigger instances are killed in `useEffect` cleanup.
5. Framer Motion `AnimatePresence` exits use `mode="wait"` — no simultaneous enter+exit.
6. All `useFrame` callbacks are O(1) — no array creation, no `.forEach` with closures.
7. `@media (prefers-reduced-motion: reduce)` — disable all animations, show static state.
8. Canvas pixel ratio capped at `Math.min(window.devicePixelRatio, 1.5)`.

---

## DELIVERABLE FOR PROMPT 1

Build the following files completely, with no placeholders:
- `app/layout.tsx`
- `app/page.tsx` (hero section only, stubs for remaining sections)
- `components/canvas/CheekoCanvas.tsx`
- `components/canvas/CheekoModel.tsx`
- `components/canvas/ParticleField.tsx`
- `components/canvas/PostFX.tsx`
- `components/hero/HeroSection.tsx`
- `components/hero/HeroText.tsx`
- `components/hero/ScrollIndicator.tsx`
- `components/ui/CustomCursor.tsx`
- `components/ui/Navbar.tsx`
- `lib/useLenis.ts`
- `lib/useScrollProgress.ts`
- `tailwind.config.ts` with extended palette
- `package.json` with all deps

Output full file contents for every file above. No ellipsis. No placeholder comments.
```

---

---

# PROMPT 2 — All Content Sections, FAQ & Footer

```markdown
Continuing the Cheeko Pro website. The hero and 3D canvas from Prompt 1 are already built. Now build every content section below and wire them into `app/page.tsx`. Maintain the same tech stack, design system, and brand values.

The parent is the buyer. The child is the end user. After seeing this page, a parent should feel: "I need to get this for my child." Every section earns that feeling — through warmth, clarity, and honest premium quality.

---

## SHARED ANIMATION SYSTEM (reuse across all sections)

```tsx
// components/ui/RevealBlock.tsx
// A wrapper that uses Framer Motion useInView + variants
// Default: opacity 0→1, y 50px→0, duration 0.7s, ease [0.16,1,0.3,1]
// Supports: staggerChildren (default 0.08s), delayChildren (default 0s)
// Threshold: 0.15 (triggers when 15% visible)
// Once: true (don't re-trigger on scroll back)
// Usage: <RevealBlock stagger={0.1}><child /><child /></RevealBlock>
```

```tsx
// components/ui/ParallaxText.tsx
// Uses GSAP ScrollTrigger: translates element by (scrollDelta * factor)
// factor prop: default 0.15 (subtle)
// Applies to: section headings, large display text
```

All section headings use **DM Serif Display**. Section sub-labels use Nunito 600 uppercase 11px tracked, color `var(--c-orange)`. Body text Nunito 400 18px.

Section background alternates: `#0D0D0D` → `#111111` → `#0D0D0D` — subtle depth without jarring contrast.

---

## SECTION 03 — FEATURES SCROLL NARRATIVE

A tall scroll-pinned section (400vh). A horizontal "film strip" of 7 story scenes scrolls into view as the user scrolls vertically. Implemented with GSAP `horizontalScroll` or a manual `translateX` driven by `scrollProgress`.

Each scene is `100vw × 100vh`, full-bleed. Layout: large display text on the left, a visual on the right (placeholder image area with an orange-gradient shimmer loading skeleton that can be replaced with actual assets). The 7 scenes:

| Scene slug | Display Headline | Body copy |
|---|---|---|
| `first-moment` | A friend they can talk to. | "Cheeko answers questions, tells stories, and listens — the way a patient companion should. Not a screen. Not an algorithm. A friend." |
| `meet-cheeko` | Stories without the phone. | "Every bedtime story, every song, every little adventure — delivered through Cheeko's voice, not a glowing rectangle. Phone-free play starts here." |
| `multilingual` | Made for many voices. | "Your child can speak to Cheeko in Hindi, Tamil, Telugu, Kannada, Malayalam, Bengali — or English. Multilingual from day one, because India is." |
| `cards` | Tap a card, start an adventure. | "Each RFID card unlocks a world — a story, a song, a learning game. Tap and play. No menus. No passwords. Just wonder." |
| `parent-safety` | Parents stay in control. | "Set the languages. Choose the content. Review Cheeko's sessions. The Parent App puts you in charge — without interrupting the magic." |
| `offline-anywhere` | Play that travels. | "Wi-Fi not required. Cheeko's offline-ready library goes wherever your family goes — road trips, grandma's house, the backseat." |
| `product-duo` | Choose your Cheeko. | "Cheeko Pro: screen-enabled, fox-fronted, richer interactions. One device, endless play. Preorders open June 2026." |

Each scene animates in from `opacity: 0, x: 60px` and stays for its scroll window. Text staggers word-by-word using Framer Motion `variants`. The visual placeholder on the right has a warm orange-to-transparent radial gradient glow around it.

At the end of the horizontal strip, a "Continue" indicator pulses to signal the vertical scroll resumes.

---

## SECTION 04 — PRODUCT LINE

Background: `#111111`. Section label: `THE DEVICE`. Heading: "One Cheeko. Endless play." (DM Serif Display, 72px).

Layout: A full-width card (max-width: 900px, centered) for **Cheeko Pro** (the only current variant), plus a narrower card for **Cheeko Cards** as an accessory.

### Cheeko Pro Card

```
// Glassmorphism card
// background: rgba(255,255,255,0.04)
// border: 1px solid rgba(255,255,255,0.08)
// backdrop-filter: blur(32px)
// border-radius: 32px
// padding: 64px

// Top-left: "CHEEKO PRO" pill tag
// background: rgba(255,107,44,0.1)
// border: 1px solid rgba(255,107,44,0.2)
// Nunito 700 uppercase 10px tracked, color: var(--c-orange)

// Center: large placeholder for 3D model render / hero product shot
// 480px × 360px, border-radius: 24px
// Warm gradient placeholder: linear-gradient(135deg, #1a1108, #2a1a05)
// Subtle pulsing glow animation (Cheeko's orange) around the placeholder

// Right column:
// Price: "₹4,990" in DM Serif Display 56px
// Sub: "One-time purchase. No subscription." in Nunito 400 16px, --c-muted
// Launch offer pill: "20% off with code FIRSTUSER"
// Nunito 600 14px, background: rgba(255,184,48,0.1), border: 1px solid rgba(255,184,48,0.2), color: var(--c-gold)

// Feature checklist (6 items, each with a small orange checkmark icon):
// ✓ Screen-enabled with fox assistant interface
// ✓ RFID card activation — tap to play
// ✓ Multilingual: 6 Indian languages + English
// ✓ Kids audio: continuous story & song content
// ✓ Offline-ready library built-in
// ✓ Parent App: content control from your phone

// CTA button: "Join Waitlist" — full-width of right column
// Same button style as Navbar CTA
```

On scroll into view: card fades in `opacity: 0→1` + `y: 60px→0`. Feature checklist items stagger in with 80ms delay each.

On hover: card lifts `translateY(-4px)`, border brightens to `rgba(255,107,44,0.2)`. Cubic-bezier(0.16,1,0.3,1) 300ms.

### Cheeko Cards Accessory

Narrower card (max-width: 420px), same glass treatment. Label: `ACCESSORY`. Heading: "Cheeko Cards". Body: "Story cards, learning games, and routine prompts. Each card is a new world. Sold separately." Price not shown (TBD). CTA: "Notify Me".

---

## SECTION 05 — COMPARISON TABLE

Background: `#0D0D0D`. Section label: `COMPARE`. Heading: "Find your Cheeko." (DM Serif Display 64px).

Note: Since Cheeko currently has one device (Cheeko Pro), the table compares **Cheeko Basic** (planned) vs **Cheeko Pro** (available). Mark Basic column as "Coming soon" if needed.

```
COMPARISON TABLE DESIGN:
- Full-width, max-width: 800px, centered
- Row height: 64px
- Header row: background rgba(255,255,255,0.06), Nunito 700 16px
- Odd rows: transparent; Even rows: rgba(255,255,255,0.02)
- First column (feature name): Nunito 400 16px, --c-muted, left-aligned
- Basic column: Nunito 600 16px, centered
- Pro column: Nunito 700 16px, centered, background on header: rgba(255,107,44,0.08), border: 1px solid rgba(255,107,44,0.15), border-radius: 12px
- Checkmark: SVG check circle, var(--c-orange), 20px
- Cross / dash: SVG dash, --c-muted, 20px
- "TBD" label: Nunito 400 14px, --c-muted, italic

ROWS:
| Feature | Cheeko Basic | Cheeko Pro |
|---|---|---|
| Screen | — | ✓ Fox assistant display |
| Audio | ✓ Audio-first | ✓ Rich audio |
| RFID Card support | ✓ | ✓ |
| Offline-ready play | ✓ | ✓ |
| Parent App | ✓ | ✓ |
| Indian languages | ✓ 6 languages | ✓ 6 languages |
| Kids audio content | ✓ | ✓ |
| Box contents | Device + cable | Device + cable + quick-start card |
| Price | ₹3,990 | ₹4,990 |
```

Below the table: "Both include: 1-year warranty · Free shipping above ₹499 · Made in India"  
Nunito 400 14px, --c-muted, centered.

Scroll reveal: table slides up `y: 40→0, opacity: 0→1`. Rows stagger in with 40ms delay each.

---

## SECTION 06 — WHY CHEEKO (MARKETING MOMENT)

Background: `#111111`. Full-bleed emotional section. No table. Pure copy and visual rhythm.

Large centered display text (DM Serif Display, 80px, line-height 1.1):
```
"Give them wonder,
not another feed."
```
Color: `var(--c-cream)`. Animate: each line reveals word-by-word on scroll, stagger 60ms.

Below, a horizontal scrolling strip of 4 benefit cards (CSS `overflow-x: auto`, `scroll-snap-type: x mandatory`, `-webkit-overflow-scrolling: touch`). On desktop they sit in a 4-column grid.

Each card (Nunito, glass treatment, border-radius: 24px, padding: 40px):

1. **For curious kids** — "Questions become conversations, stories become adventures, and learning feels like play."
2. **For busy parents** — "A calmer way to keep children engaged during routines, travel, and quiet moments at home."
3. **For Indian families** — "Multilingual play helps children explore in the languages they hear around them every day."
4. **For safer tech habits** — "Cheeko is designed to be phone-free, focused, and parent-guided from the start."

Top of each card: a small icon area (48×48px, background: rgba(255,107,44,0.1), border-radius: 12px). Inside: a simple SVG monoline icon relevant to the theme (child face, parent+child, India outline, shield).

Card hover: `translateY(-6px)`, border color → `rgba(255,107,44,0.25)`, icon background → `rgba(255,107,44,0.2)`. Cubic-bezier(0.16,1,0.3,1) 300ms.

---

## SECTION 07 — SAFETY & TRUST

Background: `#0D0D0D`. Section label: `PARENT TRUST`. Heading: "Built with care. For families." (DM Serif Display 64px).

Two-column layout (desktop) / stacked (mobile):

**Left column — short editorial copy** (Nunito 400 18px):
"We designed Cheeko for the parent who wants their child to have a richer, safer relationship with technology. Not a screen to manage. A companion to trust."

Below it, a "From our idea to your hands." callout — set in DM Serif Display italic 32px, color: `var(--c-orange)`. No quotation marks. Animate: fade in with slight scale from 0.97→1.

**Right column — 4 trust blocks** (each a small glass panel, border-radius: 16px, padding: 24px 28px):

1. **Parent Verification** — "A parent must verify the account before Cheeko activates. Your child cannot bypass this."
2. **Content Boundaries** — "All content is curated for children. No open internet access. No user-generated content."
3. **Conversation Data** — "Whether conversations are stored on our servers is currently being finalized. We will publish our full privacy policy before shipping."
4. **Microphone** — "Cheeko only listens when your child speaks to it directly. There is no always-on microphone monitoring. Data behavior will be detailed in our privacy policy."

Each block: left border `3px solid var(--c-orange)`, title in Nunito 700 14px uppercase tracked, body in Nunito 400 15px `--c-muted`.

Note at the bottom of the section (Nunito 400 13px, --c-muted, centered):
"Cheeko is a play and language companion. It is not a medical device, therapy tool, or educational curriculum. Learning outcomes vary by child."

---

## SECTION 08 — SPECS

Background: `#111111`. Section label: `SPECS`. Heading: "What's in the box." (DM Serif Display 64px).

Three-column grid of spec blocks (desktop), stacked (mobile). Each block: no border, just top hairline `1px solid rgba(255,255,255,0.08)`, padding: 32px 0.

**Hardware**:
- Device: Cheeko Pro
- Display: Color screen with fox assistant interface
- Audio: Speaker + microphone (directional)
- Connectivity: Wi-Fi + Bluetooth
- RFID: Built-in card reader
- Battery: Rechargeable (USB-C)
- Offline: Built-in content library

**Box Contents**:
- Cheeko Pro device
- USB-C charging cable
- Quick-start card
- 1 sample RFID story card

**Warranty & Shipping**:
- Warranty: 1 year from purchase
- Shipping: Free above ₹499 · Pan-India delivery
- Launch: Preorders open June 2026 · Shipping timeline TBD
- Returns: Policy TBD — will be published before launch
- Made in: Bangalore, India 🇮🇳

Each spec item: label in Nunito 600 uppercase 11px tracked `--c-muted`, value in Nunito 500 16px `var(--c-cream)`.

---

## SECTION 09 — FAQ

Background: `#0D0D0D`. Section label: `FAQ`. Heading: "Honest answers." (DM Serif Display 64px).

Accordion component (no library — pure Framer Motion `AnimatePresence` for height animation).

Each item: bottom border `1px solid rgba(255,255,255,0.06)`. Question: Nunito 600 18px. Answer: Nunito 400 16px, --c-muted. Expand icon: thin `+` that rotates to `×` on open. Expand animation: `height: 0 → auto` via Framer Motion layout animation.

FAQ items:

1. **What age is Cheeko for?**
   "Cheeko is designed for children aged 3 to 10. Younger children benefit from the audio and card-tap interaction; older children enjoy the stories, quizzes, and multilingual play."

2. **Does Cheeko need internet?**
   "Cheeko has a built-in offline library for core content. Some features — like real-time language updates and new story packs — may require an occasional Wi-Fi connection. Day-to-day play works offline."

3. **Is Cheeko a screen-time replacement?**
   "Cheeko Pro has a small screen for its fox assistant interface, so it is not screen-free. We describe it as screen-light play. It is designed to reduce dependency on phones and tablets, not to eliminate screens entirely."

4. **What is the difference between Cheeko Basic and Cheeko Pro?**
   "Cheeko Pro has a color screen with the fox assistant, richer visual interactions, and a more expansive content experience. Cheeko Basic is audio-first with tactile controls — no screen. Both support RFID cards, multilingual play, and the Parent App. Cheeko Basic pricing starts at ₹3,990."

5. **Can parents control what Cheeko says?**
   "Yes. The Parent App lets you choose languages, set content categories, and review session activity. Cheeko does not access open internet content."

6. **Are conversations stored?**
   "Our data storage policy is still being finalized. We will publish a clear, plain-language privacy policy before any device ships. We are committed to not storing sensitive child audio without explicit, informed parental consent."

7. **Which languages are supported?**
   "Hindi, Tamil, Telugu, Kannada, Malayalam, Bengali, and English — with more planned. Your child can switch languages naturally in conversation."

8. **What comes in the box?**
   "Cheeko Pro device, USB-C charging cable, quick-start card, and 1 sample RFID story card. Additional Cheeko Cards are sold separately."

9. **When will Cheeko ship?**
   "Preorders open in June 2026. We have not announced a shipping date yet. Everyone who joins the waitlist will receive shipping timeline updates first."

10. **What is the return or refund policy?**
    "Our return and refund policy is being finalized and will be published before launch. We are committed to a fair, parent-friendly policy."

---

## SECTION 10 — PRICING / CTA BLOCK

Background: full-bleed warm gradient — `linear-gradient(135deg, #1a0d00 0%, #0D0D0D 60%)`. A very subtle radial glow in `var(--c-orange)` at 4% opacity centered behind the text. Not a loud gradient — barely visible, just warmth.

Centered layout:

**Pre-headline**: "From our idea to your hands." — Nunito 600 uppercase 11px tracked, `var(--c-orange)`.

**Headline**: "One device. A thousand adventures." — DM Serif Display 80px, `var(--c-cream)`.

**Sub**: "Cheeko Pro · ₹4,990 · Launch offer: 20% off with code FIRSTUSER" — Nunito 500 20px, `var(--c-cream)` at 70%.

**Fine print**: "One-time purchase. No subscription required." — Nunito 400 14px, `--c-muted`.

**CTA row** (centered, gap: 16px):
- Primary: "Join Waitlist" — same orange pill button as Navbar
- Secondary: "Compare Basic & Pro" — outlined pill, `border: 1.5px solid rgba(255,255,255,0.15)`, color: `var(--c-cream)`. Hover: border-color → `var(--c-orange)`.

Animate: headline staggers word by word. CTA row fades in 200ms after headline completes. On hover of primary CTA: a subtle warm ripple effect emanates from click point.

---

## FOOTER

Background: `#0A0A0A`. Top: `1px solid rgba(255,255,255,0.06)` hairline.

Five-column grid (desktop), 2-column (tablet), 1-column (mobile):

**Col 1 — Brand**:
- CHEEKO wordmark + fox icon (same as Navbar)
- "Your AI Language Companion" — Nunito 400 14px, --c-muted
- "Made with care in Bangalore, India 🇮🇳" — Nunito 400 13px, --c-muted
- Social links row: Instagram · Twitter · LinkedIn (simple text links, Nunito 500 13px)

**Col 2 — Product**:
- Cheeko Pro
- Cheeko Cards
- Compare Models
- What's Included

**Col 3 — Company**:
- About Cheeko
- Our Story
- Careers
- Press

**Col 4 — Support**:
- FAQ
- Contact Us
- Shipping & Returns
- Privacy Policy

**Col 5 — Contact**:
- "hello@cheeko.in" — styled as a link
- "Bangalore, India"
- "Preorders: June 2026"

Footer bottom bar (below a hairline):
- Left: "© 2026 Cheeko. All rights reserved."
- Right: "Terms of Use · Privacy Policy · Cookie Policy"
- Both in Nunito 400 12px, --c-muted

Column headings: Nunito 600 uppercase 11px tracked, `var(--c-cream)`. Links: Nunito 400 14px, --c-muted. Link hover: color → `var(--c-cream)`, no underline.

---

## RESPONSIVE BREAKPOINTS

```css
/* Mobile-first. Breakpoints: */
/* sm: 640px, md: 768px, lg: 1024px, xl: 1280px */

/* Hero: */
/* Mobile: hero text 52px, panels stack at bottom, never cover device */
/* Tablet: panels narrower (max-w: 340px), positioned lower */
/* Desktop: side-by-side, panels right */

/* Features scroll narrative: */
/* Mobile: vertical scroll, not horizontal */
/* Desktop: horizontal film strip */

/* Comparison table: */
/* Mobile: only show Pro column + feature name. Basic col hidden. */
/* Add "See full comparison" expand button */

/* Cards grid: */
/* Mobile: single column */
/* Tablet: 2-column */
/* Desktop: 4-column */
```

---

## FINAL WIRING — `app/page.tsx`

```tsx
import dynamic from 'next/dynamic'

const HeroSection     = dynamic(() => import('@/components/hero/HeroSection'), { ssr: false })
const FeaturesNarrative = dynamic(() => import('@/components/sections/FeaturesNarrative'))
const ProductLine     = dynamic(() => import('@/components/sections/ProductLine'))
const ComparisonTable = dynamic(() => import('@/components/sections/ComparisonTable'))
const WhyCheeko       = dynamic(() => import('@/components/sections/WhyCheeko'))
const SafetySection   = dynamic(() => import('@/components/sections/SafetySection'))
const SpecsSection    = dynamic(() => import('@/components/sections/SpecsSection'))
const FAQSection      = dynamic(() => import('@/components/sections/FAQSection'))
const CTABlock        = dynamic(() => import('@/components/sections/CTABlock'))
const Footer          = dynamic(() => import('@/components/ui/Footer'))

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeaturesNarrative />
      <ProductLine />
      <ComparisonTable />
      <WhyCheeko />
      <SafetySection />
      <SpecsSection />
      <FAQSection />
      <CTABlock />
      <Footer />
    </main>
  )
}
```

---

## DELIVERABLE FOR PROMPT 2

Build the following files completely, with no placeholders:
- `app/page.tsx` (fully wired)
- `components/sections/FeaturesNarrative.tsx`
- `components/sections/ProductLine.tsx`
- `components/sections/ComparisonTable.tsx`
- `components/sections/WhyCheeko.tsx`
- `components/sections/SafetySection.tsx`
- `components/sections/SpecsSection.tsx`
- `components/sections/FAQSection.tsx`
- `components/sections/CTABlock.tsx`
- `components/ui/RevealBlock.tsx`
- `components/ui/ParallaxText.tsx`
- `components/ui/Footer.tsx`

Output full file contents for every file above. No ellipsis. No placeholder comments. All copy, all styles, all animations — production ready.
```

---

---

## NOTES FOR IMPLEMENTATION

### 3D Model Integration
- Supply the Cheeko `.glb` file under `/public/cheeko.glb`
- Replace every `PUBLIC_MODEL_PATH` string with `/cheeko.glb`
- If the model has embedded animations, use `useAnimations` from `@react-three/drei` to play an idle loop
- If the model is heavy (>5MB), add `<Suspense fallback={<LoadingFallback />}>` around `CheekoModel`

### Image/Video Assets
- All product photography goes under `/public/images/`
- Video clips for Features Narrative: `/public/video/`  
- Replace all orange gradient placeholders with actual assets when ready

### Deployment Notes
- `next.config.js`: set `output: 'standalone'` for Docker deployments
- Add `NEXT_PUBLIC_GA_ID` env var for analytics
- R3F canvas needs `experimental.optimizeCss: true` in next.config for smaller CSS bundle

### Copy Guidance
- Never use: "thousands of happy families" / "proven learning outcomes" / "screen-free"
- Always use: "phone-free" or "screen-light" for Cheeko Pro
- Price copy always includes: "one-time purchase" + "no subscription"
- Safety/privacy copy always includes: "policy will be published before shipping"

---

*Last updated: June 2026 · Version 1.0 · Cheeko Pro Pre-Launch Build*