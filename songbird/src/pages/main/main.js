import './index.html';
import './style.scss';

import { getSavedLang } from '../../scripts/helpers';

import { Header } from '../../scripts/header';
import { Footer } from '../../scripts/footer';

const lang = getSavedLang();
const headerContainer = document.querySelector('.header');
const footerContainer = document.querySelector('.footer');

const header = new Header(headerContainer, lang, translatePage);
let footer = new Footer(footerContainer, lang);
translateMotto(lang);

function translatePage(lang) {
  header.translate(lang);
  translateMotto(lang);
  footer = new Footer(footerContainer, lang);
}

function translateMotto(lang) {
  const mottoContainer = document.querySelector('.main__motto');

  if (lang === 'en') {
    mottoContainer.innerHTML = 'New easy way to learn <span class="accent-word-warm">birds</span> and discover their <span class="accent-word-cold">sounds</span>';
  } else {
    mottoContainer.innerHTML = 'Новый способ узнать <span class="accent-word-warm">птиц</span> и услышать их <span class="accent-word-cold">звучание</span>';
  }
}