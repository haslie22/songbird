import { getTimeString } from './helpers';

class Player {
   #container;
   #currentTime;
   #progressBar;
   #playerTimeline;
   #volumeLine;
   #currentVolumeLine;
   #playerVolumeButton;
   #playIcon;
   #pauseIcon;
   #volumeIcon;
   #muteIcon;
   #extended;

   #audio;
   #isAudioPlaying = false;

  constructor(container, trackLink, extended = false) {
    this.#container = container;
    this.#audio = new Audio(trackLink);
    this.#audio.loop = true;
    this.#audio.volume = 0.5;
    this.#extended = extended;
    this.#audio.addEventListener('loadedmetadata', () => {
      this.#container.querySelector('.time__duration').textContent = getTimeString(Math.round(this.#audio.duration));
    });

    this.draw();
  }

  draw() {
    const extended = this.#extended;

    const timeContainer = document.createElement('div');
    timeContainer.classList.add('player__time', 'time');

    const tracklineContainer = document.createElement('div');
    tracklineContainer.classList.add('player__trackline', 'trackline');

    const volumeContainer = document.createElement('div');
    volumeContainer.classList.add('player__volume', 'volume');

    const playButton = document.createElement('div');

    if (extended) {
      playButton.classList.add('player__play-button', 'play-button__extended');
    } else {
      playButton.classList.add('player__play-button');
    }

    const playIcon = document.createElement('img');
    if (extended) {
      playIcon.src = './../assets/svg/play-ext.svg';
      playIcon.classList.add('player__play-icon', 'play-icon__extended');
    } else {
      playIcon.src = './../assets/svg/play.svg';
      playIcon.classList.add('player__play-icon');
    }
    this.#playIcon = playIcon;

    const pauseIcon = document.createElement('img');
    if (extended) {
      pauseIcon.src = './../assets/svg/pause-ext.svg';
      pauseIcon.classList.add('player__pause-icon', 'hidden', 'pause-icon__extended');
    } else {
      pauseIcon.src = './../assets/svg/pause.svg';
      pauseIcon.classList.add('player__pause-icon', 'hidden');
    }
    this.#pauseIcon = pauseIcon;

    const volumeButton = document.createElement('div');
    volumeButton.classList.add('player__volume-button');
    this.#playerVolumeButton = volumeButton;

    const volumeIcon = document.createElement('img');
    volumeIcon.src = './../assets/svg/volume.svg';
    volumeIcon.classList.add('player__volume-icon');
    this.#volumeIcon = volumeIcon;

    const muteIcon = document.createElement('img');
    muteIcon.src = './../assets/svg/mute.svg';
    muteIcon.classList.add('player__mute-icon', 'hidden');
    this.#muteIcon = muteIcon;

    const currentTime = document.createElement('span');
    currentTime.classList.add('time__current-time');
    currentTime.textContent = '00:00';
    this.#currentTime = currentTime;

    const divider = document.createElement('span');
    divider.classList.add('time__divider');
    divider.textContent = '/';

    const duration = document.createElement('span');
    duration.classList.add('time__duration');
    duration.textContent = '00:00';

    const timeLineContainer = document.createElement('div');
    timeLineContainer.classList.add('player__timeline-container');

    const timeLine = document.createElement('div');
    timeLine.classList.add('player__timeline');
    this.#playerTimeline = timeLine;

    const currentTimeLine = document.createElement('div');
    currentTimeLine.classList.add('play-progress');
    this.#progressBar = currentTimeLine;

    const volumeLineContainer = document.createElement('div');
    volumeLineContainer.classList.add('player__volumeline-container');

    const volumeLine = document.createElement('div');
    volumeLine.classList.add('player__volumeline');
    this.#volumeLine = volumeLine;

    const currentVolumeLine = document.createElement('div');
    currentVolumeLine.classList.add('volume-progress');
    currentVolumeLine.style.width = this.#audio.volume * 100 + '%';
    this.#currentVolumeLine = currentVolumeLine;

    volumeButton.append(volumeIcon, muteIcon);
    playButton.append(playIcon, pauseIcon);
    timeLine.append(currentTimeLine);
    timeLineContainer.append(timeLine);
    volumeLine.append(currentVolumeLine);
    volumeLineContainer.append(volumeLine);
    timeContainer.append(currentTime, divider, duration);
    tracklineContainer.append(playButton, timeLineContainer);
    volumeContainer.append(volumeButton, volumeLineContainer);

    if (extended) {
      const outerExtContainer = document.createElement('div');
      outerExtContainer.classList.add('player__controls');
      outerExtContainer.append(tracklineContainer, volumeContainer);
      this.#container.append(outerExtContainer, timeContainer);
    } else {
      this.#container.append(timeContainer, tracklineContainer, volumeContainer);
    }

    playButton.addEventListener('click', this.#toggleAudioPlaying.bind(this));

    this.#audio.addEventListener('timeupdate', () => {
      this.#progressBar.style.width = this.#audio.currentTime / this.#audio.duration * 100 + '%';
      this.#currentTime.textContent = getTimeString(this.#audio.currentTime);
    });
    this.#playerTimeline.addEventListener('click', (e) => {
      this.#audio.currentTime = this.#audio.duration * e.offsetX / parseInt(window.getComputedStyle(this.#playerTimeline).width);
      if (!this.#isAudioPlaying)
        this.#toggleAudioPlaying();
    });

    this.#playerVolumeButton.addEventListener('click', () => {
      this.#toggleAudioMuted();
    });

    this.#volumeLine.addEventListener('click', (e) => {
      this.#audio.volume = e.offsetX / parseInt(window.getComputedStyle(this.#volumeLine).width);
      this.#currentVolumeLine.style.width = this.#audio.volume * 100 + '%';
      if (this.#audio.muted)
        this.#toggleAudioMuted();
    });
  }

  pause() {
    if (this.#isAudioPlaying) {
      this.#toggleAudioPlaying();
    }
  }

  #toggleAudioPlaying() {
    this.#isAudioPlaying ? this.#pauseAudio() : this.#playAudio();
    this.#changeIcon(this.#playIcon, this.#pauseIcon);
    if (this.#container.closest('.card')) this.#container.closest('.card').classList.toggle('card-highlighted');
    else if (this.#container.closest('.current-bird')) this.#container.closest('.current-bird').classList.toggle('card-highlighted');
  }

  #toggleAudioMuted() {
    this.#audio.muted = !this.#audio.muted;
    this.#changeIcon(this.#volumeIcon, this.#muteIcon);
    this.#currentVolumeLine.classList.toggle('muted-progress');
  }

  #playAudio() {
    this.#audio.play();
    this.#isAudioPlaying = true;
  }

  #pauseAudio() {
    this.#audio.pause();
    this.#isAudioPlaying = false;
  }

  #changeIcon(firstIcon, secondIcon) {
    firstIcon.classList.toggle('hidden');
    secondIcon.classList.toggle('hidden');
  }
}

export { Player };