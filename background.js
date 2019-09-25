const blacklistDir = 'blacklist'
const blaklistnames = ['ds1.json','ds2oth.json','ds3mal.json','ds3phi.json','ds3spa.json'];
var blacklists = [];
var keyword = 'banner.titancasino.com';

for(var i=0;i<blaklistnames.length;i++){
    httpObj = new XMLHttpRequest();
    httpObj.open("get", blacklistDir+'/'+blaklistnames[i], true);
    httpObj.onload = function(){
            bl = JSON.parse(this.responseText);
            console.log(bl);
            blacklists.push(bl);
        }
    httpObj.send(null);
}



function serch(blacklists,keyword){
    for(var i=0;i<blacklists.length;i++){
        if (blacklists[i][keyword]) return true;
    }
    return false;
}



var pattern = "https://lab.syncer.jp/*";
//var pattern = "^(?!https://38.media.tumblr.com/tumblr_ldbj01lZiP1qe0eclo1_500.gif).+$";
//var pattern = "^(?!https:\/\/38\.media\.tumblr\.com*).+$";
var redirectUrl = "https://38.media.tumblr.com/tumblr_ldbj01lZiP1qe0eclo1_500.gif";
function redirect(requestDetails) {
    console.log(serch(blacklists,keyword));
  console.log("Redirecting: " + requestDetails.url);
  if (requestDetails.url == redirectUrl){
      console.log('おなじ');
      return;
  }else{
    return {
        redirectUrl
      };
  }
  
}

browser.webRequest.onBeforeRequest.addListener(
  redirect,
  //{urls:[pattern], types:["page"]},
  {urls:[pattern]},
  ["blocking"]
);




function allDomain(domain){
    var splited = domain.split('.');
    var domains = []
    for(var i=2;i<=splited.length;i++){
        domains.push(splited.slice(-i,splited.length).join('.'));
    }
    return domains;
}

function loadFile_changeHandler(e){
    var files = e.target.files;
    var fileData = "";
    for(var i = 0; i < files.length; i++){
    var fileVal = files[i];
    fileData +=
     'ファイル名：' + escape(fileVal.name) + '<br>' +
     'ファイルサイズ：' + fileVal.size + 'バイト<br>' +
     'MIMEタイプ:' + fileVal.type + '<br>' +
     '最終更新日時：' + fileVal.lastModifiedDate + '<hr>';
    }
    $('#info').innerHTML = fileData;
}