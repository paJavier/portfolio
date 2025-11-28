<script>

const hamburger = document.querySelector(".hamburger");
const navPanel = document.querySelector(".nav-panel");
const themeBtn = document.getElementById("theme-toggle");

hamburger?.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navPanel?.classList.toggle("active");
});

themeBtn?.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        themeBtn.innerText = "Light Mode";
    } else {
        themeBtn.innerText = "Dark Mode";
    }
});

document.addEventListener("click", (e) => {
    if (e.target.matches(".nav-panel a")) {
        navPanel.classList.remove("active");
        hamburger.classList.remove("active");
    }
});
</script>
