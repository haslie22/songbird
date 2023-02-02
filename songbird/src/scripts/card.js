import { Player } from './play';

class Card {
  #container;
  #cardData;
  #player;
  #cardTitle;
  #cardSubtitle;
  #cardText;

  constructor(container, cardData) {
    this.#container = container;
    this.#cardData = cardData;
    this.draw();
  }

  draw() {
    this.#container.innerHTML = '';

    const cardOuter = document.createElement('div');
    cardOuter.classList.add('card__outer', 'card');

    const card = document.createElement('div');
    card.classList.add('card__inner');

    const imgContainer = document.createElement('div');
    imgContainer.classList.add('card__image-container');
    imgContainer.style.background = `url(${this.#cardData.image}) no-repeat center`;
    imgContainer.style.backgroundSize = 'cover';

    const infoContainer = document.createElement('div');
    infoContainer.classList.add('card__info-container');

    const nameContainer = document.createElement('div');
    nameContainer.classList.add('card__name-container');

    const cardTitle = document.createElement('span');
    cardTitle.classList.add('card__title');
    cardTitle.textContent = this.#cardData.name;
    this.#cardTitle = cardTitle;

    const cardSubtitle = document.createElement('span');
    cardSubtitle.classList.add('card__subtitle');
    cardSubtitle.textContent = this.#cardData.species;
    this.#cardSubtitle = cardSubtitle;

    const cardTextContainer = document.createElement('div');
    cardTextContainer.classList.add('card__text-container');

    const cardText = document.createElement('div');
    cardText.classList.add('card__text');
    cardText.textContent = this.#cardData.description;
    this.#cardText = cardText;

    const playerContainer = document.createElement('div');
    playerContainer.classList.add('card__player', 'player');

    cardTextContainer.append(cardText);
    nameContainer.append(cardTitle, cardSubtitle);
    infoContainer.append(nameContainer, cardTextContainer);
    card.append(imgContainer, nameContainer, infoContainer, playerContainer);
    cardOuter.append(card);
    this.#container.append(cardOuter);

    this.#player = new Player(playerContainer, this.#cardData.audio);
  }

  stopPlayer() {
    this.#player.pause();
  }

  translate(data) {
    this.#cardData = data;

    this.#cardTitle.textContent = this.#cardData.name;
    this.#cardSubtitle.textContent = this.#cardData.species;
    this.#cardText.textContent = this.#cardData.description;
  }
}

export { Card };