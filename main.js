/* =====================================================================
   Ca L'Isabel — main.js (vanilla JavaScript)
   Handles: mobile menu toggle, navbar background on scroll,
   scroll-reveal animations, and the dynamic footer year.
   ===================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- 1. Mobile menu toggle ---- */
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    // Close the mobile menu after tapping any link inside it
    mobileMenu.querySelectorAll('.mobile-link').forEach((link) => {
      link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
    });
  }

  /* ---- 2. Navbar background on scroll ---- */
  // Add a solid background once the user scrolls away from the top (hero).
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // set the correct state on first load

  /* ---- 3. Scroll-reveal animations ---- */
  // Fade-and-rise elements tagged [data-reveal] as they enter the viewport.
  const revealEls = document.querySelectorAll('[data-reveal]');
  const revealAll = () => revealEls.forEach((el) => el.classList.add('is-visible'));

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target); // reveal once, then stop watching
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );
    revealEls.forEach((el) => observer.observe(el));

    // Safety net: if the observer never fires (some headless/embedded renderers
    // don't run IO callbacks until a paint or scroll), reveal everything after a
    // short delay so content can never stay silently invisible.
    setTimeout(revealAll, 1800);
  } else {
    // Fallback for very old browsers: just show everything.
    revealAll();
  }

  /* ---- 4. Dynamic footer year ---- */
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ---- 5. Menu language toggle (CA / ES / EN) ---- */
  // Switches ONLY the dish and category names inside #menu-grid; the rest of
  // the site stays in Catalan. Each entry is [ca, es, en]. IMPORTANT: the
  // order of categories and items here must match the DOM order in index.html.
  const MENU_I18N = {
    cats: [
      ['Per entretenir-se', 'Para entretenerse', 'To snack'],
      ['Entrants', 'Entrantes', 'For starters'],
      ['Peixos', 'Pescados', 'Fish'],
      ['Carns', 'Carnes', 'Meat'],
    ],
    items: [
      [ // Per entretenir-se
        ['Ensaladilla russa', 'Ensaladilla rusa', 'Potato salad'],
        ['Supercroqueta de la casa', 'Supercroqueta de la casa', 'Our super croquette'],
        ['Les nostres braves', 'Nuestras bravas', 'Our "patatas bravas"'],
        ['Cargols en salsa picantons', 'Caracoles en salsa picantones', 'Snails with spicy sauce'],
        ['Pop amb parmentier', 'Pulpo con parmentier', 'Octopus with parmentier'],
        ['Pa amb tomàquet', 'Pan con tomate', 'Tomato on bread'],
      ],
      [ // Entrants
        ["Amanida de tomàquet farcit de formatges i oli de pinyons", 'Ensalada de tomate relleno de quesos y aceite de piñones', 'Tomatoes filled with cheese and pine nut oil'],
        ["Amanida de meló i pernil d'ànec amb vinagreta de mel", 'Ensalada de melón y jamón de pato con vinagreta de miel', 'Melon and duck ham salad with honey vinaigrette'],
        ["Caneló d'albergínia farcit de peix i marisc", 'Canelón de berenjena relleno de pescado y marisco', 'Eggplant cannelloni filled with fish and seafood'],
        ['Canelons de rostit casolans', 'Canelones de cocido caseros', 'Homemade beef cannelloni'],
        ['Porros rostits amb salsa de romesco', 'Puerros asados con salsa romesco', 'Roasted leeks with romesco sauce'],
        ['Arròs de sípia "bruta" i gambes', 'Arroz de sepia "bruta" y gambas', '"Dirty" cuttlefish and prawn rice'],
        ['Arròs de secret ibèric i bolets', 'Arroz de secreto ibérico y setas', 'Secreto ibérico and mushroom rice'],
      ],
      [ // Peixos
        ['Bacallà amb pèsols naturals', 'Bacalao con guisantes naturales', 'Cod with natural peas'],
        ['Bacallà amb panxeta ibèrica i bolets', 'Bacalao con panceta ibérica y setas', 'Cod with iberian bacon and mushrooms'],
        ['Suprema de turbot amb pesto de festuc i tomàquet sec', 'Suprema de rodaballo con pesto de pistacho y tomate seco', 'Turbot supreme with pistachio pesto and dried tomato'],
        ['Llom de rap amb salsa de marisc i llagostins', 'Lomo de rape con salsa de marisco y langostinos', 'Monkfish loin with seafood sauce and prawns'],
        ['Suprema de llobarro amb espinacs i fruits secs', 'Suprema de lubina con espinacas y frutos secos', 'Sea bass supreme with spinach and nuts'],
      ],
      [ // Carns
        ['Garrí cruixent desossat', 'Cochinillo crujiente deshuesado', 'Crunchy boneless suckling pig'],
        ['Secret ibèric amb patata al graten', 'Secreto ibérico con patata al gratén', 'Iberian pork secret with potato gratin'],
        ['Entrecot de vedella', 'Entrecot de ternera', 'Beef entrecote'],
        ['Melòs de vedella a baixa temperatura', 'Meloso de ternera a baja temperatura', 'Veal mellow cooked at low temperature'],
        ['Steak tartar tallat a mà', 'Steak tartar cortado a mano', 'Hand-cut steak tartare'],
        ['Mandonguilles casolanes amb vieires', 'Albóndigas caseras con vieiras', 'Homemade meatballs with scallops'],
      ],
    ],
  };

  const LANG_INDEX = { ca: 0, es: 1, en: 2 };
  const langButtons = document.querySelectorAll('#menu-lang .menu-lang-btn');
  const menuGrid = document.getElementById('menu-grid');

  function setMenuLang(lang) {
    const idx = LANG_INDEX[lang];
    if (idx === undefined || !menuGrid) return;

    const categories = menuGrid.querySelectorAll(':scope > div');
    categories.forEach((catEl, c) => {
      if (!MENU_I18N.cats[c]) return;

      // Category heading: rebuild as gold dot + translated name.
      const h3 = catEl.querySelector('h3');
      if (h3) {
        h3.innerHTML = '<span class="text-brand-gold">·</span> ' + MENU_I18N.cats[c][idx];
      }

      // Dish names: iterate rows and take each row's FIRST .font-medium span
      // (the name). The price span also carries .font-medium, so a flat
      // querySelectorAll over the category would grab prices too.
      catEl.querySelectorAll('.menu-item').forEach((row, i) => {
        const nameEl = row.querySelector('.font-medium');
        if (nameEl && MENU_I18N.items[c] && MENU_I18N.items[c][i]) {
          nameEl.textContent = MENU_I18N.items[c][i][idx];
        }
      });
    });

    // Button active states
    langButtons.forEach((btn) => {
      const isActive = btn.dataset.lang === lang;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', String(isActive));
    });

    // Remember the choice for the next visit
    try { localStorage.setItem('menuLang', lang); } catch (e) { /* private mode: ignore */ }
  }

  langButtons.forEach((btn) => {
    btn.addEventListener('click', () => setMenuLang(btn.dataset.lang));
  });

  // Restore a previously chosen language (defaults to Catalan markup as-is)
  try {
    const saved = localStorage.getItem('menuLang');
    if (saved && saved !== 'ca') setMenuLang(saved);
  } catch (e) { /* private mode: ignore */ }
});
