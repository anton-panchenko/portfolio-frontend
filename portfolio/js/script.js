
// // --------------------------
//           scroll
// --------------------------

let linkNav = document.querySelectorAll('[href^="#"]'),
    V = 0.2;
for (let i = 0; i < linkNav.length; i++) {
    linkNav[i].addEventListener('click', function(e) {
        // e.preventDefault();
        let w = window.pageYOffset,
            hash = this.href.replace(/[^#]*(.*)/, '$1');
            t = document.querySelector(hash).getBoundingClientRect().top,
            start = null;
        requestAnimationFrame(step);
        function step(time) {
            if (start === null) start = time;
            let progress = time - start,
                r = (t < 0 ? Math.max(w - progress/V, w + t) : Math.min(w + progress/V, w + t));
            window.scrollTo(0,r);
            if (r !== w + t) {
                requestAnimationFrame(step);
            } else {
                location.hash = hash;
            }
        }
    }, false);
}

// ----------------------------
//       preloader
// ----------------------------

let app = document.querySelector('#app');
let pagePreloader = document.querySelector('#pagePreloader');

setTimeout(() => {
    pagePreloader.style.display = 'none';
    app.style.display = 'block';
    followTheLink();
}, 1000);

let followTheLink = function () {
    let link = localStorage.getItem('link');
    let a = document.querySelector('[href="' + link + '"]');
    if (a) a.click();
    localStorage.removeItem('link');
};

let ckickedLinks = document.querySelectorAll('.redirectLink');
ckickedLinks.forEach(cl => {
    cl.addEventListener('click', () => {
        let link = cl.getAttribute('href').replace('index.html', '');
        localStorage.setItem('link', link);
    });
});

// --------------------------
//     modal self photo
// --------------------------

let modal = document.querySelector('#my_modal');
let btn = document.querySelector('#btn_modal_window');
let closeBtn = document.querySelector('.modal_content__photo_closeBtn');

if (modal) {
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

let filterBtns = document.querySelectorAll('.filter-btn');

if (filterBtns[0]) {
    let iso = new Isotope('#grid', {
        itemSelector: '.grid-item',
        layoutMode: 'fitRows',
        filter: '*',
        transitionDuration: '0.6s',
        percentPosition: true
    });
    filterBtns.forEach(fb => {
        fb.addEventListener('click', event => {
            event.preventDefault();
            let filterData = fb.getAttribute('data-filter');
            iso.arrange({
                filter: filterData
            });
        });
    });
}

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
};

// ----------------------------
//       scroll settings
// ----------------------------

let scrollToTop = document.querySelector('#scrollToTop');
let fixedMenu = document.querySelector('.fixed_menu');
let fixedMenuItems = document.querySelectorAll('.fixed_menu__item');
let sections = document.querySelectorAll('.section');
let progressBars = document.querySelectorAll('.resume_content__item_progress__up');
let isScrolled = false;

setInterval(() => isScrolled = false, 60000);

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
    if (sections[0]) {
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
