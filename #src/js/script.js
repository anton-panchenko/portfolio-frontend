// @@include('scroll.js')

// ----------------------------
//       preloader
// ----------------------------

let app = document.querySelector('#app');
let pagePreloader = document.querySelector('#pagePreloader');

setTimeout(() => {
    pagePreloader.style.display = 'none';
    app.style.display = 'block';
}, 1000);

// --------------------------
//     modal self photo
// --------------------------

if (document.querySelector('#my_modal')) {
    let modal = document.querySelector('#my_modal');
    let btn = document.querySelector('#btn_modal_window');
    let closeBtn = document.querySelector('.modal_content__photo_closeBtn');

    btn.addEventListener('click', () => {
        modal.style.display = "block";
    });
    closeBtn.addEventListener('click', () => {
        modal.style.display = "none";
    });
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
}



// ----------------------------
//      works gallery
// ----------------------------

let iso = new Isotope('#grid', {
    itemSelector: '.grid-item',
    layoutMode: 'fitRows',
    filter: '*',
    transitionDuration: '0.6s',
    percentPosition: true
});

let filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(fb => {
    fb.addEventListener('click', event => {
        event.preventDefault();
        let filterData = fb.getAttribute('data-filter');
        iso.arrange({
            filter: filterData
        });
    });
});

// ----------------------------
//      move progress bar
// ----------------------------

let move = function (elem) {
    let width = 1;
    let id = setInterval(frame, 10);
    let max = elem.getAttribute('data-value');
    function frame() {
        if (width >= max) {
            clearInterval(id);
        } else {
            width++;
            elem.style.width = width + '%';
        }
    }
}

// ----------------------------
//       scroll settings
// ----------------------------

let scrollToTop = document.querySelector('#scrollToTop');
let fixedMenu = document.querySelector('.fixed_menu');
let fixedMenuItems = document.querySelectorAll('.fixed_menu__item');
let sections = document.querySelectorAll('.section');
let progressBars = document.querySelectorAll('.resume_content__item_progress__up');
let isScrolled = false;

setInterval(() => isScrolled = true, 60000);

window.addEventListener('scroll', () => {

    // button scroll to top
    if (window.pageYOffset > 400) {
        scrollToTop.classList.add('active');
        fixedMenu.classList.add('active');
    } else {
        scrollToTop.classList.remove('active');
        fixedMenu.classList.remove('active');
    }

    // change activity of fixed menu items
    if (document.querySelectorAll('.section')) {
        sections.forEach(e => {
            if (e.getBoundingClientRect().top > -500 && e.getBoundingClientRect().top < 500) {
                fixedMenuItems.forEach(fmi => {
                    fmi.classList.remove('active');
                });
                fixedMenuItems.forEach(fmi => {
                    if (fmi.getAttribute('data-menu') === e.getAttribute('data-menu')) {
                        fmi.classList.add('active');
                    }
                });
            }
        });
    }

    // start animation of progress bars on section resume
    if (progressBars[0]) {
        if (progressBars[0].getBoundingClientRect().top < 600 && !isScrolled) {
            isScrolled = true;
            progressBars.forEach(pb => move(pb));
        }
    }

});
