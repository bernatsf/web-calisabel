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
});
