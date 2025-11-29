// NAVIGATION + HAMBURGER
const hamburger = document.getElementById("hamburger");
const navCenter = document.getElementById("nav-center");
const navLinks = document.getElementById("nav-links");
const themeBtn = document.getElementById("theme-toggle");

// Hamburger toggle (slide-in menu)
hamburger.addEventListener("click", () => {
  const expanded = hamburger.getAttribute("aria-expanded") === "true";
  hamburger.setAttribute("aria-expanded", !expanded);
  hamburger.classList.toggle("active");
  navCenter.classList.toggle("active");
});

// Close menu on nav link click
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navCenter.classList.remove("active");
    hamburger.classList.remove("active");
    hamburger.setAttribute("aria-expanded", "false");
  });
});

// DARK MODE TOGGLE
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const isDark = document.body.classList.contains("dark-mode");
  themeBtn.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
  themeBtn.setAttribute("aria-pressed", isDark ? "true" : "false");
});

// CIRCUIT BACKGROUND
const canvas = document.getElementById("tech-circuit");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const lines = [];
const lineCount = 60;
for (let i = 0; i < lineCount; i++) {
  lines.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    length: Math.random() * 90 + 30,
    angle: Math.random() * Math.PI * 2,
    speed: Math.random() * 0.7 + 0.2
  });
}

function drawCircuit() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const lineColor = document.body.classList.contains("dark-mode")
    ? "rgba(255,120,209,0.12)"
    : "rgba(250,97,240,0.08)";

  ctx.strokeStyle = lineColor;
  ctx.lineWidth = 1.25;

  lines.forEach(line => {
    const x2 = line.x + Math.cos(line.angle) * line.length;
    const y2 = line.y + Math.sin(line.angle) * line.length;

    ctx.beginPath();
    ctx.moveTo(line.x, line.y);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    // move
    line.x += Math.cos(line.angle) * line.speed;
    line.y += Math.sin(line.angle) * line.speed;

    // wrap / reset
    if (line.x < -60 || line.x > canvas.width + 60 || line.y < -60 || line.y > canvas.height + 60) {
      line.x = Math.random() * canvas.width;
      line.y = Math.random() * canvas.height;
    }
  });

  requestAnimationFrame(drawCircuit);
}
drawCircuit();
