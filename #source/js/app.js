'use strict'
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".hero__container");
  const form = document.querySelector(".hero-form");
  const inputs = document.querySelectorAll(".index-input");
  const inputName = document.querySelector("#firstname");
  const inputDate = document.querySelector("#date");
  const name = document.createElement("p");
  const age = document.createElement("p");
  const btnForm = document.querySelector(".index-btn");

  let me = {
    birthDate: { year: 1989, month: 3, day: 18 },
    getAge: function () {
      let now = new Date();
      let born = new Date(
        this.birthDate.year,
        this.birthDate.month + 1,
        this.birthDate.day
      );
      let diffInMilliseconds = now.getTime() - born.getTime();
      return Math.floor(diffInMilliseconds / 1000 / 60 / 60 / 24 / 365.25);
    }
  };

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
    name.textContent = "Имя: " + inputName.value;
    age.textContent = "Возраст: " + me.getAge();

    inputs.forEach((input) => {
    	input.value = "";
    	input.style.backgroundColor = 'transparent';
  	});
  	btnForm.disabled = true;
  });
});
