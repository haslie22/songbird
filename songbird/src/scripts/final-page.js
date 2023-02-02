class Final {
  #container;
  #score;
  #maxScore;
  #lang;
  #popupTitle;
  #popupText;
  #buttonText;
  #startNewGame;
  
  constructor(container, score, maxScore, lang, startNewGame = function(){}) {
    this.#container = container;
    this.#score = score;
    this.#maxScore = maxScore;
    this.#lang = lang;
    this.#startNewGame = startNewGame;
    this.draw();
  }
  
  draw() {
    this.#container.innerHTML = '';

    const mainWrapper = document.createElement('div');
    mainWrapper.classList.add('result__wrapper');
    mainWrapper.style.background = `url('./../assets/img/jpg/final-bird.jpg') no-repeat top`;
    mainWrapper.style.backgroundSize = 'cover';

    const popup = document.createElement('div');
    popup.classList.add('result__popup', 'popup');

    const popupContent = document.createElement('div');
    popupContent.classList.add('popup__content');

    const popupTitle = document.createElement('div');
    popupTitle.classList.add('popup__title');
    this.#popupTitle = popupTitle;

    const popupText = document.createElement('div');
    popupText.classList.add('popup__text');
    this.#popupText = popupText;

    const popupScoreContainer = document.createElement('div');
    popupScoreContainer.classList.add('popup__score');

    const popupIcon = document.createElement('img');
    popupIcon.classList.add('popup__icon');
    popupIcon.src = './../assets/svg/icon-score-final.svg';

    const popupScore = document.createElement('div');
    popupScore.classList.add('popup__score', 'score-final');

    const currentScore = document.createElement('span');
    currentScore.classList.add('score-final__current');
    currentScore.textContent = this.#score;

    const divider = document.createElement('span');
    divider.classList.add('score-final__divider');
    divider.textContent = '/';

    const totalScore = document.createElement('span');
    totalScore.classList.add('score-final__total');
    totalScore.textContent = this.#maxScore;

    const popupButton = document.createElement('div');
    popupButton.classList.add('popup_button', 'button', 'enabled');

    const buttonText = document.createElement('div');
    buttonText.classList.add('button__text');
    this.#buttonText = buttonText;

    popupScore.append(currentScore, divider, totalScore);
    popupScoreContainer.append(popupIcon, popupScore);
    popupButton.append(buttonText);
    popupContent.append(popupTitle, popupText, popupScoreContainer, popupButton);
    popup.append(popupContent);
    mainWrapper.append(popup);
    this.#container.append(mainWrapper);

    if (this.#lang === 'en') {
      popupTitle.textContent = 'Congratulations!';
      popupText.textContent = 'You won the quiz with the score';
      buttonText.innerHTML = 'Try again!<svg width="223" height="58" viewBox="0 0 223 58" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M218.168 50.3452C219.885 37.0791 222.491 18.7854 219.517 5.85966C168.708 4.93928 118.045 4.31459 67.1973 5.18001C47.9023 5.50844 27.1071 8.29819 7.91738 6.58768C8.63436 18.4448 8.65629 30.2862 9.25189 42.1252C9.49586 46.9737 11.7174 52.154 11.0516 57C67.9462 56.6659 124.887 52.6193 181.82 54.0612C192.733 54.3377 203.762 53.0508 214.671 54.0674C185.901 52.1709 156.485 53.8197 127.651 54.1033C108.374 54.2931 89.0929 52.0256 69.7477 52.1365C51.4557 52.2413 33.1829 55.0781 14.9436 54.8914C10.5407 37.8369 4.80262 20.4786 1.9782 3.20429C13.6035 3.01457 25.2141 1.7571 36.8197 1.68294C98.5983 1.28806 160.297 1.95548 222 3.90108C221.894 19.1907 217.297 33.9482 216.105 49.0819C214.457 33.3511 218.582 17.5978 217.424 1.91596C209.825 0.547246 200.96 1.4584 193.222 1.35601C172.832 1.08592 152.653 0.766512 132.263 1.25061C106.619 1.8593 81.0988 2.77441 55.4586 3.6707C37.8843 4.28485 18.2878 3.15329 1 6.3957C2.79257 23.0527 4.92043 39.7153 6.96441 56.3423" stroke-miterlimit="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    } else {
      popupTitle.textContent = 'Поздравляем!';
      popupText.textContent = 'Вы выиграли со счетом';
      buttonText.innerHTML = 'Еще раз!<svg width="223" height="58" viewBox="0 0 223 58" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M218.168 50.3452C219.885 37.0791 222.491 18.7854 219.517 5.85966C168.708 4.93928 118.045 4.31459 67.1973 5.18001C47.9023 5.50844 27.1071 8.29819 7.91738 6.58768C8.63436 18.4448 8.65629 30.2862 9.25189 42.1252C9.49586 46.9737 11.7174 52.154 11.0516 57C67.9462 56.6659 124.887 52.6193 181.82 54.0612C192.733 54.3377 203.762 53.0508 214.671 54.0674C185.901 52.1709 156.485 53.8197 127.651 54.1033C108.374 54.2931 89.0929 52.0256 69.7477 52.1365C51.4557 52.2413 33.1829 55.0781 14.9436 54.8914C10.5407 37.8369 4.80262 20.4786 1.9782 3.20429C13.6035 3.01457 25.2141 1.7571 36.8197 1.68294C98.5983 1.28806 160.297 1.95548 222 3.90108C221.894 19.1907 217.297 33.9482 216.105 49.0819C214.457 33.3511 218.582 17.5978 217.424 1.91596C209.825 0.547246 200.96 1.4584 193.222 1.35601C172.832 1.08592 152.653 0.766512 132.263 1.25061C106.619 1.8593 81.0988 2.77441 55.4586 3.6707C37.8843 4.28485 18.2878 3.15329 1 6.3957C2.79257 23.0527 4.92043 39.7153 6.96441 56.3423" stroke-miterlimit="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    }
    
    popupButton.addEventListener('click', this.#startNewGame);
  }

  translate(lang) {
    if (lang === 'en') {
      this.#popupTitle.textContent = 'Congratulations!';
      this.#popupText.textContent = 'You won the quiz with the score';
      this.#buttonText.innerHTML = 'Try again!<svg width="223" height="58" viewBox="0 0 223 58" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M218.168 50.3452C219.885 37.0791 222.491 18.7854 219.517 5.85966C168.708 4.93928 118.045 4.31459 67.1973 5.18001C47.9023 5.50844 27.1071 8.29819 7.91738 6.58768C8.63436 18.4448 8.65629 30.2862 9.25189 42.1252C9.49586 46.9737 11.7174 52.154 11.0516 57C67.9462 56.6659 124.887 52.6193 181.82 54.0612C192.733 54.3377 203.762 53.0508 214.671 54.0674C185.901 52.1709 156.485 53.8197 127.651 54.1033C108.374 54.2931 89.0929 52.0256 69.7477 52.1365C51.4557 52.2413 33.1829 55.0781 14.9436 54.8914C10.5407 37.8369 4.80262 20.4786 1.9782 3.20429C13.6035 3.01457 25.2141 1.7571 36.8197 1.68294C98.5983 1.28806 160.297 1.95548 222 3.90108C221.894 19.1907 217.297 33.9482 216.105 49.0819C214.457 33.3511 218.582 17.5978 217.424 1.91596C209.825 0.547246 200.96 1.4584 193.222 1.35601C172.832 1.08592 152.653 0.766512 132.263 1.25061C106.619 1.8593 81.0988 2.77441 55.4586 3.6707C37.8843 4.28485 18.2878 3.15329 1 6.3957C2.79257 23.0527 4.92043 39.7153 6.96441 56.3423" stroke-miterlimit="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    } else {
      this.#popupTitle.textContent = 'Поздравляем!';
      this.#popupText.textContent = 'Вы выиграли со счетом';
      this.#buttonText.innerHTML = 'Еще раз!<svg width="223" height="58" viewBox="0 0 223 58" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M218.168 50.3452C219.885 37.0791 222.491 18.7854 219.517 5.85966C168.708 4.93928 118.045 4.31459 67.1973 5.18001C47.9023 5.50844 27.1071 8.29819 7.91738 6.58768C8.63436 18.4448 8.65629 30.2862 9.25189 42.1252C9.49586 46.9737 11.7174 52.154 11.0516 57C67.9462 56.6659 124.887 52.6193 181.82 54.0612C192.733 54.3377 203.762 53.0508 214.671 54.0674C185.901 52.1709 156.485 53.8197 127.651 54.1033C108.374 54.2931 89.0929 52.0256 69.7477 52.1365C51.4557 52.2413 33.1829 55.0781 14.9436 54.8914C10.5407 37.8369 4.80262 20.4786 1.9782 3.20429C13.6035 3.01457 25.2141 1.7571 36.8197 1.68294C98.5983 1.28806 160.297 1.95548 222 3.90108C221.894 19.1907 217.297 33.9482 216.105 49.0819C214.457 33.3511 218.582 17.5978 217.424 1.91596C209.825 0.547246 200.96 1.4584 193.222 1.35601C172.832 1.08592 152.653 0.766512 132.263 1.25061C106.619 1.8593 81.0988 2.77441 55.4586 3.6707C37.8843 4.28485 18.2878 3.15329 1 6.3957C2.79257 23.0527 4.92043 39.7153 6.96441 56.3423" stroke-miterlimit="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    }
  }
}

export { Final };