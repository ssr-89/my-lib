"use strict";document.addEventListener("DOMContentLoaded",(function(){const e=document.querySelectorAll(".slider__img"),t=document.querySelector(".slider");let n,o=0;function c(){console.log("resize"),n=document.querySelector(".slider-block").offsetWidth,t.style.width=n*e.length+"px",e.forEach((function(e){e.style.width=n+"px",e.style.height="auto"})),r()}function r(){t.style.transform="translate(-"+o*n+"px)"}window.addEventListener("resize",c),c(),document.querySelector(".btn-prev").addEventListener("click",(function(){o--,o<0&&(o=e.length-1),r()})),document.querySelector(".btn-next").addEventListener("click",(function(){o++,o>=e.length&&(o=0),r()}))}));