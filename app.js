var player = require('play-sound')(opts = {});
var https = require('https');
var cfg = require('./cfg.json');
var intervalTime = 5000;
var stats = [];

function utcDateString(d){
  if(!(d instanceof Date)) {
   console.log('uh oh date problem...');
   d = new Date();
  }
  function pad(n){return (n<10 ? '0'+n : n); }
  return d.getUTCFullYear()+'-'
    + pad(d.getUTCMonth()+1)+'-'
    + pad(d.getUTCDate())+'T'
    + pad(d.getUTCHours())+':'
    + pad(d.getUTCMinutes())+':'
    + pad(d.getUTCSeconds())+'Z';
}

var date = new Date();
var startDate = date;


setInterval(function() {
  console.log('Negotiations since: ', startDate, ' ', stats.length);
}, 30000);

setInterval(function() {

  date = utcDateString(date);

  var options = {
    hostname: cfg.hostName,
    path: cfg.path + 'since=' + date + '&token=' + cfg.token,
    method: 'GET'
  };

  var req = https.get(options, function(res) {
    console.log('pre date', date);

    // reset date with headers.date
    date = new Date(Date.parse(res.headers.date));

    res.on('data', function (chunk) {
      var jsonRsp = JSON.parse(chunk);

      console.log('Negotiation: %s ==> %s', date, jsonRsp.negotiations);

      if(jsonRsp.negotiations) {
	stats.push(date);
        player.play('sounds/05.wav');
      }
    });
  }).on('error', function(e) {
    console.log("Got error: " + e.message);
  });

  req.end();

}, intervalTime);
