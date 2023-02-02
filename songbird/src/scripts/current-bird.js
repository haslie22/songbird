import { Player } from "./play";

class CurrentBird {
  #container;
  #currentBirdData;
  #birdImage;
  #birdName;
  #player;
  #showed = false;

  constructor(container, currentBirdData) {
    this.#container = container;
    this.#currentBirdData = currentBirdData;
    this.draw();
  }

  draw() {
    const outerContainer = document.createElement('div');
    outerContainer.classList.add('current-bird__container-inner');

    const birdImage = document.createElement('div');
    birdImage.classList.add('current-bird__image');
    birdImage.alt = 'Bird image';
    birdImage.style.background = 'url(\'../assets/img/jpg/placeholder.jpg\') no-repeat center';
    this.#birdImage = birdImage;

    const birdDescrContainer = document.createElement('div');
    birdDescrContainer.classList.add('current-bird__description', 'description');

    const birdName = document.createElement('span');
    birdName.classList.add('description__name');
    birdName.textContent = '******';
    this.#birdName = birdName;

    const divider = document.createElement('div');
    divider.classList.add('description__divider');

    const playerContainer = document.createElement('div');
    playerContainer.classList.add('description__player', 'player', 'player_extended');

    const player = new Player(playerContainer, this.#currentBirdData.audio, true);
    this.#player = player;

    birdDescrContainer.append(birdName, divider, playerContainer);
    outerContainer.append(birdImage, birdDescrContainer);
    this.#container.append(outerContainer);
  }

  showBird() {
    this.#showed = true;
    this.#birdName.textContent = this.#currentBirdData.name;
    this.#birdImage.style.background = `url('${this.#currentBirdData.image}') no-repeat center`;
    this.#birdImage.style.backgroundSize = 'cover';
  }

  stopPlayer() {
    this.#player.pause();
  }

  translate(data) {
    this.#currentBirdData = data;
    if (this.#showed) {
      this.#birdName.textContent = this.#currentBirdData.name;
    }
  }
}

export { CurrentBird };