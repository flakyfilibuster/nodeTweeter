var express = require('express');
var player = require('play-sound')(opts = {});
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

  hl = hits.length;

  switch (true) {
    case (hl === 1):
      player.play('sounds/submarine.m4a');
      if (!firstBlood) { firstBlood = true; player.play('sounds/01.wav'); }
      break;
    case (hl === 2):
      player.play('sounds/02.wav');
      break;
    case (hl === 3):
      player.play('sounds/03.wav');
      break;
    case (hl === 4):
      player.play('sounds/04.wav');
      break;
    case (hl === 5):
      player.play('sounds/05.wav');
      break;
    case (hl === 6):
      player.play('sounds/06.wav');
      break;
    case (hl === 7):
      player.play('sounds/07.wav');
      break;
    case (hl === 8):
      player.play('sounds/08.wav');
      break;
    case (hl === 9):
      player.play('sounds/09.wav');
      break;
    case (hl === 10):
      player.play('sounds/09.wav');
      break;
    case (hl > 10):
      var nr = [10, 11, 111][Math.round(Math.random()*2)];
      player.play('sounds/' +nr+ '.wav');
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
