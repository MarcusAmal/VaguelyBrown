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

function updateDatabase(imgURL) {
  userBaseRef = firebase.database().ref(authToken.replace(".", "_")).push();
  $.ajax({
    url: 'https://vageulybrown-ixukjmvrvm.now.sh/predict/'+imgURL,
    method: 'GET',
    beforeSend: function(xhr){xhr.setRequestHeader('Access-Control-Allow-Origin', '*');},
    success: function(data) {
      console.log(data);
      userBaseRef.set({
        outfit_image: imgURL,
        colorscheme: data.colors,
        clothing: data.apparel
      });
    },
  });
}


var authToken;
chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
        // Use the token.
        authToken = token;
            });
/* When the browser-action button is clicked... */
chrome.browserAction.onClicked.addListener(function(tab) {
    /*...check the URL of the active tab against our pattern and... */
        /* ...if it matches, send a message specifying a callback too */

        chrome.tabs.sendMessage(tab.id, { text: "report_back" },
                                updateDatabase);

});
