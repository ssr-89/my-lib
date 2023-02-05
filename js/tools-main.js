"use strict";
document.addEventListener("DOMContentLoaded", function () {
  /*TODO-list*/
	const todoTitle = document.querySelector('.to-do-block__title');
  const todoForm = document.querySelector('.to-do-form');
  const todoFormInput = document.querySelector('.to-do-form__input');
  const todoFormBlock = document.querySelector('.to-do-form-block');
  const todoFormBlockBtn = document.querySelector('.to-do-form-block__btn');

  todoFormBlockBtn.disabled = true;
  todoFormInput.addEventListener('input', function(){
  	todoFormBlockBtn.disabled = false;
  });

  let todoList = document.querySelector('.todo-list');

  let todoListArr = [];  

  function createTodoItem(obj) {
  	let todoListItem = document.createElement('li');
  	todoListItem.classList.add('todo-list__item');
  	todoListItem.textContent = obj.name;

  	let todoListItemGroup = document.createElement('div');
  	todoListItemGroup.classList.add("todo-list__block-btns", "todo-list-block-btns");

  	let doneBtn = document.createElement('button');
  	doneBtn.classList.add("todo-list-block-btns__btn", "todo-list-block-btns-ok", "btn");
  	doneBtn.textContent = "ГОТОВО";

  	let delBtn = document.createElement('button');
  	delBtn.classList.add("todo-list-block-btns__btn", "todo-list-block-btns-del", "btn");
  	delBtn.textContent = 'УДАЛИТЬ';

  	todoListItemGroup.append(doneBtn);
  	todoListItemGroup.append(delBtn);
  	todoListItem.append(todoListItemGroup);

  	doneBtn.addEventListener('click', function(){
  		todoListItem.classList.toggle('todo-list__item--green');

  		for (let itemList of todoListArr) {
  			if (itemList.id == obj.id) {
  				itemList.done = !itemList.done;
  			}
  		}

  		setLocalData(todoListArr, todoTitle);
  	});
  	delBtn.addEventListener('click', function(){
  		if (confirm("Вы уверены?")) {
  			todoListItem.remove();

  			for (let i = 0; i < todoListArr.length; i++) {
  				if (todoListArr[i].id == obj.id) {
  					todoListArr.splice(i, 1);
  				}
  			}

  			setLocalData(todoListArr, todoTitle);
  		}
  	});

  	todoListItem.id = itemId(todoListArr);
  	
  	return {
  		todoListItem,
  		doneBtn,
  		delBtn,
  	};
  }
  function itemId(arr) {
    let max = 0;
    for (let item of arr) {
      if (item.id > max) {
        max = item.id;
      }       
    } return max + 1;
  }
  function setLocalData(arr, key) {
    localStorage.setItem(key, JSON.stringify(arr));
  }
  function getLocalData(key) {
    if (localStorage.getItem(key) !== null && localStorage.getItem(key) !== '') {
      todoListArr = JSON.parse(localStorage.getItem(key));
    }
  }
  function createTodoApp() {
    getLocalData(todoTitle);

    for (let index of todoListArr) {
      let todoLocalData = createTodoItem(index);
      todoList.append(todoLocalData.todoListItem);
      if (index.done == true) {
        todoLocalData.todoListItem.classList.add('todo-list__item--green');
      } else {
        todoLocalData.todoListItem.classList.remove('todo-list__item--green');
      }
    }

  	todoForm.addEventListener('submit', function(e) {
  		e.preventDefault();

  		if (!todoFormInput.value) {
  			todoFormBlockBtn.disabled = true;
  			return;
  		}

      let todoListObj = {
        id: itemId(todoListArr),
        name: todoFormInput.value,
        done: false,
      };
      todoListArr.push(todoListObj);

      console.log(todoListArr);

  		let todoItem = createTodoItem(todoListObj);

  		todoList.append(todoItem.todoListItem); // добавление созданной ячейки

      setLocalData(todoListArr, todoTitle);

  		todoFormBlockBtn.disabled = true;

  		todoFormInput.value = '';
  	});
  }

  createTodoApp();  
});

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
			xhr.send(FormData);

			thisForm.reset();
		}
	});
});