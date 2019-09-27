var model
httpObj = new XMLHttpRequest();
console.log('hoge');
httpObj.open("get", './ts/model/model.json', true);
httpObj.onload = function(){
        model = tf.loadModel(this.responseText);
        console.log('predicting');
        p = model.predict(50/127);
        console.log(p)
    }
httpObj.send(null);
