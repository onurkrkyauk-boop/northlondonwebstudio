/* =============================================
   North London Web Studio — script.js
   ============================================= */

/* --- Scroll Reveal --- */
const revealItems = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.12 }
);

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${index * 0.06}s`;
  revealObserver.observe(item);
});

/* --- Footer Year --- */
document.getElementById('year').textContent = new Date().getFullYear();
