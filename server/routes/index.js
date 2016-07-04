var router = require('express').Router();
var path = require('path');
var requestMod = require('request');

router.get('/', function(request, response){
  response.sendFile(path.join(__dirname, '../public/views/index.html'));
});

router.get('/zipcodeApi/:zipcode', function(request, response){
  var zip_code = request.params.zipcode;
  console.log(request.params);
  console.log(zip_code);
  requestMod('https://www.zipcodeapi.com/rest/1xtzhHL4LuwQE7vwgVvurgzGRz59ONTQlmqC4bHPFeFjlbPB6l6xBGetgjD57wVs/info.json/'+ zip_code + '/degrees', function(err, res, body){
    if(err){
      response.sendStatus(500);
    } else {
      response.send(body);
      console.log('body:', body);
    }
  });
});



module.exports = router;
