# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Erebus is a VS Code color theme extension with two variants:
- **Erebus Dark**: Depth through grey, not black. Elevation through lightness.
- **Erebus Light**: Paper-bright ash. Inked contrast without sterility.

Built with Style Dictionary for token-based maintainability.

## Build Commands

```bash
npm install          # Install dependencies
npm run build        # Build themes + validation
npm run dev          # Watch mode (rebuild on token changes)
npm run format       # Format code with Prettier
```

## Architecture

### Token System
```
tokens/
  base/
    core.json        # Brand accents (magenta #e20074, teal #05f2af), semantic colors
    states.json      # Hover/focus/active states, shadows
  themes/
    dark.json        # Dark surface ladder (0-5), text hierarchy, component colors
    light.json       # Light surface ladder (0-5), text hierarchy, component colors
  vscode/
    workbench.map.json   # Maps tokens to VS Code workbench colors
    syntax.map.json      # Maps tokens to syntax highlighting scopes
```

### Build System
```
build/
  style-dictionary.config.mjs   # Main build orchestrator
  formats/
    vscodeTheme.mjs             # Custom formatter for VS Code theme JSON
```

### Output
```
dist/
  Erebus Dark-color-theme.json   # Final dark theme (733 color keys)
  Erebus Light-color-theme.json  # Final light theme (733 color keys)
```

### Validation
`scripts/validate-theme.mjs` verifies:
- All required VS Code keys present
- No default VS Code blue colors
- No pure black on dark surfaces
- Theme metadata integrity

## Key Design Tokens

### Surface Ladder (Dark)
- `surface.0`: `#0d0d0f` - editor canvas
- `surface.1`: `#141416` - sidebars, panels
- `surface.2`: `#1a1a1c` - activity bar, tabs
- `surface.3`: `#222225` - dropdowns, tooltips
- `surface.4`: `#2a2a2d` - modals, command palette

### Surface Ladder (Light)
- `surface.0`: `#fafafa` - editor canvas
- `surface.1`: `#f5f5f5` - sidebars, panels
- `surface.2`: `#eeeeee` - activity bar, tabs
- `surface.3`: `#e8e8e8` - dropdowns, inputs
- `surface.4`: `#e0e0e0` - modals, overlays

### Accent Colors
- `accent.magenta`: `#e20074` - keywords, errors, badges, buttons
- `accent.teal`: `#05f2af` (dark) / `#0a8f6e` (light) - strings, selections, links

## Reference

See [ART.md](ART.md) for complete color theory documentation.
See [BUILD.md](BUILD.md) for original design specification.
