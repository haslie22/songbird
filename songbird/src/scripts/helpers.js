function getTimeString(sec) {
  let seconds = Math.floor(sec % 60);
  let minutes = Math.floor(sec / 60);
  let hours = Math.floor(sec / 3600);

  if (hours > 0) return `${(hours.toString().padStart(2, '0'))}:${(minutes.toString().padStart(2, '0'))}:${(seconds.toString().padStart(2, '0'))}`;
  else return `${(minutes.toString().padStart(2, '0'))}:${(seconds.toString().padStart(2, '0'))}`;
}

function getRandomNum(from, to) {
  return from + Math.floor(Math.random() * (to + 1 - from));
}

function getSavedLang() {
  return localStorage.getItem('lang') || 'en';
}

export { getTimeString, getRandomNum, getSavedLang };
