// Smooth scroll animations with Intersection Observer
export function initScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  animatedElements.forEach(el => observer.observe(el));
}

// FAQ Accordion functionality
export function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const header = item.querySelector('.faq-item__header');
    
    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });
      
      // Toggle current item
      item.classList.toggle('active', !isActive);
    });
  });
}

// Lenis smooth scroll initialization
export function initLenis() {
  import('@studio-freight/lenis').then(({ default: Lenis }) => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Make lenis available globally for debugging
    window.lenis = lenis;
  });
}

// Initialize all modules
document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initFAQ();
  initLenis();
});
