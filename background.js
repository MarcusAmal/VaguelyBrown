/*chrome.browserAction.onClicked.addListener(
  function(activeTab) {
    chrome.tabs.executeScript(null, {file: "content.js"});
  }
)*/
var config = {
      apiKey: "AIzaSyCDPtDz7PmYmGhFPQaHjDFX1h9h5MyuzkA",
      authDomain: "brownbase-bfbcf.firebaseapp.com",
      databaseURL: "https://brownbase-bfbcf.firebaseio.com",
      projectId: "brownbase-bfbcf",
      storageBucket: "brownbase-bfbcf.appspot.com",
      messagingSenderId: "763400833063"
  };
firebase.initializeApp(config);
/* Regex-pattern to check URLs against.
   It matches URLs like: http[s]://[...]stackoverflow.com[...] */

/* A function creator for callbacks */
function updateDatabase(imgURL) {
  userBaseRef = firebase.database().ref('Marcus').push();
  $.get('localhost:3000/predict'+imgURL, function(data) {
    alert(data);
    userBaseRef.set({
      outfit_image: imgURL,
      colorscheme: data,
      clothing: data
    });
  });
}
  /*('localhost:3000/postLikedImage', {
    userID: 'ID HERE',
    imageURL: imgURL,
    timestamp: Date.now()
  })*/

/* When the browser-action button is clicked... */
chrome.browserAction.onClicked.addListener(function(tab) {
    /*...check the URL of the active tab against our pattern and... */
        /* ...if it matches, send a message specifying a callback too */

        chrome.tabs.sendMessage(tab.id, { text: "report_back" },
                                updateDatabase);

});






/*



function getSourceAsDOM(url)
{
    xmlhttp=new XMLHttpRequest();
    xmlhttp.open("GET",url,false);
    xmlhttp.send();
    parser=new DOMParser();
    return parser.parseFromString(xmlhttp.responseText,"text/html");
}

chrome.browserAction.onClicked.addListener(
  function() {

    var d = new Date();
    getTime(d);
    getDate(d);
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true},
      function (tabs) {
        var url = tabs[0].url;
        imagePageDOM = getSourceAsDOM(url);
        images = imagePageDOM.getElementsByTagName('img');
        alert(images[0].getAttribute("src"));
      })

    //var images = document.getElementsByTagName('img');
    //alert("Found Images1");
    //alert(images.length);
    //var url  = images[0].getAttribute("src");
    //alert("Image URL: " + url);
  }
);




/*
var divElements = document.getElementsByTagName('div');
var button;

for(var i = 0; i < divElements.length; i++) {
  if(divElements[i].getAttribute("Class") === "_4f _h _z6 _4q") {
    button = document.createElement("button");
    button.innerHTML  = "Do Something";
    divElements[i].appendChild(button);
  }

}

button.addEventListener("click",
function() {
  alert("did something");
});

/*
for(var i = 0; i < imgElements.length; i++) {
  imgElements[i].src = "https://png.icons8.com/metro/1600/hearts.png";
}

var imgLinks = document.getElementsByTagName('a');


for(var i = 0; i < imgLinks.length; i++) {

  if(imgLinks[i].getAttribute("class") === "imageLink") {
    imgLinks[i].href = "https://png.icons8.com/metro/1600/hearts.png";
  }
}

*/
