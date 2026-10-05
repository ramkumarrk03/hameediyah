# HAMEEDIYAH — Project Source of Truth

> Read this file fully before doing anything in this repo. It holds the context, constraints and quality bar. If a request conflicts with this file, flag it before acting.

---

## 0. TL;DR

- We are building a **sensory, story-driven website for Hameediyah Restaurant**, Malaysia's oldest nasi kandar restaurant, established in 1907 on Lebuh Campbell, George Town, Penang.
- It is an entry in Jungroo AI Labs' internal design challenge and may be pitched to the real restaurant, so treat it as a **high-stakes client pitch**.
- **Hard deadline: Tuesday, 6 Oct 2026, 10:00 AM IST.** Go deep on a few signature moments rather than wide on many pages.
- The story spine is **"From a shoulder pole to a legend"**: a spice merchant's voyage from Tamil Nadu to Penang, rice and curry carried on a bamboo *kandar*, a stall under a tree, and a shophouse that has stood for more than a century.
- Live URL: **https://hameediyah.vercel.app** (Vercel auto-deploys on push to main).

---

## 1. The challenge

### The brief (from the challenge PDF)
- Hameediyah began in 1907 and is Malaysia's oldest surviving nasi kandar institution, run by the same family across generations.
- Its founder was a Tamil Muslim spice merchant from Tamil Nadu (Chennai / Ramanathapuram region) who landed at Penang's Weld Quay docks with a mastery of roasted whole spices.
- He and his sons cooked rice and curries and carried them on bamboo shoulder poles (*kandar*), selling to dockers and merchants under a tree on Campbell Street. That stall became the restaurant at **164A Lebuh Campbell**.
- **Design focus:**
  - A sensory cultural journey: the Chennai → Penang voyage, spice-roasting rituals, and signature dishes (Murtabak, Ayam Bawang, Mutton Kurma, Crab Curry)
  - Warm heritage tones: turmeric, deep saffron, roasted cinnamon, brass
  - Tactile typography, historical photos, and an **interactive digital menu**
- **Avoid:** a food-delivery grid (Swiggy/Zomato style) or a generic café template.

### Rubric
| Criterion | Weight |
|---|---|
| Creative concept & storytelling | 25% |
| Visual design & typography | 25% |
| Micro-interactions & motion | 25% |
| Frontend polish & responsiveness | 15% |
| Design justification | 10% |

### Deliverables from this repo
1. `docs/WIREFRAMES.md`: layout flow and user journey notes
2. The live, fully responsive site
3. `docs/RATIONALE.md`: brand strategy (type, theme, colour), UX and motion choices, and client pitch value
4. A public repo, or one shared with the reviewer, before submission

---

## 2. Decisions already made

- Build it as **the actual website**. No "concept redesign" disclaimer.
- Internal use only, so **real photos are allowed** (restaurant, food, archival). Store them locally in `/public`; never hotlink.
- Add `<meta name="robots" content="noindex, nofollow">`.
- Frontend only. The menu, plate builder and reservation form use mock data. Nothing is submitted.
- **Where sources conflict, the challenge brief wins** for story elements (founder, generations). Keep wording careful (see Section 3).

---

## 3. Brand facts

### Verified (multiple sources)
- Established **1907**, widely recognised as **Malaysia's oldest nasi kandar restaurant**.
- Began as a stall **under a tree on Lebuh Campbell** and grew into the shophouse restaurant.
- Original outlet: **164A Lebuh Campbell, 10100 George Town, Penang** (some listings give "164A & 166"). Tel: **+604-261 1095**.
- On **Campbell Street, inside George Town's UNESCO World Heritage area**.
- **Family-owned** across generations. It survived both world wars, and the original shop survived WWII bombing.
- The original shop was restored in line with Penang's heritage building rules. A second outlet, Hameediyah Tandoori House, opened two doors away.
- Branches have since opened beyond Penang, including Kota Damansara, Bukit Mertajam and Kuala Lumpur.
- Nasi kandar ritual: choose rice (white or biryani), pick your *lauk* (dishes) at the counter, then the server pours mixed curries (*kuah campur*) over the plate. Hameediyah offers 20–30+ dishes.
- Murtabak fillings: chicken, beef, mutton, vegetable and prawn.

### Signature dishes (real names to use)
| Dish | Notes |
|---|---|
| **Murtabak** | Pan-fried stuffed roti; Ayam, Daging, Kambing, Sayur, Udang. The house's most famous item. |
| **Ayam Bawang** | Fried chicken smothered in caramelised and crispy onions. A signature. |
| **Ayam Kapitan** | Signature chicken curry |
| **Kambing Mysore** | Rich, dry-spiced mutton |
| **Daging Rendang Hameediyah** | House beef rendang |
| **Nasi Biryani** | Ayam, Ayam Kampung, Ayam Madu, Ayam Kapitan |
| **Kari Kepala Ikan** | Fish head curry |
| Mutton Kurma, Crab Curry | From the brief. Keep them, but describe them generally (no invented specifics). |
| Sides | Roti canai, naan, dalcha, papadam, sambal sotong, bendi (okra), telur rebus |

### Conflicting or unverified — handle with care
- **Founder's name:** the brief says *M. Mohamed Thamby Rawther*. Other sources name *Nalla Kader*, *Kader Mydin*, or *Abdul Ghani*. Use the brief's name in the story, and keep the copy about "the founder" where possible.
- **Generations:** the brief says 7. Older articles (2014) say 4. Use "generations of one family" in headings, and "seven generations" only in one place, as given in the brief.
- **Opening hours:** a 2010 source lists 11 am–10:30 pm, closed Fridays. Show these with a small "please check before visiting" note.
- **Prices:** public prices are outdated and vary by branch. **Do not show prices** on the menu. That also keeps it from looking like a delivery app.
- **Never invent:** quotes from family members, awards, celebrity visits, customer counts, recipe secrets, or exact spice blends. Present spices generally (for example cumin, fennel, cinnamon, star anise, cardamom, cloves, fenugreek, dried chillies) as *typical of nasi kandar cooking*, not as Hameediyah's recipe.

---

## 4. Creative direction

### Core idea
**The website is the kandar's journey.** Scrolling is travelling: across the Bay of Bengal, up from Weld Quay, under the tree on Campbell Street, through the shophouse door, and onto your plate.

It should feel like opening an heirloom spice tin: warm, textured, aromatic, handmade. **The opposite of an app.**

### Visual language
- **Materials:** aged paper, cloth-bound ledgers, brass, a turmeric-stained wooden counter, banana leaf, enamel plates, hand-painted shophouse signage.
- **Texture everywhere:** subtle paper grain, letterpress impressions, spice-dust particles. Nothing flat.
- **Line art:** hand-drawn ink maps, botanical spice illustrations, the shophouse facade drawn as an architectural elevation.
- **Archival photography:** sepia and duotone treatment in the brand colours, with torn or deckled edges and photo-corner mounts like a family album.

### Palette (from the brief, refined)
| Role | Colour | Use |
|---|---|---|
| Turmeric | `#E0A526` | Primary warmth, highlights |
| Deep saffron | `#D9641E` | Accents, active states |
| Roasted cinnamon | `#6B3A1E` | Headings, deep surfaces |
| Brass | `#B08D57` | Rules, frames, ornaments, icons |
| Rice paper | `#F5ECD9` | Main background |
| Kandar ink | `#24140C` | Body text (not pure black) |
| Curry-leaf green | `#3F5A2C` | Rare accent only |

- One dark, evening section ("the shop at night") can invert onto cinnamon and ink.
- Keep WCAG AA contrast for text. Turmeric and brass are for display text and ornaments, not body copy.

### Typography (starting proposal)
- **Display:** a characterful serif with warmth and ink-trap texture, such as **Fraunces** (soft, wonky optical sizes), evoking old shop signs and printed menus.
- **Signage accent:** a condensed, hand-painted-signage feel for labels like "Est. 1907" and "164A".
- **Body:** a readable book serif, such as **Literata** or **Source Serif 4**.
- **Tamil accent:** **Noto Serif Tamil** for single words such as கந்தர் (kandar), honouring the founder's roots. Use it decoratively, always with English alongside.
- Do not use Inter, Poppins, Montserrat, or any app-style sans as the primary face.

### Motion language: slow, warm, handmade
- Ease-out curves with weight, like steam rising, curry pouring, or a page turning.
- Ink-draw reveals: maps and illustrations draw themselves line by line.
- Particles of spice dust and steam, kept gentle and few.
- No bouncy springs, no fast snaps, no app-like slide-ins.

---

## 5. Signature interactions (go deep on these)

1. **The Voyage (scroll story).** A hand-drawn ink map. As you scroll, a small boat sails from the Coromandel coast across the Bay of Bengal to Penang's Weld Quay. Dates and short story lines appear along the route. It ends with the map zooming into Campbell Street and the tree.
2. **The Kandar (hero or section transition).** An illustrated bamboo shoulder pole with two pots that sways gently with scroll or cursor. The pots open to release steam and reveal the next chapter. This is the brand's literal origin, made tactile.
3. **The Spice Ritual.** Whole spices sit on a dark iron pan. Hovering, dragging or tapping "roasts" them: they darken, shimmer, and release smoke particles while the background warms from turmeric to cinnamon. Each spice shows its name and its role in nasi kandar cooking.
4. **Build Your Plate (the interactive menu).** This replaces any grid. It recreates the counter ritual:
   - choose rice (white or biryani)
   - pick *lauk* from a counter of illustrated dishes
   - choose how much gravy to pour (from light drizzle to *banjir*, "flooded")
   - watch the curries pour and mix on an enamel plate
   - end with "Your plate, the 1907 way", plus a "Visit us" link
   - each dish opens a story card: name, what it is, and why it matters
5. **Then & Now.** A drag slider comparing an archival photo of the shophouse or street with a present-day photo.

Recommended core three: **The Voyage, Build Your Plate, and Then & Now.** Add The Spice Ritual if time allows.

---

## 6. Site structure (keep it small)

- `/`: the story, told as one continuous scroll:
  1. **Hero:** "Since 1907", the kandar, steam, the 164A facade
  2. **The Voyage:** Tamil Nadu → Penang
  3. **The Tree:** the shoulder-pole stall under the tree on Campbell Street, with archival photos
  4. **The Spice Ritual**
  5. **Signatures:** Murtabak, Ayam Bawang, Kambing Mysore, Ayam Kapitan and more, each as an editorial spread, not a card
  6. **The Shophouse:** Then & Now, surviving two world wars, the UNESCO heritage street
  7. **Generations:** one family since 1907
  8. **Visit:** address, map, hours, branches
- `/menu`: Build Your Plate, plus a full menu presented like a printed heritage menu card (categories: Nasi Kandar, Murtabak, Biryani, Roti & Breads, Sides). No prices, no cart.
- `/visit` (optional): Campbell Street original, branches, how to find it, and a mock table-booking form with a crafted success state.

Priority: **Home story → Build Your Plate → Visit.**

---

## 7. Do not

- Food-delivery patterns: product grids, "Add to cart", ratings stars, discount badges, filter chips, price tags
- A generic café template: a full-bleed stock photo hero with a centred script font and a "Book a table" button
- Stock photos of non-Penang food or generic "Indian restaurant" imagery
- Cliché or orientalist decoration: mandala clip art, generic "ethnic" borders, curry-emoji icons
- Icon grids, carousels of reviews, or SaaS-style feature cards
- Lorem ipsum or empty copy like "authentic flavours you'll love". Copy must be specific and evocative.
- Invented facts (see Section 3)

---

## 8. Assets

- **Archival photos:** from the challenge's reference links (the Penang heritage archive post, the NST feature, archival video stills) and Hameediyah's own channels. Save them to `/public/images/archive/`.
- **Food and restaurant photos:** from Hameediyah's own social pages and listings. Save them to `/public/images/food/` and `/public/images/shop/`.
- **Original SVG:** the voyage map, kandar, spices, shophouse elevation and plate-builder dishes.
- **Textures:** paper grain and noise as small tiled images or CSS/SVG filters.
- Optimise everything: WebP or AVIF, explicit sizes, lazy-load below the fold.
- Keep `docs/CREDITS.md` with the source of every image.

---

## 9. Tech and quality bar

### Stack
- **Next.js (App Router) + TypeScript + Tailwind CSS**
- **Framer Motion** for component motion (plate builder, cards, steam)
- **GSAP + ScrollTrigger** for The Voyage and other pinned scroll sequences
- **Inline SVG** for anything that draws or animates; canvas for particles if needed
- `next/font` for fonts and `next/image` for images
- Mock data in `/src/data` (`dishes.ts`, `spices.ts`, `timeline.ts`, `branches.ts`)

### Non-negotiables
- **Responsive at 360, 390, 768, 1024, 1280 and 1440 px.** On mobile, The Voyage becomes a vertical journey and Build Your Plate works with taps.
- **`prefers-reduced-motion`:** a static, beautiful version of every sequence. Maps appear fully drawn and the curry appears already poured.
- **Accessibility:** AA contrast, semantic HTML, keyboard-operable plate builder and slider, alt text, visible focus.
- **Performance:** Lighthouse mobile 90+, no layout shift, animations paused off-screen.
- **Zero broken elements:** no dead links, no console errors.

### Structure
```
/docs        WIREFRAMES.md, RATIONALE.md, CREDITS.md
/public/images/{archive,food,shop,textures}
/src/app     routes
/src/components   Voyage, Kandar, SpiceRitual, PlateBuilder, ThenNow, ...
/src/data    dishes.ts, spices.ts, timeline.ts, branches.ts
/src/lib     motion presets, utils
```

---

## 10. How to work (instructions for Claude Code)

1. Read this file first in every session.
2. Propose the layout and motion idea briefly before building each signature section, and wait for approval.
3. Build the signature interactions first, then the surrounding sections.
4. Log a one-line reason for each design decision in `docs/RATIONALE.md` as you go.
5. Use only the facts in Section 3. Label anything uncertain.
6. Report briefly after each stage: what's done, what's left, any risks.

---

## 11. Definition of done

- [ ] Home tells the 1907 story end to end, with The Voyage working on desktop and mobile
- [ ] Build Your Plate works fully, including gravy pour, dish story cards and the final plate
- [ ] Then & Now slider uses real archival and present-day photos
- [ ] The menu reads as a heritage menu card, not a delivery grid
- [ ] Visit section has correct address, phone, map, hours (with a check note) and branches
- [ ] Reduced-motion version is verified
- [ ] Tested at every breakpoint on a real phone; no horizontal scroll
- [ ] No console errors or broken links; Lighthouse mobile 90+
- [ ] `noindex` meta present
- [ ] `docs/WIREFRAMES.md`, `docs/RATIONALE.md` and `docs/CREDITS.md` complete
- [ ] Opens publicly in incognito at https://hameediyah.vercel.app
- [ ] Repo is public or shared with the reviewer

---

## 12. Sources
- Challenge PDF brief and reference links (archival video, NST feature, Penang heritage archive post)
- penang.fandom.com (Campbell Street)
- penang-traveltips.com (Hameediyah Restaurant)
- what2seeonline.com (NST article, 2010: address, phone, hours)
- roadtrippers.asia (164-A address, WWII survival, branches)
- mytrip.my (address, menu items)
- sethlui.com (Ayam Bawang, Murtabak)
- Tripadvisor (Hameediyah Multi Concept: signature dishes list)
- Wikipedia (Nasi kandar)
