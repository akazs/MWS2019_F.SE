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

function genDomains(domain){
    var splited = domain.split('.');
    var domains = []
    for(var i=0;i<splited.length-1;i++)
        domains.push(splited.slice(i,splited.length).join('.'));
    return domains;
}

function serch(blacklists,keywords){
    for(var i=0;i<blacklists.length;i++){
        for (var j=0;j<keywords.length;j++)
            if (blacklists[i][keywords[j]])
                return blacklists[i][keywords[j]];
    }
    return false;
}