"use strict";document.addEventListener("DOMContentLoaded",(function(){new Swiper(".test-swiper",{slidesPerView:1,slidesPerGroup:1,loop:!0,autoplay:{enabled:!0,delay:3e3,stopOnLastSlide:!1,disableOnInteraction:!1},effect:"fade",fadeEffect:{crossFade:!0},pagination:{el:".test-swiper-pgn",type:"fraction",renderFraction:function(e,t){return'<span class="'+e+'"></span> из <span class="'+t+'"></span>'}},navigation:{nextEl:".test-swiper-btn--next",prevEl:".test-swiper-btn--prev"},scrollbar:{el:".test-swiper-scrollbar",draggable:!0}});const e=document.querySelectorAll(".swiper-tabs-btn");e.forEach((function(t){t.addEventListener("click",(t=>{for(let t=0;t<e.length;t++)e[t].classList.remove("open-tabs-btn");const s=t.currentTarget.dataset.path;t.currentTarget.classList.add("open-tabs-btn");document.querySelectorAll(".swiper-tabs-item").forEach((e=>{e.classList.remove("open-tabs-item")}));document.querySelector(`[data-target="${s}"`).classList.add("open-tabs-item")}))}))}));