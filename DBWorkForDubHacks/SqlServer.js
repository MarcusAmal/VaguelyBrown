
var mysql = require('mysql');

var con = mysql.createConnection({
  host:'localhost',
  username: 'root',
  password: 'password',
  });

con.connect(function(err){
  if (err) throw err;
  console.log("connected!")
});

con.query("CREATE DATABASE vaguelyBrownDB", function(err, result) {
  if(err) throw err;
});

  var userTable = "CREATE TABLE IF NOT EXISTS User_Info(TimeStamp int(12), UserId char(100), PinterestId char(100))";
  con.query(userTable, function(){});
  var pinterestTable = "CREATE TABLE IF NOT EXISTS Pinterest_Info(PinterestId char(100), Top char(100), Bottom char(100), Shoes char(100), Url char(500))";
  con.query(pinterestTable, function(){});
  var pinterestLinks = "CREATE TABLE IF NOT EXISTS Pinterest_Links(PinterestId char(100), urlTop char(100), urlBottom char(100), urlShoes char(100))";
  con.query(pinterestLinks, function(){});

function addToDB(dataList){
      var insertUser = "INSERT INTO User_Info(TimeStamp, UserId, PinterestId) VALUES (dataList[0], dataList[1],dataList[2])";
      con.query(insertUser, function(){});
      var insertPinterest = "INSERT INTO Pinterest_Info(PinterestId, Top, Bottom, Shoes, Url) VALUES (dataList[2], dataList[3], dataList[4], dataList[5], dataList[6])";
      con.query(insertPinterest, function(){});
      //var insertLinks = "INSERT INTO Pinterest_Links(PinterestId,urlTop,urlBottom,urlShoes) VALUES..."
}
