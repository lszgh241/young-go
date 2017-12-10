var express = require('express');
var app = express();
var utils = require('./server-utils');

app.use(express.static('public'));
app.get('/api/getCardInfo', function (req, res) {
  console.log('got a proxy request!');
  var cardInfo = require('./cardInfo.json');
  cardInfo.serverHost = 'http://' + utils.getIPAdress() + ':3000';
  res.json(cardInfo);
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('YOUNG-GO! server is running at http://%s:%s', host, port);
});
