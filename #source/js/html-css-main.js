"use strict";
document.addEventListener("DOMContentLoaded", function () {
  function slidesPlugin(activeSlide = 0) {
    const slides = document.querySelectorAll(".gallery-slider__item");

    slides[activeSlide].classList.add("active");

    for (const slide of slides) {
      slide.addEventListener("click", function () {
        clearActiveClasses();

        this.classList.add("active");
      });
    }

    function clearActiveClasses() {
      slides.forEach((el) => {
        el.classList.remove("active");
      });
    }
  }

  slidesPlugin();
});