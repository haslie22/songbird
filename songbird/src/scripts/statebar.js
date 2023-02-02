class StateBar {
  #container;
  #lang;
  #elems;
  #barElemsEn = ['Warm up', 'Passerines', 'Forest birds', 'Song birds', 'Predator birds', 'Sea birds'];
  #barElemsRu = ['Разминка', 'Воробьиные', 'Лесные', 'Певчие', 'Хищные', 'Морские'];


  constructor(container, lang) {
    this.#container = container;
    this.#lang = lang;
    this.#elems = [];
    this.draw();
  }

  draw() {
    this.#container.innerHTML = '';

    const barElems = this.#lang === 'en' ? this.#barElemsEn : this.#barElemsRu;

    const barWrapper = document.createElement('div');
    barWrapper.classList.add('bar__wrapper');

    const bar = document.createElement('div');
    bar.classList.add('bar');

    const barContent = document.createElement('ul');
    barContent.classList.add('bar__content');

    for (let i = 0; i < barElems.length; i++) {
      const barElem = document.createElement('li');
      barElem.classList.add('bar__elem');
      barElem.textContent = barElems[i];

      barContent.append(barElem);
      this.#elems.push(barElem);
    }

    bar.append(barContent);
    barWrapper.append(bar);
    this.#container.append(barWrapper);
  }

  setActive(num) {
    this.#elems.forEach(el => el.classList.remove('active'));
    this.#elems[num].classList.add('active');
  }

  translate(lang) {
    this.#lang = lang;
    this.#elems.forEach((el, index) => el.textContent = this.#lang === 'en' ? this.#barElemsEn[index] : this.#barElemsRu[index]);
  }
}

export { StateBar };