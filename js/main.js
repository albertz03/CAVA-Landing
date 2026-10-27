'use strict';

/**
 * CAVA - configuración comercial.
 * Agrega únicamente los datos reales confirmados por la marca.
 * WhatsApp: número internacional sin espacios, por ejemplo 521XXXXXXXXXX
 * email: correo autorizado de contacto. Redes: URL HTTPS oficial.
 */
const SITE_CONTACT = Object.freeze({
  whatsapp: '',
  email: '',
  instagram: '',
  facebook: ''
});

(() => {
  document.documentElement.classList.add('has-js');

  const header = document.querySelector('#site-header');
  const menuButton = document.querySelector('#menu-toggle');
  const navPanel = document.querySelector('#primary-nav');
  const navLinks = [...document.querySelectorAll('.nav-panel .nav-link')];
  const toast = document.querySelector('#demo-toast');
  let toastTimer;

  function showNotice(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('show'), 3800);
  }

  function closeMenu() {
    navPanel?.classList.remove('is-open');
    menuButton?.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', 'Abrir menú');
  }

  menuButton?.addEventListener('click', () => {
    const open = !navPanel.classList.contains('is-open');
    navPanel.classList.toggle('is-open', open);
    menuButton.classList.toggle('is-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  });

  navLinks.forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
  document.addEventListener('click', (event) => {
    if (navPanel?.classList.contains('is-open') && !event.target.closest('.nav-layout')) closeMenu();
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 992) closeMenu();
  });

  const syncHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 35);
  window.addEventListener('scroll', syncHeader, { passive: true });
  syncHeader();

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealItems = [...document.querySelectorAll('.reveal')];
  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -35px 0px', threshold: 0.08 });
    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  const sections = [...document.querySelectorAll('main section[id]')];
  if ('IntersectionObserver' in window) {
    const activeObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          const current = link.getAttribute('href') === `#${entry.target.id}`;
          link.classList.toggle('active', current);
          if (current) link.setAttribute('aria-current', 'page');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-33% 0px -55% 0px', threshold: 0 });
    sections.forEach((section) => activeObserver.observe(section));
  }

  // Contactos válidos; sin datos confirmados se informa, nunca se inventan.
  const message = encodeURIComponent('Hola, me gustaría conocer más sobre las botas CAVA.');
  const phone = SITE_CONTACT.whatsapp.replace(/\D/g, '');
  const email = SITE_CONTACT.email.trim();
  document.querySelectorAll('[data-contact]').forEach((link) => {
    const kind = link.dataset.contact;
    const destination = kind === 'whatsapp' && phone.length >= 10
      ? `https://wa.me/${phone}?text=${message}`
      : kind === 'email' && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)
        ? `mailto:${email}?subject=${encodeURIComponent('Contacto comercial CAVA')}` : '';
    if (destination) {
      link.href = destination;
      if (kind === 'whatsapp') link.target = '_blank';
    } else {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        showNotice('Datos de contacto pendientes. Configúralos en js/main.js.');
      });
      link.setAttribute('title', 'Pendiente de configurar');
    }
  });

  document.querySelectorAll('[data-social]').forEach((link) => {
    const configured = SITE_CONTACT[link.dataset.social];
    if (typeof configured === 'string' && /^https:\/\/[^\s]+$/i.test(configured)) {
      link.href = configured;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    } else {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        showNotice('Red social pendiente de configurar en js/main.js.');
      });
      link.setAttribute('title', 'Pendiente de configurar');
    }
  });

  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
