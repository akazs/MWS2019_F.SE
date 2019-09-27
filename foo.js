function getParam(name) {
	name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(window.location.href);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function back1() {

	window.history.back();
}
function go() {
  url = getParam('to')
  addTmpWhitelist(url);
  window.location.href = url;
}

document.querySelector("#return").addEventListener('click', () => {
    back1();
})

document.querySelector("#go").addEventListener('click', () => {
	go();
})
