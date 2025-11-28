const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");
const themeBtn = document.getElementById("theme-toggle");

// Hamburger toggle
hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
});

// Close menu on link click
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
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
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // line color based on dark mode
    const lineColor = document.body.classList.contains("dark-mode") 
        ? "rgba(255,120,209,0.12)"  // bright pink for dark mode
        : "rgba(255,77,224,0.08)";  // subtle pink for light mode

    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 1.2;

    lines.forEach(l => {
        const x2 = l.x + Math.cos(l.angle) * l.length;
        const y2 = l.y + Math.sin(l.angle) * l.length;

        ctx.beginPath();
        ctx.moveTo(l.x, l.y);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        // update position
        l.x += Math.cos(l.angle) * l.speed;
        l.y += Math.sin(l.angle) * l.speed;

        // reset if out of bounds
        if (l.x > canvas.width || l.x < 0 || l.y > canvas.height || l.y < 0) {
            l.x = Math.random() * canvas.width;
            l.y = Math.random() * canvas.height;
        }
    });

    requestAnimationFrame(draw);
}

draw();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
