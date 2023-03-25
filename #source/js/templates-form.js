/*FORM - validation*/
document.addEventListener("DOMContentLoaded", function(){	
	console.log('init');

	// inputmask
	const form = document.querySelector('.form');
	const telSelector = form.querySelector('input[type="tel"]');
	const inputMask = new Inputmask('+7 (999) 999-99-99');

	inputMask.mask(telSelector);

	new window.JustValidate('.form', {
		rules: {
			tel: {
				required: true,
				function: () => {
					const phone = telSelector.inputmask.unmaskedvalue();
					console.log(phone);
					return Number(phone) && phone.length === 10;
				}
			},
		},
		colorWrong: 'rgba(0,0,128,1)',
		messages: {
			name: {
				required: 'Введите имя',
				minLength: 'Минимальное значение 3 символа',
				maxLength: 'Максимальное значение символов 15 символов',
			},
			email: {
				email: 'Введите корректный Email',
				required: 'Введите Email',
			},
			tel: {
				required: 'Введите телефон',
				function: 'Минимальное значение 10 символов без +7',
			},
		},
		submitHandler: function(thisForm) {
			let formData = new FormData(thisForm);

			let xhr = new XMLHttpRequest();

			xhr.onreadystatechange = function () {
				if (xhr.readyState === 4) {
					if (xhr.status === 200) {
						console.log('Отправлено');
					}
				}
			}

			xhr.open("POST", "mail.php", true);
			xhr.send(formData);

			thisForm.reset();
		}
	});
});