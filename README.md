# Noluthando Basi — Project showcase

A responsive GitHub Pages portfolio presenting ten programming and engineering projects.

## Featured coursework

[1-bit NAND ALU case study](projects/alu/README.md): a CPUT group project led by Noluthando Palesa Basi as the primary contributor. The public summary covers design evolution, verified hardware, build photographs, netlist verification and learning. [View on the website](https://zulubarbie.github.io/alu.html). ALU material is shared with rights reserved; see [its copyright notice](projects/alu/COPYRIGHT.md).

## Preview

Open `index.html` in a browser, or run `python -m http.server 4174 --bind 127.0.0.1` and visit http://127.0.0.1:4174. No dependencies or build step are required. JavaScript adds project filters, search, quick-look dialogs and a NAND-gate playground; all project content and links remain available without it.

## Edit

- `index.html`: project descriptions, public repository links, and profile links.
- `styles.css`: responsive layout, colours, and typography.
- `home.css`: homepage artwork and purple night palette.
- `interactive.css` and `interactive.js`: project illustrations, filtering, previews, motion and the logic playground. Project categories and illustration symbols follow the card order in `index.html`; update them when adding or reordering projects.

Descriptions reflect the linked repositories' documented scope. Repository links lead to source code and local setup instructions; they are not hosted app demos. Keep this public page free of private repository details and browser-local portfolio data.

## Publishing

GitHub Pages is configured to publish from the default branch. Merging a change to `main` can trigger publication at https://zulubarbie.github.io/. Preview and review pull requests before merging.

## Check before publishing

Open the page at desktop and mobile widths, navigate by keyboard, and verify the ten project links and profile links. The page works without JavaScript and respects reduced-motion preferences.
