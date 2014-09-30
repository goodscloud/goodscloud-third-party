var _ = require('underscore');
var express = require('express');
var app = express();
var gclib = require('goodscloud');

var gc = new gclib(process.env.GC_HOST || 'http://sandbox.goodscloud.com');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

function getDate(hours_before) {
  var current_date = new Date();
  return new Date(current_date.setHours(current_date.getHours() - hours_before));
}

app.get('/', function (request, response) {

  var username, password, date, num_results, result;

  username = process.env.GC_USERNAME;
  password = process.env.GC_PASSWORD;
  date = getDate(24);

  gc.login(username, password, function() {
    gc.get('/api/internal/order', {q: {filters: [
      {name: 'placed', op: '>=', val: date.toISOString()}
    ]}}, function (data) {
      num_results = data['num_results'];
      if (num_results != 0) {
        result = num_results + ' new orders since ' + date + ': ' +
          _.pluck(data['objects'], 'external_identifier').join(', ');
      } else {
        result = 'No new results since ' + date + '.';
      }
      response.send(result);
    });
  });
});

app.listen(app.get('port'), function () {
  console.log("Node app is running at localhost:" + app.get('port'))
});
