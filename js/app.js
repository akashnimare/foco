const { remote } = require("electron");

// Build Player section
const domSounds = document.getElementsByTagName("ul")[0].children;

Object.prototype.extend = function(extension) {
  let object = Object.create(this);
  for (let property in extension) {
    if (
      extension.hasOwnProperty(property) ||
      object[property] === "undefined"
    ) {
      object[property] = extension[property];
    }
  }
  return object;
};

let Sound = {
  create(switchEl, volumeEl, audioEl) {
    const newObj = this.extend({
      switchEl: switchEl,
      volumeEl: volumeEl,
      audioEl: audioEl,
      isPlaying: false
    });

    newObj.switchEl.addEventListener("click", newObj.toggle.bind(newObj));
    newObj.volumeEl.onchange = newObj.adjustVolume.bind(newObj);

    return newObj;
  },
  toggle() {
    console.log("toggle fired");
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
    this.isPlaying = !this.isPlaying;
  },
  pause() {
    this.audioEl.stop;
    this.switchEl.checked = false;
    this.audioEl.pause();
    console.log("stop");
  },
  play() {
    console.log("start");
    this.switchEl.checked = true;
    this.audioEl.play("hello", this.switchEl.checked);
  },
  adjustVolume(e) {
    console.log("volume adjusted");
    this.audioEl.volume = this.volumeEl.value / 100;
  }
};

const sounds = [];

Array.from(domSounds).forEach(domSound => {
  sounds.push(
    Sound.create(
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
