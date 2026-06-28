# Ca L'Isabel — Restaurant website

A modern, responsive single-page website for the Barcelona restaurant **Ca L'Isabel**.
Built with plain **HTML**, **Tailwind CSS** (via CDN) and **vanilla JavaScript** — no build step required.

## File structure

```
web-calisabel/
├── index.html      # All page markup and sections
├── styles.css      # Custom styles (scroll-reveal, masonry gallery, navbar)
├── main.js         # Mobile menu, navbar-on-scroll, scroll reveals, footer year
└── README.md
```

## Sections

1. **Hero** — full-screen welcome with the "Veure la Carta" call-to-action.
2. **Sobre nosaltres** — the restaurant's story.
3. **La Carta** — Entrants, Plats Principals, Postres.
4. **Galeria** — responsive CSS masonry of food photos.
5. **Contacte i Ubicació** — address, hours, phone, email and Instagram link.

## How to preview

Because the site uses only static files, you just need any local web server
(opening `index.html` directly also works, but a server avoids browser quirks).

**Option A — Node (recommended):**
```bash
cd web-calisabel
npx -y serve -l 4321 .
# then open http://localhost:4321
```

**Option B — Python:**
```bash
cd web-calisabel
python -m http.server 4321
# then open http://localhost:4321
```

**Option C — just double-click `index.html`** to open it in your browser.

## Replacing the placeholder images

All images are currently Unsplash placeholders. Search the code for these
clearly-marked comment blocks and swap the `src` URLs for the real photos:

| Where | Comment marker in `index.html` |
|-------|--------------------------------|
| Hero background | `▼▼▼ BACKGROUND IMAGE PLACEHOLDER ▼▼▼` |
| About photo | `▼ ABOUT IMAGE PLACEHOLDER` |
| Gallery (Instagram) | `▼▼▼ GALLERY IMAGE PLACEHOLDERS ▼▼▼` (8 images, each tagged `INSTAGRAM PHOTO n → replace src`) |

For the gallery, download the photos from the restaurant's Instagram, drop them
in an `images/` folder, and point each `src` at e.g. `images/plat-01.jpg`.

## Customising content

- **Text** is in Catalan, directly in `index.html`.
- **Brand colours** (cream, charcoal, terracotta, olive, gold) are defined in the
  `tailwind.config` block near the top of `index.html` — change them in one place.
- **Address, phone, hours, Instagram handle** are mock values in the
  `#contacte` section — replace with the real details.
