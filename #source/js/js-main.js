"use strict";
document.addEventListener('DOMContentLoaded', function() {
	/*js.html*/
	const jsMenuBtn = document.querySelector('.js-other-menu-list__btn');
	const jsMenuItems = document.querySelectorAll('.js-other-menu-list__item');

	jsMenuBtn.addEventListener('click', function(){
		for (let i = 0; i < jsMenuItems.length; i++) {
			jsMenuItems[i].classList.toggle('open-menu');
		}
	});
});
