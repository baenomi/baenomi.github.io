
const toggleButton = document.getElementById('toggle-button');
const toggleIcon = document.getElementById('toggle-icon');
const intro = document.querySelector('.intro');
const intro2 = document.querySelector('.intro2');
const MyName = document.querySelector('.name');
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

    const arrowBackIcon = document.querySelector('.scroll-indicator .back img');
    const arrowNextIcon = document.querySelector('.scroll-indicator .next img');
    const arrowBackIconMobile = document.querySelector('.scroll-indicator-mobile .back img');
    const arrowNextIconMobile = document.querySelector('.scroll-indicator-mobile .next img');

    arrowBackIcon.src = isDarkMode ? 'images/back.png' : 'images/back-dark.png';
    arrowNextIcon.src = isDarkMode ? 'images/next.png' : 'images/next-dark.png';
    arrowBackIconMobile.src = isDarkMode ? 'images/back.png' : 'images/back-dark.png';
    arrowNextIconMobile.src = isDarkMode ? 'images/next.png' : 'images/next-dark.png';
}

if (localStorage.getItem('dark-mode') === 'enabled') {
    document.body.classList.add('dark-mode');
    intro.classList.add('dark-mode');
    intro2.classList.add('dark-mode');
    MyName.classList.add('dark-mode');
    socials.classList.add('dark-mode');
    additionalInfo.classList.add('dark-mode');
    menu.classList.add('dark-mode');
    setIcon(true);
} else {
    setIcon(false);
}

toggleButton.addEventListener('click', () => {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    intro.classList.toggle('dark-mode', isDarkMode);
    intro2.classList.toggle('dark-mode', isDarkMode);
    MyName.classList.toggle('dark-mode', isDarkMode);
    socials.classList.toggle('dark-mode', isDarkMode);
    additionalInfo.classList.toggle('dark-mode', isDarkMode);
    menu.classList.toggle('dark-mode', isDarkMode);
    toggleIcon.style.opacity = 0;

    setTimeout(() => {
        setIcon(isDarkMode);
        updateSidebarIcon(isDarkMode);
        toggleIcon.style.opacity = 1;
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


function updateSidebarIcon(isDarkMode) {
    const sidebarItems = document.querySelectorAll('.sidebar-item img');
    sidebarItems.forEach(item => {
        item.style.opacity = 0;

        setTimeout(() => {
            item.src = isDarkMode ? 'images/mail.png' : 'images/mail_dark.png';
            item.style.opacity = 1;
        }, 170);
    });
}

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
    const swiperWrapper = document.querySelector('.swiper-wrapper');
    const swiperSlides = document.querySelectorAll('.swiper-slide');
    const nextButton = document.querySelector('.scroll-indicator .next');
    const prevButton = document.querySelector('.scroll-indicator .back');
    const nextButtonMobile = document.querySelector('.scroll-indicator-mobile .next');
    const prevButtonMobile = document.querySelector('.scroll-indicator-mobile .back');
    const paginationContainer = document.querySelector('.swiper-pagination');
    let currentIndex = 0;
    let isScrolling = false;

    function createPaginationDots() {
        paginationContainer.innerHTML = '';
        swiperSlides.forEach((slide, index) => {
            const dot = document.createElement('span');
            dot.classList.add('swiper-pagination-dot');
            if (index === currentIndex) {
                dot.classList.add('active');
            }
            dot.addEventListener('click', () => {
                currentIndex = index;
                updateSwiper();
            });
            paginationContainer.appendChild(dot);
        });
    }

    function updatePaginationDots() {
        const dots = document.querySelectorAll('.swiper-pagination-dot');
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    function updateSwiper() {
        const width = swiperWrapper.clientWidth;
        swiperWrapper.style.transform = `translateX(-${currentIndex * width}px)`;
        updatePaginationDots();
    }

    function smoothScrollToIndex(index) {
        if (!isScrolling) {
            isScrolling = true;
            currentIndex = index;
            updateSwiper();
            setTimeout(() => {
                isScrolling = false;
            }, 800);
        }
    }

    nextButton.addEventListener('click', () => {
        const newIndex = currentIndex < swiperSlides.length - 1 ? currentIndex + 1 : 0;
        smoothScrollToIndex(newIndex);
    });

    prevButton.addEventListener('click', () => {
        const newIndex = currentIndex > 0 ? currentIndex - 1 : swiperSlides.length - 1;
        smoothScrollToIndex(newIndex);
    });

    nextButtonMobile.addEventListener('click', () => {
        const newIndex = currentIndex < swiperSlides.length - 1 ? currentIndex + 1 : 0;
        smoothScrollToIndex(newIndex);
    });

    prevButtonMobile.addEventListener('click', () => {
        const newIndex = currentIndex > 0 ? currentIndex - 1 : swiperSlides.length - 1;
        smoothScrollToIndex(newIndex);
    });

    const swiperImages = document.querySelectorAll('.swiper-slide img');
    swiperImages.forEach(image => {
        image.addEventListener('wheel', (event) => {
            event.preventDefault();

            const newIndex = event.deltaY > 0 
                ? (currentIndex < swiperSlides.length - 1 ? currentIndex + 1 : 0)
                : (currentIndex > 0 ? currentIndex - 1 : swiperSlides.length - 1);

            smoothScrollToIndex(newIndex);
        });
    });

    window.addEventListener('resize', updateSwiper);

    createPaginationDots();
    updateSwiper();
});



document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const menu = document.querySelector('.menu');
    const menuIcon = menuToggle.querySelector('img');
  
    menuToggle.addEventListener('click', function() {
      
        menu.classList.toggle('show');
  
      if (menu.classList.contains('show')) {
        menuIcon.src = 'images/close.png';
      } else {
        menuIcon.src = 'images/menu-icon.png';
      }
    });
  });

  document.querySelectorAll('.menu a').forEach(anchor => {
    anchor.addEventListener('click', function() {
        document.querySelectorAll('.menu a').forEach(a => a.classList.remove('active'));
        this.classList.add('active');
    });
});