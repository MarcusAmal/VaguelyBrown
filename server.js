const Clarifai = require('clarifai')
const express = require('express');
var bodyParser = require('body-parser')
const clarifai_app = new Clarifai.App({
 apiKey: '2155469d16cb4e3d86271d7bf9a0cd1a'
});

var $prediction;

app = express();
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
port = process.env.PORT || 3000;

function predict(url, res) {
  clarifai_app.workflow.predict('Clothes-Detection', url).then(
    function(response){
      var models = response.results[0].outputs;
      $prediction = {
        'apparel' : models[0].data.concepts,
        'colors' : models[1].data.colors
      };
      console.log($prediction)
      res.send($prediction.apparel);
    },
    function(err){
      console.log("ERROR:" + err);
    }
  );
}


app.get('/', (req, res) => {
  res.render('index');
  //res.send("Hello World!")

});

app.get('/predict/*', (req, res) => {
  console.log("PREDICT");
  console.log(req.params);
  predict(req.params[0], res);
});

app.get('/getSimilarClothes', (req, res) => {
  console.log('SIMILAR CLOTHES');
});


app.get('/getColors', (req, res) => {
  if($prediction == null) {
    console.log("ERR: CALL PREDICT FIRST")
  } else {
    res.send($prediction.colors);
  }
});


app.get('/getClothes', (req, res) => {
  if($prediction == null) {
    console.log("ERR: CALL PREDICT FIRST")
  } else {
    res.send($prediction.apparel);
  }
});

app.get('/getImageUrl', (req, res) => {

});


app.post('/postLikedImage', function (req, res) {
  console.log(req.body);
  res.end("yes");
});


app.listen(port, () => console.log(`App listening on port ${port}!`));
