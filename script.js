// =======================
// NAVIGATION + HAMBURGER
// =======================
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");
const themeBtn = document.getElementById("theme-toggle");

// Hamburger toggle
hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
});

// Close menu after clicking a link
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        hamburger.classList.remove("active");
    });
});

// =======================
// DARK MODE TOGGLE
// =======================
themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        themeBtn.textContent = "☀️ Light Mode";
    } else {
        themeBtn.textContent = "🌙 Dark Mode";
    }
});

// =======================
// CIRCUIT BACKGROUND CANVAS
// =======================
const canvas = document.getElementById("tech-circuit");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();

window.addEventListener("resize", resizeCanvas);

// Circuit line animation
const lines = [];
const lineCount = 50;

for (let i = 0; i < lineCount; i++) {
    lines.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        length: Math.random() * 80 + 40,
        angle: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.6 + 0.3
    });
}

function drawCircuit() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const lineColor = document.body.classList.contains("dark-mode")
        ? "rgba(255,120,209,0.12)"   // brighter pink in dark mode
        : "rgba(250, 97, 240, 0.10)"; // soft pink in light mode

    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 1.4;

    lines.forEach(line => {
        const x2 = line.x + Math.cos(line.angle) * line.length;
        const y2 = line.y + Math.sin(line.angle) * line.length;

        ctx.beginPath();
        ctx.moveTo(line.x, line.y);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        // Update movement
        line.x += Math.cos(line.angle) * line.speed;
        line.y += Math.sin(line.angle) * line.speed;

        // Reset when out of screen
        if (
            line.x < -50 || line.x > canvas.width + 50 ||
            line.y < -50 || line.y > canvas.height + 50
        ) {
            line.x = Math.random() * canvas.width;
            line.y = Math.random() * canvas.height;
        }
    });

    requestAnimationFrame(drawCircuit);
}

drawCircuit();
