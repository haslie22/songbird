import birdsDataEn from './data/birds-en';
import birdsDataRu from './data/birds-ru';

import { StateBar } from './statebar';
import { Level } from './level';

class Quiz {
  #container;
  #bar;
  #score;
  #level;
  #nextButton;
  #buttonText;
  #scoreText;
  #levelNum = 0;
  #levelContainer;
  #lang;
  #onQuizEnd;

  constructor(container, lang, onQuizEnd = function() {}) {
    this.#container = container;
    this.#lang = lang;
    this.#onQuizEnd = onQuizEnd;

    this.#bar = this.#createStateBar();
    this.#score = this.#createScore();
    this.#createLevelContainer();
    this.#level = this.#createLevel();
    this.#nextButton = this.#createNextButton();

    this.translate(lang);
  }

  #createStateBar() {
    const barContainer = document.createElement('div');
    barContainer.classList.add('quiz__state-bar', 'state-bar');
    this.#container.append(barContainer);

    return new StateBar(barContainer, this.#lang);
  }

  #createScore() {
    const scoreContainer = document.createElement('div');
    scoreContainer.classList.add('quiz__score', 'score');

    const scoreIcon = document.createElement('img');
    scoreIcon.classList.add('score__icon');
    scoreIcon.src = './../assets/svg/icon-score.svg';

    const scoreText = document.createElement('div');
    scoreText.classList.add('score__text');
    scoreText.textContent = '0';
    this.#scoreText = scoreText;

    scoreContainer.append(scoreIcon, scoreText);
    this.#container.append(scoreContainer);

    return scoreContainer;
  }

  #createLevelContainer() {
    const levelContainer = document.createElement('div');
    levelContainer.classList.add('quiz__level', 'level');
    this.#container.append(levelContainer);
    this.#levelContainer = levelContainer;
  }

  #createLevel() {
    this.#bar.setActive(this.#levelNum);
    const birdsData = this.#lang === 'en' ? birdsDataEn : birdsDataRu;
    return new Level(this.#levelContainer, birdsData[this.#levelNum], this.#lang, this.#finishLevel.bind(this));
  }

  #finishLevel(score) {
    this.#scoreText.textContent = +this.#scoreText.textContent + score;
    this.#nextButton.classList.add('enabled');
  }

  #createNextButton() {
    const nextButton = document.createElement('div');
    nextButton.classList.add('quiz_button', 'button');

    const buttonText = document.createElement('div');
    buttonText.classList.add('button__text');
    this.#buttonText = buttonText;

    nextButton.append(buttonText);
    this.#container.append(nextButton);

    nextButton.addEventListener('click', this.#startNewLevel.bind(this));
    return nextButton;
  }

  #startNewLevel() {
    this.#level.stopAllPlayers();

    if (++this.#levelNum < birdsDataEn.length) {
      this.#nextButton.classList.remove('enabled');
      this.#level = this.#createLevel();
    } else {
      this.#onQuizEnd(this.#scoreText.textContent, '30');
    }
  }

  translate(lang) {
    this.#lang = lang;
    this.#bar.translate(lang);

    const birdsData = lang === 'en' ? birdsDataEn : birdsDataRu;
    this.#level.translate(birdsData[this.#levelNum], lang);

    const buttonTextLang = lang === 'en' ? 'Next level' : 'Дальше';
    this.#buttonText.innerHTML = `${buttonTextLang}<svg width="223" height="58" viewBox="0 0 223 58" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M218.168 50.3452C219.885 37.0791 222.491 18.7854 219.517 5.85966C168.708 4.93928 118.045 4.31459 67.1973 5.18001C47.9023 5.50844 27.1071 8.29819 7.91738 6.58768C8.63436 18.4448 8.65629 30.2862 9.25189 42.1252C9.49586 46.9737 11.7174 52.154 11.0516 57C67.9462 56.6659 124.887 52.6193 181.82 54.0612C192.733 54.3377 203.762 53.0508 214.671 54.0674C185.901 52.1709 156.485 53.8197 127.651 54.1033C108.374 54.2931 89.0929 52.0256 69.7477 52.1365C51.4557 52.2413 33.1829 55.0781 14.9436 54.8914C10.5407 37.8369 4.80262 20.4786 1.9782 3.20429C13.6035 3.01457 25.2141 1.7571 36.8197 1.68294C98.5983 1.28806 160.297 1.95548 222 3.90108C221.894 19.1907 217.297 33.9482 216.105 49.0819C214.457 33.3511 218.582 17.5978 217.424 1.91596C209.825 0.547246 200.96 1.4584 193.222 1.35601C172.832 1.08592 152.653 0.766512 132.263 1.25061C106.619 1.8593 81.0988 2.77441 55.4586 3.6707C37.8843 4.28485 18.2878 3.15329 1 6.3957C2.79257 23.0527 4.92043 39.7153 6.96441 56.3423" stroke-miterlimit="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  }

}

export { Quiz };