// NAV + HAMBURGER + OUTSIDE CLICK + DARK MODE + TYPING + CANVAS ANIMATION
const hamburger = document.getElementById("hamburger");
const navCenter = document.getElementById("nav-center");
const navLinks = document.querySelectorAll(".nav-links a");
const themeBtn = document.getElementById("theme-toggle");
const body = document.body;

// ---------- Hamburger open/close ----------
hamburger.addEventListener("click", (e) => {
  const expanded = hamburger.getAttribute("aria-expanded") === "true";
  hamburger.setAttribute("aria-expanded", String(!expanded));
  hamburger.classList.toggle("active");
  navCenter.classList.toggle("active");
  e.stopPropagation();
});

// close nav when clicking any link (mobile)
navLinks.forEach(a => a.addEventListener("click", () => {
  if (navCenter.classList.contains("active")) {
    navCenter.classList.remove("active");
    hamburger.classList.remove("active");
    hamburger.setAttribute("aria-expanded", "false");
  }
}));

// close mobile nav when clicking outside it
document.addEventListener("click", (e) => {
  if (!navCenter.classList.contains("active")) return;
  const clickInsideNav = navCenter.contains(e.target) || hamburger.contains(e.target);
  if (!clickInsideNav) {
    navCenter.classList.remove("active");
    hamburger.classList.remove("active");
    hamburger.setAttribute("aria-expanded", "false");
  }
});

// ---------- Dark mode toggle ----------
themeBtn.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  const isDark = body.classList.contains("dark-mode");
  themeBtn.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
});

// ---------- Typing effect for elements with .typing ----------
function typeText(el, text, delay = 40) {
  el.textContent = ""; // clear
  let i = 0;
  const timer = setInterval(() => {
    el.textContent += text.charAt(i);
    i++;
    if (i >= text.length) clearInterval(timer);
  }, delay);
}
document.addEventListener("DOMContentLoaded", () => {
  // run once for each element with class 'typing' (in order)
  const typingEls = document.querySelectorAll(".typing");
  typingEls.forEach((el, idx) => {
    const txt = el.textContent.trim();
    el.textContent = "";
    setTimeout(() => typeText(el, txt, 28), 400 + idx*220);
  });

  // attach data-text for glitch display (makes pseudo elements show)
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.setAttribute('data-text', a.textContent.trim());
  });
});

// ---------- Animated cyber circuit canvas ----------
const canvas = document.getElementById("tech-circuit");
const ctx = canvas.getContext("2d");
let W = canvas.width = window.innerWidth;
let H = canvas.height = window.innerHeight;
const lines = [];
const LINE_COUNT = Math.max(40, Math.floor((W*H)/60000)); // scale by screen area

function rand(min,max){ return Math.random()*(max-min)+min; }

function initLines(){
  lines.length = 0;
  for(let i=0;i<LINE_COUNT;i++){
    lines.push({
      x: rand(0,W),
      y: rand(0,H),
      len: rand(40,120),
      angle: rand(0,Math.PI*2),
      speed: rand(0.2,0.8),
      life: rand(80,240),
      hue: rand(280,320)
    });
  }
}
initLines();

function resize(){
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
  initLines();
}
window.addEventListener('resize', resize);

function drawCircuit(){
  // background subtle (we set CSS background on canvas element)
  ctx.clearRect(0,0,W,H);

  // stroke color changes with dark-mode
  const dark = body.classList.contains('dark-mode');
  const baseAlpha = dark ? 0.12 : 0.06;

  lines.forEach((L, i) => {
    const x2 = L.x + Math.cos(L.angle) * L.len;
    const y2 = L.y + Math.sin(L.angle) * L.len;

    // gradient stroke
    const g = ctx.createLinearGradient(L.x,L.y,x2,y2);
    if (dark) {
      g.addColorStop(0, 'rgba(255,120,209,'+ (baseAlpha*1.1) +')');
      g.addColorStop(1, 'rgba(148,52,116,'+ (baseAlpha*0.6) +')');
    } else {
      g.addColorStop(0, 'rgba(255, 120, 209,'+ (baseAlpha*1.2) +')');
      g.addColorStop(1, 'rgba(250, 97, 240,'+ (baseAlpha*0.5) +')');
    }

    ctx.strokeStyle = g;
    ctx.lineWidth = 1.1;
    ctx.beginPath();
    ctx.moveTo(L.x, L.y);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    // move
    L.x += Math.cos(L.angle) * L.speed;
    L.y += Math.sin(L.angle) * L.speed;

    // small angle wobble
    L.angle += Math.sin((performance.now()+i*37)/6000) * 0.004;

    // wrap
    if (L.x < -60 || L.x > W+60 || L.y < -60 || L.y > H+60) {
      L.x = rand(0,W);
      L.y = rand(0,H);
      L.len = rand(40,120);
      L.angle = rand(0,Math.PI*2);
    }
  });

  requestAnimationFrame(drawCircuit);
}
drawCircuit();

// Repaint immediately when theme toggles so colors update
const observer = new MutationObserver(() => { /* no-op but forces repaint via draw loop */ });
observer.observe(body, { attributes: true, attributeFilter: ['class'] });

// ---------- small accessibility niceties ----------
hamburger.setAttribute('aria-expanded', 'false');
themeBtn.setAttribute('aria-pressed', 'false');
