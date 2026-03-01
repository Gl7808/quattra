import { mapStyle } from './quattra_map.js';

export function initMap() {
    if (!window.ymaps) return;

    window.ymaps.ready(() => {
        const map = new window.ymaps.Map("map", {
            center: [55.76, 37.64], // Москва
            zoom: 10,
            style: mapStyle //
        });
    });
}

initMap();


const el = document.querySelector('.hero__section');

el.addEventListener('mousemove', (e) => {
    // Переводим координаты мыши в проценты (0-100)
    const x = (e.clientX / window.innerWidth) * 20;
    const y = (e.clientY / window.innerHeight) * 20;

    el.style.backgroundPosition = `${x}% ${y}%`;
});