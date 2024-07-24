
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
    
    const languagesIcon = document.querySelector('.languages .icon1 img');
    languagesIcon.src = isDarkMode ? 'images/language.png' : 'images/language_dark.png';
    
    const educationIcon = document.querySelector('.education .icon1 img');
    educationIcon.src = isDarkMode ? 'images/education.png' : 'images/education_dark.png';
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

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    if (localStorage.getItem('dark-mode') !== 'enabled') {
        const isDarkMode = event.matches;
        document.body.classList.toggle('dark-mode', isDarkMode);
        intro.classList.toggle('dark-mode', isDarkMode);
        intro2.classList.toggle('dark-mode', isDarkMode);
        MyName.classList.toggle('dark-mode', isDarkMode);
        socials.classList.toggle('dark-mode', isDarkMode);
        additionalInfo.classList.toggle('dark-mode', isDarkMode);
        menu.classList.toggle('dark-mode', isDarkMode);
        project.classList.toggle('dark-mode', isDarkMode);
        toggleIcon.style.opacity = 0;

        setTimeout(() => {
            setIcon(isDarkMode);
            updateSidebarIcon(isDarkMode);
            toggleIcon.style.opacity = 1;
        }, 170);
    }
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
        menuIcon.src = 'images/close-dark.png';
      } else {
        menuIcon.src = 'images/menu-icon-dark.png';
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

  