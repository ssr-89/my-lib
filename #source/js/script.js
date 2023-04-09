'use strict'
document.addEventListener('DOMContentLoaded', () => {

  /*плавный скрол*/
  const anchors = document.querySelectorAll('a[href*="#"]')

  for (let anchor of anchors) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault()

      const blockID = anchor.getAttribute('href').substr(1)

      document.getElementById(blockID).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    })
  };

  const body = document.querySelector('body');
  function addHeader() {
    const $header = document.createElement('header');
    $header.classList.add('header', 'lock-padding');
    $header.innerHTML = '<div class="header__container"><nav class="header__menu header-menu"><ul id="header-menu-list" class="header-menu__list list"><li class="header-menu__item"><a class="header-menu__link link" href="../index.html"><span>ГЛАВНАЯ&nbsp;СТРАНИЦА</span></a></li><li class="header-menu__item"><a class="header-menu__link link" href="../folder-html-css/html-css.html"><span>HTML&nbsp;и&nbsp;CSS</span></a></li><li class="header-menu__item"><a class="header-menu__link link" href="../folder-js/js.html"><span>JavaScript</span></a></li><li class="header-menu__item"><a class="header-menu__link link" href="../folder-git/git.html"><span>Git</span></a></li><li class="header-menu__item"><a class="header-menu__link link" href="../folder-tools/tools.html"><span>Инструменты</span></a></li><li class="header-menu__item"><a class="header-menu__link link" href="../folder-templates/templates.html"><span>Шаблоны</span></a></li><li class="header-menu__item"><a class="header-menu__link link" href="../folder-guide/guide.html"><span>Справочник</span></a></li></ul></nav></div><button id="header-burger" class="header-menu-burger btn"><span></span></button>';
    body.prepend($header);  
  }
  addHeader();

  function addFooter() {
    const $footer = document.createElement('footer');
    $footer.classList.add('footer');
    $footer.innerHTML = '<div class="footer__container"><h2 class="footer__title title">Обратная&nbsp;связь</h2><form class="footer__form footer-form" action="#" method="post"><input class="footer-form__input input" type="text" placeholder="Введите имя*" required><input class="footer-form__input input" type="email" placeholder="Введите Email*" required><textarea class="footer-form__textarea input" placeholder="Введите текст*" required></textarea><button class="footer-form__btn btn" type="submit">Отправить</button></form></div>';
    body.append($footer);
  }
  addFooter();

  const header = document.querySelector("header");
  const headerMenu = document.getElementById("header-menu-list");
  const headerBurger = document.getElementById("header-burger");

  function showHeaderMenu() {
    headerBurger.addEventListener("click", function () {
      body.classList.toggle('blocking');
      header.classList.toggle("pull");
      headerBurger.classList.toggle("open");
      headerMenu.classList.toggle("show");
    });
    if (headerBurger.classList.contains('open')) {
      body.classList.add('blocking');
      header.classList.add('pull');
      headerMenu.classList.add("show");
    } else {
      body.classList.remove('blocking');
      header.classList.remove('pull');      
      headerMenu.classList.remove("show");

    }
  }
  showHeaderMenu();

  /*section-menu*/
  const sectionMenu = document.querySelector(".section-menu__menu");
  const sectionBtn = document.querySelector(".section-menu__btn");
  const sectionMenuLinks = document.querySelectorAll(".menu__link");

  sectionBtn.addEventListener("click", function (e) {
    e.preventDefault();
    this.classList.toggle("active");
    if (this.classList.contains("active")) {
      sectionMenu.classList.add("active");
    } else {
      sectionMenu.classList.remove("active");
    }
  });
  sectionMenuLinks.forEach(function(el) {
    el.addEventListener("click", function() {
      sectionBtn.classList.remove("active");
      sectionMenu.classList.remove("active");
    });
  });
  document.addEventListener('mouseup', (element) => {
   if (! sectionBtn.contains(element.target)) {
      sectionBtn.classList.remove("active");
      sectionMenu.classList.remove("active");
   }
  });
  sectionBtn.setAttribute("aria-label", "open-menu");
});