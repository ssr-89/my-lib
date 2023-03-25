document.addEventListener('DOMContentLoaded', ()=>{
	const blockForms = document.querySelector('.block-login');
	const btnCloseForm = document.querySelector('.block-login-close-btn');
	const blockFormIn = document.querySelector('.signin-form');
	const blockFormUp = document.querySelector('.signup-form');	
	const btnSignIn = document.querySelector('.block-login-btns__btn--in');
	const btnSignUp = document.querySelector('.block-login-btns__btn--up');

	btnSignIn.addEventListener('click', function(){
		blockFormIn.classList.add('active');
		blockForms.classList.add('active');
	});
	btnSignUp.addEventListener('click', function(){
		blockFormUp.classList.add('active');
		blockForms.classList.add('active');
	});
	btnCloseForm.addEventListener('click', function() {
		blockFormIn.classList.remove('active');
		blockFormUp.classList.remove('active');
		blockForms.classList.remove('active');
	});
});