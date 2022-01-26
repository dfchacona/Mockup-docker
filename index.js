var mysql = require('mysql');
var express = require('express');

var app = express();
var port = process.env.PORT || 8005;
var responseStr = "MySQL Data:";

app.get('/',function(req,res){
   
   var mysqlHost = process.env.MYSQL_HOST || 'us-cdbr-east-05.cleardb.net';
   var mysqlPort = process.env.MYSQL_PORT || '3306';
   var mysqlUser = process.env.MYSQL_USER || 'b8f88d8cdb6474';
   var mysqlPass = process.env.MYSQL_PASS || 'd5c390a2';
   var mysqlDB   = process.env.MYSQL_DB   || 'heroku_d5f316cf2827a1a';

   var connectionOptions = {
     host: mysqlHost,
     port: mysqlPort,
     user: mysqlUser,
     password: mysqlPass,
     database: mysqlDB
   };

   console.log('MySQL Connection config:');
   console.log(connectionOptions);

   var connection = mysql.createConnection(connectionOptions);
   var queryStr = "SELECT * FROM ingredients";
   
   connection.connect();
 
   connection.query(queryStr, function (error, results, fields) {
     if (error) throw error;
     
     responseStr = '';

     results.forEach(function(data){
        responseStr += data.name + ' : ';
        console.log(data);
     });

     if(responseStr.length == 0)
        responseStr = 'No records found';

     console.log(responseStr);

     res.status(200).send(responseStr);
   });
    
   connection.end();
});


app.listen(port, function(){
    console.log('Sample mySQL app listening on port ' + port);
});