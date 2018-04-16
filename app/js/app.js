const { remote } = require("electron");

// Build Player section
const domSounds = document.getElementsByTagName("ul")[0].children;

class Create {
  constructor(switchEl, volumeEl, audioEl) {
    this.switchEl = switchEl;
    this.volumeEl = volumeEl;
    this.audioEl = audioEl;
    this.isPlaying = false;
    this.switchEl.addEventListener("click", this.toggle.bind(this));
    this.volumeEl.onchange = this.adjustVolume.bind(this);
  }
  toggle() {
    console.log("toggle fired");
    this.isPlaying ? this.pause() : this.play();
    this.isPlaying = !this.isPlaying;
  }
  pause() {
    this.audioEl.stop;
    this.switchEl.checked = false;
    this.audioEl.pause();
    console.log("stop");
  }
  play() {
    console.log("start");
    this.switchEl.checked = true;
    this.audioEl.play("hello", this.switchEl.checked);
  }
  adjustVolume(e) {
    console.log("volume adjusted");
    this.audioEl.volume = this.volumeEl.value / 100;
  }
}

const sounds = [];

Array.from(domSounds).forEach(domSound => {
  sounds.push(
    new Create(
      domSound.children[3].children[0],
      domSound.children[3].children[2],
      domSound.children[2]
    )
  );
});

const pauseAll = () => {
  sounds.forEach(sound => sound.pause());
};

const playAll = () => {
  sounds.forEach(sound => sound.play());
};

const prefWindow = remote.getCurrentWindow();
const closeButton = document.getElementById("close-button");
const muteButton = document.getElementById("mute-button");
const setAudio = prefWindow.webContents.setAudioMuted;

// Set Audio to true on app load
setAudio(false);

// Quit app on clicking close button
closeButton.addEventListener("click", () => {
  prefWindow.close();
});

muteButton.addEventListener("click", function(e) {
  let isAudio = this.className;
  if (isAudio === "off") {
    this.className = "on";
    this.title = "mute";
    setAudio(false);
  } else {
    this.className = "off";
    this.title = "unmute";
    setAudio(true);
  }
});

const toggleAudio = audio => {
  if (audio) {
    setAudio(false);
  } else {
    setAudio(true);
  }
};
