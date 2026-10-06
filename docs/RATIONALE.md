# Design & Strategy Rationale: Hameediyah

Hameediyah has been serving nasi kandar from Lebuh Campbell since 1907. Most restaurant websites tell visitors a place is old. This one lets them follow the journey: a spice merchant sails from Tamil Nadu, his sons carry rice and curry on a bamboo shoulder pole, the pots are set down under a tree, and the stall becomes the shophouse at 164A. The concept is **"From a shoulder pole to a legend"**, and scrolling the page retraces that journey.

---

## 1. Brand Strategy

### The idea behind the look

The site should feel like opening an heirloom spice tin: warm, textured and handmade. Hameediyah's value is its age, its family and its ritual, so the design borrows from the physical world of 1907 George Town: printed menus, painted shop signs, brass pots, family photo albums and the arches of the five-foot way. It deliberately avoids looking like a food-delivery app. Nothing on the page is a product grid, a price tag or an "add to cart" button.

### Typography

| Role | Typeface | Why |
|---|---|---|
| Headlines | **Fraunces** (soft, slightly irregular optical sizes) | Its warm, inky serifs recall hand-painted shophouse signboards and old printed menus. It has character without being costume-like. |
| Body text | **Literata** | A book serif made for long reading. The story is the product here, so it has to be comfortable to read on a phone. |
| Labels and signage | **Oswald** (condensed capitals) | Used sparingly for "Est. 1907", "164A" and section labels, like stencilled lettering on a signboard. It is never used for paragraphs. |
| Tamil accent | **Noto Serif Tamil** | Single words such as கந்தர் (*kandar*) honour the founder's Tamil Nadu roots. An English translation always sits alongside, so the Tamil adds meaning without becoming a barrier. |

The pairing is serif-led on purpose. App-style sans-serifs such as Inter or Poppins would make a 119-year-old institution look like a start-up.

### Colour

| Colour | Hex | Role | Why |
|---|---|---|---|
| Turmeric | `#E0A526` | Highlights, glow | The base of every curry on the counter, and the colour of the shop's own signboard. |
| Deep saffron | `#D9641E` / `#A8460F` | Accents, links, active states | Heat and appetite. The darker shade passes contrast checks for small text. |
| Roasted cinnamon | `#6B3A1E` | Headlines, buttons | Warm and grounded, like roasted spice and old wood. It gives authority without the harshness of black. |
| Brass | `#B08D57` | Rules, frames, ornaments | The brass of the kandar pots, used for borders and detail, never for body text. |
| Rice paper | `#F5ECD9` | Page background | An aged-paper surface that reads as a printed menu or ledger rather than a screen. |
| Kandar ink | `#24140C` | Body text | A deep brown-black. It is softer than pure black and still well above WCAG AA contrast on paper. |
| Curry-leaf green | `#3F5A2C` | Rare accent | Used only in small amounts (the sarong, the tree, curry leaves) so the palette stays warm. |

One section, the family timeline, flips to a dark cinnamon-and-ink palette: "the shop at night". It marks a change of chapter and gives the long scroll a rhythm.

Turmeric and brass fail contrast at small sizes, so they are kept to headings and ornaments. All body text meets WCAG AA.

### Visual theme

- **Texture everywhere.** A fine paper grain sits under every section. Archival photos get deckled edges and a sepia tone, like prints in a family album.
- **Architecture as a frame.** Food photos sit in arch-topped frames that echo the five-foot-way arches of the Campbell Street shophouses.
- **Original illustration.** The street scene, the kandar seller, the counter's dishes and the spice pan are drawn for this project in the brand palette. The shophouse row includes Hameediyah's real yellow-and-green front, signed 164A.
- **Real places and real food.** The map is real geography. The shop-front and food photographs show Hameediyah itself: the queue on Campbell Street, the murtabak on the griddle, the Ayam Bawang on the plate.

---

## 2. UX & Motion

### Motion principles

All motion is **slow, warm and weighted**, like steam rising or curry being poured. There are two easing curves: a long ease-out for things appearing, and a heavier ease-in-out for things that pour or travel. There are no bouncy springs and no fast snaps. Every animation does one of two jobs: it tells the story, or it confirms a visitor's action. Nothing moves just for decoration.

### The signature moments, and why each exists

**The living street (hero).** The first screen shows a kandar seller walking through George Town with the pole on his shoulder. His brass pots swing a beat behind his steps and steam trails from them, while shophouses, gas lamps and passers-by slide past. The headline sits over a paper wash on the left. *Why:* it explains the restaurant's name and origin before a word is read. "Carried since 1907" is shown before it is stated.

**The Voyage (real map).** Scrolling sails a boat on a real map from the Coromandel coast, across the Bay of Bengal and down the Strait of Malacca. The camera then tilts into George Town, and a dotted path walks up the real Lebuh Campbell to a pin on 164A. Four numbered stops tell the story. *Why:* it turns history into geography. Ending on the actual street is the strongest proof of "same family, same address since 1907". The journey only moves forward, so scrolling back up never rewinds it. Once finished, the section shrinks to one screen and stops holding the reader.

**The Spice Ritual.** Whole spices sit on an iron pan. Hovering or tapping "roasts" each one: it darkens and smokes, and the room's glow warms as more are roasted, while a card explains each spice's role. *Why:* it makes the founder's craft, roasting whole spices, tactile and memorable. The copy is careful to say these spices are typical of nasi kandar cooking, not the house recipe.

**Build Your Plate (the interactive menu).** Instead of a grid, the menu recreates the counter ritual in four steps: choose rice, tap trays of lauk on a wooden counter, choose how much gravy (from *kering*, dry, to *banjir*, flooded), then see "Your plate, the 1907 way". The curry pours from a ladle and spreads around the rice. Every dish opens a short story card. *Why:* first-time visitors are often unsure how nasi kandar is ordered. This teaches the ritual through play, so they arrive at 164A knowing what to ask for.

**Then & Now.** A draggable slider compares 1950s kandar sellers with their poles and the Hameediyah shop front today. *Why:* one gesture shows more than a century of continuity. It works with a mouse, a finger or the arrow keys.

**Signatures.** Each dish is an editorial spread, not a card: a large number, the dish name, a short story and a real photo in an arch frame that zooms slowly on hover. *Why:* it gives each signature the weight of a magazine feature, and the real photos create appetite.

**Small interactions that help customers act**
- **Open-now badge:** shows "Open now" or "Opens at 11 am", worked out in Penang time, always beside a "please call ahead" note.
- **Mobile action bar:** on phones, a bar with Call, Directions and Menu appears once the visitor scrolls past the hero.
- **Hold a table:** a calm pop-up instead of a form that fills the page. Most people walk in, so the form appears only for groups who want it.
- **Scroll reveals:** text settles in gently as it enters the screen, like ink on paper. It is built so content can never stay hidden if a script fails.

### Usability, accessibility and performance

- **Responsive:** checked at 360, 390, 768, 1024 and 1440 px, with no sideways scrolling. Tap targets are at least 40–44 px and labels at least 12 px.
- **Reduced motion:** visitors who prefer reduced motion get a still version of every sequence. The street is frozen, the map shows the finished journey, and the curry appears already poured.
- **Keyboard and screen readers:** the plate builder, the slider, the spice pan, the voyage stops and the dialogs all work with a keyboard. Images have descriptive alt text, and focus is clearly visible.
- **Performance:** the street scene uses only lightweight drawings and CSS animation, and pauses when off-screen. The map library loads only when the reader approaches it. Photos are compressed WebP.

---

## 3. Client Pitch Value

### Commanding authority

- **Heritage shown, not claimed.** Many places call themselves authentic. Hameediyah can prove it: a voyage on a real map, the real street, and a family timeline through two world wars. The site turns "Malaysia's oldest nasi kandar" from a tagline into evidence.
- **A premium, considered presence.** The editorial typography, original illustration and restrained palette put Hameediyah closer to a heritage brand or museum than to the delivery-app listings it usually appears among. That supports its position as *the* original, not one option among many.
- **Accuracy as trust.** The site only states verified facts. Where sources disagree (the founder's name, opening hours, the number of generations), the copy stays careful and says so. Uncertain hours carry a "please call ahead" note. For a brand built on authenticity, a single invented claim would cost more than it gains.

### Winning more business

- **Turns curiosity into a visit.** Every chapter ends with a clear next step: build a plate, find the shop, call, or get directions. On phones, Call, Directions and Menu stay one tap away.
- **Lowers the barrier for newcomers.** Tourists and first-timers often hesitate at a nasi kandar counter. The "How to eat nasi kandar" guide and Build Your Plate teach the ritual in advance, so they walk in confident.
- **Sells the experience, not the price.** With no prices or cart, visitors meet the food through its story and photographs, not a price comparison. That favours a heritage restaurant over cheaper rivals.
- **Reaches heritage tourists.** George Town's UNESCO status brings visitors looking for the "real" Penang. A story-led, map-driven site is the kind of link travel writers and guides like to share.
- **Supports groups and events.** The table request gives families and groups a way in without slowing down the walk-in counter.
- **Ready to grow with the brand.** The structure already lists the branches (Tandoori House, Bukit Mertajam, Kota Damansara, Kuala Lumpur). The illustrations, map and photos can be reused for social media, menus and signage, which gives Hameediyah one consistent identity across every touchpoint.

### In one line

> The site does what Hameediyah has done for more than a century: it carries people from the dock to the counter and shows them the story in every plate.
