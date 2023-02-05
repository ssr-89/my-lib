'use strict'
document.addEventListener('DOMContentLoaded', function(){
	const heroMenu = document.querySelector('.hero-menu');
	const heroBurgerBtn = document.querySelector('.hero-burger-block__burger');
	const heroMenuLinks =document.querySelectorAll('.hero-menu__link');

	heroBurgerBtn.addEventListener('click', function(e){
		e.preventDefault();
		heroMenu.classList.toggle('active');
		if (heroMenu.classList.contains('active')) {
			this.classList.add('active');
		} else {
			this.classList.remove('active');
		}
	});
	heroMenuLinks.forEach(function(el){
		el.addEventListener('click', function() {
			heroMenu.classList.remove('active');
			heroBurgerBtn.classList.remove('active');
		});
	});
});