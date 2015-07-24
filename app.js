var express = require('express');
var play = require('play');
var app = express();

var intervalTime = 9000;
var hits = [];
var total = [];
var firstBlood = false;

setInterval(function() {
  hits = [];
}, intervalTime);

app.get('/', function (req, res) {
  hits.push(1);
  total.push(1);

  console.log(hits.length);
  hl = hits.length;

  switch (true) {
    case (hl === 1):
      play.sound('sounds/submarine.m4a');
      if (!firstBlood) { firstBlood = true; play.sound('sounds/01.wav'); }
      break;
    case (hl === 2):
      play.sound('sounds/02.wav');
      break;
    case (hl === 3):
      play.sound('sounds/03.wav');
      break;
    case (hl === 4):
      play.sound('sounds/04.wav');
      break;
    case (hl === 5):
      play.sound('sounds/05.wav');
      break;
    case (hl === 6):
      play.sound('sounds/06.wav');
      break;
    case (hl === 7):
      play.sound('sounds/07.wav');
      break;
    case (hl === 8):
      play.sound('sounds/08.wav');
      break;
    case (hl === 9):
      play.sound('sounds/09.wav');
      break;
    case (hl === 10):
      play.sound('sounds/09.wav');
      break;
    case (hl > 10):
      play.sound('sounds/111.wav');
      break;
    default:
      console.log('ehm, something went wrong');
  }

  res.sendStatus(200);
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%d', host, port);
});
