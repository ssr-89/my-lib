'use strict'
document.addEventListener('DOMContentLoaded', () => {

  /*плавный скрол*/
  const anchors = document.querySelectorAll('a[href*="#"]')

  for (let anchor of anchors) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault()

      const blockID = anchor.getAttribute('href').substr(1)

      document.getElementById(blockID).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    })
  };

//@prepros-append js.js
//@prepros-append js-dom.js
});