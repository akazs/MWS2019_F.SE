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
	if (result){
		return {redirectUrl: "https://38.media.tumblr.com/tumblr_ldbj01lZiP1qe0eclo1_500.gif"};
	}
}

browser.webRequest.onBeforeRequest.addListener(
  redirect,
  {urls:[pattern]},
  ["blocking"]
);
