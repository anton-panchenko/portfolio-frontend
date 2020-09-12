@@include('scroll.js')


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