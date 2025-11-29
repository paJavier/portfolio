// NAV + HAMBURGER + OUTSIDE CLICK + DARK MODE + TYPING + CANVAS (lines) + PROFILE PARTICLES

// elements
const hamburger = document.getElementById('hamburger');
const navCenter = document.getElementById('nav-center');
const navLinks = document.querySelectorAll('.nav-links a');
const themeBtn = document.getElementById('theme-toggle');
const body = document.body;

// HAMBURGER open/close + aria
hamburger.addEventListener('click', (e) => {
  const expanded = hamburger.getAttribute('aria-expanded') === 'true';
  hamburger.setAttribute('aria-expanded', String(!expanded));
  hamburger.classList.toggle('active');
  navCenter.classList.toggle('active');
  navCenter.setAttribute('aria-hidden', String(!navCenter.classList.contains('active')));
  e.stopPropagation();
});

// close nav when clicking a nav link (mobile)
navLinks.forEach(a => a.addEventListener('click', () => {
  if (navCenter.classList.contains('active')) {
    navCenter.classList.remove('active');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    navCenter.setAttribute('aria-hidden', 'true');
  }
}));

// close mobile nav clicking outside
document.addEventListener('click', (e) => {
  if (!navCenter.classList.contains('active')) return;
  const clickInside = navCenter.contains(e.target) || hamburger.contains(e.target);
  if (!clickInside) {
    navCenter.classList.remove('active');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    navCenter.setAttribute('aria-hidden', 'true');
  }
});

// DARK MODE toggle (full background)
themeBtn.addEventListener('click', () => {
  const isDark = body.classList.toggle('dark-mode');
  themeBtn.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
  themeBtn.setAttribute('aria-pressed', String(isDark));
  // small redraw for canvas handled by animation loop
});

// TYPING effect (looping for the two subtitle lines)
function typeLoop(el, text, speed = 28, pause = 1400) {
  let i = 0, forward = true;
  function step() {
    if (forward) {
      el.textContent = text.slice(0, i);
      i++;
      if (i > text.length) { forward = false; setTimeout(step, pause); return; }
    } else {
      i--;
      el.textContent = text.slice(0, i);
      if (i <= 0) { forward = true; setTimeout(step, 300); return; }
    }
    setTimeout(step, speed);
  }
  step();
}
document.addEventListener('DOMContentLoaded', () => {
  const typingEls = document.querySelectorAll('.typing');
  typingEls.forEach((el, idx) => {
    const txt = el.getAttribute('data-text') || el.textContent;
    setTimeout(() => typeLoop(el, txt, 28, 1200), 400 + idx * 300);
  });

  // set data-text on nav links for glitch pseudo-elements
  document.querySelectorAll('.nav-links a').forEach(a => a.setAttribute('data-text', a.textContent.trim()));
});


// ------------------ CYBER CIRCUIT CANVAS (background lines) ------------------
const canvas = document.getElementById('tech-circuit');
const ctx = canvas.getContext('2d');
let W = canvas.width = window.innerWidth;
let H = canvas.height = window.innerHeight;

function rand(min, max) { return Math.random() * (max - min) + min; }

let lines = [];
function initLines(){
  lines = [];
  const count = Math.max(50, Math.floor((W * H) / 90000));
  for (let i = 0; i < count; i++) {
    lines.push({
      x: rand(0, W),
      y: rand(0, H),
      len: rand(40, 140),
      angle: rand(0, Math.PI*2),
      speed: rand(0.2, 0.8),
      hue: rand(300, 345)
    });
  }
}
initLines();

function resizeCanvas(){
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
  initLines();
}
window.addEventListener('resize', resizeCanvas);

function drawLines(){
  ctx.clearRect(0,0,W,H);
  const dark = body.classList.contains('dark-mode');
  const baseAlpha = dark ? 0.12 : 0.06;

  lines.forEach((L) => {
    const x2 = L.x + Math.cos(L.angle) * L.len;
    const y2 = L.y + Math.sin(L.angle) * L.len;
    const g = ctx.createLinearGradient(L.x, L.y, x2, y2);
    if (dark) {
      g.addColorStop(0, `rgba(255,120,209,${baseAlpha})`);
      g.addColorStop(1, `rgba(148,52,116,${baseAlpha*0.6})`);
    } else {
      g.addColorStop(0, `rgba(255,120,209,${baseAlpha*1.2})`);
      g.addColorStop(1, `rgba(250,97,240,${baseAlpha*0.5})`);
    }
    ctx.strokeStyle = g;
    ctx.lineWidth = 1.1;
    ctx.beginPath();
    ctx.moveTo(L.x, L.y);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    // move + wobble
    L.x += Math.cos(L.angle) * L.speed;
    L.y += Math.sin(L.angle) * L.speed;
    L.angle += Math.sin((performance.now() + L.x) / 6000) * 0.003;
    if (L.x < -80 || L.x > W + 80 || L.y < -80 || L.y > H + 80) {
      L.x = rand(0, W);
      L.y = rand(0, H);
    }
  });
  requestAnimationFrame(drawLines);
}
drawLines();


// ------------------ PROFILE PARTICLES / NEON FLICKER ------------------
const pCanvas = document.getElementById('profile-particles');
const pCtx = pCanvas && pCanvas.getContext ? pCanvas.getContext('2d') : null;

function resizeProfileCanvas(){
  if (!pCanvas) return;
  const wrapper = document.querySelector('.profile-wrapper');
  const rect = wrapper.getBoundingClientRect();
  pCanvas.width = Math.round(rect.width);
  pCanvas.height = Math.round(rect.height);
  pCanvas.style.width = rect.width + 'px';
  pCanvas.style.height = rect.height + 'px';
}
resizeProfileCanvas();
window.addEventListener('resize', resizeProfileCanvas);

// particle system
let particles = [];
function spawnParticle(w,h){
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.3,
    vy: -Math.random() * 0.5 - 0.2,
    life: Math.random() * 60 + 40,
    size: Math.random() * 2.4 + 0.6,
    hue: 310 + Math.random() * 30
  };
}
function updateParticles(){
  if (!pCtx) return;
  const w = pCanvas.width, h = pCanvas.height;
  pCtx.clearRect(0,0,w,h);
  // spawn
  if (particles.length < 40) {
    for (let i=0;i<2;i++) particles.push(spawnParticle(w,h));
  }
  // draw
  particles.forEach((p, i) => {
    p.x += p.vx;
    p.y += p.vy;
    p.life -= 1;
    const alpha = Math.max(0, p.life / 120);
    pCtx.beginPath();
    const grd = pCtx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.size*6);
    grd.addColorStop(0, `rgba(255,180,230,${alpha})`);
    grd.addColorStop(1, `rgba(210,80,170,0)`);
    pCtx.fillStyle = grd;
    pCtx.fillRect(p.x - p.size*3, p.y - p.size*3, p.size*6, p.size*6);
    // remove dead
    if (p.life <= 0 || p.y < -20) particles.splice(i,1);
  });
  requestAnimationFrame(updateParticles);
}
updateParticles();

// small neon flicker on profile img outline (CSS handles main, but we'll nudge brightness)
(function flickerLoop(){
  const wrapper = document.querySelector('.profile-wrapper');
  if (!wrapper) return;
  const intensity = 0.06 + Math.random() * 0.12;
  wrapper.style.boxShadow = `0 18px 60px rgba(255,120,209,${intensity})`;
  setTimeout(flickerLoop, 1200 + Math.random()*900);
})();


// ensure profile canvas sized when image loads
const profileImg = document.getElementById('profile-img');
if (profileImg) profileImg.addEventListener('load', resizeProfileCanvas);

// accessibility: prefers-reduced-motion
const media = window.matchMedia('(prefers-reduced-motion: reduce)');
if (media.matches) {
  document.querySelectorAll('*').forEach(el => el.style.animation = 'none');
}
