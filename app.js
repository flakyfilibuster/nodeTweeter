var player = require('play-sound')(opts = {});
var https = require('https');
var cfg = require('./cfg.json');
var intervalTime = 10000;

var date = Date.now();

setInterval(function() {

  var options = {
    hostname: cfg.hostName,
    path: cfg.path + 'since=' + date + '&token=' + cfg.token,
    method: 'GET'
  };

  var req = https.get(options, function(res) {

    // reset date with headers.date
    date = Date.parse(res.headers.date);
    res.on('data', function (chunk) {
      var jsonRsp = JSON.parse(chunk);

      console.log('Negotiation: %s ==> %s', new Date(date), jsonRsp.negotiations);

      if(jsonRsp.negotiations) {
        player.play('sounds/submarine.m4a');
      }
    });
  }).on('error', function(e) {
    console.log("Got error: " + e.message);
  });

  req.end();

}, intervalTime);
