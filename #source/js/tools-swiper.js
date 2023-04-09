"use strict"
document.addEventListener("DOMContentLoaded", function(){
	const testSwiper = new Swiper('.test-swiper', {
		slidesPerView: 1,
		// spaceBetween: 10,
    slidesPerGroup: 1,
  	// speed: 400,
    loop: true,
    autoplay: {
      enabled: true,
      delay: 3000,
      stopOnLastSlide: false,
      disableOnInteraction: false,
    },
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },

    pagination: {
      el: '.test-swiper-pgn',
      type: 'fraction',
      renderFraction: function (currentClass, totalClass) {
        return '<span class="' + currentClass + '"></span>' + ' из ' + '<span class="' + totalClass + '"></span>';
      },
    },

    navigation: {
      nextEl: '.test-swiper-btn--next',
      prevEl: '.test-swiper-btn--prev',
    },

    /*Скролл*/
    scrollbar: {
      el: '.test-swiper-scrollbar',
      draggable: true,
    },
	});
});