document.addEventListener("DOMContentLoaded", function () {
  const obj = {
    name: "John",
    surname: "Smith",
    age: 30,
  }

  localStorage.setItem('person', JSON.stringify(obj));

  const person = localStorage.getItem('person');
  const pers = JSON.parse(person);
  pers.name = "James";

  console.log(pers);
});