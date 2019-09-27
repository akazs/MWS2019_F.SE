var model
httpObj = new XMLHttpRequest();
console.log('hoge');
httpObj.open("get", './ts/model/model.json', true);
httpObj.onload = async function(){

        model = await tf.loadLayersModel('./ts/model/model.json')        
        console.log(await model.predict(tf.tensor1d([50/127])).data());

    }
httpObj.send(null);
