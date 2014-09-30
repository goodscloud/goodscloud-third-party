var express = require('express');
var app = express();
var gclib = require('goodscloud');

var gc = new gclib(process.env.GC_HOST || 'http://sandbox.goodscloud.com');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

function getDate(hours_before) {
  var current_date = new Date();
  return new Date(current_date.setHours(current_date.getHours() - hours_before)).toISOString();
}

app.get('/', function (request, response) {
  var username, password;
  username = process.env.GC_USERNAME;
  password = process.env.GC_PASSWORD;
  gc.login(username, password, function() {
    gc.get('/api/internal/order', {q: {filters: [
      {name: 'placed', op: '>=', val: getDate(24)}
    ]}}, function (data) {
      response.send(data);
    });
  });
});

app.listen(app.get('port'), function () {
  console.log("Node app is running at localhost:" + app.get('port'))
});
