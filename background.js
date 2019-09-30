const redirectDest = chrome.extension.getURL("foo.html");
const redirectDest_http = chrome.extension.getURL("foo_http.html");
blacklists = genBlackList()

function get_scheme(original_url){
	return original_url.split(":")[0];
}

function redirect(requestDetails){
	var u = redirectDest + '?to=' + requestDetails.url;
	var u_http = redirectDest_http + '?to=' + requestDetails.url;
	//var u = redirectDest;
	var scheme = get_scheme(requestDetails.url);

	if (!searchTmpWhitelist(requestDetails.url)){
		// if a url has http,redirect
		if (scheme == 'http'){
			return {redirectUrl: u_http};
		// https
		}else if (scheme == 'https') {
			// ブラックリストにドメイン名があったとき
			if (ret = search(blacklists,requestDetails.url)){
				console.log("dangerous!: ",ret);
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
