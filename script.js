/* =====================
   BURGER MENU
===================== */
const burger = document.querySelector(".burger");
const navLinks = document.querySelector(".nav-links");

burger.addEventListener("click", (e) => {
    e.stopPropagation();
    navLinks.classList.toggle("active");
});

document.addEventListener("click", (e) => {
    if (!navLinks.contains(e.target) && !burger.contains(e.target)) {
        navLinks.classList.remove("active");
    }
});

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => navLinks.classList.remove("active"));
});

/* =====================
   THEME TOGGLE
===================== */
const themeBtn = document.getElementById("theme-btn");
let darkMode = false;

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    document.body.classList.toggle("dark-mode");
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
    if (index <= text.length) setTimeout(type, 70);
}
type();

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

/* =====================
   PROJECT SLIDER + DOTS + MODAL + SWIPE
===================== */
const projectContainer = document.querySelector(".project-container");
const projects = document.querySelectorAll(".project");
const nextBtn = document.getElementById("nextProject");
const prevBtn = document.getElementById("prevProject");
const dotsContainer = document.querySelector(".slider-dots");

let current = 0;

// Initialize dots
projects.forEach((_, i) => {
    const dot = document.createElement("span");
    if(i===0) dot.classList.add("active");
    dot.addEventListener("click", () => { current = i; updateSlider(); });
    dotsContainer.appendChild(dot);
});

function updateSlider() {
    projectContainer.style.transform = `translateX(-${current * 100}%)`;
    document.querySelectorAll(".slider-dots span").forEach((dot,i) => {
        dot.classList.toggle("active", i===current);
    });
}

nextBtn.addEventListener("click", () => {
    current = (current + 1) % projects.length;
    updateSlider();
});
prevBtn.addEventListener("click", () => {
    current = (current - 1 + projects.length) % projects.length;
    updateSlider();
});

// Swipe for mobile
let startX = 0;
projectContainer.addEventListener("touchstart", (e) => { startX = e.touches[0].clientX; });
projectContainer.addEventListener("touchend", (e) => {
    let endX = e.changedTouches[0].clientX;
    if(startX - endX > 50) { current = (current+1)%projects.length; updateSlider();}
    if(endX - startX > 50) { current = (current-1+projects.length)%projects.length; updateSlider();}
});

// Modal
const modal = document.createElement("div");
modal.classList.add("modal");
document.body.appendChild(modal);

document.querySelectorAll(".project-images img").forEach(img => {
    img.addEventListener("click", () => {
        modal.innerHTML = `<img src="${img.src}" alt="">`;
        modal.classList.add("active");
    });
});
modal.addEventListener("click", () => modal.classList.remove("active"));
