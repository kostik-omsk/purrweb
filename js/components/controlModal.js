export default function controlModal() {
  const BODY = document.querySelector('body');
  const MODAL = document.querySelector('.modal');
  const MENU = document.querySelector('.header__menu');
  const FORM = document.querySelector('.form');
  const SUCCESS = document.querySelector('.success');

  MODAL.addEventListener('click', (event) => {
    const target = event.target;
    if (target.closest('.btn-close') || target.classList.contains('modal') || target.closest('.success__button')) {
      closeModal();
    }
  });

  window.addEventListener('click', (event) => {
    const target = event.target;
    if (target.matches('[data-modal="open"]')) {
      openModal();
    }
  });

  function openModal() {
    MODAL.classList.add('_show');
    BODY.classList.add('lock');
  }

  function closeModal() {
    MODAL.classList.remove('_show');
    FORM.classList.remove('none');
    SUCCESS.classList.add('none');
    if (MENU.classList.contains('open')) {
      BODY.classList.add('lock');
    } else {
      BODY.classList.remove('lock');
    }
  }
}
