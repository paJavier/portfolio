const hamburger = document.getElementById("hamburger");
const navCenter = document.getElementById("nav-center");
const navLinks = document.getElementById("nav-links");
const themeBtn = document.getElementById("theme-toggle");

// Hamburger toggle
hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navCenter.classList.toggle("active");
});

// Close menu on link click
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navCenter.classList.remove("active");
        hamburger.classList.remove("active");
    });
});

// Dark mode toggle
themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
        themeBtn.textContent = "☀️ Light Mode";
    } else {
        themeBtn.textContent = "🌙 Dark Mode";
    }
});

// ===================== Circuit Background =====================
const canvas = document.getElementById("tech-circuit");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const lines = [];
const lineCount = 50;

for (let i = 0; i < lineCount; i++) {
    lines.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        length: Math.random() * 80 + 50,
        angle: Math.random() * 2 * Math.PI,
        speed: Math.random() * 0.5 + 0.2
    });
