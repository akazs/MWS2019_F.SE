const whitelistname = 'tmpWhitelist'
//　存在確認
function checkWhitelist(){
    if(localStorage.getItem(whitelistname) == null){
        localStorage.setItem(whitelistname,JSON.stringify({}))
        return false;
    }else return true;
}

// 一時的なホワイトリストに追加
function addTmpWhitelist(url){
    checkWhitelist()
    tmpwhitelist = JSON.parse(localStorage.getItem(whitelistname));
    tmpwhitelist[url.split('/')[2]] = true;
    localStorage.setItem(whitelistname,JSON.stringify(tmpwhitelist));
}

// 一時的なホワイトリストにurlがあればture,なければfalseを返す
function searchTmpWhitelist(url){
    if (!checkWhitelist()) return false;
    tmpwhitelist = JSON.parse(localStorage.getItem(whitelistname));
    return search([tmpwhitelist],url)
}
// 一時的なホワイトリストから削除(余裕があれば使う)
function deleteTmpWhitelist(url){
    if(!checkWhitelist) return;
    tmpwhitelist = JSON.parse(localStorage.getItem(whitelistname));
    tmpwhitelist[url.split('/')[2]] = false;
    localStorage.setItem(whitelistname,JSON.stringify(tmpwhitelist));
}
