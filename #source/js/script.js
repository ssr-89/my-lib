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

  const header = document.createElement('header');
  header.classList.add('header');
  header.innerHTML = '<div class="header__container"><nav class="header__menu header-menu"><ul class="header-menu__list list"><li class="header-menu__item"><a class="header-menu__link link" href="../index.html"><span>ГЛАВНАЯ&nbsp;СТРАНИЦА</span></a></li><li class="header-menu__item"><a class="header-menu__link link" href="../folder-html-css/html-css.html"><span>HTML&nbsp;и&nbsp;CSS</span></a></li><li class="header-menu__item"><a class="header-menu__link link" href="../folder-js/js.html"><span>JavaScript</span></a></li><li class="header-menu__item"><a class="header-menu__link link" href="../folder-git/git.html"><span>Git</span></a></li><li class="header-menu__item"><a class="header-menu__link link" href="../folder-tools/tools.html"><span>Инструменты</span></a></li></ul></nav></div>';
  body.prepend(header);

  const footer = document.createElement('footer');
  footer.classList.add('footer');
  footer.innerHTML = '<div class="footer__container"><h2 class="footer__title title">Обратная&nbsp;связь</h2><form class="footer__form footer-form" action="#" method="post"><input class="footer-form__input input" type="text" placeholder="Введите имя*" required><input class="footer-form__input input" type="email" placeholder="Введите Email*" required><textarea class="footer-form__textarea input" placeholder="Введите текст*" required></textarea><button class="footer-form__btn btn" type="submit">Отправить</button></form></div>';
  body.append(footer);

});