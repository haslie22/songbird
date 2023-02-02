import './index.html';
import './style.scss';

import * as gallery from '../../scripts/gallery';
import { getSavedLang } from '../../scripts/helpers';

import { Header } from '../../scripts/header';
import { Footer } from '../../scripts/footer';

const lang = getSavedLang();
const headerContainer = document.querySelector('.header');
const footerContainer = document.querySelector('.footer');

const header = new Header(headerContainer, lang, translatePage);
let footer = new Footer(footerContainer, lang);

translateTitle(lang);
gallery.draw(lang);

function translatePage(lang) {
  header.translate(lang);
  translateTitle(lang);
  gallery.translate(lang);
  footer = new Footer(footerContainer, lang);
}

function translateTitle(lang) {
  const titleContainer = document.querySelector('.title');

  if (lang === 'en') {
    titleContainer.innerHTML = 'Want to know <span class="accent-word-sec-cold">more</span>?<br>Feel <span class="accent-word-sec-warm">comfy</span> to fly in!';
  } else {
    titleContainer.innerHTML = 'Хочешь узнать <span class="accent-word-sec-cold">больше</span>? Скорее <span class="accent-word-sec-warm">залетай</span>!';
  }
}
