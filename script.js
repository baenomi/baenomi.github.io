
const toggleButton = document.getElementById('toggle-button');
const toggleIcon = document.getElementById('toggle-icon');
const intro = document.querySelector('.intro');
const intro2 = document.querySelector('.intro2');
const project = document.querySelector('.projects-container');
const socials = document.querySelector('.socials');
const additionalInfo = document.querySelector('.additional-info');
const menu = document.querySelector('.menu');

function setIcon(isDarkMode) {
    const isMobile = window.matchMedia('(max-width: 600px)').matches;

    toggleIcon.src = isDarkMode
        ? (isMobile ? 'images/moon.png' : 'images/moon.png')
        : (isMobile ? 'images/sun-mobile.png' : 'images/sun-mobile.png');
    
}

if (localStorage.getItem('dark-mode') === 'enabled') {
    document.body.classList.add('dark-mode');
    intro.classList.add('dark-mode');
    intro2.classList.add('dark-mode');
    socials.classList.add('dark-mode');
    additionalInfo.classList.add('dark-mode');
    menu.classList.add('dark-mode');
    project.classList.add('dark-mode');
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
    project.classList.toggle('dark-mode', isDarkMode);
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


const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', event => {
        event.preventDefault();
        const sectionId = item.getAttribute('href').substring(1);
        const section = document.getElementById(sectionId);
        section.scrollIntoView({ behavior: 'smooth' });
    });
});

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

// Function to show or hide the scroll-to-top button
function toggleScrollToTopButton() {
    const scrollToTopButton = document.querySelector('.scroll-to-top');
    const scrollThreshold = window.innerWidth <= 768 ? 1400 : 800;

    if (window.scrollY > scrollThreshold) {
        scrollToTopButton.classList.add('show');
    } else {
        scrollToTopButton.classList.remove('show');
    }
}

// Event listener for scrolling
window.addEventListener('scroll', toggleScrollToTopButton);

// Event listener for click on the scroll-to-top button
document.querySelector('.scroll-to-top').addEventListener('click', function(event) {
    event.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});