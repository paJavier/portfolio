/* ===== BACKGROUND CYBERPUNK PARTICLE EFFECT ===== */
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particles = [];

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 1;
    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = Math.random() * 1 - 0.5;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.2) this.size -= 0.02;
  }
  draw() {
    ctx.fillStyle = 'rgba(255, 90, 220, 0.8)';
    ctx.shadowBlur = 12;
    ctx.shadowColor = '#ff4fd8';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function initParticles() {
  particles = [];
  for (let i = 0; i < 120; i++) particles.push(new Particle());
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p) => {
    p.update();
    p.draw();
    if (p.size <= 0.2) particles.splice(particles.indexOf(p), 1);
  });
  if (particles.length < 120) particles.push(new Particle());
  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

/* Resize canvas */
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
});

/* ===== TYPEWRITER EFFECT FIXED (SMOOTHER) ===== */
const typewriterElement = document.getElementById('typewriter');
const messages = [
  "A Futuristic Developer",
  "A Creative Designer",
  "A Tech Explorer"
];
let msgIndex = 0;
let charIndex = 0;
let deleting = false;

function typewriter() {
  let currentMessage = messages[msgIndex];

  if (!deleting) {
    typewriterElement.textContent = currentMessage.slice(0, charIndex++);
    if (charIndex > currentMessage.length + 10) deleting = true;
  } else {
    typewriterElement.textContent = currentMessage.slice(0, charIndex--);
    if (charIndex === 0) {
      deleting = false;
      msgIndex = (msgIndex + 1) % messages.length;
    }
  }
  setTimeout(typewriter, deleting ? 60 : 80);
}
typewriter();

/* ===== BURGER MENU ===== */
const burger = document.querySelector('.burger');
const navList = document.querySelector('nav ul');

burger.addEventListener('click', () => {
  navList.classList.toggle('show');
});

document.addEventListener('click', (e) => {
  if (!burger.contains(e.target) && !navList.contains(e.target)) navList.classList.remove('show');
});

navList.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => navList.classList.remove('show'));
});

/* ===== DARK MODE ===== */
const modeToggle = document.getElementById('modeToggle');
let dark = false;

modeToggle.addEventListener('click', () => {
  dark = !dark;
  document.body.classList.toggle('dark-mode');
  modeToggle.textContent = dark ? "☀️ Light Mode" : "🌙 Dark Mode";
});

/* ===== PROJECT SLIDER ===== */
const projects = document.querySelectorAll('.project-item');
let current = 0;

document.getElementById('nextProject').onclick = () => {
  projects[current].classList.remove('active');
  current = (current + 1) % projects.length;
  projects[current].classList.add('active');
};
