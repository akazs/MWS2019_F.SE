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
    tmpwhitelist[url.split('/')[2]] = getTime();
    STORAGE.setItem(whitelistname,JSON.stringify(tmpwhitelist));
}

const INTERVAL = 0.1 * 60 * 1000
// 一時的なホワイトリストにurlがあればture,なければfalseを返す
function searchTmpWhitelist(url){
    // return false if there is no tmpWhiteList
    if (!checkWhitelist()) return false;
    // get tmpWhiteList
    tmpwhitelist = JSON.parse(STORAGE.getItem(whitelistname));
    console.log([tmpwhitelist]);
    // 最後に許可された時間を確認
    if(!(lastApprovedTime = search([tmpwhitelist],url)))return false
    if(getTime() - lastApprovedTime > INTERVAL) return false
    else return true
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



