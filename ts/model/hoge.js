var model
httpObj = new XMLHttpRequest();
httpObj.open("get", chrome.extension.getURL('model.json'), true);
httpObj.onload = function(){
        model = JSON.parse(this.responseText);
        p = model.predict(50/127);
    console.log(p)
    }
httpObj.send(null);
