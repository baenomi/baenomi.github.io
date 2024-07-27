// Hamburger menu

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const menu = document.querySelector('.menu');
    const menuIcon = menuToggle.querySelector('img');
  
    menuToggle.addEventListener('click', function() {
      
        menu.classList.toggle('show');
  
      if (menu.classList.contains('show')) {
        menuIcon.src = 'images/close-dark2.png';
      } else {
        menuIcon.src = 'images/menu-icon-dark2.png';
      }
    });
  });

  document.querySelectorAll('.menu a').forEach(anchor => {
    anchor.addEventListener('click', function() {
        document.querySelectorAll('.menu a').forEach(a => a.classList.remove('active'));
        this.classList.add('active');
    });
});

// Navigation bar shadow

document.addEventListener('DOMContentLoaded', function() {
    const nav = document.querySelector('nav.top');

    window.addEventListener('scroll', function() {
        if (window.scrollY >= 80) {
            nav.classList.add('shadow');
        } else {
            nav.classList.remove('shadow');
        }
    });
});