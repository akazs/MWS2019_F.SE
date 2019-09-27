const whitelistname = 'tmpWhitelist'
const STORAGE = localStorage
//　存在確認
function checkWhitelist(){
    if(STORAGE.getItem(whitelistname) == null){
        STORAGE.setItem(whitelistname,JSON.stringify({}))
        return false;
    }else return true;
}

// 一時的なホワイトリストに追加
function addTmpWhitelist(url){
    checkWhitelist()
    tmpwhitelist = JSON.parse(STORAGE.getItem(whitelistname));
    tmpwhitelist[url.split('/')[2]] = true;
    console.log(tmpwhitelist)
    STORAGE.setItem(whitelistname,JSON.stringify(tmpwhitelist));
}

// 一時的なホワイトリストにurlがあればture,なければfalseを返す
function searchTmpWhitelist(url){
    if (!checkWhitelist()) return false;
    tmpwhitelist = JSON.parse(STORAGE.getItem(whitelistname));
    console.log([tmpwhitelist]);
    return search([tmpwhitelist],url)
}
// 一時的なホワイトリストから削除
function deleteTmpWhitelist(url){
    if(!checkWhitelist) return;
    tmpwhitelist = JSON.parse(STORAGE.getItem(whitelistname));
    tmpwhitelist[url.split('/')[2]] = false;
    STORAGE.setItem(whitelistname,JSON.stringify(tmpwhitelist));
}

//UNIXタイムスタンプ取得
function getTime(){
    return new Date().getTime()
}




