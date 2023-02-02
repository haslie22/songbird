import { getRandomNum } from './helpers';
import { CurrentBird } from './current-bird';
import { Card } from './card';

import loseSound from './../assets/sounds/lose.wav';
import winSound from './../assets/sounds/win.wav';

class Level {
  static #loseAudio = new Audio(loseSound);
  static #winAudio = new Audio(winSound);

  #container;
  #dataArr;
  #birdIndex;
  #currentBird;
  #currentAnswer;
  #placeholder;
  #answers;
  #answersArr = [];
  #answersTextArr = [];
  #answerDotsArr = [];
  #currentAnswerIndex;
  #levelEnded = false;
  #onLevelEnd;
  #levelScore = 5;
  #answerCard = null;
  #lang;

  constructor(container, dataArr, lang, onLevelEnd = function() {}) {
    this.#container = container;
    this.#dataArr = dataArr;
    this.#lang = lang;
    this.#onLevelEnd = onLevelEnd;

    this.#pickBird();
    this.draw();
  }

  #pickBird() {
    this.#birdIndex = getRandomNum(0, this.#dataArr.length - 1);
  }

  draw() {
    this.#container.innerHTML = '';
    const currentBirdContainer = document.createElement('div');
    currentBirdContainer.classList.add('level__current-bird', 'current-bird');

    this.#container.append(currentBirdContainer);
    this.#currentBird = new CurrentBird(currentBirdContainer, this.#dataArr[this.#birdIndex]);

    this.#answers = this.#createAnswers();
    this.#currentAnswer = this.#createCardBlock();

    this.#addListeners();
  }

  stopAllPlayers() {
    this.#currentBird.stopPlayer();
    if (this.#answerCard) this.#answerCard.stopPlayer();
  }

  #createAnswers() {
    const currentAnswersContainer = document.createElement('div');
    currentAnswersContainer.classList.add('level__answers', 'answers');

    this.#dataArr.forEach(obj => {
      const answerContainer = document.createElement('div');
      answerContainer.classList.add('answers__answer', 'answer');
      answerContainer.setAttribute('data-answer-id', `${obj.id}`);

      const answerText = document.createElement('span');
      answerText.classList.add('answer__text');
      answerText.textContent = obj.name;

      const answerStatus = document.createElement('div');
      answerStatus.classList.add('answer__status');

      answerContainer.append(answerStatus, answerText);
      currentAnswersContainer.append(answerContainer);

      this.#answersArr.push(answerContainer);
      this.#answerDotsArr.push(answerStatus);
      this.#answersTextArr.push(answerText);
    });

    this.#container.append(currentAnswersContainer);

    return currentAnswersContainer;
  }

  #addListeners() {
    this.#answers.addEventListener('click', (e) => {
      if (e.target != e.currentTarget) {
        const answerId = e.target.getAttribute('data-answer-id');
        this.#processAnswer(answerId);
      }

      e.stopPropagation();
    });
  }

  #createCardBlock() {
    const cardBlockContainer = document.createElement('div');
    cardBlockContainer.classList.add('level__current-answer', 'current-answer');

    const placeholder = document.createElement('div');
    placeholder.classList.add('current-answer__placeholder');
    
    if (this.#lang === 'en') {
      placeholder.textContent = 'Listen to the bird song. Guess what kind of bird it is.';
    } else {
      placeholder.textContent = 'Послушайте птичье пение. Угадайте, что это за птица.';
    }

    this.#placeholder = placeholder;

    cardBlockContainer.append(placeholder);
    this.#container.append(cardBlockContainer);

    return cardBlockContainer;
  }

  #processAnswer(answerId) {
    const answerIndex = this.#dataArr.findIndex(obj => obj.id == answerId);
    this.#currentAnswerIndex = answerIndex;

    if (this.#answerCard) this.#answerCard.stopPlayer();
    this.#answerCard = new Card(this.#currentAnswer, this.#dataArr[answerIndex]);

    if (!this.#levelEnded) {
      if (answerIndex == this.#birdIndex) {
        Level.#winAudio.currentTime = 0;
        Level.#winAudio.play();
        this.#levelEnded = true;
        this.#answerDotsArr[answerIndex].classList.add('correct');
        this.#currentBird.showBird();
        this.#currentBird.stopPlayer();

        this.#onLevelEnd(this.#levelScore);
      } else {
        Level.#loseAudio.currentTime = 0;
        Level.#loseAudio.play();
        if (!this.#answerDotsArr[answerIndex].classList.contains('wrong')) {
          this.#answerDotsArr[answerIndex].classList.add('wrong');
          this.#levelScore--;
        }
      }
    }
  }

  translate(dataArr, lang) {
    this.#dataArr = dataArr;
    this.#lang = lang;
    try {
      this.#currentBird.translate(dataArr[this.#birdIndex]);
    } catch {
      return;
    }

    this.#dataArr.forEach((obj, index) => this.#answersTextArr[index].textContent = obj.name);

    if (this.#lang === 'en') {
      this.#placeholder.textContent = 'Listen to the bird song. Guess what kind of bird it is.';
    } else {
      this.#placeholder.textContent = 'Послушайте птичье пение. Угадайте, что это за птица.';
    }
    if (this.#currentAnswerIndex) {
      this.#answerCard.translate(dataArr[this.#currentAnswerIndex]);
    }
  }
}

export { Level };