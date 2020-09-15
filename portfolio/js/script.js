// --------------------------
//           scroll
// --------------------------

let linkNav = document.querySelectorAll('[href^="#"]'),
    V = 0.2;
for (let i = 0; i < linkNav.length; i++) {
    linkNav[i].addEventListener('click', function(e) {
        e.preventDefault();
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
}, 2000);

// ----------------------------
//       progress bar
// ----------------------------

let progressBars = document.querySelectorAll('.resume_content__item_progress__up');
let isScrolled = false;

// setInterval(() => {
//     if (progressBars[0].getBoundingClientRect().top > 10 && !isScrolled) {
//         console.log('in');
//         progressBars.forEach(pb => {
//             pb.style.width += '5px';
//             if (pb.getAttribute('data-value') === pb.style.width) isScrolled = true;
//         });
    }
    // progressBars.forEach(pb => {
    //     pb.addEventListener('scroll', () => {
    //
    //     });
    // });
// }, 20);

// --------------------------
//     modal self photo
// --------------------------

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

// ----------------------------
//       scroll settings
// ----------------------------

let scrollToTop = document.querySelector('#scrollToTop');
let fixedMenu = document.querySelector('.fixed_menu');
let fixedMenuItems = document.querySelectorAll('.fixed_menu__item');
let sections = document.querySelectorAll('.section');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 400) {
        scrollToTop.classList.add('active');
        fixedMenu.classList.add('active');
    } else {
        scrollToTop.classList.remove('active');
        fixedMenu.classList.remove('active');
    }

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
});


