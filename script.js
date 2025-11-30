/* =====================
   BURGER MENU
===================== */
const burger = document.getElementById("burger");
const nav = document.getElementById("nav-links");

burger.addEventListener("click", () => {
    nav.classList.toggle("active");
});

// Close nav when clicking link
document.querySelectorAll(".nav-item").forEach(item => {
    item.addEventListener("click", () => nav.classList.remove("active"));
});

// Close nav on outside click
document.addEventListener("click", (e) => {
    if (!nav.contains(e.target) && !burger.contains(e.target)) {
        nav.classList.remove("active");
    }
});

/* =====================
   THEME TOGGLE
===================== */
const themeBtn = document.getElementById("theme-btn");
let darkMode = true;

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    darkMode = !darkMode;
    themeBtn.innerHTML = darkMode 
        ? `<i class="fa-solid fa-sun"></i><span>Light Mode</span>`
        : `<i class="fa-solid fa-moon"></i><span>Dark Mode</span>`;
});

/* =====================
   TYPEWRITER EFFECT
===================== */
const typer = document.querySelector(".typing");
const text = typer.getAttribute("data-text");

let index = 0;

function type() {
    typer.textContent = text.slice(0, index);
    index++;
    if (index <= text.length) {
        setTimeout(type, 70);
    }
}
type();

/* =====================
   PROJECT SLIDER
===================== */
const slider = document.getElementById("project-slider");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

nextBtn.addEventListener("click", () => {
    slider.scrollLeft += slider.clientWidth;
});

prevBtn.addEventListener("click", () => {
    slider.scrollLeft -= slider.clientWidth;
});

/* =====================
   PARTICLE BACKGROUND
===================== */
const canvas = document.getElementById("particle-canvas");
const ctx = canvas.getContext("2d");
let particles = [];

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();
window.onresize = resize;

for (let i = 0; i < 70; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: Math.random() * 0.6 - 0.3,
        speedY: Math.random() * 0.6 - 0.3
    });
}

function animateParticles() {
    ctx.clearRect(0,0,canvas.width,canvas.height);

    particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

        ctx.fillStyle = "#ff63d8";
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#ff63d8";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
    });

    requestAnimationFrame(animateParticles);
}
animateParticles();
