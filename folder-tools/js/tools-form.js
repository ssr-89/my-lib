document.addEventListener("DOMContentLoaded",(function(){console.log("init");const e=document.querySelector(".form").querySelector('input[type="tel"]');new Inputmask("+7 (999) 999-99-99").mask(e),new window.JustValidate(".form",{rules:{tel:{required:!0,function:()=>{const n=e.inputmask.unmaskedvalue();return console.log(n),Number(n)&&10===n.length}}},colorWrong:"rgba(0,0,128,1)",messages:{name:{required:"Введите имя",minLength:"Минимальное значение 3 символа",maxLength:"Максимальное значение символов 15 символов"},email:{email:"Введите корректный Email",required:"Введите Email"},tel:{required:"Введите телефон",function:"Минимальное значение 10 символов без +7"}},submitHandler:function(e){let n=new FormData(e),t=new XMLHttpRequest;t.onreadystatechange=function(){4===t.readyState&&200===t.status&&console.log("Отправлено")},t.open("POST","mail.php",!0),t.send(n),e.reset()}})}));