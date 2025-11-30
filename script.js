/* =====================
   BURGER MENU
===================== */
const burger = document.querySelector(".burger");
const navLinks = document.querySelector(".nav-links");

burger.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent immediate outside click
    navLinks.classList.toggle("active");
});

// Close nav on outside click
document.addEventListener("click", (e) => {
    if (!navLinks.contains(e.target) && !burger.contains(e.target)) {
        navLinks.classList.remove("active");
    }
});

// Close nav on link click
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => navLinks.classList.remove("active"));
});

/* =====================
   THEME TOGGLE
===================== */
const themeBtn = document.getElementById("theme-btn");
let darkMode = false; // Start with light pink

// Apply initial theme
document.body.classList.add("light-mode");
document.body.style.backgroundColor = "#ffd1e8"; // light pink

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    document.body.classList.toggle("dark-mode");
    darkMode = !darkMode;
    themeBtn.innerHTML = darkMode 
        ? `<i class="fa-solid fa-sun"></i><span>Light Mode</span>`
        : `<i class="fa-solid fa-moon"></i><span>Dark Mode</span>`;
});

/* =====================
   PROJECT SLIDER + DOTS + MODAL + SWIPE
===================== */
const projectContainer = document.querySelector(".project-container");
const projects = document.querySelectorAll(".project");
const nextBtn = document.getElementById("nextProject");
const prevBtn = document.getElementById("prevProject");
const dotsContainer = document.querySelector(".slider-dots");

// Initialize dots
projects.forEach((_, i) => {
    const dot = document.createElement("span");
    if(i===0) dot.classList.add("active");
    dot.addEventListener("click", () => {
        current = i;
        updateSlider();
    });
    dotsContainer.appendChild(dot);
});

let current = 0;

function updateSlider() {
    projectContainer.style.transform = `translateX(-${current * 100}%)`;
    document.querySelectorAll(".slider-dots span").forEach((dot,i) => {
        dot.classList.toggle("active", i===current);
    });
}

// Next/Prev buttons
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
projectContainer.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
});
projectContainer.addEventListener("touchend", (e) => {
    let endX = e.changedTouches[0].clientX;
    if(startX - endX > 50) { current = (current+1)%projects.length; updateSlider();}
    if(endX - startX > 50) { current = (current-1+projects.length)%projects.length; updateSlider();}
});

// Modal popup for project images
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
