function toggleMenu() {
  const nav = document.querySelector(".nav-menu");
  nav.classList.toggle("show");
}
document.addEventListener('DOMContentLoaded', () => {
  const items     = Array.from(document.querySelectorAll('.gallery-item img'));
  const lightbox  = document.getElementById('lightbox');
  const lbImage   = document.getElementById('lbImage');
  const lbCaption = document.getElementById('lbCaption');
  const lbClose   = document.getElementById('lbClose');
  const lbPrev    = document.getElementById('lbPrev');
  const lbNext    = document.getElementById('lbNext');

  let current = 0;

  // ---------------------------
  // Fungsi Lightbox
  // ---------------------------

  function openLightbox(index) {
    current = index;
    const img = items[current];

    lbImage.src = img.src;
    lbCaption.textContent = img.alt || '';

    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    lbImage.src = '';
  }

  function showNext() {
    current = (current + 1) % items.length;
    openLightbox(current);
  }

  function showPrev() {
    current = (current - 1 + items.length) % items.length;
    openLightbox(current);
  }

  // ---------------------------
  // Event Thumbnail
  // ---------------------------

  items.forEach((img, index) => {
    img.addEventListener('click', () => openLightbox(index));
  });

  // ---------------------------
  // Event Button Lightbox
  // ---------------------------

  lbClose.addEventListener('click', closeLightbox);
  lbNext.addEventListener('click', (e) => { e.stopPropagation(); showNext(); });
  lbPrev.addEventListener('click', (e) => { e.stopPropagation(); showPrev(); });

  // Tutup jika klik area gelap
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (lightbox.getAttribute('aria-hidden') === 'false') {
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft')  showPrev();
      if (e.key === 'Escape')     closeLightbox();
    }
  });
});

// ---------------------------
// Audio Autoplay
// ---------------------------

window.addEventListener('load', () => {
  const audio = document.getElementById('bgm');
  audio.volume = 0.4;

  audio.play().catch(() => {
    console.log("Autoplay diblokir, perlu interaksi pengguna.");
  });

});
