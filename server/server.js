var express = require('express');

//routes
var indexRouter = require('./routes/index.js');

var app = express();




app.use('/', indexRouter);


var server = app.listen(process.env.PORT || 3000, function(){
  var port = server.address().port;
  console.log('listening on port:', port + ". Press ctrl-c to end.");
});
