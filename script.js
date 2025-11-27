const toggleButton = document.getElementById('theme-toggle');
const body = document.body;

//a smooth transition
body.style.transition = "background 0.5s ease, color 0.5s ease";

const button = document.getElementById('theme-toggle');
button.style.transition = "background 0.5s ease, color 0.5s ease";

toggleButton.addEventListener('click', () => {
    body.classList.toggle('dark');
});
