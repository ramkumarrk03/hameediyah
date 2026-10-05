# Design Rationale — Hameediyah

One line per decision, logged as we build. This is expanded into the full brand, UX and motion rationale at the end.

## Type
- **Fraunces (display)** with SOFT and WONK axes on: its soft, slightly irregular serifs read like hand-painted shop signs and old printed menus, not a digital product.
- **Literata (body):** a book serif built for long reading. It keeps the story warm without sacrificing legibility at 17 px.
- **Oswald (signage labels)** for "Est. 1907" and "164A" only: condensed caps, like stencilled shophouse lettering. It is never used for body copy.
- **Noto Serif Tamil** for single words such as கந்தர் (kandar), honouring the founder's Tamil roots. English always appears alongside.

## Colour
- The palette comes from the brief: turmeric, deep saffron, roasted cinnamon, brass, rice paper, kandar ink and a rare curry-leaf green.
- Body text is kandar ink `#24140C` on rice paper `#F5ECD9`, never pure black on white: warmer, and still well above AA.
- Turmeric and brass are reserved for display sizes and ornaments, because they fail AA as small text on paper.
- Added `saffron-deep #A8460F`, a darker saffron that passes AA for small signage labels on paper.

## Texture
- Paper grain is an inline SVG `feTurbulence` tile: zero network requests, and nothing on the page is flat.
- Archival photos get a deckled-edge mask and a sepia duotone, like prints in a family album.

## Motion
- Two eases only: `steam` (slow ease-out, for reveals) and `pour` (weighted in-out, for liquids and the boat). No springs, no snaps.
- Every sequence has a reduced-motion state that shows its finished frame rather than nothing.
