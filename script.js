<script>
const toggle = document.getElementById("theme-toggle");
const navLinks = document.querySelector(".nav-links");
const hamburger = document.querySelector(".hamburger");

/* Dark Mode Toggle */
toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

/* Mobile Menu Toggle */
hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
});
</script>
