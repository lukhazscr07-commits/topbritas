(function () {
  'use strict';

  document.documentElement.classList.add('js-ready');

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  const icons = {
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m3 11 9-8 9 8"/><path d="M5 10v11h14V10M9 21v-7h6v7"/></svg>',
    products: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 16l9 5 9-5"/></svg>',
    building: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 21V5l8-3 8 3v16M2 21h20"/><path d="M8 7h1M15 7h1M8 11h1M15 11h1M8 15h1M15 15h1M10 21v-3h4v3"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>',
    cart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 4h2l2.1 10.1a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L20.5 7H6"/><circle cx="10" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/></svg>',
    rock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" aria-hidden="true"><path d="m4 17 2-8 6-5 7 4 2 9-5 3H8l-4-3Z"/><path d="m6 9 7 3 6-4M13 12l3 8"/></svg>',
    message: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z"/><path d="M8 9h8M8 13h5"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>',
    truck: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 5h11v12H3zM14 9h4l3 4v4h-7z"/><circle cx="7" cy="18" r="2"/><circle cx="18" cy="18" r="2"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2a9.84 9.84 0 0 0-8.42 14.91L2 22l5.24-1.57A9.97 9.97 0 1 0 12.04 2Zm0 17.98a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.1.93.94-3.02-.2-.31A8.04 8.04 0 1 1 12.04 19.98Zm4.45-6.04c-.24-.12-1.44-.71-1.66-.79-.23-.08-.39-.12-.55.12-.17.25-.63.8-.78.96-.14.16-.28.18-.52.06-.25-.12-1.03-.38-1.96-1.21a7.31 7.31 0 0 1-1.36-1.69c-.14-.24-.02-.37.11-.49.11-.11.24-.28.36-.42.13-.14.17-.24.25-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.32-.75-1.81-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.42.06-.65.3-.22.25-.85.84-.85 2.04s.87 2.36 1 2.52c.12.16 1.72 2.63 4.17 3.69.58.25 1.04.4 1.39.51.58.19 1.12.16 1.54.1.47-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.47-.28Z"/></svg>',
    hardhat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 15a8 8 0 0 1 16 0M2 15h20v4H2zM9 15V7M15 15V7"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none"/></svg>',
    send: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" aria-hidden="true"><path d="m22 2-7 20-4-9-9-4 20-7Z"/><path d="M22 2 11 13"/></svg>'
  };

  function renderIcons(root = document) {
    $$('[data-icon]:not([data-icon-ready])', root).forEach((node) => {
      node.innerHTML = icons[node.dataset.icon] || icons.info;
      node.dataset.iconReady = 'true';
    });
  }

  function initHeader() {
    const header = $('[data-header]');
    const toggle = $('[data-nav-toggle]');
    const nav = $('[data-navigation]');
    if (header) {
      if (!$('.header-instagram', header)) {
        const instagram = document.createElement('a');
        instagram.className = 'header-instagram';
        instagram.href = 'https://www.instagram.com/topbritas/';
        instagram.target = '_blank';
        instagram.rel = 'noopener noreferrer';
        instagram.setAttribute('aria-label', 'Instagram da TopBritas');
        instagram.innerHTML = '<span data-icon="instagram"></span>';
        header.insertBefore(instagram, toggle || nav || null);
        renderIcons(instagram);
      }
      const update = () => header.classList.toggle('is-scrolled', scrollY > 18);
      update();
      addEventListener('scroll', update, { passive: true });
    }
    if (toggle && nav) {
      const toggleLabel = $('.sr-only', toggle);
      const close = () => {
        toggle.setAttribute('aria-expanded', 'false');
        if (toggleLabel) toggleLabel.textContent = 'Abrir menu';
        nav.classList.remove('is-open');
        document.body.classList.remove('is-nav-open');
      };
      toggle.addEventListener('click', () => {
        const open = toggle.getAttribute('aria-expanded') !== 'true';
        toggle.setAttribute('aria-expanded', String(open));
        if (toggleLabel) toggleLabel.textContent = open ? 'Fechar menu' : 'Abrir menu';
        nav.classList.toggle('is-open', open);
        document.body.classList.toggle('is-nav-open', open);
      });
      $$('a', nav).forEach((link) => link.addEventListener('click', close));
      addEventListener('keydown', (event) => { if (event.key === 'Escape') close(); });
    }
  }

  function initReveal() {
    const nodes = $$('[data-reveal]');
    if (!nodes.length) return;
    if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) {
      nodes.forEach((node) => node.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });
    nodes.forEach((node) => observer.observe(node));
  }

  function initDeferredMedia() {
    const nodes = $$('[data-deferred-src]');
    if (!nodes.length) return;
    const load = (node) => {
      if (!node.dataset.deferredSrc) return;
      node.src = node.dataset.deferredSrc;
      node.removeAttribute('data-deferred-src');
    };
    if (!('IntersectionObserver' in window)) {
      nodes.forEach(load);
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        load(entry.target);
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 180px 120px', threshold: 0.01 });
    nodes.forEach((node) => observer.observe(node));
  }

  function initHeroMotion() {
    const hero = $('.hero');
    const image = $('.hero__picture img');
    if (!hero || !image || matchMedia('(prefers-reduced-motion: reduce)').matches || matchMedia('(pointer: coarse)').matches) return;
    let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;
    hero.addEventListener('pointermove', (event) => {
      const rect = hero.getBoundingClientRect();
      tx = ((event.clientX - rect.left) / rect.width - .5) * 10;
      ty = ((event.clientY - rect.top) / rect.height - .5) * 6;
      if (!raf) raf = requestAnimationFrame(tick);
    });
    hero.addEventListener('pointerleave', () => { tx = 0; ty = 0; if (!raf) raf = requestAnimationFrame(tick); });
    function tick() {
      cx += (tx - cx) * .08;
      cy += (ty - cy) * .08;
      image.style.transform = `scale(1.025) translate3d(${cx}px, ${cy}px, 0)`;
      if (Math.abs(tx - cx) > .05 || Math.abs(ty - cy) > .05) raf = requestAnimationFrame(tick); else raf = 0;
    }
  }

  function initHeroSlideshow() {
    const hero = $('.hero');
    const slides = $$('[data-hero-slide]', hero || document);
    const dots = $$('[data-hero-dot]', hero || document);
    const current = $('[data-hero-current]', hero || document);
    if (!hero || slides.length < 2) return;
    let index = 0;
    let timer = 0;
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const saveData = navigator.connection?.saveData === true;
    let transitionToken = 0;

    const loadSlide = (slide) => {
      const image = $('img', slide);
      if (!image) return Promise.resolve();
      if (image.dataset.src) {
        image.src = image.dataset.src;
        image.removeAttribute('data-src');
      }
      if (image.complete) return Promise.resolve();
      return image.decode?.().catch(() => {}) || Promise.resolve();
    };
    const show = async (next) => {
      const nextIndex = (next + slides.length) % slides.length;
      const token = ++transitionToken;
      await loadSlide(slides[nextIndex]);
      if (token !== transitionToken) return;
      index = nextIndex;
      slides.forEach((slide, position) => slide.classList.toggle('is-active', position === index));
      dots.forEach((dot, position) => dot.setAttribute('aria-pressed', String(position === index)));
      if (current) current.textContent = String(index + 1).padStart(2, '0');
    };
    const stop = () => { if (timer) clearInterval(timer); timer = 0; };
    const start = () => {
      stop();
      if (!reducedMotion && !saveData && !document.hidden) timer = setInterval(() => show(index + 1), 7000);
    };

    dots.forEach((dot) => dot.addEventListener('click', () => { show(Number(dot.dataset.heroDot)); start(); }));
    hero.addEventListener('mouseenter', stop);
    hero.addEventListener('mouseleave', start);
    hero.addEventListener('focusin', stop);
    hero.addEventListener('focusout', start);
    document.addEventListener('visibilitychange', start);
    show(0);
    start();
  }

  function initAutoCarousels() {
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches || navigator.connection?.saveData === true;
    const mobileLayout = matchMedia('(max-width: 768px)');
    $$('[data-auto-carousel]').forEach((track) => {
      const items = Array.from(track.children).filter((item) => item.matches('article, figure, li'));
      if (items.length < 2) return;
      const scope = track.parentElement;
      const status = $('[data-carousel-status]', scope);
      const pager = $$('[data-carousel-pager] button', scope);
      const interval = Math.max(3000, Number(track.dataset.carouselInterval) || 4600);
      let index = 0;
      let timer = 0;
      let scrollFrame = 0;
      let resumeTimer = 0;
      let isTouching = false;

      const updateMeta = () => {
        track.dataset.carouselIndex = String(index);
        if (status) status.textContent = `${String(index + 1).padStart(2, '0')} / ${String(items.length).padStart(2, '0')}`;
        pager.forEach((button, position) => {
          const activePosition = pager.length > 1 ? Math.round(index * (pager.length - 1) / (items.length - 1)) : 0;
          const active = activePosition === position;
          button.setAttribute('aria-pressed', String(active));
        });
      };
      const go = (next, smooth = true) => {
        index = (next + items.length) % items.length;
        const trackBox = track.getBoundingClientRect();
        const itemBox = items[index].getBoundingClientRect();
        const targetLeft = track.scrollLeft + itemBox.left - trackBox.left;
        track.scrollTo({ left: targetLeft, behavior: smooth && !reducedMotion ? 'smooth' : 'auto' });
        updateMeta();
      };
      const stop = () => { if (timer) clearInterval(timer); timer = 0; };
      const start = () => {
        stop();
        if (mobileLayout.matches && !isTouching && !reducedMotion && !document.hidden) {
          timer = setInterval(() => go(index + 1), interval);
        }
      };
      const resumeSoon = () => {
        clearTimeout(resumeTimer);
        resumeTimer = setTimeout(start, 1800);
      };
      const syncLayout = () => {
        stop();
        if (!mobileLayout.matches) {
          index = 0;
          track.scrollLeft = 0;
          updateMeta();
          return;
        }
        go(index, false);
        start();
      };

      pager.forEach((button, position) => button.addEventListener('click', () => {
        if (!mobileLayout.matches) return;
        const target = pager.length > 1 ? Math.round(position * (items.length - 1) / (pager.length - 1)) : 0;
        go(target);
        resumeSoon();
      }));
      track.addEventListener('scroll', () => {
        if (!mobileLayout.matches) return;
        if (scrollFrame) cancelAnimationFrame(scrollFrame);
        scrollFrame = requestAnimationFrame(() => {
          const left = track.getBoundingClientRect().left;
          index = items.reduce((closest, item, position) => Math.abs(item.getBoundingClientRect().left - left) < Math.abs(items[closest].getBoundingClientRect().left - left) ? position : closest, 0);
          updateMeta();
        });
      }, { passive: true });
      if (matchMedia('(hover: hover)').matches) {
        track.addEventListener('pointerenter', stop);
        track.addEventListener('pointerleave', resumeSoon);
      }
      track.addEventListener('focusin', stop);
      track.addEventListener('focusout', resumeSoon);
      track.addEventListener('touchstart', () => { isTouching = true; stop(); }, { passive: true });
      track.addEventListener('touchend', () => { isTouching = false; resumeSoon(); }, { passive: true });
      track.addEventListener('touchcancel', () => { isTouching = false; resumeSoon(); }, { passive: true });
      document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); else start(); });
      mobileLayout.addEventListener?.('change', syncLayout);
      addEventListener('resize', syncLayout);
      updateMeta();
      syncLayout();
    });
  }

  const products = [
    ['po-de-pedra', 'Pó de Pedra', '0–4,8 mm', 'Terraplenagem, sub-base, calçamento, pisos pré-moldados, paralelepípedos e massa asfáltica.'],
    ['gravilha', 'Gravilha', '2,4–6,3 mm', 'Pisos de alta resistência e blocos pré-moldados, conforme especificação técnica.'],
    ['brita-3-8', 'Brita 3/8', '4,8–9,5 mm', 'Blocos, pré-moldados, pavimentos simples, pisos de alta resistência e concreto asfáltico.'],
    ['brita-1-2', 'Brita 1/2', '9,5–12,5 mm', 'Blocos, pré-moldados, pavimentos simples, pisos de alta resistência e concreto asfáltico.'],
    ['brita-5-8', 'Brita 5/8', '9,5–16 mm', 'Concreto estrutural, pavimentos, pré-moldados e concreto asfáltico.'],
    ['brita-7-8', 'Brita 7/8', '12,5–22 mm', 'Consulte a equipe TopBritas para confirmar granulometria e aplicação no seu projeto.'],
    ['brita-graduada', 'Brita Graduada (BGS)', '0–25 mm', 'Base e sub-base rodoviária de tráfego pesado, pisos, pátios e galpões.'],
    ['cascalho', 'Cascalho', '0–50 mm', 'Disponibilidade, composição e indicação técnica sob consulta.'],
    ['rachao', 'Rachão', '76–250 mm', 'Calçamentos, muros de contenção, bases, drenagens, enrocamentos e concreto ciclópico.'],
    ['pedras-marroadas', 'Pedras Marroadas', '100–300 mm', 'Calçamentos, gabiões, contenções, bases, drenagens e enrocamentos.'],
    ['pedras-brutas', 'Pedras Brutas', 'acima de 250 mm', 'Barragens, enrocamento, proteção de aterros, taludes e estruturas contra erosão.']
  ].map(([id, name, size, application]) => ({ id, name, size, application, image: `assets/images/products/${id}.webp` }));

  function initCatalog() {
    const root = $('[data-catalog]');
    if (!root) return;
    const grid = $('[data-product-grid]', root);
    if (!grid) return;
    const validProductIds = new Set(products.map((product) => product.id));
    const cart = new Map();
    const draft = new Map(products.map((product) => [product.id, 0]));
    const storageKey = 'topbritas-cart-static-v1';

    try {
      const stored = JSON.parse(localStorage.getItem(storageKey) || '[]');
      if (Array.isArray(stored)) stored.forEach(([id, value]) => { if (validProductIds.has(id) && Number(value) > 0) cart.set(id, Number(value)); });
    } catch (_) {}

    function persist() { try { localStorage.setItem(storageKey, JSON.stringify(Array.from(cart.entries()))); } catch (_) {} }
    function getCart(id) { return cart.get(id) || 0; }
    function getDraft(id) { return draft.get(id) ?? 0; }
    function setDraft(id, value) {
      draft.set(id, Math.max(0, Math.round(Number(value) * 2) / 2));
      renderProduct(id);
    }
    function addToCart(id, trigger) {
      const volume = getDraft(id);
      if (volume <= 0) return;
      cart.set(id, getCart(id) + volume);
      persist();
      renderProduct(id);
      renderCart();
      if (trigger) {
        trigger.classList.add('is-added');
        trigger.innerHTML = '<span data-icon="check"></span> Adicionado ao carrinho';
        renderIcons(trigger);
        setTimeout(() => {
          trigger.classList.remove('is-added');
          trigger.innerHTML = '<span data-icon="cart"></span> Solicitar produto';
          renderIcons(trigger);
        }, 1600);
      }
    }

    grid.innerHTML = products.map((product, index) => `<article class="product-card" id="produto-${product.id}" data-product-card="${product.id}">
      <figure class="product-card__visual"><img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==" data-deferred-src="${product.image}" alt="${product.name} TopBritas" width="900" height="529" decoding="async"><span>${String(index + 1).padStart(2, '0')}</span></figure>
      <div class="product-card__body"><h2>${product.name}</h2><button class="product-card__more" type="button" data-product-more aria-expanded="false">Ver mais</button><div class="product-card__details"><p class="product-card__size">Faixa granulométrica <strong>${product.size}</strong></p><p class="eyebrow">Aplicações principais</p><p>${product.application}</p></div>
      <div class="product-card__order"><span>Volume desejado</span><div class="quantity" aria-label="Volume de ${product.name}"><button type="button" data-product-id="${product.id}" data-quantity-change="-0.5" aria-label="Reduzir 0,5 metro cúbico de ${product.name}">−</button><output aria-live="polite" data-product-volume="${product.id}">0,0<small>m³</small></output><button type="button" data-product-id="${product.id}" data-quantity-change="0.5" aria-label="Adicionar 0,5 metro cúbico de ${product.name}">+</button></div></div><button class="product-card__request button" type="button" data-request-product="${product.id}" disabled><span data-icon="cart"></span> Solicitar produto</button></div>
    </article>`).join('');
    renderIcons(grid);
    initDeferredMedia();

    if (location.hash.startsWith('#produto-')) requestAnimationFrame(() => document.getElementById(location.hash.slice(1))?.scrollIntoView({ block: 'start' }));

    grid.addEventListener('click', (event) => {
      const more = event.target.closest('[data-product-more]');
      if (more) {
        const card = more.closest('.product-card');
        const expanded = !card.classList.contains('is-expanded');
        card.classList.toggle('is-expanded', expanded);
        more.setAttribute('aria-expanded', String(expanded));
        more.textContent = expanded ? 'Ver menos' : 'Ver mais';
        return;
      }
      const request = event.target.closest('[data-request-product]');
      if (request) {
        addToCart(request.dataset.requestProduct, request);
        return;
      }
      const button = event.target.closest('[data-quantity-change]');
      if (button) setDraft(button.dataset.productId, getDraft(button.dataset.productId) + Number(button.dataset.quantityChange));
    });

    function renderProduct(id) {
      const output = $(`[data-product-volume="${id}"]`, grid);
      const card = $(`[data-product-card="${id}"]`, grid);
      const request = $(`[data-request-product="${id}"]`, grid);
      if (output) output.innerHTML = `${getDraft(id).toFixed(1).replace('.', ',')}<small>m³</small>`;
      if (card) card.classList.toggle('has-volume', getCart(id) > 0);
      if (request) request.disabled = getDraft(id) <= 0;
    }
    function renderProducts() { products.forEach((product) => renderProduct(product.id)); }

    const dialog = $('[data-cart-dialog]');
    function selected() { return products.filter((product) => getCart(product.id) > 0).map((product) => ({ product, volume: getCart(product.id) })); }
    function total() { return selected().reduce((sum, item) => sum + item.volume, 0); }
    function renderCart() {
      const items = selected();
      $('[data-cart-bar]')?.classList.toggle('is-active', items.length > 0);
      if ($('[data-cart-count]')) $('[data-cart-count]').textContent = String(items.length);
      if ($('[data-cart-total]')) $('[data-cart-total]').textContent = total().toFixed(1).replace('.', ',');
      if ($('[data-send-whatsapp]')) $('[data-send-whatsapp]').disabled = !items.length;
      if (dialog?.open) renderDialog();
    }
    function renderDialog() {
      const items = selected();
      const container = $('[data-cart-items]');
      if (container) container.innerHTML = items.length ? items.map(({ product, volume }) => `<div class="cart-item"><strong>${product.name}</strong><span>${volume.toFixed(1).replace('.', ',')} m³</span><button type="button" data-remove-product="${product.id}">Remover</button></div>`).join('') : '<p>Nenhum material selecionado.</p>';
      if ($('[data-dialog-total]')) $('[data-dialog-total]').textContent = total().toFixed(1).replace('.', ',');
    }
    function openDialog() { renderDialog(); if (dialog && !dialog.open) dialog.showModal(); document.body.classList.add('is-modal-open'); }
    function closeDialog() { if (dialog?.open) dialog.close(); document.body.classList.remove('is-modal-open'); }

    $('[data-review-cart]')?.addEventListener('click', openDialog);
    $('[data-close-cart]')?.addEventListener('click', closeDialog);
    dialog?.addEventListener('close', () => document.body.classList.remove('is-modal-open'));
    dialog?.addEventListener('click', (event) => { if (event.target === dialog) closeDialog(); });
    $('[data-clear-cart]')?.addEventListener('click', () => { cart.clear(); persist(); renderProducts(); renderCart(); });
    $('[data-cart-items]')?.addEventListener('click', (event) => {
      const button = event.target.closest('[data-remove-product]');
      if (!button) return;
      cart.delete(button.dataset.removeProduct); persist(); renderProduct(button.dataset.removeProduct); renderCart(); renderDialog();
    });
    $('[data-send-whatsapp]')?.addEventListener('click', () => {
      const items = selected();
      if (!items.length) return;
      const lines = items.map(({ product, volume }) => `• *${product.name}:* ${volume.toFixed(1).replace('.', ',')} m³`);
      const message = ['Olá! Montei uma seleção de agregados no site da TopBritas e gostaria de solicitar uma cotação:', '', ...lines, '', `*Volume total: ${total().toFixed(1).replace('.', ',')} m³*`, '', 'Aguardo o contato para alinhar disponibilidade e logística.'].join('\n');
      window.open(`https://wa.me/5575982129181?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    });

    renderProducts(); renderCart();
  }

  function initChat() {
    if ($('[data-vicentinho]')) return;
    const wrapper = document.createElement('div');
    wrapper.className = 'vicentinho'; wrapper.dataset.vicentinho = '';
    wrapper.innerHTML = `<section class="chat-panel" data-chat-panel aria-label="Assistente virtual Vicentinho" aria-hidden="true" inert><header class="chat-panel__header"><img src="assets/images/chat/vicentinho.webp" alt="" width="240" height="240"><div><strong>Vicentinho</strong><small><i></i> Assistente TopBritas online</small></div><button class="icon-button" type="button" data-chat-close aria-label="Fechar assistente"><span data-icon="close"></span></button></header><div class="chat-panel__intro"><span data-icon="message"></span><p><strong>Como posso ajudar?</strong><small>Respostas rápidas sobre produtos, cotação e localização.</small></p></div><div class="chat-panel__messages" data-chat-messages aria-live="polite"></div><form class="chat-panel__input" data-chat-form><label class="sr-only" for="chat-input">Digite sua mensagem</label><input id="chat-input" type="text" maxlength="300" autocomplete="off" placeholder="Escreva sua dúvida…"><button type="submit" aria-label="Enviar mensagem"><span data-icon="send"></span></button></form></section><button class="vicentinho__trigger has-unread" type="button" data-chat-trigger aria-label="Abrir Vicentinho, assistente TopBritas; uma nova mensagem" aria-expanded="false"><img src="assets/images/chat/vicentinho-button.webp" alt="" width="240" height="240"></button>`;
    document.body.append(wrapper); renderIcons(wrapper);
    const panel = $('[data-chat-panel]', wrapper); const messages = $('[data-chat-messages]', wrapper); const input = $('input', wrapper);
    let started = false; let awaitingCity = false; let material = '';
    const menu = ['Solicitar orçamento', 'Encontrar material', 'Ver produtos', 'Localização', 'Fale conosco'];
    const add = (payload, type) => {
      const box = document.createElement('div'); box.className = `chat-message chat-message--${type}`;
      const p = document.createElement('p'); p.textContent = typeof payload === 'string' ? payload : payload.text; box.append(p);
      if (type === 'bot' && payload.options?.length) { const options = document.createElement('div'); options.className = 'chat-options'; payload.options.forEach((label) => { const b = document.createElement('button'); b.type = 'button'; b.textContent = label; b.dataset.chatOption = label; options.append(b); }); box.append(options); }
      if (type === 'bot' && payload.url) { const a = document.createElement('a'); a.href = payload.url; a.textContent = payload.urlLabel || 'Abrir'; if (/^https?:/.test(payload.url)) { a.target = '_blank'; a.rel = 'noopener'; } box.append(a); }
      messages.append(box); messages.scrollTop = messages.scrollHeight;
    };
    const route = (raw) => {
      const text = raw.trim(); const msg = text.toLowerCase();
      if (awaitingCity && text.length > 2) { awaitingCity = false; const m = material || 'agregados'; return { text: `Anotei o destino: ${text}. A equipe comercial pode calcular disponibilidade e logística.`, url: `https://wa.me/5575982129181?text=${encodeURIComponent(`Olá! Gostaria de cotar ${m} com entrega para ${text}.`)}`, urlLabel: 'Continuar no WhatsApp' }; }
      if (/^(oi|olá|ola|menu|início|inicio)$/.test(msg)) return { text: 'Olá! Eu sou o Vicentinho. Como posso ajudar sua obra hoje?', options: menu };
      if (msg.includes('produto') || msg.includes('catálogo') || msg.includes('catalogo')) return { text: 'No catálogo você encontra os 11 materiais e pode montar sua seleção por volume.', url: 'catalogo.html', urlLabel: 'Abrir catálogo' };
      if (msg.includes('localiza') || msg.includes('onde fica') || msg.includes('rota')) return { text: 'A TopBritas fica na Rodovia BA-001, km 54, Fazenda Copioba, Zona Rural, Nazaré-BA.', url: 'https://maps.app.goo.gl/4czKxafZ7vhuCdaz5', urlLabel: 'Traçar rota' };
      if (msg.includes('fale conosco') || msg.includes('canal independente') || msg.includes('denúncia') || msg.includes('denuncia')) return { text: 'O canal independente recebe avaliações, sugestões, reclamações e denúncias com segurança.', url: 'https://britaki.com.br/fale-conosco', urlLabel: 'Acessar Fale conosco' };
      if (msg.includes('vendedor') || msg.includes('vendas')) return { text: 'A equipe comercial pode ajudar com volume, retirada e logística.', url: 'https://wa.me/5575982129181?text=Olá! Vim pelo site da TopBritas e gostaria de falar com vendas.', urlLabel: 'Falar com vendas' };
      if (msg.includes('encontrar material') || msg.includes('qual material')) return { text: 'Por qual família de material você quer começar?', options: ['Brita', 'Pó de pedra', 'Outros agregados'] };
      if (msg.includes('brita')) { material = 'brita'; return { text: 'Temos diferentes granulometrias. Quer comparar produtos ou cotar?', options: ['Ver produtos', 'Solicitar orçamento'] }; }
      if (msg.includes('pó de pedra') || msg.includes('po de pedra')) { material = 'pó de pedra'; return { text: 'O pó de pedra é usado em terraplenagem, sub-base, calçamento e massa asfáltica.', options: ['Ver produtos', 'Solicitar orçamento'] }; }
      if (msg.includes('orçamento') || msg.includes('orcamento') || msg.includes('cotar') || msg.includes('comprar')) return { text: material ? `Como deseja receber sua cotação de ${material}?` : 'Qual família de agregado deseja cotar?', options: material ? ['Retirar na pedreira', 'Entregar em outra cidade'] : ['Brita', 'Pó de pedra', 'Outros agregados'] };
      if (msg.includes('retirar')) return { text: 'Perfeito. A equipe confirma disponibilidade e janela de retirada.', url: `https://wa.me/5575982129181?text=${encodeURIComponent(`Olá! Gostaria de cotar ${material || 'agregados'} para retirada na pedreira em Nazaré.`)}`, urlLabel: 'Solicitar retirada' };
      if (msg.includes('entregar') || msg.includes('outra cidade')) { awaitingCity = true; return { text: 'Qual é a cidade de destino? Digite o nome para preparar o contato com vendas.' }; }
      return { text: 'Escolha uma opção para eu direcionar melhor o atendimento.', options: menu };
    };
    const reply = (text) => add(route(text), 'bot');
    const toggle = (force) => { const open = force ?? !panel.classList.contains('is-open'); const trigger = $('[data-chat-trigger]', wrapper); panel.classList.toggle('is-open', open); document.body.classList.toggle('chat-is-open', open); panel.setAttribute('aria-hidden', String(!open)); panel.toggleAttribute('inert', !open); trigger.setAttribute('aria-expanded', String(open)); if (open) { trigger.classList.remove('has-unread'); trigger.setAttribute('aria-label', 'Fechar Vicentinho, assistente TopBritas'); setTimeout(() => input.focus(), 50); if (!started) { reply('oi'); started = true; } } else { trigger.setAttribute('aria-label', 'Abrir Vicentinho, assistente TopBritas'); } };
    $('[data-chat-trigger]', wrapper).addEventListener('click', () => toggle(true));
    $('[data-chat-close]', wrapper).addEventListener('click', () => toggle(false));
    $('[data-chat-form]', wrapper).addEventListener('submit', (event) => { event.preventDefault(); const text = input.value.trim(); if (!text) return; add(text, 'user'); input.value = ''; setTimeout(() => reply(text), 220); });
    messages.addEventListener('click', (event) => { const button = event.target.closest('[data-chat-option]'); if (!button) return; add(button.dataset.chatOption, 'user'); setTimeout(() => reply(button.dataset.chatOption), 180); });
    $$('[data-open-chat]').forEach((button) => button.addEventListener('click', () => toggle(true)));
    addEventListener('keydown', (event) => { if (event.key === 'Escape') toggle(false); });
  }

  function init() {
    renderIcons();
    initHeader();
    initDeferredMedia();
    initReveal();
    initHeroSlideshow();
    initHeroMotion();
    initAutoCarousels();
    initCatalog();
    initChat();
    renderIcons();
    $$('[data-current-year]').forEach((node) => { node.textContent = new Date().getFullYear(); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
