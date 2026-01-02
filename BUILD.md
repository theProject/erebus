````md
# BUILD.md — Erebus (Dark + Light) via Style Dictionary v5

> “The pain and darkness of love that will never be. A brush that paints with sadness at its flow.”

This is the **only build spec**. The agent must generate **two Marketplace-grade themes**:

- **Erebus Dark** (depth + elevation, grey-not-black)
- **Erebus Light** (paper-bright but restrained, inked contrast, same mythos)

Both themes are built from **design tokens** using **Style Dictionary v5**.

---

## 0) Hard Requirements (Non-Negotiable)

### A) Key coverage (MANDATORY)

Use Style Dictionary V5 APIs and patterns.
https://styledictionary.com/getting-started/installation/#nodejs

Theme **must** apply every modifiable VS Code UI key from:
https://code.visualstudio.com/api/references/theme-color

**Build must fail** if any key is missing from `colors` (excluding deprecated/unsupported keys).

### B) Dark theme principles (must be enforced)

- **Darken with grey, not just black**: large surfaces are deep tonal greys, not `#000`.
- **Depth via elevation**: higher elevation surfaces become slightly lighter (overlay/lift), not glow.
- **Limited accent**: accents only for signals.
- **Desaturation**: avoid saturated colors that vibrate against dark surfaces.
- **No default blue**: buttons/links/etc must never fall back to VS Code defaults.

### C) Accent mapping ( two brand colors, use other colors that work well with them as you need to)

- **Magenta** (`#e20074`) = power/danger/keywords/errors/high-attention
- **Teal** (`#05f2af`) = signal/selection/strings/active states

Agent may add secondary accents (warning/info) but must keep them restrained.

### D) Fonts via `configurationDefaults`

Themes cannot force fonts unless we ship defaults in `package.json`.
We must set:

- `editor.fontFamily`:
  `"Monaspace Neon", "Geist Mono", "Geist", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`
- `editor.fontLigatures`: `true`
- `terminal.integrated.fontFamily`: same list
  Do **not** override font size or line height.

---

## 1) Style Dictionary v5 Setup (Latest)

The twemplate you are startying in was from an older version of Style Dictionary - ensure you update it to v5 before doing naything else.

### Install

```bash
npm init -y
npm i -D style-dictionary@^5 prettier eslint
```
````

> v5 note: do not use v3/v4 APIs from older tutorials. Follow v5 config + formatter patterns.

---

## 2) Repo Structure (Two Themes)

```
erebus/
  package.json
  README.md
  BUILD.md
  tokens/
    base/
      core.json
      typography.json
      states.json
    themes/
      dark.json
      light.json
    vscode/
      workbench.map.json
      syntax.map.json
  build/
    style-dictionary.config.mjs
    formats/
      vscodeTheme.mjs
      vscodeDefaults.mjs
  dist/
    Erebus Dark-color-theme.json
    Erebus Light-color-theme.json
  scripts/
    validate-theme.mjs
    theme-keys.json
```

**Trash any template/demo code** not actively used.

---

## 3) Token System (Single Source of Truth)

### 3.1 Core tokens (base/core.json)

Define neutrals, text emphasis, stroke, accents, semantic colors.

- Accents:

  - `accent.magenta`: `#e20074`
  - `accent.teal`: `#05f2af`

- Text emphasis (Material-ish):

  - `text.high`
  - `text.medium`
  - `text.disabled`
  - `text.comment`

### 3.2 Theme-specific surface ladders

We need **two surface ladders** (dark + light), each with 4–6 elevation steps.

#### Dark surfaces (dark.json)

- `surface.0` = editor canvas (near-black allowed)
- `surface.1`–`surface.4` = UI shells / panels / overlays
- Strokes: subtle and strong
- Overlays: alpha steps (hover/focus/pressed)

#### Light surfaces (light.json)

Light theme must be equally intentional:

- Avoid pure white slabs everywhere; use soft paper whites + greys for depth
- Use subtle elevation (slightly darker surface for recessed areas, slightly lighter for raised surfaces)
- Preserve limited accent use
- Ensure “on” colors remain readable without looking like GitHub default

---

## 4) Mapping to VS Code Keys (MANDATORY FULL COVERAGE)

### 4.1 theme-keys.json

Check in a canonical list of VS Code theme keys at:
`scripts/theme-keys.json`

The agent must keep it current, but **do not fetch at build time** (Marketplace builds should be deterministic).

### 4.2 Validation script (fail build)

`scripts/validate-theme.mjs` must:

- Verify every key in `theme-keys.json` exists in generated `colors`
- Ensure no default UI blue remains by requiring:

  - `button.*`
  - `badge.*`
  - `notification.*`
  - `quickInput.*`
  - `editorSuggestWidget.*`
  - `list.*`
  - `menu.*`
  - `breadcrumb.*`
  - `minimap.*`
  - `progressBar.*`
  - and any other high-signal components

- For Dark: disallow `#000000` on large surfaces (permit only for micro-cuts/separators)
- For Light: disallow overly dark surfaces that collapse contrast (keep it airy but controlled)

---

## 5) Style Dictionary v5 Build Config (Two Outputs)

### build/style-dictionary.config.mjs

Must generate **two themes**:

- `dist/Erebus Dark-color-theme.json`
- `dist/Erebus Light-color-theme.json`

Approach:

- Use v5 to create two build “platforms” or run two builds:

  - `vscodeDark`
  - `vscodeLight`

Each build pulls:

- base tokens: `tokens/base/*.json`
- theme tokens: `tokens/themes/dark.json` or `light.json`
- mapping files: `tokens/vscode/*.map.json`

---

## 6) Formatter Requirements (v5)

### build/formats/vscodeTheme.mjs

A Style Dictionary v5 custom formatter outputs:

```jsonc
{
  "name": "Erebus Dark",
  "type": "dark",
  "colors": {
    /* ALL KEYS */
  },
  "tokenColors": [
    /* syntax scopes */
  ]
}
```

and similarly for Light:

```jsonc
{
  "name": "Erebus Light",
  "type": "light",
  "colors": {
    /* ALL KEYS */
  },
  "tokenColors": [
    /* syntax scopes */
  ]
}
```

No hardcoded colors inside formatter—**only tokens**.

---

## 7) Fonts + Defaults (package.json)

Add:

```json
"contributes": {
  "themes": [
    { "label": "Erebus Dark", "uiTheme": "vs-dark", "path": "./dist/Erebus Dark-color-theme.json" },
    { "label": "Erebus Light", "uiTheme": "vs", "path": "./dist/Erebus Light-color-theme.json" }
  ],
  "configurationDefaults": {
    "editor.fontFamily": "\"Monaspace Neon\", \"Geist Mono\", \"Geist\", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace",
    "editor.fontLigatures": true,
    "terminal.integrated.fontFamily": "\"Monaspace Neon\", \"Geist Mono\", \"Geist\", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace"
  }
}
```

---

## 8) Light Theme Design Direction (Equal Prestige)

### Light theme philosophy

Erebus Light is not “happy”. It’s the **ash after the night**:

- warm paper whites / cold marble greys
- “ink” text, minimal accent
- accents remain magenta/teal but used sparingly, softened if needed
- depth via surfaces, not drop shadows

### Light surface ladder (example direction)

- `surface.0` = `#fbfbfb` (paper)
- `surface.1` = `#f3f3f3` (shells)
- `surface.2` = `#ededed` (inputs)
- `surface.3` = `#e6e6e6` (overlays)
- strokes: `#d6d6d6` / `#cfcfcf`
- text: `#111111` / `#444444` / `#777777`

**No blinding whites** and no “white-on-white” collapse.

---

## 9) Build Commands (v5)

`package.json`:

```json
{
  "scripts": {
    "build": "style-dictionary build && node scripts/validate-theme.mjs",
    "dev": "style-dictionary build --watch",
    "format": "prettier -w ."
  }
}
```

Run:

```bash
npm run build
```

---

## 10) Testing Matrix (Both Themes)

### Must test:

- Command Palette / QuickPick
- Buttons / dialogs / notifications (no blue)
- Debug toolbars + status
- SCM decorations
- Search / find highlights
- Hover widgets
- Suggestions + IntelliSense widgets
- Peek view
- Terminal selection/cursor
- GitLens / common extensions (basic sanity)
- Markdown preview + JSON + TS/TSX

If any element shows default styling → missing keys → build must fail.

---

## 11) Deliverables (Must Produce)

- `dist/Erebus Dark-color-theme.json` (complete key coverage)
- `dist/Erebus Light-color-theme.json` (complete key coverage)
- `scripts/theme-keys.json`
- `scripts/validate-theme.mjs` (hard failing)
- No demo/template junk
- README + screenshots plan

---

## Final note (the “Erebus” bar)

Build it like a product:

- cohesive surfaces
- restrained accents
- elevation is felt, not shouted
- both modes equally intentional

If it feels “high contrast” or “sharp”:

- too much black
- too much white
- or too saturated accents
  Fix with greys + overlays.\

  The forked repo is here: https://github.com/dbanksdesign/nu-disco-vscode-theme - but we are not attempting to retain a single aspect of its style direction or implementation. We are starting fresh, this was simply a starting point for us to understand the process.

  This must be a unique experience, a masterpiece of dark and light UI design to be cherished by all who use it, as VSCode is part of so many new IDEs and editors. You must recap the process and be abl to speak to every color choice and color theory nehind it in a ART.md file oyu will create that can validate every VSCode token and designable possiblity was covered from here: https://code.visualstudio.com/api/references/theme-color - this is the only source of truth for this project.

  Last - be sensisible, both themes must excel at being the best dark and light themes for VSCode. We get there by not being wild, cfeating unreadable text and workflows - we get there by being subtle, but with a bold presence and a unique experience - that both dark and ight themes must of been created as factory applications with 300+ hours of work and testing to ensure the best possible experience for the user, by the worlds tech leaders.
