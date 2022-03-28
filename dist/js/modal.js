document.addEventListener('DOMContentLoaded', function(event) {

    const modalOpenBtn = document.querySelectorAll('[data-modal'),
          modal = document.querySelector('.modal'),
          modalCloseBtn = document.querySelector('[data-close]');

    function openModal() {
        modalOpenBtn.forEach(btn => {
            btn.addEventListener('click', () =>{
                modal.classList.add('show');
                modal.classList.remove('hide');
            });
        });
    }

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
    }

    openModal();
    modalCloseBtn.addEventListener('click', closeModal);
});