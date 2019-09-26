var pattern ="https://www.mediaopusplus.com/";

function check_http(original_url){
	console.log(original_url);
	var splited_url = original_url.split(":");
	console.log(splited_url[0]);
	if (splited_url[0] == "http"){
		return true;
	}
	return false;
}

function redirect(requestDetails){
	var result = check_http(requestDetails.url);
	console.log(result);
	var u = chrome.extension.getURL("sample.jpg");
	if (result){
		return {redirectUrl: u};
		//location.href("moz-extension://865ea2d0-f6b2-0347-bfc6-9f7bb26ef490/sample.jpg");
	}
}

browser.webRequest.onBeforeRequest.addListener(
  redirect,
  {urls:["*://*/*"]},
  ["blocking"]
);
