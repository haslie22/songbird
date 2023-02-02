import { Card } from './card';
import birdsDataEn from './data/birds-en';
import birdsDataRu from './data/birds-ru';

const cards = [];

function draw(lang) {
  const dataArr = (lang === 'en' ? birdsDataEn : birdsDataRu).flat();
  const cardsContainer = document.querySelector('.cards-container');

  cardsContainer.innerHTML = '';

  dataArr.forEach(obj => {
  const cardContainer = document.createElement('div');
  cardContainer.classList.add('card__container');

  cardsContainer.append(cardContainer);

  const card = new Card(cardContainer, obj);
  cards.push(card);
  });
}

function translate(lang) {
  const dataArr = (lang === 'en' ? birdsDataEn : birdsDataRu).flat();
  cards.forEach((card, index) => card.translate(dataArr[index]));
}

export { draw, translate };