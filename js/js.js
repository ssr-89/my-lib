const spollersArray=document.querySelectorAll("[data-spollers]");if(spollersArray.length>0){const e=Array.from(spollersArray).filter((function(e,t,o){return!e.dataset.spollers.split(",")[0]}));e.length>0&&initSpollers(e);const t=Array.from(spollersArray).filter((function(e,t,o){return e.dataset.spollers.split(",")[0]}));if(t.length>0){const o=[];t.forEach((e=>{const t={},i=e.dataset.spollers.split(",");t.value=i[0],t.type=i[1]?i[1].trim():"max",t.item=e,o.push(t)}));let i=o.map((function(e){return"("+e.type+"-width: "+e.value+"px),"+e.value+","+e.type}));i=i.filter((function(e,t,o){return o.indexOf(e)===t})),i.forEach((e=>{const t=e.split(","),i=t[1],s=t[2],r=window.matchMedia(t[0]),l=o.filter((function(e){if(e.value===i&&e.type===s)return!0}));r.addListener((function(){initSpollers(l,r)})),initSpollers(l,r)}))}function initSpollers(e,t=!1){e.forEach((e=>{e=t?e.item:e,t.matches||!t?(e.classList.add("_init"),initSpollerBody(e),e.addEventListener("click",setSpollerAction)):(e.classList.remove("_init"),initSpollerBody(e,!1),e.removeEventListener("click",setSpollerAction))}))}function initSpollerBody(e,t=!0){const o=e.querySelectorAll("[data-spoller]");o.length>0&&o.forEach((e=>{t?(e.removeAttribute("tabindex"),e.classList.contains("_active")||(e.nextElementSibling.hidden=!0)):(e.setAttribute("tabindex","-1"),e.nextElementSibling.hidden=!1)}))}function setSpollerAction(e){const t=e.target;if(t.hasAttribute("data-spoller")||t.closest("[data-spoller]")){const o=t.hasAttribute("data-spoller")?t:t.closest("[data-spoller]"),i=o.closest("[data-spollers]"),s=!!i.hasAttribute("data-one-spoller");i.querySelectorAll("._slide").length||(s&&!o.classList.contains("_active")&&hideSpollersBody(i),o.classList.toggle("_active"),_slideToggle(o.nextElementSibling,500)),e.preventDefault()}}function hideSpollersBody(e){const t=e.querySelector("[data-spoller]._active");t&&(t.classList.remove("_active"),_slideUp(t.nextElementSibling,500))}}let _slideUp=function(e,t=500){e.classList.contains("_slide")||(e.classList.add("_slide"),e.style.transitionProperty="height, margin, padding",e.style.transitionDuration=t+"ms",e.style.height=e.offsetHeight+"px",e.offsetHeight,e.style.overflow="hidden",e.style.height=0,e.style.paddingTop=0,e.style.paddingBottom=0,e.style.marginTop=0,e.style.marginBottom=0,window.setTimeout((function(){e.hidden=!0,e.style.removeProperty("height"),e.style.removeProperty("padding-top"),e.style.removeProperty("padding-bottom"),e.style.removeProperty("margin-top"),e.style.removeProperty("margin-bottom"),e.style.removeProperty("overflow"),e.style.removeProperty("transition-duration"),e.style.removeProperty("transition-property"),e.classList.remove("_slide")}),t))},_slideDown=function(e,t=500){if(!e.classList.contains("_slide")){e.classList.add("_slide"),e.hidden&&(e.hidden=!1);let o=e.offsetHeight;e.style.overflow="hidden",e.style.height=0,e.style.paddingTop=0,e.style.paddingBottom=0,e.style.marginTop=0,e.style.marginBottom=0,e.offsetHeight,e.style.transitionProperty="height, margin, padding",e.style.transitionDuration=t+"ms",e.style.height=o+"px",e.style.removeProperty("padding-top"),e.style.removeProperty("padding-bottom"),e.style.removeProperty("margin-top"),e.style.removeProperty("margin-bottom"),window.setTimeout((function(){e.style.removeProperty("height"),e.style.removeProperty("overflow"),e.style.removeProperty("transition-duration"),e.style.removeProperty("transition-property"),e.classList.remove("_slide")}),t)}},_slideToggle=function(e,t=500){if(e.hidden)return _slideDown(e,t);_slideUp(e,t)};