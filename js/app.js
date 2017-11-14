const domSounds = document.getElementsByTagName('ul')[0].children;

Object.prototype.extend = function (extension) {
	var object = Object.create(this);
	for (var property in extension) {
		if (extension.hasOwnProperty(property) || object[property] === 'undefined') {
			object[property] = extension[property];
		}
	}
	return object;
};

var Sound = {
	create(switchEl, volumeEl, audioEl) {
		const newObj = this.extend({
			switchEl: switchEl,
			volumeEl: volumeEl,
			audioEl: audioEl,
			isPlaying: false
		});

		newObj.switchEl.addEventListener('click', newObj.toggle.bind(newObj));
		newObj.volumeEl.onchange = newObj.adjustVolume.bind(newObj);

		return newObj;
	},
	toggle() {
		console.log('toggle fired');
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
		console.log('stop');
	},
	play() {
		console.log('start');
		this.switchEl.checked = true;
		this.audioEl.play("hello", this.switchEl.checked);
	},
	adjustVolume(e) {
		console.log('volume adjusted');
		this.audioEl.volume = this.volumeEl.value / 100;
	}
};

const sounds = [];

Array.from(domSounds).forEach(domSound => {
	sounds.push(Sound.create(
		domSound.children[3].children[0],
		domSound.children[3].children[2],
		domSound.children[2]
	));
});

const pauseAll = () => {
	sounds.forEach(sound => sound.pause());
}

const playAll = () => {
	sounds.forEach(sound => sound.play());
}
