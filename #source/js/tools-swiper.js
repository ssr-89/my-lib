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

  /*tabs*/
  const tabsBtns = document.querySelectorAll('.swiper-tabs-btn');

tabsBtns.forEach(function(tabsBtn) {
  tabsBtn.addEventListener('click', (e)=>{
    for (let i = 0; i < tabsBtns.length; i++) {
      tabsBtns[i].classList.remove('open-tabs-btn');
    };
    const path = e.currentTarget.dataset.path;
    e.currentTarget.classList.add('open-tabs-btn');
    const tabsItems = document.querySelectorAll('.swiper-tabs-item')
    tabsItems.forEach((tabsItem) => {
      tabsItem.classList.remove('open-tabs-item');
    });
    const tabsItemOpen = document.querySelector(`[data-target="${path}"`);
    tabsItemOpen.classList.add("open-tabs-item");
  });
});

});