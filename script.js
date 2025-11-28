// Hamburger menu toggle (mobile)
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    hamburger.classList.toggle("active");
});

// Dark mode toggle
const themeBtn = document.getElementById("theme-toggle");

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
        themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i> Light Mode';
    } else {
        themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i> Dark Mode';
    }
});
