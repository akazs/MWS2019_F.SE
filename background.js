const redirectDest = chrome.extension.getURL("foo.html");
const redirectDest_http = chrome.extension.getURL("foo_http.html");
blacklists = genBlackList()

function get_scheme(original_url){
	return original_url.split(":")[0];
}

function redirect(requestDetails){
	checkSuspiciousDomain(requestDetails.url,requestDetails.requestId)
	var u = redirectDest + '?to=' + requestDetails.url;
	var u_http = redirectDest_http + '?to=' + requestDetails.url;
	//var u = redirectDest;
	var scheme = get_scheme(requestDetails.url);
	//console.log(requestDetails.url);
	if(searchTmpWhitelist(requestDetails.url))
		//deleteTmpWhitelist(requestDetails.url);
		console.log('approved by tmp white list :',requestDetails.url);
	else{
		// if a url has http, redirect
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
  {urls:["*://*/*"],types:["main_frame"]},
  ["blocking"]
);
//["image"]

//　証明書情報取得の実験用
async function logRootCert(details) {
	try {
	  let securityInfo = await browser.webRequest.getSecurityInfo(
		details.requestId,
		{"certificateChain": true}
	  );
	  console.log('onHeadersReceived, ',securityInfo)
	  if ((securityInfo.state == "secure" || securityInfo.state == "weak") &&
		  !securityInfo.isUntrusted) {
		let rootName = securityInfo.certificates[securityInfo.certificates.length - 1].subject;
		if (rootCertStats[rootName] === undefined) {
		  rootCertStats[rootName] = 1;
		} else {
		  rootCertStats[rootName] = rootCertStats[rootName] + 1;
		}
	  }
	}
	catch(error) {
	  console.error(error);
	}
  }
  
  /*
  Listen for all onHeadersReceived events.
  */
  browser.webRequest.onHeadersReceived.addListener(logRootCert,
	{urls: ["<all_urls>"]},
	["blocking"]
  );
