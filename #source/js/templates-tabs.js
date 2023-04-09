"use strict"
document.addEventListener("DOMContentLoaded", function(){
	/*TABS*/
  const tabsBtns = document.querySelectorAll('.tabs-btn');
  const tabsItems = document.querySelectorAll('.tabs-item');

  tabsBtns.forEach(function(tabsBtn){
    tabsBtn.addEventListener('click', (tabsBtn)=>{
      const path = tabsBtn.currentTarget.dataset.path;

      for (let i = 0; i < tabsBtns.length; i++) {
        tabsBtns[i].classList.remove('open-tabs-btn');
      }
      tabsBtn.currentTarget.classList.add('open-tabs-btn');
      tabsItems.forEach((tabsItem)=>{
        tabsItem.classList.remove('open-tabs-item');
      });
      const tabsOpenItem = document.querySelector(`[data-target="${path}"]`);
      tabsOpenItem.classList.add('open-tabs-item');
    });
  });
});