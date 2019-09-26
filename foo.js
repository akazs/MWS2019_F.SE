function getParam(name) {
	name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function back1() {window.history.go(-1);}
function go() {window.location.href = getParam('to');}

document.querySelector("#return").addEventListener('click', () => {
    back1();
})

document.querySelector("#go").addEventListener('click', () => {
	go();
})
