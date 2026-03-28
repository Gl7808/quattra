document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.features__slide');
    const prevBtn = document.querySelector('.features__btn--prev');
    const nextBtn = document.querySelector('.features__btn--next');
    const titleEl = document.querySelector('.features__title');
    const textEl = document.querySelector('.features__text');
    const subtitleEl = document.querySelector('.features__subtitle');

    // Данные для каждого слайда
    const contentData = [
        { subtitle: 'Этап 1', title: 'Заголовок слайда 1', text: 'Описание первого слайда.' },
        { subtitle: 'Этап 2', title: 'Заголовок слайда 2', text: 'Описание второго слайда.' },
        { subtitle: 'Этап 3', title: 'Заголовок слайда 3', text: 'Описание третьего слайда.' },
    ];

    let current = 0;

    const updateSlide = (index) => {
        slides.forEach((s, i) => s.classList.toggle('active', i === index));

        // Анимация текста (fade out/in)
        textEl.style.opacity = 0;
        setTimeout(() => {
            subtitleEl.textContent = contentData[index].subtitle;
            titleEl.textContent = contentData[index].title;
            textEl.textContent = contentData[index].text;
            textEl.style.opacity = 1;
        }, 200);
    };

    prevBtn?.addEventListener('click', () => {
        current = (current - 1 + slides.length) % slides.length;
        updateSlide(current);
    });

    nextBtn?.addEventListener('click', () => {
        current = (current + 1) % slides.length;
        updateSlide(current);
    });
});