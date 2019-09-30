const redirectDest = chrome.extension.getURL("./src/foo.html");
const redirectDest_http = chrome.extension.getURL("./src/foo_http.html");
const redirectDest_analysis = chrome.extension.getURL("./src/foo_analysis.html");
blacklists = genBlackList();
whitelists = genWhiteList();
function get_scheme(original_url){
	return original_url.split(":")[0];
}

function redirect(requestDetails){
	var u = redirectDest + '?to=' + requestDetails.url;
	var u_http = redirectDest_http + '?to=' + requestDetails.url;
	var u_analysis = redirectDest_analysis + '?to=' + requestDetails.url;
	var scheme = get_scheme(requestDetails.url);
	if(searchTmpWhitelist(requestDetails.url))
		console.log('approved by tmp white list :',requestDetails.url);
	else{
		if (ret = search(blacklists,requestDetails.url)){
			console.log("dangerous!: ",ret);
			console.log("url: ", requestDetails.url);
			return {redirectUrl: u + '&v=' + ret};
		} else{

			if (check_blacklist_posibility(requestDetails.url.split("/")[2])){
				if (!search(whitelists,requestDetails.url)){
					return {redirectUrl: u_analysis};
				}
			} else{
				if (scheme == 'http'){
					return {redirectUrl: u_http};
				} else{
					browser.webRequest.onHeadersReceived.addListener(
                async function(details) {
                    let securityInfo = await browser.webRequest.getSecurityInfo(
                        details.requestId,
                        {"certificateChain": false}
                    )

                    let validity = securityInfo['certificates'][0]['validity']
                    let days = (validity['end'] - validity['start']) / (1000 * 86400)
                    console.log(days, 'Days')
                    if (days <= 90) {
											console.log(u);
											if (!search(whitelists,requestDetails.url)){
												return {redirectUrl: u_analysis};
											}
                    }
                },
                {urls:["*://*/*"],types:["main_frame"]},
                ["blocking"]
            )
				}
			}
		}
	}
}

browser.webRequest.onBeforeRequest.addListener(
  redirect,
  {urls:["*://*/*"],types:["main_frame"]},
  ["blocking"]
);
