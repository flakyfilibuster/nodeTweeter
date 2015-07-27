var player = require('play-sound')(opts = {});
var https = require('https');
var cfg = require('./cfg.json');
var intervalTime = 10000;


setInterval(function() {

  var date = Date.now();

  var options = {
    hostname: cfg.hostName,
    path: cfg.path + 'since=' + date + '&token=' + cfg.token,
    method: 'GET'
  };

  https.get(options, function(res) {
    console.log("Date: ", date);
    console.log("Got response: " + res.statusCode);
    res.on('data', function (chunk) {
      console.log('BODY: ' + chunk);
      if(chunk.negotiations) {
        player.play('sounds/submarine.m4a');
      }
    });
  }).on('error', function(e) {
    console.log("Got error: " + e.message);
  });
}, intervalTime);
