const a = document.getElementsByTagName('input')

for (let i = 0; i < a.length; i++) {
  let b = a[i].type
  if (b === 'checkbox') {
    a[i].onclick = function (e) {
      let t = this.checked === true
      document.getElementById(this.value)[t ? 'play' : 'pause']()
      // eslint-disable-next-line
      this.checked = t ? true : false
    }
  } else if (b === 'range') {
    a[i].onchange = function (e) {
      document.getElementById(this.parentNode.children[0].value).volume = this.value / 100
    }
  }
}
