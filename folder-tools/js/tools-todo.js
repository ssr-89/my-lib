"use strict";document.addEventListener("DOMContentLoaded",(function(){document.querySelector(".to-do-block__title");const t=document.querySelector(".to-do-form"),e=document.querySelector(".to-do-form__input"),o=(document.querySelector(".to-do-form-block"),document.querySelector(".to-do-form-block__btn"));o.disabled=!0,e.addEventListener("input",(function(){o.disabled=!1}));let n,d=document.querySelector(".todo-list"),l=[];function i(t){let e=document.createElement("li");e.classList.add("todo-list__item"),e.textContent=t.name;let o=document.createElement("div");o.classList.add("todo-list__block-btns","todo-list-block-btns");let d=document.createElement("button");d.classList.add("todo-list-block-btns__btn","todo-list-block-btns-ok","btn"),d.textContent="ГОТОВО";let i=document.createElement("button");return i.classList.add("todo-list-block-btns__btn","todo-list-block-btns-del","btn"),i.textContent="УДАЛИТЬ",o.append(d),o.append(i),e.append(o),d.addEventListener("click",(function(){e.classList.toggle("todo-list__item--green");for(let e of l)e.id==t.id&&(e.done=!e.done);c(l,n)})),i.addEventListener("click",(function(){if(confirm("Вы уверены?")){e.remove();for(let e=0;e<l.length;e++)l[e].id==t.id&&l.splice(e,1);c(l,n)}})),e.id=t.id,{todoListItem:e,doneBtn:d,delBtn:i}}function s(t){let e=0;for(let o of t)o.id>e&&(e=o.id);return e+1}function c(t,e){localStorage.setItem(e,JSON.stringify(t))}!function(){var r;r=n,null!==localStorage.getItem(r)&&""!==localStorage.getItem(r)&&(l=JSON.parse(localStorage.getItem(r)));for(let t of l){let e=i(t);d.append(e.todoListItem),1==t.done?e.todoListItem.classList.add("todo-list__item--green"):e.todoListItem.classList.remove("todo-list__item--green")}t.addEventListener("submit",(function(t){if(t.preventDefault(),!e.value)return void(o.disabled=!0);let r={id:s(l),name:e.value,done:!1};l.push(r),console.log(l);let a=i(r);d.append(a.todoListItem),c(l,n),o.disabled=!0,e.value=""}))}()}));