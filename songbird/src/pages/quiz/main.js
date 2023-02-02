import './index.html';
import './style.scss';

import { getSavedLang } from '../../scripts/helpers';
import { Header } from '../../scripts/header';
import { Footer } from '../../scripts/footer';
import { Quiz } from '../../scripts/quiz';
import { Final } from '../../scripts/final-page';

const lang = getSavedLang();
const headerContainer = document.querySelector('.header');
const footerContainer = document.querySelector('.footer');
const main = document.querySelector('.main');

const header = new Header(headerContainer, lang, translatePage);
let footer = new Footer(footerContainer, lang);
let quiz;
let final;


function startNewGame() {
  main.innerHTML = '';
  const quizContainer = document.createElement('div');
  quizContainer.classList.add('quiz', 'main__quiz');
  main.append(quizContainer);
  
  quiz = new Quiz(quizContainer, getSavedLang(), quizFinished);
}

function quizFinished(score, maxScore) {
  final = new Final(main, score, maxScore, getSavedLang(), startNewGame);
}

function translatePage(lang) {
  header.translate(lang);
  quiz.translate(lang);
  if (final) final.translate(lang);
  footer = new Footer(footerContainer, lang);
}

startNewGame();
