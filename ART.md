# ART.md — The Philosophy of Erebus

> _"The pain and darkness of love that will never be. A brush that paints with sadness at its flow."_

This document explores the color theory, design philosophy, and intentional choices behind the Erebus theme. Every color has been chosen with purpose. Every surface tells a story.

---

## The Name: Erebus

In Greek mythology, **Erebus** (Ἔρεβος) is the primordial deity of darkness — not the harsh darkness of night, but the deep, velvet shadow where light fades into infinite depth. Erebus is the space between spaces, the darkness of the deep earth, the shadow cast by Chaos itself.

This theme channels that essence: darkness with texture, depth without harshness, and an intentional restraint that speaks louder than saturation ever could.

---

## The Dual Nature

### Erebus Dark

The primordial shadow. Built on the principle that **grey is not the absence of color, but the presence of depth**.

- Deep surfaces breathe rather than suffocate
- Elevation through lightness, not glow
- Accents signal, never shout

### Erebus Light

The ash after the night. **Paper-bright but never blinding**, inked contrast without GitHub's clinical sterility.

- Warm paper whites meet cold marble greys
- Ink-like text creates presence without weight
- The same mythological restraint, translated to light

---

## Color Theory

### The Accent Palette

#### Magenta `#e20074`

The heart's fire. Magenta represents:

- **Power** — keywords that command the machine
- **Danger** — errors that demand attention
- **Passion** — the emotional weight of important elements

In color psychology, magenta bridges red's urgency with purple's mystery. It's not the aggressive red of traditional error states, but something more nuanced — a color that says "pay attention" without screaming.

**Usage:**

- Keywords (`if`, `return`, `class`, `function`)
- Error states and error icons
- Badges and notifications
- Button backgrounds (primary actions)
- Breakpoints (debugging)

#### Teal `#05f2af`

The calm clarity. Teal represents:

- **Signal** — selection states, active elements
- **Growth** — strings that hold the data of our programs
- **Balance** — focus rings that guide without distraction

Teal sits between blue's reliability and green's vitality. It's the color of calm focus — noticeable but not jarring, present but not overwhelming.

**Usage:**

- Selection backgrounds
- Strings and string-like values
- Active borders and focus rings
- Progress indicators
- Links (in dark theme)
- Success states

### The Surface Philosophy

#### Dark Surfaces — Grey Not Black

The traditional dark theme sin: pure black (`#000000`). It creates:

- Eye strain through excessive contrast
- Flat, lifeless interfaces
- Text that "floats" uncomfortably

Erebus Dark uses a **tonal grey ladder**:

| Surface     | Hex       | Purpose                                        |
| ----------- | --------- | ---------------------------------------------- |
| `surface.0` | `#0d0d0f` | Editor canvas — the abyss, but not quite black |
| `surface.1` | `#141416` | Sidebars, panels — grounded                    |
| `surface.2` | `#1a1a1c` | Activity bar, tabs — slightly lifted           |
| `surface.3` | `#222225` | Dropdowns, tooltips — floating                 |
| `surface.4` | `#2a2a2d` | Modals, command palette — peak attention       |
| `surface.5` | `#323235` | Active selections, highlights                  |

Each step is approximately 6-8% lighter, creating **depth through elevation**. Higher elements catch more "light" — a principle borrowed from Material Design but executed with subtlety.

#### Light Surfaces — Paper Not White

The light theme trap: pure white (`#ffffff`) everywhere. It creates:

- Eye fatigue from excessive brightness
- "White-on-white" collapse where elements merge
- Loss of visual hierarchy

Erebus Light uses an **inverted ladder**:

| Surface     | Hex       | Purpose                           |
| ----------- | --------- | --------------------------------- |
| `surface.0` | `#fafafa` | Editor canvas — paper, warm       |
| `surface.1` | `#f5f5f5` | Sidebars, panels — soft off-white |
| `surface.2` | `#eeeeee` | Activity bar, tabs — recessed     |
| `surface.3` | `#e8e8e8` | Dropdowns, inputs — container     |
| `surface.4` | `#e0e0e0` | Modals, overlays — attention      |
| `surface.5` | `#d8d8d8` | Highlights, selections            |

The light theme inverts the metaphor: **lower surfaces are lighter** (like a sheet of paper on a desk), while overlays and interactive elements have subtle depth.

### Text Hierarchy

Both themes use a four-level text hierarchy inspired by Material Design's emphasis system:

#### Dark Theme

| Level    | Hex       | Opacity Equivalent | Usage              |
| -------- | --------- | ------------------ | ------------------ |
| High     | `#e5e5e7` | ~87% white         | Primary content    |
| Medium   | `#a8a8ad` | ~60% white         | Secondary content  |
| Muted    | `#7a7a7f` | ~45% white         | Tertiary, comments |
| Disabled | `#5a5a5f` | ~30% white         | Inactive elements  |

#### Light Theme

| Level    | Hex       | Opacity Equivalent | Usage              |
| -------- | --------- | ------------------ | ------------------ |
| High     | `#1a1a1c` | ~87% black         | Primary content    |
| Medium   | `#505055` | ~60% black         | Secondary content  |
| Muted    | `#7a7a7f` | ~45% black         | Tertiary, comments |
| Disabled | `#a0a0a5` | ~30% black         | Inactive elements  |

---

## Semantic Colors

### Error: `#f44747`

Not the aggressive red of warning signs, but a warm, slightly orange-tinged red that reads as "attention needed" without triggering stress responses. The subtle orange undertone prevents the "blood red" association.

### Warning: `#ffb347`

A warm amber that says "caution" without alarm. It's closer to honey than to hazard tape — noticeable but not aggressive.

### Success: `#4ec9b0`

A calm teal-green that confirms without celebration. It's the satisfied nod, not the victory dance.

### Info: `#6cb6ff`

A soft blue that provides information without demanding action. It's informative without being imperative.

---

## Syntax Highlighting Philosophy

### The Rainbow Problem

Many themes use the full spectrum for syntax highlighting, resulting in visual chaos. Erebus uses **constrained color assignment**:

1. **Structure** (magenta): Keywords, storage types, modifiers
2. **Data** (teal): Strings, regular expressions
3. **Logic** (purple): Functions, methods
4. **Types** (green-ish): Classes, interfaces, type annotations
5. **Values** (amber): Numbers, constants
6. **Commentary** (grey): Comments, documentation

### The Comment Philosophy

Comments are **muted but present**. They're not hidden (that would devalue documentation), but they don't compete with code. The italic style provides visual differentiation without color.

### Function Names: `#b48ead`

A muted purple that suggests action without the magenta's intensity. Functions are important, but they're the workers, not the commanders — keywords command, functions execute.

---

## Bracket Pair Colorization

The bracket pairs follow a rainbow progression that maintains theme consistency:

1. **Magenta** `#e20074` — first level (the most common)
2. **Teal** `#05f2af` — second level
3. **Blue** `#6cb6ff` — third level
4. **Amber** `#ffb347` — fourth level
5. **Purple** `#b48ead` — fifth level
6. **Green** `#4ec9b0` — sixth level

Each color has been desaturated slightly from pure hues to prevent vibration against the dark background.

---

## Terminal Colors

The ANSI terminal palette has been carefully tuned:

- **Black/BrightBlack**: Match the surface ladder
- **Colors**: Harmonized with the semantic palette
- **Bright variants**: Lighter, not just more saturated

---

## Accessibility Considerations

### Contrast Ratios

All text colors maintain WCAG AA compliance (4.5:1 for normal text, 3:1 for large text) against their intended backgrounds.

### Color Blind Safety

The palette avoids relying solely on red-green distinctions:

- Error states use magenta (distinguishable from green)
- Git additions use teal, not green
- Warning uses amber, providing luminance difference

---

## VS Code Coverage

This theme covers **every** documented VS Code theme color from the [Theme Color Reference](https://code.visualstudio.com/api/references/theme-color), including:

- Activity Bar
- Badges
- Breadcrumbs
- Buttons
- Command Center
- Debug
- Diff Editor
- Editor (all groups, gutters, widgets)
- Extensions
- Git Decorations
- Input Controls
- Lists and Trees
- Menus
- Minimap
- Notebooks
- Notifications
- Panel
- Peek View
- Progress Bar
- Quick Input
- Scrollbar
- Settings Editor
- Side Bar
- Status Bar
- Tabs
- Terminal (including all ANSI colors)
- Testing
- Title Bar
- Welcome Page
- And many more...

---

## The Build System

Erebus is built with **Style Dictionary**, using a token-based architecture:

```
tokens/
  base/         → Shared colors, accents, semantics
  themes/
    dark.json   → Dark-specific surfaces, text, components
    light.json  → Light-specific surfaces, text, components
  vscode/
    workbench.map.json  → VS Code workbench color mappings
    syntax.map.json     → Syntax highlighting mappings
```

This architecture ensures:

- **Single source of truth** for all color values
- **Consistent references** between components
- **Easy maintenance** when adjusting the palette
- **Deterministic builds** for Marketplace deployment

---

## Validation

The build system includes a validation script that:

1. Verifies all required VS Code keys are present
2. Ensures no default VS Code blue colors remain
3. Confirms dark theme avoids pure black on large surfaces
4. Confirms light theme avoids pure white on large surfaces

If validation fails, the build fails. Quality is not optional.

---

## The Erebus Bar

Build it like a product:

- **Cohesive surfaces** — every layer relates to the others
- **Restrained accents** — color serves purpose, not decoration
- **Elevation is felt, not shouted** — subtle depth creates hierarchy
- **Both modes equally intentional** — no "also light" afterthought

If it feels "high contrast" or "sharp":

- Too much black (use grey)
- Too much white (use paper)
- Too saturated accents (desaturate against surface)

Fix with greys and overlays. Always.

---

_Erebus: Where shadows have texture and light remembers the night._
