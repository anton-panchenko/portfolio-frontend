// --------------------------
//           scroll
// --------------------------

let linkNav = document.querySelectorAll('[href^="#"]'), //выбираем все ссылки к якорю на странице
    V = 0.5;  // скорость, может иметь дробное значение через точку (чем меньше значение - тем больше скорость)
for (let i = 0; i < linkNav.length; i++) {
    linkNav[i].addEventListener('click', function(e) { //по клику на ссылку
        e.preventDefault(); //отменяем стандартное поведение
        let w = window.pageYOffset,  // производим прокрутка прокрутка
            hash = this.href.replace(/[^#]*(.*)/, '$1');  // к id элемента, к которому нужно перейти
            t = document.querySelector(hash).getBoundingClientRect().top,  // отступ от окна браузера до id
            start = null;
        requestAnimationFrame(step);  // подробнее про функцию анимации [developer.mozilla.org]
        function step(time) {
            if (start === null) start = time;
            let progress = time - start,
                r = (t < 0 ? Math.max(w - progress/V, w + t) : Math.min(w + progress/V, w + t));
            window.scrollTo(0,r);
            if (r !== w + t) {
                requestAnimationFrame(step)
            } else {
                location.hash = hash  // URL с хэшем
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