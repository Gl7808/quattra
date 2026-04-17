export function initCyberHeroSlider() {
    const slider = document.querySelector('.cyber-hero__slider');
    if (!slider) return;

    const slides = slider.querySelectorAll('.cyber-hero__slide');
    const navBars = slider.querySelectorAll('.cyber-hero__nav-bar');
    const navCurrent = slider.querySelector('.cyber-hero__nav-current');
    const totalSlides = slides.length;
    let currentSlide = 0;
    let autoSlideInterval = null;

    // === Переключение слайдов ===
    function goToSlide(index) {
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;

        // Удаляем активный класс
        slides[currentSlide].classList.remove('cyber-hero__slide--active');
        navBars[currentSlide].classList.remove('cyber-hero__nav-bar--active');

        // Обновляем индекс
        currentSlide = index;

        // Добавляем активный класс
        slides[currentSlide].classList.add('cyber-hero__slide--active');
        navBars[currentSlide].classList.add('cyber-hero__nav-bar--active');

        // Обновляем счетчик
        if (navCurrent) {
            navCurrent.textContent = String(currentSlide + 1).padStart(2, '0');
        }
    }

    // === Клик по навигации ===
    navBars.forEach((bar, index) => {
        bar.addEventListener('click', () => {
            goToSlide(index);
            resetAutoSlide();
        });
    });

    // === Автопереключение (кроме 1го слайда с таймером) ===
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            if (currentSlide < totalSlides - 1) {
                goToSlide(currentSlide + 1);
            } else {
                goToSlide(0);
            }
        }, 6000);
    }


    // === Таймер обратного отсчета ===
    const timerElement = document.getElementById('tournament-timer');
    if (timerElement) {
        const tournamentDate = new Date();
        tournamentDate.setDate(tournamentDate.getDate() + 7); // +7 дней от текущей даты

        function updateTimer() {
            const now = new Date().getTime();
            const distance = tournamentDate.getTime() - now;

            if (distance < 0) {
                // Таймер истек
                timerElement.innerHTML = '<span class="cyber-hero__timer-ended">Турнир начался!</span>';
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            const daysEl = timerElement.querySelector('[data-days]');
            const hoursEl = timerElement.querySelector('[data-hours]');
            const minutesEl = timerElement.querySelector('[data-minutes]');
            const secondsEl = timerElement.querySelector('[data-seconds]');

            if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
            if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
            if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
            if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
        }

        updateTimer();
        setInterval(updateTimer, 1000);
    }

    // === Свайпы для мобильных ===
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const threshold = 50;
        if (touchStartX - touchEndX > threshold) {
            goToSlide(currentSlide + 1);
            resetAutoSlide();
        }
        if (touchEndX - touchStartX > threshold) {
            goToSlide(currentSlide - 1);
            resetAutoSlide();
        }
    }
}

document.addEventListener('DOMContentLoaded', initCyberHeroSlider);