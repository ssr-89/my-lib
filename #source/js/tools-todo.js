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
  let listName;

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

  		setLocalData(todoListArr, listName);
  	});
  	delBtn.addEventListener('click', function(){
  		if (confirm("Вы уверены?")) {
  			todoListItem.remove();

  			for (let i = 0; i < todoListArr.length; i++) {
  				if (todoListArr[i].id == obj.id) {
  					todoListArr.splice(i, 1);
  				}
  			}

  			setLocalData(todoListArr, listName);
  		}
  	});

  	todoListItem.id = obj.id;
  	
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
  function setLocalData(arr, keyName) {
    localStorage.setItem(keyName, JSON.stringify(arr));
  }
  function getLocalData(key) {
    if (localStorage.getItem(key) !== null && localStorage.getItem(key) !== '') {
      todoListArr = JSON.parse(localStorage.getItem(key));
    }
  }
  function createTodoApp() {
    getLocalData(listName);

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

      setLocalData(todoListArr, listName);

  		todoFormBlockBtn.disabled = true;

  		todoFormInput.value = '';
  	});
  } createTodoApp();
});
