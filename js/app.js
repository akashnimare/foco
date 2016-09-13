var a = document.getElementsByTagName("input");
    console.log(a.length);
    for (var i = 0; i < a.length; i++) {
        var b = a[i].type;
        console.log(b);
        if (b == "checkbox") {
            a[i].onclick = function(e) {
                var t = this.checked === true;
                document.getElementById(this.value)[t ? "play" : "pause"]();
                this.checked = t ? true : false;
            }
        } else if (b == "range") {
            a[i].onchange = function(e) {
                document.getElementById(this.parentNode.children[0].value).volume = this.value / 100;
            }
        }
    };