const burgers = document.querySelectorAll('.burger');
const sidebar = document.querySelector('.sidebar');

const setState = (isOpen) => {
    sidebar.classList.toggle('active', isOpen);
    burgers.forEach(btn => btn.classList.toggle('active', isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
};

// Клик по любой бургер-кнопке
burgers.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        setState(!sidebar.classList.contains('active'));
    });
});

// Клик вне сайдбара и вне кнопок
document.addEventListener('click', (e) => {
    if (sidebar.classList.contains('active') &&
        !sidebar.contains(e.target) &&
        !e.target.closest('.burger')) {
        setState(false);
    }
});

// Закрытие по Esc
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('active')) {
        setState(false);
    }
});