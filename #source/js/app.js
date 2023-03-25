'use strict'
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".hero__container");
  const form = document.querySelector(".hero-form");
  const inputs = document.querySelectorAll(".index-input");
  const inputName = document.querySelector("#firstname");
  const inputBirthDate = document.querySelector("#date");
  const name = document.createElement("p");
  const age = document.createElement("p");
  const btnForm = document.querySelector(".index-btn");

  
  

  /*вывод результата*/
  btnForm.disabled = true;
	inputs.forEach(function (input) {
  	input.addEventListener("input", () => {
    	btnForm.disabled = false;
    	input.style.backgroundColor = '#fff';
  	});
	});

  container.append(name);
  container.append(age);

  form.addEventListener("submit", (e) => {

    e.preventDefault();

    let birthDate = new Date(inputBirthDate.value); // дата рождения
    let nowDate = new Date(); // текущая дата
    let ageMe = nowDate.getFullYear() - birthDate.getFullYear(); // вычисление разницы в годах
    if (nowDate.getMonth() < birthDate.getMonth() || (nowDate.getMonth() === birthDate.getMonth() && nowDate.getDate() < birthDate.getDate())) {
      ageMe--; // корректировка возраста, если дата рождения еще не наступила в текущем году
    }
    name.textContent = "Имя: " + inputName.value;
    age.textContent = "Возраст: " + ageMe;

    inputs.forEach((input) => {
    	input.value = "";
    	input.style.backgroundColor = 'transparent';
  	});
  	btnForm.disabled = true;
  });
});
