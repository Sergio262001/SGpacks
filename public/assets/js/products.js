// public/assets/js/products.js
const WOMPI_LINK = "https://checkout.wompi.co/l/test_Os9ouV";

window.SG_PRODUCTS = [
  {
    id: "ps-brush-neo",
    title: "Pack Pinceles Photoshop — Neo Ink",
    shortDesc: "Trazos tipo tinta, sombreado y detalles rápidos.",
    longDesc:
      "Incluye pinceles optimizados para lineart, sombras suaves y texturas tipo tinta. Ideal para pósters, lettering y concept art.",
    priceCOP: 29000,
    isFree: false,
    wompiLink: WOMPI_LINK,

    badge: "Más vendido",
    category: "Photoshop",

    cover: "assets/img/pack1.jpg",
    driveUrl: "https://drive.google.com/drive/folders/DRIVE_PACK_1",

    includes: ["120 pinceles .ABR", "Guía rápida PDF", "5 samples PNG"],
    compatibility: ["Photoshop CC 2019+", "Windows / Mac"],
  },

  {
    id: "transitions-pro",
    title: "Transiciones Pro (Video)",
    shortDesc: "Transiciones suaves + SFX listos para editar.",
    longDesc:
      "Pack de transiciones profesionales para mejorar tus ediciones. Incluye sonidos y guía de uso para Premiere y After Effects.",
    priceCOP: 45000,
    isFree: false,
    wompiLink: WOMPI_LINK,

    badge: "Nuevo",
    category: "Video",

    cover: "assets/img/pack3.jpg",
    driveUrl: "https://drive.google.com/drive/folders/DRIVE_PACK_3",

    includes: ["60 transiciones", "SFX incluidos", "Guía de uso"],
    compatibility: ["Premiere Pro", "After Effects"],
  },
];
