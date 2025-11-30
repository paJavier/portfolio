// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navCenter = document.getElementById('nav-center');
const navLinks = document.querySelectorAll('.nav-links a');
const themeBtn = document.getElementById('theme-toggle');
const body = document.body;

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', String(!expanded));
    navCenter.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navCenter.classList.remove('active');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    });
});

document.addEventListener('click', (e) => {
    if (!navCenter.classList.contains('active')) return;
    const inside = navCenter.contains(e.target) || hamburger.contains(e.target);
    if (!inside) {
        navCenter.classList.remove('active');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    }
});

// Dark mode
themeBtn.addEventListener('click', () => {
    const dark = body.classList.toggle('dark-mode');
    themeBtn.textContent = dark ? '☀️ Light Mode' : '🌙 Dark Mode';
});

// Typing animation
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

document.querySelectorAll('.typing').forEach((el, idx) => {
    const text = el.getAttribute('data-text') || el.textContent;
    setTimeout(() => typeLoop(el, text, 28, 1100), idx*400);
});

// Cyberpunk background lines
const canvas = document.getElementById('tech-circuit');
const ctx = canvas.getContext('2d');
let W = canvas.width = window.innerWidth;
let H = canvas.height = window.innerHeight;
function rand(min,max){return Math.random()*(max-min)+min;}

let lines = [];
function initLines(){
    lines = [];
    for(let i=0;i<Math.max(40,Math.floor((W*H)/100000));i++){
        lines.push({x:rand(0,W),y:rand(0,H),len:rand(40,140),angle:rand(0,Math.PI*2),speed:rand(0.2,0.8),hue:rand(300,345)});
    }
}
initLines();

function resizeCanvas(){
    W=canvas.width=window.innerWidth;
    H=canvas.height=window.innerHeight;
    initLines();
}
window.addEventListener('resize', resizeCanvas);

function drawLines() {
    ctx.clearRect(0, 0, W, H);
    const dark = body.classList.contains('dark-mode');
    const baseAlpha = dark ? 0.12 : 0.06;

    lines.forEach(L => {
        const x2 = L.x + Math.cos(L.angle) * L.len;
        const y2 = L.y + Math.sin(L.angle) * L.len;

        const g = ctx.createLinearGradient(L.x, L.y, x2, y2);

        if (dark) {
            g.addColorStop(0, `rgba(255,120,209,${baseAlpha})`);
            g.addColorStop(1, `rgba(249,97,240,${baseAlpha})`);
        } else {
            g.addColorStop(0, `rgba(255,120,209,${baseAlpha})`);
            g.addColorStop(1, `rgba(249,97,240,${baseAlpha})`);
        }

        ctx.strokeStyle = g;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(L.x, L.y);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        // Movement
        L.x += Math.cos(L.angle) * L.speed;
        L.y += Math.sin(L.angle) * L.speed;

        // Respawn when leaving screen
        if (L.x > W || L.x < 0 || L.y > H || L.y < 0) {
            L.x = rand(0, W);
            L.y = rand(0, H);
        }
    });

    requestAnimationFrame(drawLines);
}

drawLines();
