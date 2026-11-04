/* ==========================================================================
   ICON-automotive · car-detail.js
   Arma la ficha completa (car.html) con los datos de js/cars-data.js.
   La dirección es car.html?id=ID_DEL_AUTO (el ID está en cars-data.js).
   ========================================================================== */
(function () {
  const root = document.getElementById("car-page");
  if (!root || typeof CARS === "undefined") return;

  const params = new URLSearchParams(location.search);
  const car = CARS.find((c) => c.id === params.get("id")) || CARS[0];
  const fmt = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
  document.title = `${car.brand} ${car.model} ${car.year} | ICON-automotive`;

  const others = CARS.filter((c) => c.id !== car.id);
  let index = 0;

  root.innerHTML = `
    <div class="container">
      <nav class="crumbs" aria-label="Ruta"><a href="index.html#catalogo">Catálogo</a> / ${car.brand} ${car.model}</nav>

      <div class="car-top">
        <div class="viewer">
          <div class="gallery__main">
            <img id="viewer-img" src="${car.images[0].src}" alt="${car.images[0].alt}">
            <button class="viewer__btn viewer__btn--prev" id="viewer-prev" aria-label="Foto anterior">‹</button>
            <button class="viewer__btn viewer__btn--next" id="viewer-next" aria-label="Foto siguiente">›</button>
            <span class="viewer__count" id="viewer-count" aria-live="polite"></span>
          </div>
          <div class="gallery__thumbs">
            ${car.images.map((im, i) => `<button class="gallery__thumb" data-i="${i}" aria-label="Ver foto ${i + 1}"><img src="${im.src}" alt="${im.alt}" loading="lazy"></button>`).join("")}
          </div>
        </div>

        <aside class="summary">
          <p class="detail__type">${car.type} · ${car.year}</p>
          <h1 class="summary__title">${car.brand} ${car.model}</h1>
          <p class="summary__price">${fmt.format(car.price)}</p>
          <div class="keystats">
            <div class="keystat"><strong>${car.specs.horsepower}</strong><span>Potencia</span></div>
            <div class="keystat"><strong>${car.specs.acceleration}</strong><span>0–100 km/h</span></div>
            <div class="keystat"><strong>${car.specs.topSpeed.split(" ")[0]} km/h</strong><span>Velocidad máx.</span></div>
            <div class="keystat"><strong>${car.specs.mileage}</strong><span>Kilometraje</span></div>
          </div>
          <div class="detail__actions">
            <a class="btn btn--gold" href="index.html?car=${car.id}#contacto">Solicitar información</a>
            <a class="btn btn--outline" href="index.html#catalogo">Volver al catálogo</a>
          </div>
        </aside>
      </div>

      <section class="car-block" aria-labelledby="b-desc">
        <h2 class="car-block__title" id="b-desc">Sobre este auto</h2>
        <p>${car.description}</p>
        <ul class="features features--spaced">${car.features.map((f) => `<li>${f}</li>`).join("")}</ul>
      </section>

      <section class="car-block" aria-labelledby="b-specs">
        <h2 class="car-block__title" id="b-specs">Especificaciones completas</h2>
        <div class="tables">
          <div class="table-card">
            <h3>Resumen</h3>
            <dl>${Object.keys(SPEC_LABELS).map((k) => `<div><dt>${SPEC_LABELS[k]}</dt><dd>${car.specs[k]}</dd></div>`).join("")}</dl>
          </div>
          ${car.details.map((g) => `
            <div class="table-card">
              <h3>${g.title}</h3>
              <dl>${g.rows.map((r) => `<div><dt>${r[0]}</dt><dd>${r[1]}</dd></div>`).join("")}</dl>
            </div>`).join("")}
        </div>
      </section>

      <section class="car-block" aria-labelledby="b-equip">
        <h2 class="car-block__title" id="b-equip">Equipamiento</h2>
        <div class="equip">
          ${car.equipment.map((g) => `<div class="equip__group"><h3>${g.title}</h3><ul>${g.items.map((i) => `<li>${i}</li>`).join("")}</ul></div>`).join("")}
        </div>
      </section>

      <div class="cta-band">
        <h2>¿Te interesa este auto?</h2>
        <p>Escribinos y coordinamos una visita o una prueba de manejo.</p>
        <a class="btn btn--gold" href="index.html?car=${car.id}#contacto">Solicitar información</a>
      </div>

      <section class="car-block" aria-labelledby="b-others">
        <h2 class="car-block__title" id="b-others">Otros modelos</h2>
        <div class="others">
          ${others.map((o) => `
            <a class="other" href="car.html?id=${o.id}">
              <span class="other__img"><img src="${o.images[0].src}" alt="${o.images[0].alt}" loading="lazy"></span>
              <span><strong>${o.brand} ${o.model}</strong><span>${fmt.format(o.price)}</span></span>
            </a>`).join("")}
        </div>
      </section>
    </div>`;

  /* Respaldo de imágenes rotas (se ve el degradado) */
  root.querySelectorAll("img").forEach((img) => {
    img.addEventListener("error", () => img.classList.add("is-broken"), { once: true });
    if (img.complete && img.naturalWidth === 0) img.classList.add("is-broken");
  });

  /* Visor de fotos */
  const main = document.getElementById("viewer-img");
  const count = document.getElementById("viewer-count");
  const thumbs = [...root.querySelectorAll(".gallery__thumb")];
  function show(n) {
    index = (n + car.images.length) % car.images.length;
    main.classList.remove("is-broken");
    main.src = car.images[index].src;
    main.alt = car.images[index].alt;
    count.textContent = `${index + 1} / ${car.images.length}`;
    thumbs.forEach((t, i) => t.classList.toggle("is-active", i === index));
  }
  document.getElementById("viewer-prev").addEventListener("click", () => show(index - 1));
  document.getElementById("viewer-next").addEventListener("click", () => show(index + 1));
  thumbs.forEach((t) => t.addEventListener("click", () => show(Number(t.dataset.i))));
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") show(index + 1);
    if (e.key === "ArrowLeft") show(index - 1);
  });
  let sx = 0;
  main.addEventListener("touchstart", (e) => { sx = e.touches[0].clientX; }, { passive: true });
  main.addEventListener("touchend", (e) => {
    const dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 50) show(index + (dx < 0 ? 1 : -1));
  }, { passive: true });
  show(0);
})();
