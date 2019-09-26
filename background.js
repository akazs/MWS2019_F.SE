const redirectDest = chrome.extension.getURL("foo.html");
blacklists = genBlackList()

function get_scheme(original_url){
	return original_url.split(":")[0];
}

function redirect(requestDetails){
	var u = redirectDest + '?to=' + requestDetails.url;
	//var u = redirectDest;
	var scheme = get_scheme(requestDetails.url);

	if (!searchTmpWhitelist(requestDetails.url)){
		// if a url has http,redirect
		if (scheme == 'http'){
			return {redirectUrl: u};
		// https
		}else if (scheme == 'https') {
			// ブラックリストにドメイン名があったとき
			if (ret = search(blacklist,requestDetails.url)){
				console.log("dangerou!: ",ret);
				console.log("url: ", requestDetails.url);
				return {redirectUrl: u};
			}
		}
	}
}

browser.webRequest.onBeforeRequest.addListener(
  redirect,
  {urls:["*://*/*"]},
  ["blocking"]
);
