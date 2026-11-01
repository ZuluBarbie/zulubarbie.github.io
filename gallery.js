// Delegation also supports the gallery cloned into the Quick look dialog.
document.addEventListener('click', event => {
  const button = event.target.closest('[data-gallery-photo]');
  if (!button) return;
  const gallery = button.closest('.photo-demo');
  const image = gallery.querySelector('.demo-image');
  const thumbnail = button.querySelector('img');
  image.src = button.dataset.galleryPhoto;
  image.alt = thumbnail.alt;
  gallery.querySelector('.demo-full').href = image.src;
  gallery.querySelector('.demo-caption').textContent = button.dataset.caption;
  gallery.querySelectorAll('[data-gallery-photo]').forEach(item => {
    item.setAttribute('aria-pressed', String(item === button));
  });
});
