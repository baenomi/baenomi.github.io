// RWD navbar //

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const menu = document.querySelector('.menu');
    const menuIcon = menuToggle.querySelector('img');
  
    menuToggle.addEventListener('click', function() {
      
        menu.classList.toggle('show');
  
      if (menu.classList.contains('show')) {
        menuIcon.src = 'images/close-dark.png';
      } else {
        menuIcon.src = 'images/menu-icon-dark.png';
      }
    });
  });

  const menuItems = document.querySelectorAll('.menu li a');
  menuItems.forEach(function(item) {
      item.addEventListener('click', function() {
          
          menu.classList.remove('show');
          menuIcon.src = 'images/menu-icon-dark.png';
      });
  });

// Underline navbar //

document.querySelectorAll('nav.top .menu li a').forEach(item => {
    item.addEventListener('mouseover', () => {

    });
});

//Slider //

let currentSlide = 0;
const slides = document.querySelectorAll('.image-slider .slide');

function showSlide(index) {
    const totalSlides = slides.length;
    if (index >= totalSlides) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = totalSlides - 1;
    } else {
        currentSlide = index;
    }
    const offset = -currentSlide * 100;
    document.querySelector('.image-slider .slides').style.transform = `translateX(${offset}%)`;
}

function changeSlide(direction) {
    showSlide(currentSlide + direction);
}

showSlide(currentSlide);

setInterval(() => {
    changeSlide(1);
}, 7000);

// Sneakers section buttons //

function scrollSneakerSlider(direction) {
    const slider = document.querySelector('.sneaker-grid');
    const scrollAmount = 300;

    slider.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
    });
}