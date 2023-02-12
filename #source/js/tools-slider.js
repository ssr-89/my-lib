"use strict"
document.addEventListener("DOMContentLoaded", function () {
  const sliderImg = document.querySelectorAll('.slider__img');
  const sliderLine = document.querySelector('.slider');
  let count = 0; // ссылается на активный слайдер
  let width; // переменная для ширины слайдера

  function init() {
    console.log('resize');
    width = document.querySelector('.slider-block').offsetWidth;
    sliderLine.style.width = width * sliderImg.length + 'px';
    sliderImg.forEach(function (item) {
      item.style.width = width + 'px';
      item.style.height = 'auto';
    });
    rollSlider();
  }
  window.addEventListener('resize', init);
  init();

  document.querySelector(".btn-prev").addEventListener('click', function () {
    count--;
    if (count < 0) {
      count = sliderImg.length - 1;
    }
    rollSlider();
  });
  document.querySelector(".btn-next").addEventListener('click', function () {
    count++;
    if (count >= sliderImg.length) {
      count = 0;
    }
    rollSlider();
  });

  /*функция смещения*/
  function rollSlider() {
    sliderLine.style.transform = 'translate(-' + count * width + 'px)';
  }
});
