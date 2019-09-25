var pattern = "https://developer.mozilla.org/*";

function redirect(requestDetails) {
  console.log("Redirecting: " + requestDetails.url);
  return {
    redirectUrl: "https://raw.githubusercontent.com/akazs/MWS2019_F.SE/kawakami/alert.html?token=AIER2Z74R3HS53ZBK56763C5SR2S6"
  };
}

browser.webRequest.onBeforeRequest.addListener(
  redirect,
  {urls:[pattern]},
  ["blocking"]
);
