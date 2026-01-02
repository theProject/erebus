# Erebus Theme

> *"The pain and darkness of love that will never be. A brush that paints with sadness at its flow."*

A VS Code theme born from shadow and ash. Depth through elevation, restraint through intention.

## Installation

1. Install [Visual Studio Code](https://code.visualstudio.com/)
2. Launch Visual Studio Code
3. Choose **Extensions** from menu
4. Search for `Erebus`
5. Click **Install**
6. From the menu bar: Code > Preferences > Color Theme > **Erebus Dark** or **Erebus Light**

## The Themes

### Erebus Dark
Primordial shadow with depth through grey, not black. Surfaces breathe, accents signal.

- **Editor background**: `#0d0d0f` — near-black grey, never pure black
- **Magenta accent**: `#e20074` — keywords, errors, power
- **Teal accent**: `#05f2af` — strings, selections, clarity

### Erebus Light
The ash after the night. Paper-bright but never blinding, inked contrast without sterility.

- **Editor background**: `#fafafa` — warm paper white
- **Magenta accent**: `#e20074` — consistent brand identity
- **Teal accent**: `#0a8f6e` — deeper for light surface visibility

## Design Philosophy

- **Grey, not black**: Large surfaces use deep tonal greys for depth without strain
- **Elevation through lightness**: Higher surfaces are subtly lighter (dark) or more defined (light)
- **Restrained accents**: Colors serve purpose, not decoration
- **Complete coverage**: Every VS Code theme color key is intentionally styled

See [ART.md](ART.md) for the complete color theory and design documentation.

## Recommended Settings

The theme includes recommended font defaults:

```json
{
  "editor.fontFamily": "\"Monaspace Neon\", \"Geist Mono\", \"Geist\", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace",
  "editor.fontLigatures": true
}
```

## Building from Source

```bash
# Install dependencies
npm install

# Build themes
npm run build

# The themes will be in dist/
```

## Token Architecture

Built with [Style Dictionary](https://styledictionary.com) for maintainability:

```
tokens/
  base/           # Shared accents, semantics
  themes/
    dark.json     # Dark surface ladder, text
    light.json    # Light surface ladder, text
  vscode/
    workbench.map.json  # VS Code UI mappings
    syntax.map.json     # Syntax highlighting
```

## Contributing

Issues and pull requests welcome. Please read [ART.md](ART.md) to understand the design philosophy before proposing changes.

## License

MIT

---

*Erebus: Where shadows have texture and light remembers the night.*
