var player = require('play-sound')(opts = {});
var https = require('https');
var cfg = require('./cfg.json');
var intervalTime = 1000;


setInterval(function() {
  var options = {
    hostname: cfg.hostName,
    path: cfg.path + 'since=' + Date.now() + '&token=' + cfg.token,
    method: 'GET'
  };

  https.get(options, function(res) {
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
