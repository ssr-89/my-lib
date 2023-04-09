"use strict"
document.addEventListener("DOMContentLoaded", function(){
	const accordOther = document.getElementById("accord");
	accordOther.addEventListener("click", change);
	function change(event) {
  	const targ = event.target;
  	if (targ.tagName !== "H3") return;
  	if (targ.classList.contains("select-spoller")) {
    	hideAll();
  	} else {
    	hideAll();
    	targ.classList.add("select-spoller");
    	showText(targ.nextElementSibling);
  	}
	}
	function hideAll() {
  	const accordTitle = accordOther.querySelectorAll(".accord__title");
  	const accordContent = accordOther.querySelectorAll(".accord-content");
  	for (let i = 0; i < accordTitle.length; i++) {
    	accordTitle[i].classList.remove("select-spoller");
  	}
  	for (let i = 0; i < accordContent.length; i++) {
    	accordContent[i].style.height = "0";
  	}
	}
	function showText(textEl) {
  	textEl.style.height = textEl.scrollHeight + "px";
	}
});