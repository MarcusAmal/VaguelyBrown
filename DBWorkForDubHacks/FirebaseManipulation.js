var firebase = require("firebase");

var config = {
  apiKey: "AIzaSyCDPtDz7PmYmGhFPQaHjDFX1h9h5MyuzkA",
  authDomain: "brownbase-bfbcf.firebaseapp.com",
  databaseURL: "https://brownbase-bfbcf.firebaseio.com",
  projectId: "brownbase-bfbcf",
  storageBucket: "brownbase-bfbcf.appspot.com",
  messagingSenderId: "763400833063"
};
firebase.initializeApp(config);

var database = firebase.database();
var names = firebase.database().ref('brownbase-bfbcf').orderByKey();
names.once('value').then(function(snapshot){
  console.log(snapshot.key);
  snapshot.forEach(function(childSnapshot){
    console.log(childSnapshot.val);
  });
});
