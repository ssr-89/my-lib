document.addEventListener("DOMContentLoaded", function () {
  /*изменение цвета фона*/
  let colorInput = document.querySelector(".dom-primer-input");
  let clearButton = document.querySelector(".dom-primer-btn-color");
  let colorBlock = document.querySelector(".dom-primer-block");

  colorInput.addEventListener("input", function() {
    colorBlock.style.backgroundColor = colorInput.value;
  });

  clearButton.addEventListener("click", function () {
    colorBlock.style.removeProperty("background-color");
    colorInput.value = "";
  });

  /*увеличение значения*/
  let digitText = document.querySelector(".dom-primer-text");
  let riseBtn = document.querySelector(".dom-primer-btn-rise");

  function incrementCount() {
    let currentCount = parseInt(digitText.textContent); // Функция parseInt преобразует первый аргумент в число по указанному основанию, а если это невозможно - возвращает NaN
    digitText.textContent = currentCount + 1; // присваивание переменной currentCount текстом в переменную digitText
  }

  riseBtn.addEventListener("click", incrementCount); // вызов функции
});