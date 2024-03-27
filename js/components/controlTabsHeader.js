export default function controlTabsHeader() {
  const TABS = document.querySelector('.header__tabs');
  const TABS_LIST = document.querySelectorAll('.tabs__item');
  const BUSINESS = document.querySelector('.control__business');
  const CUSTOMERS = document.querySelector('.control__customers');

  TABS.addEventListener('click', (event) => {
    const target = event.target;
    if (target.classList.contains('tabs__item')) {
      TABS_LIST.forEach((item) => {
        item.classList.remove('tabs__item-active');
      });
      target.classList.add('tabs__item-active');

      if (target.dataset.tabs === 'customers') {
        BUSINESS.classList.add('none');
        CUSTOMERS.classList.remove('none');
      } else {
        BUSINESS.classList.remove('none');
        CUSTOMERS.classList.add('none');
      }
    }
  });
}
