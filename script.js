const toggleBtn = document.getElementById('theme-toggle');
toggleBtn.addEventListener('click', () => {
   document.body.classList.toggle('dark-mode');
   toggleBtn.innerHTML = document.body.classList.contains('dark-mode') ? 
       '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
});
