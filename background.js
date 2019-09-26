const redirectDest = chrome.extension.getURL("foo.html");
blacklist = genBlackList()

function get_scheme(original_url){
	return original_url.split(":")[0];
}

function redirect(requestDetails){
	var u = redirectDest
	var scheme = get_scheme(requestDetails.url);
	console.log(requestDetails.url)
	// http
	if (scheme == 'http'){
		return {redirectUrl: u};
	// https
	}else if (scheme == 'https') {
		// ブラックリストにドメイン名があったとき
		if (ret = search(blacklist,requestDetails.url)){
			console.log("dangerou!: ",ret);
			return {redirectUrl: u};
		}
	}
}

browser.webRequest.onBeforeRequest.addListener(
  redirect,
  {urls:["*://*/*"]},
  ["blocking"]
);
