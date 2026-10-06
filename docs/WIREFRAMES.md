# Wireframes & User Journey — Hameediyah

## Journey
Scrolling is travelling: the kandar arrives (hero), the merchant sails (Voyage), sets his pots down under a tree, roasts the spices, fills the counter (Signatures), the stall becomes a shophouse, the family keeps it, and the visitor is invited in (Visit). `/menu` is the counter itself.

## Home `/`
```
[Header: Hameediyah · Est. 1907 | Our story · Signatures · Menu · Visit | (Build your plate)]
1 HERO        | kicker · H1 "Rice & curry, carried since 1907." · intro | shophouse elevation
              | (Build your plate) (Find us at 164A)                       | kandar + steam (sways)
              | Since 1907 · Open 11–10:30 · Call                           |
  MARQUEE     ~ Murtabak ✦ Ayam Bawang ✦ Ayam Kapitan ✦ … ~
2 VOYAGE      | full-bleed real map (pinned, 560vh) · title top-left · story card + I–IV rail bottom-left
              | camera: Coromandel → follows boat across Bay of Bengal → Penang → tilts into Lebuh Campbell, pin on 164A
              | same layout on mobile (smaller zoom); reduced motion: static street view + story list
3 THE TREE    | album collage (1950s print + sketch + kandar note) | H2 + story + How to eat (01/02/03)
4 SPICES      | iron pan with 8 roastable spices | H2 + live spice card (dark, warms with roasting)
5 SIGNATURES  | centred H2 → 4 alternating spreads (art ⟷ text) → "Also on the counter" → (Build your plate)
6 SHOPHOUSE   | Then & Now drag slider | H2 + ledger facts (2 wars · 164A · UNESCO)
7 FAMILY      | sticky H2 + night shophouse | timeline 1907 → today (dark)
8 VISIT       | queue photo banner
              | address · directions · call · hours · map · branches | Hold-a-table form → success state
[Footer]
```

## Menu `/menu`
```
H1 Build your plate + intro + "skip to menu"
| plate (sticky; small sticky preview on mobile) | stepper 1 Rice · 2 Lauk · 3 Kuah · 4 Your plate
|                                                 | step panel (radio cards / counter trays / kuah slider / summary)
MARQUEE (dark)
MENU CARD: double brass rule · Nasi Kandar · Murtabak · Nasi Biryani · Roti & Breads · Sides (no prices)
```

## Breakpoints
360/390: single column, vertical voyage, sticky mini plate. 768: stacked voyage frame. 1024+: two-column spreads, pinned voyage, sticky plate.
