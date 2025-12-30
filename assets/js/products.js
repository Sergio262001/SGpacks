// assets/js/products.js
window.SG_PRODUCTS = [
  {
    id: "ps-brush-neo",
    title: "Pack Pinceles Photoshop — Neo Ink",
    shortDesc: "Trazos tipo tinta, sombreado y detalles rápidos.",
    longDesc:
      "Incluye pinceles optimizados para lineart, sombras suaves y texturas tipo tinta. Ideal para pósters, lettering y concept art. Incluye guía de instalación y ejemplos.",
    priceCOP: 29000,
    isFree: false,

    badge: "Más vendido",      // ✅ ESTE ES EL “LETRERO”
    category: "Photoshop",
    cover: "assets/img/pack1.jpg",
    gallery: ["assets/img/pack1.jpg", "assets/img/pack1b.jpg"],

    driveUrl: "https://drive.google.com/drive/folders/XXXX_PACK_1",
    includes: ["120 pinceles .ABR", "Guía rápida PDF", "5 samples PNG"],
    compatibility: ["Photoshop CC 2019+", "Windows / Mac"],
  },

  {
    id: "free-starter-pack",
    title: "Starter Pack (Gratis)",
    shortDesc: "Un pack básico para probar la calidad.",
    longDesc:
      "Incluye recursos básicos para que pruebes el flujo de instalación y calidad. Ideal para nuevos usuarios.",
    priceCOP: 0,
    isFree: true,

    badge: "Gratis",           // ✅ “LETRERO” GRATIS
    category: "Assets",
    cover: "assets/img/pack2.jpg",
    gallery: ["assets/img/pack2.jpg"],

    driveUrl: "https://drive.google.com/drive/folders/XXXX_FREE_PACK",
    includes: ["10 recursos", "Guía rápida"],
    compatibility: ["Photoshop / Illustrator / Canva"],
  },

  {
    id: "transitions-pro",
    title: "Transiciones Pro (Video)",
    shortDesc: "Transiciones suaves + SFX listos para editar.",
    longDesc:
      "Pack de transiciones profesionales para mejorar tus ediciones. Incluye sonidos y guía de uso para Premiere/AE.",
    priceCOP: 45000,
    isFree: false,

    badge: "Nuevo",            // ✅ otro letrero
    category: "Video",
    cover: "assets/img/pack3.jpg",
    gallery: ["assets/img/pack3.jpg"],

    driveUrl: "https://drive.google.com/drive/folders/XXXX_PACK_3",
    includes: ["60 transiciones", "SFX incluidos", "Instrucciones"],
    compatibility: ["Premiere Pro 2021+", "After Effects 2021+"],
  },
];
