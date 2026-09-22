# Whisp — Selling the Depth

A plan for the thing the site doesn't currently convey: that a single reflection can make
someone cry, and that there is staggering depth behind every symbol.

---

## 1. The reframe

The site currently sells **memory**: *"Whisp remembers what you don't — and shows you what it
adds up to."* Every major section supports it — the tension beat ("the moment passes"), the
pattern demo, the ChatGPT comparison in the FAQ.

That's a good claim and it's true. But it's a **utility** claim, and it isn't what makes people
cry.

What makes them cry is **being seen accurately**. Not "it remembered," but *"it said something
about me I haven't told anyone."*

For this audience specifically, that second claim converts far harder — and you have direct
evidence for it that the site doesn't use anywhere.

### Who actually buys this

People who notice signs share a profile worth designing against:

- **Quietly embarrassed about it.** The site's validation beat already nails this — *"You've
  never told anyone how often this actually happens."* Best line on the page.
- **Burned by generic horoscope apps.** They've used Co-Star, The Pattern, daily-horoscope
  widgets. They can smell a template at fifty paces, and they're braced for one.
- **Moved intensely by specificity.** The thing that breaks through the skepticism isn't
  beauty or breadth — it's a detail so precise it couldn't have been written for anyone else.

**So the lever is specificity as proof of sincerity.** Not "fourteen interpretive layers." The
promise is: *it will say something about you that you haven't told anyone.*

Everything below serves that.

---

## 2. The biggest finding: you have three free-reading funnels and none of them are reachable

| Page | Lines | What it does | Inbound links |
|---|---|---|---|
| `/discover` | 1,007 | Quiz → a real personalised reading. *"A few quick questions, then a real reading — not a template."* | **none** |
| `/patterns` | 843 | *"Tell Whisp a few things you've noticed over time… see the real thread between them, free."* | **none** |
| `/reading` | 354 | Free reading delivered by email | **none** |

That's roughly **2,200 lines of conversion machinery with zero inbound links.** Not in the nav
(Features / How It Works / About / Founder Pricing), not in the hero, not in the footer, not
from any section of the homepage.

This is the answer to "how do we illustrate the depth enticingly," and it's already built.

**Why it's the highest-leverage fix:**

- **Reciprocity.** A free, genuinely good reading creates obligation in a way no amount of copy
  does.
- **Endowment.** Once someone *has* a reading that landed, they own something. The app becomes
  where it lives.
- **It defeats skepticism structurally.** You cannot argue a reader out of "that's just a
  horoscope generator" with copy. You can by handing them something that lands.
- **Depth is experienced, not described.** This is the entire problem in one sentence, and an
  interactive reading is the only format that solves it.

### Do one thing first: pick ONE and promote it

Three competing free offers is worse than one. Choice paralysis suppresses conversion, and
three funnels also splits your analytics three ways so none of them reach significance.

**Recommend `/discover` as primary** — it's the most developed, it's interactive rather than
email-gated, and it delivers the artifact immediately rather than later. Email capture is a
second ask *after* the reading has landed, when the person actually wants it, not before.

Keep `/patterns` as a secondary entry point for people further down the page who've already
absorbed the pattern argument. Retire or fold in `/reading` — it's the weakest of the three and
its email-first gate is friction at the worst moment.

**Effort:** a nav link, a hero secondary CTA, one mid-page CTA. Hours, not weeks.

---

## 3. The second finding: zero emotional proof

There are **no testimonials anywhere on the site.**

You have users telling you they cried. In this category that is the single highest-converting
asset that exists, and it's sitting in your inbox.

**Rules for using it:**

- **Get explicit written permission.** Every time.
- **Attribute genuinely** — first name and initial at minimum. Anonymous testimonials read as
  invented, which is worse than none.
- **Never fabricate or composite.** This audience is skeptical by disposition, and a fabricated
  testimonial for a product about sincerity is the one unrecoverable mistake available to you.
- **Use the specific one over the flattering one.** *"It mentioned the thing about my mother
  and I had to put my phone down"* beats *"Amazing app, love it!"* by an order of magnitude.

**Placement:** not a testimonial wall. One or two, immediately after the new Anatomy section —
the reader has just felt the depth and the very next question forming in their head is *"is that
real, or is that marketing?"* Answer it in that exact moment.

---

## 4. The depth page: `/inside` (or similar)

Only after §2 and §3. The homepage Anatomy section is a taste; this is the full meal, for the
reader who wants to know exactly what they're getting before paying.

**The organising principle: show one complete reflection, unabridged.**

Not excerpts. Not a description of reflections. One real reading, at full length, beautifully
set. The length *is* the argument — a reader cannot skim 400 words of something written about a
person and still believe it's a template. Depth that is claimed reads as marketing; depth that
is demonstrated reads as proof.

**Proposed structure:**

1. **Open cold with the reflection itself.** No header, no setup, no "here's an example of what
   you get." Just the reading, in full, as the first thing on the page. Let them start reading
   before they've decided to.
2. **Then peel it back.** *"Here's what was underneath that."* The layers that produced it —
   shown as choices the reader could have made differently, not a feature list. This is where
   the fourteen lenses and nine traditions finally earn their mention, because by now the reader
   has felt what they produce.
3. **Then the compounding.** Day 1 versus month 3 of the same symbol, side by side. This is
   where memory-across-time and depth-per-symbol finally combine into one argument instead of
   competing.
4. **Then the proof.** Testimonials.
5. **Then the offer.** Into `/discover` — *"get one for yourself"* — not into pricing.

**Use the App Store assets** in `for-whisp/appstore-for-whisp/optimized/` — ten nebula-framed
screenshots, already on-brand and already sized. The homepage showcase carousel is using
narrower crops; these are better for a page about depth.

**Keep the nebula/navy discipline from the app.** Nebula for the reflection itself and the
emotional beats; plain navy for the anatomy, the layer explanations, the compounding comparison.
If the whole page is nebula, the reflection stops feeling special.

---

## 5. Sequencing

| | Work | Effort | Why this order |
|---|---|---|---|
| **1** | Link `/discover` — nav, hero secondary CTA, one mid-page CTA | Hours | Already built. Biggest gap between value and reachability on the entire site. |
| **2** | Homepage Anatomy section | **Done** — shipped in `index.astro` | Fixes the single-symbol concession on the page itself |
| **3** | Collect and place 2–3 real testimonials | Days (gated on permissions) | Answers the objection the Anatomy section creates |
| **4** | Decide the funnel question — promote `/discover`, keep `/patterns` secondary, retire `/reading` | Hours | Stop splitting traffic and analytics three ways |
| **5** | Build `/inside` | Week+ | The full argument, for readers who want it before paying |

---

## 6. What I'd measure

- `website_anatomy_section_viewed` (already instrumented) versus
  `website_demo_section_viewed` — which half of the differentiation argument holds attention
- Homepage → `/discover` click-through, and quiz completion rate
- Whether people who complete a reading download at a higher rate than those who don't. **This
  is the number that tells you whether the whole thesis is right.** If free-reading completers
  don't convert better, the depth argument isn't the bottleneck and this plan should be
  reconsidered rather than extended.

---

## 7. The one line

If the positioning needed compressing to a single promise, it isn't *"Whisp remembers what you
don't."*

It's closer to: **it will say something about you that you haven't told anyone.**

That's the claim the product can actually keep, it's the one that made people cry, and it's the
one no lookup, chatbot, or horoscope app can make.
