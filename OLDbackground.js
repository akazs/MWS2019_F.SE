//import data from './hoge.json';
document.body.style.border = "5px solid red";
console.log('hoge');
// alertはbackgroundでは使えないのでデバッグ用
alert("Hello world!"); 
// const hoge = 'hogee';
httpObj = new XMLHttpRequest();
httpObj.open("get", "hoge.json", false);

httpObj.onload = function(){
        var myData = JSON.parse(this.responseText);
        var txt = "";
        console.log(myData);
        
        console.log(myData['hoge']);

        if (myData['fuga'] == null){
            console.log('kuso');
        }


    }
httpObj.send(null);
if(window.File && window.FileReader) {

    //File API
    alert("ご使用のブラウザはFile APIを実装しています");
}else{
    alert("ご使用のブラウザはFile APIをサポートしていません");
}
// while (true){
//     console.log('hoge');
// }

// var head = document.getElementsByTagName("head");
// var script = document.createElement("script");
// script.setAttribute("src","http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js");
// script.setAttribute("type","text/javascript");
// SCRIPTタグの生成

// var el = document.createElement("script");
    
// // SCRIPTタグのSRC属性に読み込みたいファイルを指定
// el.src = "react.min.js";
    
// // BODY要素の最後に追加
// document.body.appendChild(el);
// // SCRIPTタグのSRC属性に読み込みたいファイルを指定
// el.src = "react-dom.min.js";
    
// // BODY要素の最後に追加
// document.body.appendChild(el);

// // var data = require('hoge.json');
// for(var i = 0; i < data.length; i++) {
//     var obj = data[i];

//     console.log("Name: " + obj.first_name + ", " + obj.last_name);
// }

// // ★これ
// script.addEventListener("load", function() {
//     $(function(){
//         alert('test');
//     });
// });

// document.head.appendChild(script);
// $(function() {
//     $.getJSON("data.json" , function(data) {
//       var
//         ulObj = $("#demo"),
//         len = data.length;
  
//       for(var i = 0; i < len; i++) {
//         ulObj.append($("<li>").attr({"id":data[i].id}).text(data[i].name));
//       }
//     });
//   });
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