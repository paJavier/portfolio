// ===================== NAVBAR =====================
const hamburger = document.getElementById('hamburger');
const navCenter = document.getElementById('nav-center');
const navLinks = document.querySelectorAll('.nav-links a');
const themeBtn = document.getElementById('theme-toggle');
const body = document.body;

// Hamburger toggle
hamburger.addEventListener('click', (e) => {
  const expanded = hamburger.getAttribute('aria-expanded') === 'true';
  hamburger.setAttribute('aria-expanded', String(!expanded));
  hamburger.classList.toggle('active');
  navCenter.classList.toggle('active');
  navCenter.setAttribute('aria-hidden', String(!navCenter.classList.contains('active')));
  e.stopPropagation();
});

// Close nav on link click
navLinks.forEach(a => a.addEventListener('click', () => {
  if (navCenter.classList.contains('active')) {
    navCenter.classList.remove('active');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    navCenter.setAttribute('aria-hidden', 'true');
  }
}));

// Close nav when clicking outside
document.addEventListener('click', (e) => {
  if (!navCenter.classList.contains('active')) return;
  if (!navCenter.contains(e.target) && !hamburger.contains(e.target)) {
    navCenter.classList.remove('active');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    navCenter.setAttribute('aria-hidden', 'true');
  }
});

// ===================== DARK MODE =====================
themeBtn.addEventListener('click', () => {
  const isDark = body.classList.toggle('dark-mode');
  themeBtn.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
  themeBtn.setAttribute('aria-pressed', String(isDark));
});

// ===================== TYPING ANIMATION =====================
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
    setTimeout(() => typeLoop(el, txt, 28, 1100), 400 + idx * 250);
  });
});

// ===================== CYBERPUNK BACKGROUND =====================
const canvas = document.getElementById('tech-circuit');
const ctx = canvas.getContext('2d');
let W = canvas.width = window.innerWidth;
let H = canvas.height = window.innerHeight;

function rand(min, max){ return Math.random()*(max-min)+min }

let lines = [];
function initLines(){
  lines = [];
  const count = Math.max(40, Math.floor((W*H)/100000));
  for (let i=0;i<count;i++){
    lines.push({
      x: rand(0,W), y: rand(0,H),
      len: rand(40,140), angle: rand(0,Math.PI*2),
      speed: rand(0.2,0.8), hue: rand(300,345)
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
  lines.forEach(L=>{
    const x2 = L.x + Math.cos(L.angle)*L.len;
    const y2 = L.y + Math.sin(L.angle)*L.len;
    const g = ctx.createLinearGradient(L.x,L.y,x2,y2);
    if(dark){
      g.addColorStop(0, `rgba(255,120,209,${baseAlpha})`);
      g.addColorStop(1, `rgba(148,52,116,${baseAlpha*0.6})`);
    } else {
      g.addColorStop(0, `rgba(255,120,209,${baseAlpha*1.2})`);
      g.addColorStop(1, `rgba(250,97,240,${baseAlpha*0.5})`);
    }
    ctx.strokeStyle = g; ctx.lineWidth = 1.1;
    ctx.beginPath(); ctx.moveTo(L.x,L.y); ctx.lineTo(x2,y2); ctx.stroke();
    L.x += Math.cos(L.angle)*L.speed; 
    L.y += Math.sin(L.angle)*L.speed;
    L.angle += Math.sin((performance.now()+L.x)/6000)*0.003;
    if(L.x<-80 || L.x>W+80 || L.y<-80 || L.y>H+80){
      L.x = rand(0,W); L.y = rand(0,H);
    }
  });
  requestAnimationFrame(drawLines);
}
drawLines();

// ===================== PROFILE PARTICLES (HOLOGRAM) =====================
const pCanvas = document.getElementById('profile-particles');
const pCtx = pCanvas?.getContext('2d');

function resizeProfileCanvas(){
  if(!pCanvas) return;
  const wrapper = document.querySelector('.profile-wrapper');
  const rect = wrapper.getBoundingClientRect();
  pCanvas.width = Math.round(rect.width);
  pCanvas.height = Math.round(rect.height);
  pCanvas.style.width = rect.width + 'px';
  pCanvas.style.height = rect.height + 'px';
}
resizeProfileCanvas();
window.addEventListener('resize', resizeProfileCanvas);

let particles = [];
function spawnParticle(w,h){
  return {
    x: Math.random()*w,
    y: Math.random()*h,
    vx:(Math.random()-0.5)*0.3,
    vy:-Math.random()*0.5-0.2,
    life:Math.random()*60+40,
    size:Math.random()*2.4+0.6,
    hue:310+Math.random()*30
  };
}

function updateParticles(){
  if(!pCtx) return;
  const w=pCanvas.width,h=pCanvas.height;
  pCtx.clearRect(0,0,w,h);
  if(particles.length<40){
    for(let i=0;i<2;i++) particles.push(spawnParticle(w,h));
  }
  particles.forEach((p,i)=>{
    p.x += p.vx; p.y += p.vy; p.life -=1;
    const alpha = Math.max(0,p.life/120);
    pCtx.beginPath();
    const grd = pCtx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.size*6);
    grd.addColorStop(0, `rgba(255,180,230,${alpha})`);
    grd.addColorStop(1, `rgba(210,80,170,0)`);
    pCtx.fillStyle = grd;
    pCtx.fillRect(p.x - p.size*3, p.y - p.size*3, p.size*6, p.size*6);
    if(p.life<=0 || p.y<-20) particles.splice(i,1);
  });
  requestAnimationFrame(updateParticles);
}
updateParticles();

// subtle flicker loop for profile wrapper
(function flickerLoop(){
  const wrapper = document.querySelector('.profile-wrapper');
  if(!wrapper) return;
  const intensity = 0.06 + Math.random()*0.14;
  wrapper.style.boxShadow = `0 18px 60px rgba(255,120,209,${intensity})`;
  setTimeout(flickerLoop, 800 + Math.random()*900);
})();

// ===================== LIGHTBOX / SWIPE GALLERY =====================
const lightbox = document.getElementById('lightbox');
const lbImg = document.querySelector('.lb-img');
const lbCaption = document.querySelector('.lb-caption');
const lbClose = document.querySelector('.lb-close');
const lbPrev = document.querySelector('.lb-prev');
const lbNext = document.querySelector('.lb-next');

const thumbs = Array.from(document.querySelectorAll('.thumb-card img'));
const galleries = {};

thumbs.forEach(img=>{
  const gallery = img.dataset.gallery||'default';
  const idx = Number(img.dataset.index||0);
  galleries[gallery] = galleries[gallery]||[];
  galleries[gallery][idx] = { src: img.src, caption: img.alt||'' };
});

let currentGallery = null;
let currentIndex = 0;

function openLightbox(gallery, index){
  currentGallery = gallery; currentIndex = index;
  const item = galleries[gallery][index];
  if(!item) return;
  lbImg.src = item.src;
  lbCaption.textContent = item.caption;
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden','false');
}

function closeLightbox(){
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden','true');
}

function showPrev(){
  const arr = galleries[currentGallery]; if(!arr) return;
  currentIndex = (currentIndex -1 + arr.length)%arr.length;
  lbImg.src = arr[currentIndex].src; lbCaption.textContent = arr[currentIndex].caption;
}

function showNext(){
  const arr = galleries[currentGallery]; if(!arr) return;
  currentIndex = (currentIndex +1)%arr.length;
  lbImg.src = arr[currentIndex].src; lbCaption.textContent = arr[currentIndex].caption;
}

thumbs.forEach(img=>{
  img.addEventListener('click', ()=> {
    openLightbox(img.dataset.gallery, Number(img.dataset.index));
  });
});

lbClose.addEventListener('click', closeLightbox);
lbPrev.addEventListener('click', showPrev);
lbNext.addEventListener('click', showNext);

lightbox.addEventListener('click', (e)=> { if(e.target===lightbox) closeLightbox(); });

// Keyboard nav
document.addEventListener('keydown', (e)=>{
  if(!lightbox.classList.contains('open')) return;
  if(e.key==='Escape') closeLightbox();
  if(e.key==='ArrowLeft') showPrev();
  if(e.key==='ArrowRight') showNext();
});

// Touch swipe
let startX = 0;
lightbox.addEventListener('touchstart', e=> { startX = e.changedTouches[0].clientX; }, {passive:true});
lightbox.addEventListener('touchend', e=> {
  const dx = e.changedTouches[0].clientX - startX;
  if(dx>40) showPrev();
  else if(dx<-40) showNext();
}, {passive:true});

// ===================== REDUCE MOTION =====================
const media = window.matchMedia('(prefers-reduced-motion: reduce)');
if(media.matches) document.querySelectorAll('*').forEach(el => el.style.animation='none');
