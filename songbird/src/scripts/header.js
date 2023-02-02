class Header {
  #container;
  #burgerMenu;
  #lang;
  #onLanguageChange;
  #menuQuizLink;
  #menuGalleryLink;
  #inputLangEn;
  #inputLangRu;
  #labelLangEn;
  #labelLangRu;
  #menu;

  constructor(container, lang, onLanguageChange) {
    this.#container = container;
    this.#lang = lang;
    this.#onLanguageChange = onLanguageChange;

    this.draw();
    this.translate(lang);
  }

  draw() {
    this.#container.innerHTML = '';

    const additionalLogo = document.createElement('div');
    additionalLogo.classList.add('menu__item', 'item_logo', 'logo');

    const additionalLogoLink = document.createElement('a');
    additionalLogoLink.classList.add('menu__link', 'logo-obj');
    additionalLogoLink.href = '../main/index.html';
    additionalLogoLink.textContent = 'SONGBIRD';

    const additionalLogoImage = document.createElement('img');
    additionalLogoImage.classList.add('logo-obj__img');
    additionalLogoImage.src = './../assets/svg/logo-bird.svg';

    additionalLogo.append(additionalLogoLink, additionalLogoImage);

    const headerWrapper = document.createElement('div');
    headerWrapper.classList.add('header__wrapper', 'wrapper');
    this.#menu = headerWrapper;
    this.#menu.addEventListener('click', (e => this.#handleBurger(e)));

    const leftContainer = document.createElement('div');
    leftContainer.classList.add('header__subwrapper_left');

    const rightContainer = document.createElement('div');
    rightContainer.classList.add('header__subwrapper_right');

    const menu = document.createElement('ul');
    menu.classList.add('header__menu', 'menu');

    const menuQuiz = document.createElement('li');
    menuQuiz.classList.add('menu__item', 'item_quiz');

    const menuQuizLink = document.createElement('a');
    menuQuizLink.classList.add('menu__link');
    menuQuizLink.href = '../quiz/index.html';
    this.#menuQuizLink = menuQuizLink;

    const menuGallery = document.createElement('li');
    menuGallery.classList.add('menu__item', 'item_gallery');

    const menuGalleryLink = document.createElement('a');
    menuGalleryLink.classList.add('menu__link');
    menuGalleryLink.href = '../gallery/index.html';
    this.#menuGalleryLink = menuGalleryLink;

    const logo = document.createElement('li');
    logo.classList.add('menu__item', 'item_logo', 'logo');

    const logoLink = document.createElement('a');
    logoLink.classList.add('menu__link', 'logo-obj');
    logoLink.href = '../main/index.html';
    logoLink.textContent = 'SONGBIRD';

    const logoImage = document.createElement('img');
    logoImage.classList.add('logo-obj__img');
    logoImage.src = './../assets/svg/logo-bird.svg';

    const lang = document.createElement('li');
    lang.classList.add('menu__item', 'item_lang', 'lang');

    const inputLangEn = document.createElement('input');
    inputLangEn.type = 'radio';
    inputLangEn.name = 'lang';
    inputLangEn.id = 'en';
    inputLangEn.checked = true;
    this.#inputLangEn = inputLangEn;

    const labelLangEn = document.createElement('label');
    labelLangEn.classList.add('lang__en');
    labelLangEn.setAttribute('for', 'en');
    this.#labelLangEn = labelLangEn;

    const inputLangRu = document.createElement('input');
    inputLangRu.type = 'radio';
    inputLangRu.name = 'lang';
    inputLangRu.id = 'ru';
    this.#inputLangRu = inputLangRu;

    const labelLangRu = document.createElement('label');
    labelLangRu.classList.add('lang__ru');
    labelLangRu.setAttribute('for', 'ru');
    this.#labelLangRu = labelLangRu;

    const langDivider = document.createElement('span');
    langDivider.classList.add('lang__divider');
    langDivider.textContent = '/';

    const burgerMenu = document.createElement('div');
    burgerMenu.classList.add('menu__burger', 'burger');
    this.#burgerMenu = burgerMenu;

    for (let i = 0; i < 4; i++) {
      const burgerLine = document.createElement('span');
      burgerMenu.append(burgerLine);
    }

    menuGallery.append(menuGalleryLink);
    menuQuiz.append(menuQuizLink);
    logoLink.append(logoImage);
    logo.append(logoLink);
    lang.append(inputLangEn, labelLangEn, langDivider, inputLangRu, labelLangRu);

    menu.append(menuQuiz, menuGallery, logo);
    leftContainer.append(menu);
    rightContainer.append(lang);

    headerWrapper.append(leftContainer, rightContainer);
    this.#container.append(additionalLogo, headerWrapper, burgerMenu);

    inputLangEn.addEventListener('change', this.#langChangehandler.bind(this));
    inputLangRu.addEventListener('change', this.#langChangehandler.bind(this));

    this.#burgerMenu.addEventListener('click', (e) => {
      this.#handleBurger(e);
    });
  }

  #langChangehandler(e) {
    const lang = e.target.id;
    localStorage.setItem('lang', lang);

    this.#onLanguageChange(lang);
  }
  
  #handleBurger(e) {
    const burger = this.#container.querySelector('.burger');
    const menu = this.#container.querySelector('.header__wrapper');

    burger.classList.toggle('open');
    menu.classList.toggle('active');
  }

  translate(lang) {
    this.#lang = lang;

    if (lang === 'en') {
      this.#menuQuizLink.textContent = 'Quiz';
      this.#menuGalleryLink.textContent = 'Gallery';
      this.#labelLangEn.textContent = 'en';
      this.#labelLangRu.textContent = 'ru';
      this.#inputLangEn.checked = true;
    } else {
      this.#menuQuizLink.textContent = 'Игра';
      this.#menuGalleryLink.textContent = 'Галерея';
      this.#labelLangEn.textContent = 'англ';
      this.#labelLangRu.textContent = 'рус';
      this.#inputLangRu.checked = true;
    }
  }
}

export { Header };