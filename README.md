# Whisp — getwhisp.app

Marketing website for Whisp, built with [Astro](https://astro.build) and deployed on Netlify.

## Stack
- **Framework:** Astro 4 (hybrid mode)
- **Adapter:** @astrojs/netlify
- **Hosting:** Netlify
- **Forms:** Netlify Forms (email capture)
- **Payments:** Stripe (via Netlify Functions — see `netlify/functions/create-checkout.js`)
- **Domain:** getwhisp.app (Namecheap → Netlify DNS)

---

## Local dev

```bash
npm install
npm run dev
# → http://localhost:4321
```

## Build

```bash
npm run build
npm run preview   # preview production build locally
```

---

## Deployment (GitHub → Netlify)

### 1. Create GitHub repo
```bash
git init
git add .
git commit -m "initial commit"
git remote add origin https://github.com/YOUR_USERNAME/whisp-web.git
git push -u origin main
```

### 2. Connect to Netlify
1. Log in at [app.netlify.com](https://app.netlify.com)
2. **Add new site → Import an existing project → GitHub**
3. Select your `whisp-web` repo
4. Build settings (auto-detected, but verify):
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Click **Deploy site**

### 3. Add custom domain
1. In Netlify: **Domain settings → Add custom domain → getwhisp.app**
2. In Namecheap: Go to your domain → **Nameservers → Custom DNS**
3. Add the nameservers Netlify gives you (looks like `dns1.p01.nsone.net` etc.)
4. Wait 10–30 min for propagation. Netlify handles SSL automatically.

---

## Email capture (Netlify Forms)
Forms are configured with `data-netlify="true"`. Submissions appear in:
**Netlify dashboard → Forms → waitlist**

You can also configure email notifications or Zapier/Make webhooks from there.

---

## Stripe payments setup
See `netlify/functions/create-checkout.js` for instructions. Steps:
1. Create a product + price in [Stripe Dashboard](https://dashboard.stripe.com)
2. Add `STRIPE_SECRET_KEY` and `STRIPE_PRICE_ID` to **Netlify → Environment variables**
3. Uncomment the function code in `create-checkout.js`
4. Update the pricing CTA button href in `src/pages/index.astro` to call the function

---

## Environment variables (Netlify)
| Key | Value |
|-----|-------|
| `STRIPE_SECRET_KEY` | `sk_live_...` (add when ready) |
| `STRIPE_PRICE_ID` | Price ID from Stripe dashboard |

---

## Structure
```
src/
  pages/
    index.astro        ← Landing page
    about.astro
    privacy.astro
    terms.astro
  components/
    Nav.astro
    Footer.astro
    EmailCapture.astro ← Netlify Forms
  layouts/
    Base.astro
  styles/
    global.css
netlify/
  functions/
    create-checkout.js ← Stripe (stubbed, ready to activate)
public/
  favicon.svg
```
