// --------------------------
//           scroll
// --------------------------

let linkNav = document.querySelectorAll('[href^="#"]'),
    V = 0.5;
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
//       progress bar
// ----------------------------

document.querySelectorAll('.resume_content__item_progress__up')
    .forEach(e => {
        e.style.width = e.getAttribute('data-value');
    });

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
//       scrollToTop
// ----------------------------

let scrollToTop = document.querySelector('#scrollToTop');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 400) {
        scrollToTop.classList.add('active');
    } else {
        scrollToTop.classList.remove('active');
    }
});