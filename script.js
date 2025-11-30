/* =====================
   BURGER MENU + ACCESSIBILITY
===================== */
const burger = document.getElementById('burger');
const navPanel = document.getElementById('nav-panel');
const navLinksDesktop = document.querySelectorAll('.nav-links a');
const navPanelLinks = document.querySelectorAll('.nav-panel a');

function closeNavPanel(){ navPanel.classList.remove('open'); navPanel.setAttribute('aria-hidden','true'); }
function openNavPanel(){ navPanel.classList.add('open'); navPanel.setAttribute('aria-hidden','false'); }

burger.addEventListener('click', (e) => {
  e.stopPropagation();
  if(navPanel.classList.contains('open')) closeNavPanel(); else openNavPanel();
});

document.addEventListener('click', (e) => {
  if(navPanel.classList.contains('open') && !navPanel.contains(e.target) && !burger.contains(e.target)){
    closeNavPanel();
  }
});

navPanelLinks.forEach(a=>a.addEventListener('click', closeNavPanel));
navLinksDesktop.forEach(a=>a.addEventListener('click', ()=>{}));

const burgerSpans = burger.querySelectorAll('span');
new MutationObserver(()=> {
  const open = navPanel.classList.contains('open');
  burgerSpans.forEach((s,i)=>{
    if(open){
      s.style.transform = i===1 ? 'scaleX(0)' : (i===0 ? 'translateY(8px) rotate(45deg)' : 'translateY(-8px) rotate(-45deg)');
      s.style.background = 'linear-gradient(90deg,var(--pink),var(--vio))';
    } else {
      s.style.transform = '';
      s.style.background = 'var(--pink)';
    }
  });
}).observe(navPanel, {attributes:true,attributeFilter:['class']});

/* =====================
   THEME TOGGLE
===================== */
const themeBtn = document.getElementById('theme-btn');
let darkMode = false; 
function updateThemeBtn(){
  themeBtn.innerHTML = darkMode ? '<i class="fa-solid fa-sun"></i><span>Light Mode</span>' : '<i class="fa-solid fa-moon"></i><span>Dark Mode</span>';
}
updateThemeBtn();
themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  document.body.classList.toggle('light-mode');
  darkMode = !darkMode;
  updateThemeBtn();
});

/* TYPEWRITER EFFECT */
const typer = document.querySelector('.typing');
if(typer){
  const text = typer.dataset.text || '';
  let idx = 0;
  function type(){
    typer.textContent = text.slice(0, idx);
    idx++;
    if(idx <= text.length) setTimeout(type, 70);
  }
  type();
}

/* PARTICLE BACKGROUND */
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext && canvas.getContext('2d');
let particles = [];
function resizeCanvas(){
  if(!ctx) return;
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

if(ctx){
  for(let i=0;i<70;i++){
    particles.push({
      x: Math.random()*canvas.width,
      y: Math.random()*canvas.height,
      r: Math.random()*2+1,
      vx: Math.random()*0.6-0.3,
      vy: Math.random()*0.6-0.3
    });
  }
  function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach(p=>{
      p.x += p.vx; p.y += p.vy;
      if(p.x<0||p.x>canvas.width) p.vx*=-1;
      if(p.y<0||p.y>canvas.height) p.vy*=-1;
      ctx.beginPath();
      ctx.fillStyle = 'rgba(255,99,216,0.95)';
      ctx.shadowBlur = 8; ctx.shadowColor='rgba(255,99,216,0.8)';
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
}

/* PROJECT SLIDER + MODAL */
const projectContainer = document.querySelector('.project-container');
const projects = document.querySelectorAll('.project');
const nextBtn = document.getElementById('nextProject');
const prevBtn = document.getElementById('prevProject');
const dotsContainer = document.querySelector('.slider-dots');
const modal = document.getElementById('modal');

let current = 0;

// build dots
projects.forEach((_,i)=>{
  const dot = document.createElement('button');
  dot.type='button';
  dot.className = i===0 ? 'dot active' : 'dot';
  dot.style.border = 'none'; dot.style.background='transparent'; dot.style.cursor='pointer';
  dot.addEventListener('click', ()=>{ current = i; updateSlider(); });
  const dotInner = document.createElement('span');
  dotInner.style.display='inline-block';
  dotInner.style.width='12px'; dotInner.style.height='12px';
  dotInner.style.borderRadius='50%';
  dotInner.style.background = i===0 ? 'linear-gradient(90deg,var(--pink),var(--vio))' : 'rgba(255,255,255,.28)';
  dotInner.dataset.index = i;
  dot.appendChild(dotInner);
  dotsContainer.appendChild(dot);
});

function refreshDots(){
  const spans = dotsContainer.querySelectorAll('span');
  spans.forEach((s,i)=> s.style.background = i===current ? 'linear-gradient(90deg,var(--pink),var(--vio))' : 'rgba(255,255,255,.28)');
}

function updateSlider(){
  projectContainer.style.transform = `translateX(-${current * 100}%)`;
  refreshDots();
}

nextBtn.addEventListener('click', ()=>{ current = (current + 1) % projects.length; updateSlider(); });
prevBtn.addEventListener('click', ()=>{ current = (current - 1 + projects.length) % projects.length; updateSlider(); });

// swipe
let startX = 0;
projectContainer.addEventListener('touchstart', (e)=> startX = e.touches[0].clientX, {passive:true});
projectContainer.addEventListener('touchend', (e)=>{
  let endX = e.changedTouches[0].clientX;
  if(startX - endX > 50) { current = (current+1) % projects.length; updateSlider(); }
  if(endX - startX > 50) { current = (current-1 + projects.length) % projects.length; updateSlider(); }
});

// modal
document.querySelectorAll('.project-images img').forEach(img=>{
  img.addEventListener('click', ()=>{ modal.innerHTML = `<img src="${img.src}" alt="">`; modal.classList.add('active'); });
});
modal.addEventListener('click', ()=> modal.classList.remove('active'));

// equal card heights
function equalizeCards(selector){
  const els = document.querySelectorAll(selector);
  let maxH = 0;
  els.forEach(el => { el.style.minHeight=''; const h = el.getBoundingClientRect().height; if(h>maxH) maxH = h; });
  els.forEach(el => el.style.minHeight = maxH + 'px');
}
window.addEventListener('load', ()=>{ equalizeCards('.skill-card'); equalizeCards('.cert-card'); setTimeout(()=>equalizeCards('.skill-card'),300) });
window.addEventListener('resize', ()=>{ equalizeCards('.skill-card'); equalizeCards('.cert-card') });

// escape to close modal/panel
document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape'){ modal.classList.remove('active'); closeNavPanel(); }});
