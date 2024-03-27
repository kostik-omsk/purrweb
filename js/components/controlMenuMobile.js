export default function controlMenuMobile() {
  const BODY = document.querySelector('body');
  const HEADER = document.querySelector('.header');
  const TABS = document.querySelector('.header__tabs');
  const BURGER = document.querySelector('.control__burger');
  const LOGO = document.querySelector('.header__logo');
  const MENU = document.querySelector('.header__menu');

  HEADER.addEventListener('click', (event) => {
    const target = event.target;
    if (target.closest('.control__burger') || (target.closest('.menu__link') && target.closest('.open'))) {
      BURGER.classList.toggle('active');
      TABS.classList.toggle('none');
      LOGO.classList.toggle('visible');
      MENU.classList.toggle('open');
      BODY.classList.toggle('lock');
    }
  });

  function toggleWidth() {
    setTimeout(() => {
      const screenWidth = window.innerWidth;
      const breakpoint = 576;
      if (screenWidth > breakpoint) {
        BURGER.classList.remove('active');
        TABS.classList.remove('none');
        LOGO.classList.remove('visible');
        MENU.classList.remove('open');
        BODY.classList.remove('lock');
      }
    }, 500);
  }

  window.addEventListener('resize', toggleWidth);

  window.addEventListener('scroll', function () {
    const header = document.querySelector('.header');
    const headerNav = document.querySelector('.header__navbar');
    if (window.scrollY > headerNav.offsetTop) {
      headerNav.classList.add('fixed');
      header.classList.add('fixed');
    } else {
      headerNav.classList.remove('fixed');
      header.classList.remove('fixed');
    }
  });
}
