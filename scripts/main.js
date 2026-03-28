const section = document.querySelector('.hero');

section.addEventListener('mousemove', (e) => {
    // Логика смещения background-position
    const x = (e.clientX / window.innerWidth) * 20;
    const y = (e.clientY / window.innerHeight) * 20;
    section.style.backgroundPosition = `${x}% ${y}%`;
});

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



document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.cards-section__track');
    const cards = Array.from(track.querySelectorAll('.cards-section__card'));
    const nextBtn = document.querySelector('.cards-section__btn[aria-label="Next"]');
    const prevBtn = document.querySelector('.cards-section__btn[aria-label="Previous"]');

    // Элементы текста
    const textTitle = document.getElementById('card-title');
    const textSubtitle = document.getElementById('card-subtitle');
    const textDesc = document.getElementById('card-desc');

    let currentIndex = 0;
    const duration = 400;

    function updateText(index) {
        const card = cards[index];
        // Плавное исчезновение текста (опционально)
        textTitle.style.opacity = 0;
        textSubtitle.style.opacity = 0;
        textDesc.style.opacity = 0;

        setTimeout(() => {
            textSubtitle.textContent = card.dataset.subtitle;
            textTitle.textContent = card.dataset.title;
            textDesc.textContent = card.dataset.desc;

            textTitle.style.opacity = 1;
            textSubtitle.style.opacity = 1;
            textDesc.style.opacity = 1;
        }, 200);
    }

    function updateClasses() {
        cards.forEach((card, index) => {
            card.className = 'cards-section__card'; // Сброс
            if (index === currentIndex) {
                card.classList.add('cards-section__card--active');
            } else if (index === (currentIndex + 1) % cards.length) {
                card.classList.add('cards-section__card--next');
            }
        });
        updateText(currentIndex);
    }

    function goNext() {
        const activeCard = cards[currentIndex];
        activeCard.classList.add('cards-section__card--exit');

        // Бесконечный цикл
        currentIndex = (currentIndex + 1) % cards.length;
        updateClasses();

        setTimeout(() => {
            activeCard.classList.remove('cards-section__card--exit');
        }, duration);
    }

    function goPrev() {
        // Бесконечный цикл назад
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        updateClasses();
    }

    // Добавляем плавность тексту в CSS
    [textTitle, textSubtitle, textDesc].forEach(el => {
        el.style.transition = 'opacity 0.2s ease';
    });

    nextBtn?.addEventListener('click', goNext);
    prevBtn?.addEventListener('click', goPrev);

    updateClasses(); // Инициализация
});


// FAQ Accordion
document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-section__item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-section__question');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Закрываем все остальные
            faqItems.forEach(i => {
                i.classList.remove('active');
                i.querySelector('.faq-section__question').setAttribute('aria-expanded', 'false');
            });

            // Если не был активен - открываем
            if (!isActive) {
                item.classList.add('active');
                question.setAttribute('aria-expanded', 'true');
            }
        });
    });
});



let center = [56.63178397404494, 47.8385803693218];

function init() {
    let map = new ymaps.Map('map-test', {
        center: center,
        zoom: 16,
    });

    // Удаляем лишние контролы
    map.controls.remove('geolocationControl');
    map.controls.remove('searchControl');
    map.controls.remove('trafficControl');
    map.controls.remove('typeSelector');
    map.controls.remove('fullscreenControl');
    map.controls.remove('zoomControl');
    map.controls.remove('rulerControl');
    map.behaviors.disable(['scrollZoom']);

    // Добавляем метку с кастомной иконкой
    let myPlacemark = new ymaps.Placemark(center, {
        hintContent: 'Quattra',
        balloonContent: 'Название организации'
    }, {
        iconLayout: 'default#image',
        iconImageHref: './icons/9.png', // Путь к твоей иконке
        iconImageSize: [60, 60],             // Размер иконки [ширина, высота]
        iconImageOffset: [-20, -20]          // Смещение: центр иконки к координате
    });

    map.geoObjects.add(myPlacemark);
}

ymaps.ready(init);