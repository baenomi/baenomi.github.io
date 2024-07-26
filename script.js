
const toggleButton = document.getElementById('toggle-button');
const toggleIcon = document.getElementById('toggle-icon');
const intro = document.querySelector('.intro');
const intro2 = document.querySelector('.intro2');
const project = document.querySelector('.projects-container');
const socials = document.querySelector('.socials');
const additionalInfo = document.querySelector('.additional-info');
const menu = document.querySelector('.menu');
const projectCards = document.querySelectorAll('.project-card');
const contact = document.querySelector('.contact-card');
const contactTitle = document.querySelector('.contact-container');
const footer = document.querySelector('.footer');
const navbar = document.querySelector('.top');


function setIcon(isDarkMode) {
    const isMobile = window.matchMedia('(max-width: 600px)').matches;

    toggleIcon.src = isDarkMode
        ? (isMobile ? 'images/moon.png' : 'images/moon.png')
        : (isMobile ? 'images/sun-mobile.png' : 'images/sun-mobile.png');
}

if (localStorage.getItem('dark-mode') === 'disabled') {
    document.body.classList.add('dark-mode');
    intro.classList.add('dark-mode');
    intro2.classList.add('dark-mode');
    socials.classList.add('dark-mode');
    additionalInfo.classList.add('dark-mode');
    menu.classList.add('dark-mode');
    contact.classList.add('dark-mode');
    contactTitle.classList.add('dark-mode');
    footer.classList.add('dark-mode');
    navbar.classList.add('dark-mode');
    projectCards.forEach(card => card.classList.add('dark-mode'));
    setIcon(true);
} else {
    setIcon(false);
}

toggleButton.addEventListener('click', () => {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    intro.classList.toggle('dark-mode', isDarkMode);
    intro2.classList.toggle('dark-mode', isDarkMode);
    socials.classList.toggle('dark-mode', isDarkMode);
    additionalInfo.classList.toggle('dark-mode', isDarkMode);
    menu.classList.toggle('dark-mode', isDarkMode);
    contact.classList.toggle('dark-mode', isDarkMode);
    contactTitle.classList.toggle('dark-mode', isDarkMode);
    footer.classList.toggle('dark-mode', isDarkMode);
    navbar.classList.toggle('dark-mode', isDarkMode);
    projectCards.forEach(card => card.classList.toggle('dark-mode', isDarkMode));
    toggleIcon.style.opacity = 1;

    setTimeout(() => {
        setIcon(isDarkMode);
        updateSidebarIcon(isDarkMode);
        toggleIcon.style.opacity = 0;
        localStorage.setItem('dark-mode', isDarkMode ? 'enabled' : 'disabled');
    }, 170);
});



function handleResize() {
    const isDarkMode = document.body.classList.contains('dark-mode');
    setIcon(isDarkMode);
}

window.addEventListener('resize', handleResize);

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

function toggleScrollToTopButton() {
    const scrollToTopButton = document.querySelector('.scroll-to-top');
    const scrollThreshold = window.innerWidth <= 768 ? 1400 : 800;

    if (window.scrollY > scrollThreshold) {
        scrollToTopButton.classList.add('show');
    } else {
        scrollToTopButton.classList.remove('show');
    }
}

window.addEventListener('scroll', toggleScrollToTopButton);

document.querySelector('.scroll-to-top').addEventListener('click', function(event) {
    event.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const animationClass = 'show-animate';

    const animateSections = () => {
        sections.forEach(section => {
            const top = window.scrollY;
            const offset = section.offsetTop - (isMobile ? 200 : 150);
            const height = section.offsetHeight;

            if (top >= offset && top < offset + height) {
                section.classList.add(animationClass);
            } else if (!isMobile) {
                section.classList.remove(animationClass);
            }
        });
    };

    animateSections();

    window.onscroll = () => {
        if (!isMobile) {
            animateSections();
        }
    };
});








  
  
  
