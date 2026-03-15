/* =============================================
   North London Web Studio — script.js
   ============================================= */

/* --- Custom Cursor --- */
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
});

function animateCursor() {
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

document.querySelectorAll('a, button, .service-card, .stat-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width  = '18px';
    cursor.style.height = '18px';
    cursor.style.opacity = '0.7';
    ring.style.width  = '52px';
    ring.style.height = '52px';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width  = '10px';
    cursor.style.height = '10px';
    cursor.style.opacity = '1';
    ring.style.width  = '36px';
    ring.style.height = '36px';
  });
});

/* --- Nav Scroll --- */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

/* --- Particle Canvas --- */
const canvas = document.getElementById('canvas');
const ctx    = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const particles = Array.from({ length: 60 }, () => ({
  x:     Math.random() * canvas.width,
  y:     Math.random() * canvas.height,
  r:     Math.random() * 1.5 + 0.3,
  vx:    (Math.random() - 0.5) * 0.3,
  vy:    (Math.random() - 0.5) * 0.3,
  alpha: Math.random() * 0.5 + 0.1
}));

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0) p.x = canvas.width;
    if (p.x > canvas.width)  p.x = 0;
    if (p.y < 0) p.y = canvas.height;
    if (p.y > canvas.height) p.y = 0;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(200, 169, 110, ${p.alpha})`;
    ctx.fill();
  });

  /* connecting lines */
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx   = particles[i].x - particles[j].x;
      const dy   = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(200, 169, 110, ${0.08 * (1 - dist / 120)})`;
        ctx.lineWidth   = 0.5;
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(drawParticles);
}
drawParticles();

/* --- Scroll Reveal --- */
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));

/* --- EmailJS Contact Form --- */
/* ⬇️  Paste your three EmailJS values below */
const EMAILJS_PUBLIC_KEY  = 'H1IlLlLDCiTU5KSh6';
const EMAILJS_SERVICE_ID  = 'service_92uytkm';
const EMAILJS_TEMPLATE_ID = 'template_mrgt53c';

/* Load EmailJS SDK */
(function () {
  const script  = document.createElement('script');
  script.src    = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
  script.onload = () => emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  document.head.appendChild(script);
})();

function handleSend(btn) {
  /* Grab field values */
  const fields   = btn.closest('.contact-form').querySelectorAll('input, textarea');
  const name     = fields[0].value.trim();
  const email    = fields[1].value.trim();
  const business = fields[2].value.trim();
  const message  = fields[3].value.trim();

  /* Basic validation */
  if (!name || !email || !message) {
    btn.textContent = 'Please fill in all fields';
    btn.style.background = '#8b1a1a';
    btn.style.color = '#fff';
    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.style.background = '';
      btn.style.color = '';
    }, 2500);
    return;
  }

  /* Loading state */
  btn.textContent = 'Sending…';
  btn.disabled = true;
  btn.style.opacity = '0.7';

  /* Send via EmailJS */
  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
    from_name: name,
    from_email: email,
    business:  business || 'Not provided',
    message:   message
  })
  .then(() => {
    btn.textContent = 'Message Sent ✓';
    btn.style.background = '#2a6a3a';
    btn.style.color = '#fff';
    btn.style.opacity = '1';
    /* Clear fields */
    fields.forEach(f => f.value = '');
  })
  .catch(err => {
    console.error('EmailJS error:', err);
    btn.textContent = 'Failed — please try again';
    btn.style.background = '#8b1a1a';
    btn.style.color = '#fff';
    btn.style.opacity = '1';
    btn.disabled = false;
    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.style.background = '';
      btn.style.color = '';
    }, 3000);
  });
}

/* --- Footer Year --- */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();