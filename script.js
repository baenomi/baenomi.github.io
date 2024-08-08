
const toggleButton = document.getElementById('toggle-checkbox');
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

toggleButton.addEventListener('change', () => {
    const isDarkMode = toggleButton.checked;
    document.body.classList.toggle('dark-mode', isDarkMode);
    document.body.classList.toggle('light-mode', !isDarkMode);
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

    localStorage.setItem('dark-mode', isDarkMode ? 'enabled' : 'disabled');
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
    const scrollToTopButton = document.querySelector('.scroll-to-top');
    const scrollToTopIcon = scrollToTopButton.querySelector('img');
    const emailIcon = document.querySelector('.email-icon');
    const educationIcon = document.querySelector('.education-icon');
    const keyboardIcon = document.querySelector('.keyboard-icon');

    function updateIcons(isDarkMode) {
        if (menu.classList.contains('show')) {
            menuIcon.src = isDarkMode ? 'images/close-light.svg' : 'images/close-dark.svg';
        } else {
            menuIcon.src = isDarkMode ? 'images/menu-light.svg' : 'images/menu-dark.svg';
        }

        scrollToTopIcon.src = isDarkMode ? 'images/arrow-up-light.svg' : 'images/arrow-up-dark.svg';
        emailIcon.src = isDarkMode ? 'images/email-light.svg' : 'images/email-dark.svg';
        educationIcon.src = isDarkMode ? 'images/education-light.png' : 'images/education-dark.png';
        keyboardIcon.src = isDarkMode ? 'images/keyboard-light.png' : 'images/keyboard-dark.png';
    }

    menuToggle.addEventListener('click', function() {
        menu.classList.toggle('show');
        const isDarkMode = document.body.classList.contains('dark-mode');
        updateIcons(isDarkMode);
    });

    const toggleButton = document.getElementById('toggle-checkbox');
    toggleButton.addEventListener('change', () => {
        const isDarkMode = toggleButton.checked;
        document.body.classList.toggle('dark-mode', isDarkMode);
        document.body.classList.toggle('light-mode', !isDarkMode);
        updateIcons(isDarkMode);
    });

    const initialDarkMode = document.body.classList.contains('dark-mode');
    updateIcons(initialDarkMode);
});

document.querySelectorAll('.menu a').forEach(anchor => {
    anchor.addEventListener('click', function() {
        document.querySelectorAll('.menu a').forEach(a => a.classList.remove('active'));
        this.classList.add('active');
    });
});

document.querySelectorAll('.menu a').forEach(anchor => {
    anchor.addEventListener('click', function() {
        document.querySelectorAll('.menu a').forEach(a => a.classList.remove('active'));
        this.classList.add('active');
    });
});


document.querySelectorAll('.menu a').forEach(anchor => {
    anchor.addEventListener('click', function() {
        document.querySelectorAll('.menu a').forEach(a => a.classList.remove('active'));
        this.classList.add('active');
    });
});

document.querySelectorAll('.menu a').forEach(anchor => {
    anchor.addEventListener('click', function() {
        document.querySelectorAll('.menu a').forEach(a => a.classList.remove('active'));
        this.classList.add('active');
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
    const animatedElements = new Set();

    const animateSections = () => {
        sections.forEach(section => {
            const top = window.scrollY;
            const offset = section.offsetTop - (isMobile ? 300 : 300);
            const height = section.offsetHeight;

            if (top >= offset && top < offset + height) {
                section.classList.add(animationClass);

                const elementsToAnimate = section.querySelectorAll('.animateUp, .animateLeft, .animateRight, .animateDown, .animateImage');
                elementsToAnimate.forEach(element => {
                    if (!animatedElements.has(element)) {
                        element.classList.add(animationClass);
                        animatedElements.add(element);
                    }
                });
            } else if (!isMobile) {
                section.classList.remove(animationClass);

                const elementsToAnimate = section.querySelectorAll('.animateUp, .animateLeft, .animateRight, .animateDown, .animateImage');
                elementsToAnimate.forEach(element => {
                    element.classList.remove(animationClass);
                    animatedElements.delete(element);
                });
            }
        });
    };

    
    animateSections();

    window.onscroll = () => {
        animateSections();
    };
});









  
  
  
