import createElem from '../helper/createElem.js';

export default class Slider {
  constructor(slides) {
    this.slides = slides.slice(0, 9);
    this.elem = this.createSlider();
    this.sliderTrack = this.elem.querySelector('.slider__track');
    this.sliderBtnPrev = this.elem.querySelector('.slider__btn-prev');
    this.sliderBtnNext = this.elem.querySelector('.slider__btn-next');
    this.sliderDots = this.elem.querySelector('.slider__dots');
    this.numberOfSlides = this.slides.length;
    this.currentSlide = 1;
    this.animationDuration = 500;
    this.animationInterval = 10;
    this.useControls();
  }

  createSlider() {
    this.elem = createElem('div', 'slider__container');

    const control = createElem('div', 'slider__control');
    const templateControl = `
    <button class="slider__btn slider__btn-prev">
      <img src="assets/icon/angle-left-icon.svg" alt="prev">
    </button>
    <button class="slider__btn slider__btn-next">
      <img src="assets/icon/angle-icon.svg" alt="next">
    </button>
    `;
    control.insertAdjacentHTML('beforeend', templateControl);

    const sliderList = createElem('div', 'slider__list');
    const sliderTrack = createElem('div', 'slider__track');

    for (let slide of this.slides) {
      const sliderItem = createElem('div', 'slider__item');
      const slideTemplate = `<img src="${slide.url}" alt="slide">`;
      sliderItem.insertAdjacentHTML('beforeend', slideTemplate);
      sliderTrack.append(sliderItem);
    }

    const sliderTrackChildren = sliderTrack.childNodes;
    const copyOfFirstSlide = sliderTrackChildren[0].cloneNode(true);
    sliderTrack.append(copyOfFirstSlide);
    sliderList.append(sliderTrack);

    const sliderDots = createElem('div', 'slider__dots');
    for (let i = 0; i < this.slides.length; i++) {
      const dots__Item = createElem('div', 'slider__dots-item');
      dots__Item.dataset.slideTo = i + 1;
      if (i === 0) {
        dots__Item.classList.add('slider__dots-item--active');
      }
      sliderDots.append(dots__Item);
    }

    this.elem.append(control, sliderList, sliderDots);

    return this.elem;
  }

  step(direction) {
    this.sliderBtnPrev.disabled = true;
    this.sliderBtnNext.disabled = true;
    const sliderTrackWidth = this.sliderTrack.offsetWidth;
    let count = 0;

    if (direction > 0) {
      this.currentSlide++;
    } else {
      this.currentSlide--;
      if (this.currentSlide < 1) {
        this.currentSlide = this.numberOfSlides;
        this.sliderTrack.style.transform = `translateX(-${-sliderTrackWidth * this.currentSlide}px)`;
      }
    }

    this.dotsActive();

    const animation = setInterval(() => {
      count += this.animationInterval / this.animationDuration;
      const newPosition = -sliderTrackWidth * (this.currentSlide - 1 + (count - 1) * direction);
      this.sliderTrack.style.transform = `translateX(${newPosition}px)`;

      if (count >= 1) {
        clearInterval(animation);
        if (this.currentSlide > this.numberOfSlides) {
          this.currentSlide = 1;
          this.sliderTrack.style.transform = `translateX(-${0}px)`;
        }
        this.sliderBtnNext.disabled = false;
        this.sliderBtnPrev.disabled = false;
      }
    }, this.animationInterval);
  }

  dotsActive() {
    const activeDot = this.sliderDots.children[this.currentSlide - 1] || this.sliderDots.firstElementChild;
    this.sliderDots.querySelector('.slider__dots-item--active')?.classList.remove('slider__dots-item--active');
    activeDot.classList.add('slider__dots-item--active');
  }

  goToSlide(index) {
    const sliderTrackWidth = this.sliderTrack.offsetWidth;
    const targetPosition = sliderTrackWidth * (index - 1);
    let currentPosition = sliderTrackWidth * (this.currentSlide - 1) === 0 ? 0 : sliderTrackWidth * (this.currentSlide - 1);

    let count = 0;

    this.currentSlide = index;

    const animation = setInterval(() => {
      count += this.animationInterval / this.animationDuration;
      currentPosition += (targetPosition - currentPosition) * count;
      this.sliderTrack.style.transform = `translateX(-${currentPosition}px)`;
      if (count >= 1) {
        clearInterval(animation);
      }
    }, this.animationInterval);
    this.dotsActive();
  }

  useControls() {
    this.elem.addEventListener('click', (event) => {
      if (event.target.closest('.slider__btn-prev')) {
        this.step(-1);
      } else if (event.target.closest('.slider__btn-next')) {
        this.step(1);
      } else if (event.target.closest('.slider__dots-item')) {
        const dotIndex = event.target.dataset.slideTo;
        this.goToSlide(dotIndex);
      }
    });
  }
}
