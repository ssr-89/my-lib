"use strict"
document.addEventListener("DOMContentLoaded", function() {
	/*ACCORDION*/
  const spollersArray = document.querySelectorAll("[data-spollers]");
  // Проверка на наличие таких элементов
  if (spollersArray.length > 0) {
    // Получение обычных спойлеров
    // Array.from - в данном случае переводит коллекцию в массив
    /*
      - dataset.spollers проверяет все data c названием spollers - data-spollers
      - !item.dataset.spollers.split(',')[0] - проверка ОТСУТСТВИЯ параметра у data-spollers или 
      первого [0] элемента массива
    */
    const spollersRegular = Array.from(spollersArray).filter(function (
      item,
      index,
      self
    ) {
      return !item.dataset.spollers.split(",")[0];
    });

    // Инициализация обычных спойлеров
    // spollersRegular - массив передаётся в будущую функцию initSpollers
    if (spollersRegular.length > 0) {
      initSpollers(spollersRegular);
    }

    // Получение спойлеров с медиа запросами
    /*
      - dataset.spollers проверяет все data c названием spollers - data-spollers
      - item.dataset.spollers.split(',')[0] - проверка НАЛИЧИЯ параметра у data-spollers или первого [0] элемента массива
    */
    const spollersMedia = Array.from(spollersArray).filter(function (
      item,
      index,
      self
    ) {
      return item.dataset.spollers.split(",")[0];
    });

    // Инициализация спойлеров с медиа запросами
    // Проверка на существование блоков с брейпоинтами
    if (spollersMedia.length > 0) {
      const breakpointsArray = []; // пустой массив для заполнения
      spollersMedia.forEach((item) => {
        const params = item.dataset.spollers; // dataset проверяет у data-spollers наличие параметров 650,min
        const breakpoint = {}; // пустой объект для заполнения
        const paramsArray = params.split(","); // преобразование в массив c элементами [650,min]
        breakpoint.value = paramsArray[0]; // присваивание значения 650/800 в объект breakpoint
        breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max"; // присваивается значение по умолчанию 'max', если не указали второе значение
        breakpoint.item = item; // присваивается сам объект
        breakpointsArray.push(breakpoint); // всё это добавляется в массив breakpointsArray
        /*
          breakpointsArray - массив содержит объекты, которые содержат необходимую информацию
        */
      });

      // Получаем уникальные брейкпоинты
      let mediaQueries = breakpointsArray.map(function (item) {
        /* 
        min-width: 650px - '650,min' или max-width: 800px - '800,max'
        item.value = 650
        item.type = min 
        */
        return (
          "(" +
          item.type +
          "-width: " +
          item.value +
          "px)," +
          item.value +
          "," +
          item.type
        );
      });
      // отфильтровываем и указываем, чтобы все блоки работали с одинаковыми параметрами
      mediaQueries = mediaQueries.filter(function (item, index, self) {
        return self.indexOf(item) === index;
      });

      // Работаем с каждым брейкпоинтом
      mediaQueries.forEach((breakpoint) => {
        const paramsArray = breakpoint.split(","); // преобразование строки в массив
        const mediaBreakpoint = paramsArray[1]; // первый параметр 650/800
        const mediaType = paramsArray[2]; // второй параметр min/max
        const matchMedia = window.matchMedia(paramsArray[0]);
        // matchMedia - метод следит за шириной экрана
        // matchMedia - добавляет 0 элемент в paramsArray, если сработал нужный брейкпоинт, а именно 'min-width: 650px' или 'max-width: 800px'

        // Объекты с нужными условиями
        // spollersArray - массив объектов (блоков со спойлерами)
        // mediaBreakpoint = 650/800
        // mediaType = min/max
        // mediaBreakpoint и mediaType - условия для активации спойлера
        const spollersArray = breakpointsArray.filter(function (item) {
          if (item.value === mediaBreakpoint && item.type === mediaType) {
            return true;
          }
        });

        // Событие - если ширина экрана соответствует условиям, то активируется спойлер
        matchMedia.addListener(function () {
          // Отрабатывает при изменении ширины
          initSpollers(spollersArray, matchMedia);
        });
        // Отрабатывает при загрузке страницы
        initSpollers(spollersArray, matchMedia);
      });
    }

    // Инициализация
    // spollersArray - массив объектов (блоков со спойлерами)
    // matchMedia - если нет аргумента, то будет false
    function initSpollers(spollersArray, matchMedia = false) {
      spollersArray.forEach((spollersBlock) => {
        // Проверка, если matchMedia не равно false, то добавляется элемент item
        // item вроде брейкпоинт
        // spollersBlock - блок со спойлерами
        spollersBlock = matchMedia ? spollersBlock.item : spollersBlock; // если matchMedia чему то равно тогда присваиваем имя объекта spollersBlock
        // благодаря методу matchMedia активирует спойлер
        if (matchMedia.matches || !matchMedia) {
          spollersBlock.classList.add("_init");
          initSpollerBody(spollersBlock);
          spollersBlock.addEventListener("click", setSpollerAction);
        } else {
          spollersBlock.classList.remove("_init");
          initSpollerBody(spollersBlock, false);
          spollersBlock.removeEventListener("click", setSpollerAction); // убираем событие клик
        }
      });
    }

    // Работа с контентом
    function initSpollerBody(spollersBlock, hideSpollerBody = true) {
      // spollerTitles - массив кнопок с атрибутами [data-spoller] в блоках со спойлерами
      const spollerTitles = spollersBlock.querySelectorAll("[data-spoller]");
      // если у кнопки есть [data-spoller]
      if (spollerTitles.length > 0) {
        spollerTitles.forEach((spollerTitle) => {
          if (hideSpollerBody) {
            spollerTitle.removeAttribute("tabindex");
            // contains - если у заголовка нет класса _active, то контент скрыт
            if (!spollerTitle.classList.contains("_active")) {
              // nextElementSibling - следующий объект после заголовка
              // hidden - атрибут сокрытия аналогичный display: none;, но более изящно
              spollerTitle.nextElementSibling.hidden = true;
            }
          } else {
            // отображение спойлера как обычный блок, если условия не соответствуют
            spollerTitle.setAttribute("tabindex", "-1");
            spollerTitle.nextElementSibling.hidden = false;
          }
        });
      }
    }

    // Функция при клике на заголовок спойлера
    function setSpollerAction(e) {
      // e - сжатый объект
      const el = e.target;
      // el.hasAttribute('data-spoller') - если у элемента есть атрибут data-spoller
      // el.closest('[data-spoller]') - или у родителя элемента
      if (el.hasAttribute("data-spoller") || el.closest("[data-spoller]")) {
        const spollerTitle = el.hasAttribute("data-spoller")
          ? el
          : el.closest("[data-spoller]");
        // spollersBlock - блоки со спойлерами
        const spollersBlock = spollerTitle.closest("[data-spollers]");
        // oneSpoller - спойлер с атрибутом data-one-spoller
        const oneSpoller = spollersBlock.hasAttribute("data-one-spoller")
          ? true
          : false;
        // если нет элементов с классом _slide, то работаем дальше
        // данная проверка добавлена для корректной работы аккордиона
        if (!spollersBlock.querySelectorAll("._slide").length) {
          // если у спойлера и у заголовка нет класса _active
          if (oneSpoller && !spollerTitle.classList.contains("_active")) {
            // тогда все остальные спойлеры скрыты
            hideSpollersBody(spollersBlock);
          }
          spollerTitle.classList.toggle("_active");
          _slideToggle(spollerTitle.nextElementSibling, 500);
        }
        // отменяет действие по умолчанию
        e.preventDefault();
      }
    }
    function hideSpollersBody(spollersBlock) {
      // spollersActiveTitle - открытый активный спойлер
      const spollerActiveTitle = spollersBlock.querySelector(
        "[data-spoller]._active"
      );
      if (spollerActiveTitle) {
        // убираем класс _active у spollersActiveTitle и скрываем все элементы
        spollerActiveTitle.classList.remove("_active");
        _slideUp(spollerActiveTitle.nextElementSibling, 500);
      }
    }
  }

  /*========================================================================================================================================================*/
  // SlideToggle
  // Функция _slideUp - анимировано скрывает объект
  let _slideUp = function (target, duration = 500) {
    if (!target.classList.contains("_slide")) {
      target.classList.add("_slide");
      target.style.transitionProperty = "height, margin, padding";
      target.style.transitionDuration = duration + "ms";
      target.style.height = target.offsetHeight + "px";
      target.offsetHeight;
      target.style.overflow = "hidden";
      target.style.height = 0;
      target.style.paddingTop = 0;
      target.style.paddingBottom = 0;
      target.style.marginTop = 0;
      target.style.marginBottom = 0;
      window.setTimeout(function () {
        target.hidden = true;
        target.style.removeProperty("height");
        target.style.removeProperty("padding-top");
        target.style.removeProperty("padding-bottom");
        target.style.removeProperty("margin-top");
        target.style.removeProperty("margin-bottom");
        target.style.removeProperty("overflow");
        target.style.removeProperty("transition-duration");
        target.style.removeProperty("transition-property");
        target.classList.remove("_slide");
      }, duration);
    }
  };
  // Функция _slideDown - анимировано показывает объект
  let _slideDown = function (target, duration = 500) {
    if (!target.classList.contains("_slide")) {
      target.classList.add("_slide");
      if (target.hidden) {
        target.hidden = false;
      }
      let height = target.offsetHeight;
      target.style.overflow = "hidden";
      target.style.height = 0;
      target.style.paddingTop = 0;
      target.style.paddingBottom = 0;
      target.style.marginTop = 0;
      target.style.marginBottom = 0;
      target.offsetHeight;
      target.style.transitionProperty = "height, margin, padding";
      target.style.transitionDuration = duration + "ms";
      target.style.height = height + "px";
      target.style.removeProperty("padding-top");
      target.style.removeProperty("padding-bottom");
      target.style.removeProperty("margin-top");
      target.style.removeProperty("margin-bottom");
      window.setTimeout(function () {
        target.style.removeProperty("height");
        target.style.removeProperty("overflow");
        target.style.removeProperty("transition-duration");
        target.style.removeProperty("transition-property");
        target.classList.remove("_slide");
      }, duration);
    }
  };
  // Функция _slideToggle - комбинация предыдущих двух функций
  let _slideToggle = function (target, duration = 500) {
    if (target.hidden) {
      return _slideDown(target, duration);
    } else {
      _slideUp(target, duration);
    }
  };
  /*========================================================================================================================================================*/
  /*
  Для родителя спойлеров пишем атрибут data-spollers
  Для заголовков спойлеров пишем атрибут data-spoller
  Если нужно включать/выключать работу спойлуров на разных размерах экранов пишем параметры ширины и типа брейкпоинта.
  Например:
  data-spollers='992,max' - спойлеры будут работать на экранах шириной меньше или равно 992px
  data-spollers='768,min' - спойлеры будут работать на экранах шириной больше или равно 768px

  Если нужно, чтобы в блоке открывался только один спойлер добавляем атрибут data-one-spoller
  */
});