"use strict"
document.addEventListener('DOMContentLoaded', ()=>{
	const popupLinks = document.querySelectorAll(".popup-link");
const body = document.querySelector("body");
const lockPadding = document.querySelectorAll(".lock-padding");

let unlock = true;

const timeout = 300;

if (popupLinks.length > 0) {
  for (let index = 0; index < popupLinks.length; index++) {
    const popupLink = popupLinks[index];
    popupLink.addEventListener("click", function (e) {
      const popupName = popupLink.getAttribute("href").replace("#", ""); // replace убирает значок #
      const currentPopup = document.getElementById(popupName); // ищет по значению popupName совпадение с id
      popupOpen(currentPopup);
      e.preventDefault(); // использовать для ссылок
    });
  }
}

const popupCloseIcon = document.querySelectorAll(".close-popup");
if (popupCloseIcon.length > 0) {
  for (let index = 0; index < popupCloseIcon.length; index++) {
    const el = popupCloseIcon[index];
    el.addEventListener("click", function (e) {
      popupClose(el.closest(".popup")); // отправляет объект в функцию popupClose(), который является для кнопки закрытия ближайшим родителем с классом popup. Т.е., плсде нажатия кнопки-закрытия будет искать ближайшего родителя с классом popup и закроет его с помощью функции popupClose().
      e.preventDefault();
    });
  }
}

function popupOpen(currentPopup) {
  if (currentPopup && unlock) {
    const popupActive = document.querySelector(".popup.open");
    if (popupActive) {
      popupClose(popupActive, false);
    } else {
      bodyLock();
    }
    currentPopup.classList.add("open");
    currentPopup.addEventListener("click", function (e) {
      if (!e.target.closest(".popup__content")) {
        // если у нажатого объекта нет родителя с классом popup__content
        popupClose(e.target.closest(".popup")); // передаём объект в функцию, у которого родитель ближайший с классом popup
      }
    });
  }
}
function popupClose(popupActive, doUnlock = true) {
  if (unlock) {
    popupActive.classList.remove("open"); // активный попап закрывается
    if (doUnlock) {
      // если doUnlock = true, то запрещаем выполнять bodyUnLock(). Т.е, при нажатии на попап при открытом попап не будет повторно блокироваться скролл.
      bodyUnLock();
    }
  }
}

function bodyLock() {
  const lockPaddingValue =
    window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px"; // разница между шириной всего viewport и шириной объекта, который находится внутри viewport. Т.е., получаем ширину скролла, который убирается при открытии popup. Это делается для того, чтобы при исчезновании/появлении скролла контент не двигался в стороны на ширину скролла.
  /*проверка наличие объектов lockPadding*/
  if (lockPadding.length > 0) {
    /*цикл для фиксированных объектов, чтобы не двигались при исчезновании/появлении скролла*/
    for (let index = 0; index < lockPadding.length; index++) {
      const el = lockPadding[index];
      el.style.paddingRight = lockPaddingValue;
    }
  }
  body.style.paddingRight = lockPaddingValue;
  body.classList.add("lock");

  unlock = false;
  /*таймаут используется для того, что дополнительно не заблокировался скролл при новом нажатии на ссылку popup после закрытия предыдущего*/
  setTimeout(function () {
    unlock = true;
  }, timeout);
}

/*появление скролла с таймаутом, чтобы не сдвигался попап-контент при закрытии*/
function bodyUnLock() {
  setTimeout(function () {
    /*проверка наличие объектов lockPadding*/
    if (lockPadding.length > 0) {
      for (let index = 0; index < lockPadding.length; index++) {
        const el = lockPadding[index];
        el.style.paddingRight = "0px";
      }
    }
    body.style.paddingRight = "0px";
    body.classList.remove("lock");
  }, timeout);

  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}

document.addEventListener("keydown", function (e) {
  if (e.which === 27) {
    // код клавиши 27 (Esc)
    const popupActive = document.querySelector(".popup.open");
    popupClose(popupActive);
  }
});


/*TABS*/
const tabsBtns = document.querySelectorAll(".code-pop-up-btn");
const tabsItems = document.querySelectorAll('.code-pop-up-item');

  tabsBtns.forEach(function(tabsBtn){
    tabsBtn.addEventListener('click', (e)=>{
      const path = e.currentTarget.dataset.path;
      for (let i = 0; i < tabsBtns.length; i++) {
        tabsBtns[i].classList.remove('open-pop-up-btn');
      };
      e.currentTarget.classList.add('open-pop-up-btn');
      for (let tabsItem of tabsItems) {
        tabsItem.classList.remove('open-pop-up-item');
      }
      const tabsItemOpen = document.querySelector(`[data-target="${path}"`);
      tabsItemOpen.classList.add("open-pop-up-item");
    });
  });
});