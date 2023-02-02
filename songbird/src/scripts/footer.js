class Footer {
  #container;
  #lang;
  
  constructor(container, lang) {
    this.#container = container;
    this.#lang = lang;
    this.draw();
  }
  
  draw() {
    this.#container.innerHTML = '';

    const footerWrapper = document.createElement('div');
    footerWrapper.classList.add('footer__wrapper', 'wrapper');

    const footerContentWrapper = document.createElement('div');
    footerContentWrapper.classList.add('footer__content-wrapper');

    const githubContainer = document.createElement('div');
    githubContainer.classList.add('footer__link-container', 'footer__link-container_github');

    const seeProject = document.createElement('span');
    seeProject.classList.add('footer__text');
    
    const github = document.createElement('a');
    github.classList.add('footer__link', 'link_github');
    github.href = 'https://github.com/haslie22';
    github.textContent = 'github';

    const rssContainer = document.createElement('div');
    rssContainer.classList.add('footer__link-container', 'footer__link-container_rss');

    const withLove = document.createElement('span');
    withLove.classList.add('footer__text');

    const heartIcon = document.createElement('span');
    heartIcon.classList.add('footer__emoji');
    heartIcon.textContent = '❤️';

    const at = document.createElement('span');
    at.classList.add('footer__text');


    const rss = document.createElement('a');
    rss.classList.add('footer__link', 'link_rss');
    rss.href = 'https://rs.school/';
    rss.textContent = 'Rolling Scopes School';

    if (this.#lang === 'en') {
      seeProject.textContent = 'see the project at';
      withLove.textContent = 'made with';
      at.textContent = 'at';
    } else {
      seeProject.textContent = 'смотрите проект в';
      withLove.textContent = 'сделано с';
      at.textContent = 'в';
    }

    githubContainer.append(seeProject, github);
    rssContainer.append(withLove, heartIcon, at, rss);
    footerContentWrapper.append(githubContainer, rssContainer);
    footerWrapper.append(footerContentWrapper);
    this.#container.append(footerWrapper);
  }
}

export { Footer };