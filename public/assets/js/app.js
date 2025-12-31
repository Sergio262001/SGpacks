// public/assets/js/app.js
const PRODUCTS = Array.isArray(window.SG_PRODUCTS) ? window.SG_PRODUCTS : [];

const formatCOP = (n) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP" }).format(
    Number(n || 0)
  );

const qs = (s) => document.querySelector(s);

function waUrl(text) {
  return `https://wa.me/573213116999?text=${encodeURIComponent(text)}`;
}

/* =========================
   WOMPI: 1 link + redirect por producto
   ========================= */
function wompiWithRedirect(p) {
  // OJO: usa tu dominio final (web.app está bien)
  const redirect = `https://sgpackspdf.web.app/success.html?pid=${encodeURIComponent(
    p.id
  )}`;

  // Un solo link en p.wompiLink (puede ser el mismo para todos)
  // Nota: el parámetro puede variar según configuración; aquí usamos redirect-url como tú pediste.
  return `${p.wompiLink}?redirect-url=${encodeURIComponent(redirect)}`;
}

/* =========================
   Estado (buscador + filtros)
   ========================= */
const state = {
  q: "",
  category: "Todos",
  onlyFree: false,
};

/* =========================
   WhatsApp global
   ========================= */
function setWhatsAppGlobal() {
  const a = qs("#waLink");
  if (a) a.href = waUrl("Hola! Tengo una duda sobre SG Packs");

  const top = qs("#waTop");
  if (top && a) top.href = a.href;
}

/* =========================
   Filtros
   ========================= */
function getCategories() {
  const cats = new Set(PRODUCTS.map((p) => p.category).filter(Boolean));
  return ["Todos", ...Array.from(cats)];
}

function renderFilters() {
  const el = qs("#filters");
  if (!el) return;

  const cats = getCategories();

  el.innerHTML = `
    ${cats
      .map(
        (c) => `
      <button class="chip ${state.category === c ? "active" : ""}" data-cat="${c}">
        ${c}
      </button>
    `
      )
      .join("")}

    <button class="chip ${state.onlyFree ? "active" : ""}" data-free="1">
      Gratis
    </button>
  `;

  el.onclick = (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;

    const cat = btn.getAttribute("data-cat");
    const free = btn.getAttribute("data-free");

    if (cat) state.category = cat;
    if (free) state.onlyFree = !state.onlyFree;

    renderFilters();
    renderGrid();
  };
}

function filteredProducts() {
  const q = state.q.trim().toLowerCase();

  return PRODUCTS.filter((p) => {
    if (state.onlyFree && !p.isFree) return false;
    if (state.category !== "Todos" && p.category !== state.category) return false;

    if (!q) return true;

    const haystack = [
      p.title,
      p.shortDesc,
      p.longDesc,
      p.category,
      ...(p.includes || []),
      ...(p.compatibility || []),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return haystack.includes(q);
  });
}

/* =========================
   Grid (index)
   ========================= */
function renderGrid() {
  const grid = qs("#grid");
  if (!grid) return;

  if (!Array.isArray(PRODUCTS) || PRODUCTS.length === 0) {
    grid.innerHTML = `<div class="hero-card">No hay packs cargados. Revisa <b>assets/js/products.js</b>.</div>`;
    return;
  }

  const list = filteredProducts();

  if (list.length === 0) {
    grid.innerHTML = `<div class="hero-card">No encontré resultados con esos filtros/búsqueda.</div>`;
    return;
  }

  grid.innerHTML = list
    .map((p) => {
      const buyHref =
        p.isFree || !p.wompiLink
          ? waUrl(`Hola! Estoy interesado en: ${p.title}. ¿Cómo lo obtengo?`)
          : wompiWithRedirect(p);

      const buyLabel = p.isFree ? "Pedir acceso" : "Pagar con Wompi";

      return `
        <article class="pack-card">
          <a href="product.html?id=${encodeURIComponent(p.id)}" aria-label="Ver detalles de ${p.title}">
            <img src="${p.cover}" alt="${p.title}">
          </a>

          <div class="pack-card-body">
            <div style="display:flex; align-items:flex-start; justify-content:space-between; gap:10px">
              <div class="meta"><span>${p.category || "Pack"}</span></div>
              ${p.badge ? `<span class="badge">${p.badge}</span>` : ``}
            </div>

            <h3 class="pack-card-title">${p.title}</h3>
            <p class="pack-card-desc">${p.shortDesc || "Pack digital listo para usar. Entrega por Drive."}</p>

            <div class="pack-card-bottom">
              ${
                p.isFree
                  ? `<span class="pack-price free">GRATIS</span>`
                  : `<span class="pack-price">${formatCOP(p.priceCOP)}</span>`
              }

              <div style="display:flex; gap:8px">
                <a class="btn btn-ghost btn-sm" href="product.html?id=${encodeURIComponent(p.id)}">Ver detalles</a>
                <a class="btn btn-primary btn-sm" href="${buyHref}" target="_blank" rel="noopener">
                  ${buyLabel}
                </a>
              </div>
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

/* =========================
   Buscador
   ========================= */
function initSearch() {
  const input = qs("#searchInput");
  if (!input) return;

  input.oninput = () => {
    state.q = input.value;
    renderGrid();
  };
}

/* =========================
   Página de producto (product.html)
   ========================= */
function renderProduct() {
  const el = qs("#product");
  if (!el) return;

  if (!Array.isArray(PRODUCTS) || PRODUCTS.length === 0) {
    el.innerHTML = `<div class="hero-card">No hay productos cargados.</div>`;
    return;
  }

  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  const p = PRODUCTS.find((x) => x.id === id) || PRODUCTS[0];

  const wa = qs("#waLink");
  if (wa) wa.href = waUrl(`Hola! Tengo una duda sobre el pack: ${p.title}`);

  const buyHref =
    p.isFree || !p.wompiLink
      ? waUrl(`Hola! Estoy interesado en: ${p.title}. ¿Cómo lo obtengo?`)
      : wompiWithRedirect(p);

  const buyLabel = p.isFree ? "Pedir acceso" : "Pagar con Wompi";

  el.innerHTML = `
    <div class="hero-card">
      <div style="display:grid; gap:14px; grid-template-columns: 1.05fr .95fr; align-items:start">
        <img src="${p.cover}" alt="${p.title}" style="width:100%; border-radius:16px; border:1px solid var(--border); background:rgba(255,255,255,.03); aspect-ratio:16/10; object-fit:cover">

        <div>
          <div class="meta" style="margin-bottom:8px">
            <span>${p.category || "Pack"}</span>
            ${p.badge ? `<span class="badge" style="margin-left:10px">${p.badge}</span>` : ""}
          </div>

          <h1 style="font-size:22px; margin:0 0 8px">${p.title}</h1>
          <p style="color:var(--muted); margin:0 0 12px">${p.shortDesc || ""}</p>

          <div style="display:flex; align-items:center; justify-content:space-between; gap:12px; flex-wrap:wrap">
            <div>
              <div style="color:var(--muted); font-size:12px">Precio</div>
              ${
                p.isFree
                  ? `<div style="font-size:22px; font-weight:900; color:#baf7d3">GRATIS</div>`
                  : `<div style="font-size:22px; font-weight:900">${formatCOP(p.priceCOP)}</div>`
              }
            </div>

            <div style="display:flex; gap:10px; flex-wrap:wrap">
              <a class="btn btn-primary" href="${buyHref}" target="_blank" rel="noopener">
                ${buyLabel}
              </a>
              <a class="btn btn-ghost" href="index.html#packs">Volver</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const more = qs("#productMore");
  if (!more) return;

  more.innerHTML = `
    <div class="hero-card">
      <h2 style="margin:0 0 10px; font-size:16px; color:var(--muted); font-weight:800">Detalles</h2>

      <p style="margin:0 0 14px; color:var(--text); opacity:.95; line-height:1.6">
        ${p.longDesc || "Descripción completa del pack."}
      </p>

      <div style="display:grid; gap:14px; grid-template-columns: 1fr 1fr">
        <div>
          <div style="color:var(--muted); font-size:12px; margin-bottom:8px">Qué incluye</div>
          <ul style="margin:0; padding-left:18px">
            ${(p.includes || []).map((x) => `<li>${x}</li>`).join("")}
          </ul>
        </div>

        <div>
          <div style="color:var(--muted); font-size:12px; margin-bottom:8px">Compatibilidad</div>
          <ul style="margin:0; padding-left:18px">
            ${(p.compatibility || []).map((x) => `<li>${x}</li>`).join("")}
          </ul>
        </div>
      </div>
    </div>
  `;
}

/* =========================
   INIT
   ========================= */
function init() {
  setWhatsAppGlobal();
  renderFilters();
  initSearch();
  renderGrid();
  renderProduct();
  console.log("SG_PRODUCTS loaded:", PRODUCTS);
}

document.addEventListener("DOMContentLoaded", init);
