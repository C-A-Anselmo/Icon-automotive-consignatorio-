/* ==========================================================================
   ICON-automotive · main.js
   Comportamiento de la web: navegación, animaciones, catálogo, formulario.
   Funciona en index.html y también en car.html (cada bloque revisa si
   los elementos que necesita existen en la página).
   ========================================================================== */

/* --------------------------------------------------------------------------
   CONFIGURACIÓN DE IMÁGENES (editá acá)
   Cambiá la URL por una ruta local, por ejemplo "images/hero/hero.jpg".
   Tamaños recomendados: hero 1920x1080 · about 1000x1250.
   -------------------------------------------------------------------------- */
const IMAGES = {
  hero:  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1920&q=80",
  about: "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?auto=format&fit=crop&w=1000&q=80"
};
/* -------------------------------------------------------------------------- */

document.documentElement.classList.add("js");

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

/* Si una imagen no carga, se oculta y se ve el degradado esmeralda/negro del contenedor */
function attachFallback(img) {
  img.addEventListener("error", () => img.classList.add("is-broken"), { once: true });
  if (img.complete && img.naturalWidth === 0 && img.getAttribute("src")) img.classList.add("is-broken");
}

/* Imágenes definidas en IMAGES (hero y about) */
function initConfigImages() {
  $$("[data-img]").forEach((img) => {
    attachFallback(img);
    img.src = IMAGES[img.dataset.img] || "";
  });
}

/* Barra de navegación: transparente arriba, negra con borde dorado al bajar */
function initNav() {
  const nav = $("#nav");
  const toggle = $("#nav-toggle");
  if (!nav) return;
  const update = () => nav.classList.toggle("is-solid", window.scrollY > 40 || nav.dataset.nav === "solid");
  update();
  window.addEventListener("scroll", update, { passive: true });

  const setOpen = (open) => {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  };
  toggle.addEventListener("click", () => setOpen(!nav.classList.contains("is-open")));
  $$(".nav__link").forEach((a) => a.addEventListener("click", () => setOpen(false)));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setOpen(false); });
}

/* Resalta el link del menú según la sección visible (solo en index.html) */
function initActiveLinks() {
  const sections = $$("main section[id]");
  const links = $$(".nav__link");
  if (!sections.length || !$("#inicio")) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === `#${entry.target.id}`));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach((s) => obs.observe(s));
}

/* Efecto parallax suave en el fondo del hero */
function initParallax() {
  const bg = $(".hero__bg");
  if (!bg || reduceMotion) return;
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      if (window.scrollY < window.innerHeight) bg.style.setProperty("--parallax", `${window.scrollY * 0.25}px`);
      ticking = false;
    });
  }, { passive: true });
}

/* Aparición de elementos al hacer scroll */
function initReveal() {
  const items = $$(".reveal");
  if (!("IntersectionObserver" in window) || reduceMotion) { items.forEach((el) => el.classList.add("is-visible")); return; }
  const obs = new IntersectionObserver((entries, o) => {
    entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); o.unobserve(entry.target); } });
  }, { threshold: 0.12 });
  items.forEach((el) => obs.observe(el));
}

/* Contadores animados (usan data-count y data-suffix del HTML) */
function initCounters() {
  const counters = $$("[data-count]");
  if (!counters.length) return;
  const run = (el) => {
    const target = Number(el.dataset.count);
    const suffix = el.dataset.suffix || "";
    if (reduceMotion) { el.textContent = target.toLocaleString("es-AR") + suffix; return; }
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / 1600, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))).toLocaleString("es-AR") + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const obs = new IntersectionObserver((entries, o) => {
    entries.forEach((e) => { if (e.isIntersecting) { run(e.target); o.unobserve(e.target); } });
  }, { threshold: 0.6 });
  counters.forEach((c) => obs.observe(c));
}

/* --------------------------------------------------------------------------
   CATÁLOGO DINÁMICO (se arma con CARS de js/cars-data.js)
   -------------------------------------------------------------------------- */
function initCatalog() {
  const tabsBox = $("#catalog-tabs");
  const panel = $("#catalog-panel");
  if (!tabsBox || !panel || typeof CARS === "undefined") return;
  let current = 0;

  tabsBox.innerHTML = CARS.map((c, i) => `
    <button class="car-tab" role="tab" id="tab-${c.id}" data-index="${i}" aria-controls="catalog-panel"
            aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">
      <span class="car-tab__img"><img src="${c.images[0].src}" alt="${c.images[0].alt}" loading="lazy"></span>
      <span class="car-tab__info">
        <span class="car-tab__name">${c.brand} ${c.model}</span>
        <span class="car-tab__price">${money.format(c.price)}</span>
      </span>
    </button>`).join("");
  $$("img", tabsBox).forEach(attachFallback);

  const detailHTML = (c) => `
    <div class="detail">
      <div class="gallery">
        <div class="gallery__main"><img id="gallery-main" src="${c.images[0].src}" alt="${c.images[0].alt}"></div>
        <div class="gallery__thumbs">
          ${c.images.map((im, i) => `
            <button class="gallery__thumb${i === 0 ? " is-active" : ""}" data-thumb="${i}" aria-label="Ver foto ${i + 1} de ${c.images.length}">
              <img src="${im.src}" alt="${im.alt}" loading="lazy">
            </button>`).join("")}
        </div>
      </div>
      <div class="detail__info">
        <p class="detail__type">${c.type}</p>
        <h3 class="detail__title">${c.brand} ${c.model}</h3>
        <p class="detail__meta">Año ${c.year}</p>
        <p class="detail__price">${money.format(c.price)}</p>
        <p class="detail__desc">${c.description}</p>
        <dl class="specs">
          ${Object.keys(SPEC_LABELS).map((k) => `<div class="spec"><dt>${SPEC_LABELS[k]}</dt><dd>${c.specs[k]}</dd></div>`).join("")}
        </dl>
        <ul class="features">${c.features.map((f) => `<li>${f}</li>`).join("")}</ul>
        <div class="detail__actions">
          <button class="btn btn--gold" data-request="${c.id}">Solicitar información</button>
          <a class="btn btn--outline" href="car.html?id=${c.id}">Ver ficha completa</a>
        </div>
      </div>
    </div>`;

  function fillPanel() {
    const c = CARS[current];
    panel.setAttribute("aria-labelledby", `tab-${c.id}`);
    panel.innerHTML = detailHTML(c);
    $$("img", panel).forEach(attachFallback);
  }

  function select(i, focus = false) {
    i = (i + CARS.length) % CARS.length;
    const changed = i !== current;
    current = i;
    $$(".car-tab", tabsBox).forEach((t, idx) => {
      t.setAttribute("aria-selected", String(idx === i));
      t.tabIndex = idx === i ? 0 : -1;
    });
    if (focus) $$(".car-tab", tabsBox)[i].focus();
    if (!changed) return;
    if (reduceMotion) { fillPanel(); return; }
    panel.classList.add("is-leaving");
    setTimeout(() => {
      fillPanel();
      panel.classList.remove("is-leaving");
      panel.classList.add("is-entering");
      setTimeout(() => panel.classList.remove("is-entering"), 400);
    }, 200);
  }

  fillPanel();

  tabsBox.addEventListener("click", (e) => { const t = e.target.closest(".car-tab"); if (t) select(Number(t.dataset.index)); });
  tabsBox.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") { e.preventDefault(); select(current + 1, true); }
    if (e.key === "ArrowLeft") { e.preventDefault(); select(current - 1, true); }
  });

  panel.addEventListener("click", (e) => {
    const thumb = e.target.closest("[data-thumb]");
    if (thumb) {
      const im = CARS[current].images[Number(thumb.dataset.thumb)];
      const main = $("#gallery-main");
      main.classList.remove("is-broken");
      main.src = im.src;
      main.alt = im.alt;
      $$(".gallery__thumb", panel).forEach((b) => b.classList.toggle("is-active", b === thumb));
    }
    const req = e.target.closest("[data-request]");
    if (req) requestInfo(req.dataset.request);
  });

  /* Deslizar en el celular para cambiar de auto */
  let startX = 0;
  panel.addEventListener("touchstart", (e) => { startX = e.touches[0].clientX; }, { passive: true });
  panel.addEventListener("touchend", (e) => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 60) select(current + (dx < 0 ? 1 : -1));
  }, { passive: true });
}

/* "Solicitar información": baja al formulario y elige el auto */
function requestInfo(carId) {
  const select = $("#f-car");
  if (select) select.value = carId;
  const target = $("#contacto");
  if (target) target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  setTimeout(() => { const n = $("#f-name"); if (n) n.focus({ preventScroll: true }); }, reduceMotion ? 0 : 600);
}

/* Carrusel de testimonios */
function initCarousel() {
  const track = $("#carousel-track");
  if (!track) return;
  const slides = $$(".quote", track);
  const dotsBox = $("#carousel-dots");
  let i = 0;
  dotsBox.innerHTML = slides.map((_, n) => `<button class="carousel__dot" aria-label="Ir al testimonio ${n + 1}"></button>`).join("");
  const dots = $$(".carousel__dot", dotsBox);
  const go = (n) => {
    i = (n + slides.length) % slides.length;
    track.style.setProperty("--i", i);
    dots.forEach((d, k) => d.setAttribute("aria-current", String(k === i)));
    slides.forEach((s, k) => s.setAttribute("aria-hidden", String(k !== i)));
  };
  $("#carousel-prev").addEventListener("click", () => go(i - 1));
  $("#carousel-next").addEventListener("click", () => go(i + 1));
  dots.forEach((d, k) => d.addEventListener("click", () => go(k)));
  let sx = 0;
  track.addEventListener("touchstart", (e) => { sx = e.touches[0].clientX; }, { passive: true });
  track.addEventListener("touchend", (e) => {
    const dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 50) go(i + (dx < 0 ? 1 : -1));
  }, { passive: true });
  go(0);
}

/* Formulario de contacto: validación en el navegador (no envía datos a ningún servidor) */
function initForm() {
  const form = $("#contact-form");
  if (!form) return;
  const select = $("#f-car");
  select.innerHTML = `<option value="">Consulta general</option>` +
    CARS.map((c) => `<option value="${c.id}">${c.brand} ${c.model} (${c.year})</option>`).join("");

  /* Preselección si llegás desde la ficha: index.html?car=ID#contacto */
  const wanted = new URLSearchParams(location.search).get("car");
  if (wanted && CARS.some((c) => c.id === wanted)) select.value = wanted;

  const rules = {
    "f-name": (v) => (v.trim().length >= 2 ? "" : "Escribí tu nombre."),
    "f-email": (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? "" : "Escribí un email válido, por ejemplo nombre@correo.com."),
    "f-phone": (v) => (v.trim() === "" || /^[+\d\s()-]{7,}$/.test(v.trim()) ? "" : "Usá solo números, espacios, + o guiones (mínimo 7 dígitos)."),
    "f-message": (v) => (v.trim().length >= 10 ? "" : "Contanos un poco más (mínimo 10 caracteres).")
  };
  const check = (id) => {
    const input = $(`#${id}`);
    const msg = rules[id](input.value);
    $(`[data-error-for="${id}"]`).textContent = msg;
    input.closest(".form__field").classList.toggle("has-error", Boolean(msg));
    input.setAttribute("aria-invalid", String(Boolean(msg)));
    return !msg;
  };
  Object.keys(rules).forEach((id) => $(`#${id}`).addEventListener("blur", () => check(id)));

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const results = Object.keys(rules).map(check);
    const firstBad = Object.keys(rules).find((id) => $(`#${id}`).getAttribute("aria-invalid") === "true");
    if (firstBad) { $(`#${firstBad}`).focus(); return; }
    /* Acá iría el envío real (por ejemplo con Formspree). Por ahora solo mostramos el mensaje. */
    form.reset();
    $("#form-success").hidden = false;
    $("#form-success").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "nearest" });
    setTimeout(() => { $("#form-success").hidden = true; }, 8000);
  });
}

/* Año automático en el footer */
function initYear() { const y = $("#year"); if (y) y.textContent = new Date().getFullYear(); }

document.addEventListener("DOMContentLoaded", () => {
  initConfigImages();
  initNav();
  initActiveLinks();
  initParallax();
  initCatalog();
  initCarousel();
  initForm();
  initYear();
  initReveal();
  initCounters();
});
