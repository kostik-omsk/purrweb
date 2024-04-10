import Slider from './slider/Slider.js';
import slides from './slider/slides.js';

const slider = new Slider(slides);
let sliderElement = document.body.querySelector('#slider');
sliderElement.append(slider.elem);
