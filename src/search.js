function genBlackList(){
    const blacklistDir = 'blacklist'
    const blaklistnames = ['ds1.json','ds2oth.json','ds3mal.json','ds3phi.json','ds3spa.json'];
    var blacklists = [];
    //var keyword = 'banner.titancasino.com';
    //var keyword = 'c.b.a.com';

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
    return blacklists;
}


function genWhiteList(){
    const blacklistDir = 'whitelist'
    const blaklistnames = ['AlexaWhiteAll.json'];
    var blacklists = [];
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
    return blacklists;
}


function genDomains(url){
    var splited = url.split('/')[2].split('.');
    var domains = []
    for(var i=0;i<splited.length-1;i++)
        domains.push(splited.slice(i,splited.length).join('.'));
    return domains;
}

function search(blacklists,url){
    var keywords = genDomains(url);
    for(var i=0;i<blacklists.length;i++){
        for (var j=0;j<keywords.length;j++)
            if (blacklists[i][keywords[j]])
                return blacklists[i][keywords[j]];
    }
    return false;
}