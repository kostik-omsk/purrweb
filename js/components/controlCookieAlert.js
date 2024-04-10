export default function controlCookieAlert() {
  const COOKIE = document.querySelector('.cookie');
  const isShowCookie = localStorage.getItem('cookie');

  if (!isShowCookie) {
    localStorage.setItem('cookie', 'true');
    setTimeout(() => {
      if (COOKIE) {
        COOKIE.classList.add('_show');
      }
    }, 2000);
  }

  COOKIE.addEventListener('click', (event) => {
    const target = event.target;

    if (target.closest('.cookie__close') || target.closest('.cookie__button')) {
      COOKIE.classList.remove('_show');
    }
  });
}
