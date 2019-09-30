function getParam(name) {
	name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(window.location.href);
		// console.log("result =");
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function getMaliciousType() {
	ret = getParam('v')
  if(ret && ret !='others') return 'Malicious type : ' + ret;
}
function back1() {
	//from_url = window.location.href.split("&")[1].substr(5);
	window.history.back();
}
function go() {
  url = getParam('to');
  addTmpWhitelist(url);
  window.location.href = url;
}
//var ref = document.referrer;
//console.log("ref = " + window.history.state);document.getElementById("labelName1ID").innerText =

document.querySelector("#return").addEventListener('click', () => {
    back1();
})

document.querySelector("#go").addEventListener('click', () => {
	go();
})

try{
  document.getElementById("MaliciousType").textContent = getMaliciousType()
}
catch(e){
    if(e instanceof TypeError)
      console.log('This page does not have any specific malicious elements.');
}
