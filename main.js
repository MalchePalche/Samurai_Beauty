/**
 * Samurai Beauty — Main JavaScript
 * Handles: nav effects, hero word animation, scroll reveals, gallery filter, contact form
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. Navigation Scroll Effect ─────────────────── */
  const nav = document.querySelector('nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on load in case page is already scrolled
  }

  /* ── 2. Hero Word Animation ───────────────────────── */
  const heroHeadline = document.querySelector('.hero-headline');
  if (heroHeadline && !heroHeadline.querySelector('span')) {
    // Only auto-wrap if spans haven't been added manually in HTML
    const words = heroHeadline.textContent.trim().split(/\s+/);
    heroHeadline.innerHTML = '';
    words.forEach((word, i) => {
      const span = document.createElement('span');
      span.textContent = word;
      span.style.animationDelay = `${i * 0.1}s`;
      heroHeadline.appendChild(span);
      if (i < words.length - 1) heroHeadline.appendChild(document.createTextNode(' '));
    });
  }

  /* ── 3. Scroll Reveal System ──────────────────────── */
  // Handles: .reveal, .reveal-stagger, .reveal-left, .reveal-right
  const revealSelectors = '.reveal, .reveal-stagger, .reveal-left, .reveal-right';
  const revealEls = document.querySelectorAll(revealSelectors);

  if (revealEls.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -60px 0px'
    });

    revealEls.forEach(el => revealObserver.observe(el));
  }

  /* ── 4. Staggered Feature Row Reveals ────────────── */
  // Each .feature-row reveals its children in sequence
  const featureRows = document.querySelectorAll('.feature-row');
  featureRows.forEach(row => {
    const children = Array.from(row.children);
    children.forEach((child, i) => {
      child.style.transitionDelay = `${i * 0.12}s`;
    });
  });

  /* ── 5. Gallery Filter ────────────────────────────── */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;

        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        galleryItems.forEach(item => {
          const match = filter === 'all' || item.dataset.category === filter;
          if (match) {
            item.style.display = '';
            requestAnimationFrame(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            });
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.96)';
            setTimeout(() => { item.style.display = 'none'; }, 380);
          }
        });
      });
    });
  }

  /* ── 6. Contact Form ──────────────────────────────── */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]') || contactForm.querySelector('button');
      if (!btn) return;

      const orig = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;

      setTimeout(() => {
        btn.textContent = 'Message Sent';
        btn.style.borderColor = 'var(--moss)';
        contactForm.reset();

        setTimeout(() => {
          btn.textContent = orig;
          btn.disabled = false;
          btn.style.borderColor = '';
        }, 3000);
      }, 1400);
    });
  }

  /* ── 7. Hover Ink Effect on Nav Logo ─────────────── */
  const logo = document.querySelector('.logo');
  if (logo) {
    logo.addEventListener('mouseenter', () => {
      logo.style.letterSpacing = '0.18em';
    });
    logo.addEventListener('mouseleave', () => {
      logo.style.letterSpacing = '';
    });
  }

});
