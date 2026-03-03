const section = document.querySelector('.hero');

section.addEventListener('mousemove', (e) => {
    // Логика смещения background-position
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    section.style.backgroundPosition = `${x}% ${y}%`;
});