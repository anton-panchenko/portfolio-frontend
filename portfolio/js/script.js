// progress bar

document.querySelectorAll('.resume_content__item_progress__up')
    .forEach(e => {
        e.style.width = e.getAttribute('data-value');
    });