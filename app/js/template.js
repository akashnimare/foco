const soundTemplate = name => {
  return ` <li class="${name}">
        <h2>${name}</h2>
        <div class="clear"></div>
        <audio id="${name}" loop>
          <source src="resources/sound/${name}.mp3" type="audio/mpeg">
        </audio>
        <div>
          <input id="${name}Toggle" type="checkbox" value="${name}">
          <label for="${name}Toggle">
            <span>Toggle Audio</span>
          </label>
          <input max="100" min="0" step="1" type="range" value="100">
        </div>
      </li>
    `;
};

const soundNames = ["cafe", "fire", "night", "rain", "drops"];

const markup = `${soundNames.map(name => soundTemplate(name))}`;

document.getElementById("sounds-section").innerHTML = markup;
