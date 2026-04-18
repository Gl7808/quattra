const mapBtn = document.querySelector('.button-map');
const mapOverlay = document.querySelector('.map-overlay');
const mapClose = document.querySelector('.map-overlay__close');

const toggleMap = (isOpen) => {
    mapOverlay.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
};

// Открытие по кнопке
mapBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMap(true);
});

// Закрытие по кнопке внутри
mapClose?.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMap(false);
});

// Закрытие по клику вне контента (но внутри оверлея)
mapOverlay?.addEventListener('click', (e) => {
    if (e.target === mapOverlay) {
        toggleMap(false);
    }
});

// Закрытие по Esc
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mapOverlay?.classList.contains('active')) {
        toggleMap(false);
    }
});