document.body.style.border = "5px solid red";

// alertはbackgroundでは使えないのでデバッグ用
alert("Hello world!"); 
// const hoge = 'hogee';
var blacklist = {};
httpObj = new XMLHttpRequest();
httpObj.open("get", "hoge.json", true);

httpObj.onload = function(){
        blacklist = JSON.parse(this.responseText);
        var txt = "";
        console.log(blacklist);
        


        if(serch(blacklist,'hoge')){
            console.log("dangerous!")
        };


    }
httpObj.send(null);


function serch(blacklist,keyword){
    if (blacklist[keyword]) return true;
    else return false;
}



var pattern = "https://lab.syncer.jp/*";
//var pattern = "^(?!https://38.media.tumblr.com/tumblr_ldbj01lZiP1qe0eclo1_500.gif).+$";
//var pattern = "^(?!https:\/\/38\.media\.tumblr\.com*).+$";
var redirectUrl = "https://38.media.tumblr.com/tumblr_ldbj01lZiP1qe0eclo1_500.gif";
function redirect(requestDetails) {
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