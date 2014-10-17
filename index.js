var _ = require('underscore');
var express = require('express');
var app = express();
var gclib = require('goodscloud');
var config = require('./config');

var winston = require('winston');
require('winston-papertrail').Papertrail;


var gc = new gclib(config.goodscloudHost);

app.set('port', config.goodscloudPort);
app.use(express.static(__dirname + '/public'));

function getDate(hours_before) {
  var current_date = new Date();
  return new Date(current_date.setHours(current_date.getHours() - hours_before));
}

app.get('/', function (request, response) {

  var username, password, date, num_results, result;

  username = config.goodscloudUsername;
  password = config.goodscloudPassword;
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

//Logging to papertrail
if (config.papertrail.host && config.papertrail.port) {
  var logger = new (winston.Logger)({
      transports: [
        new (winston.transports.Papertrail)({
          host: config.papertrail.host,
          port: config.papertrail.port
        })
      ]
    });

  logger.info("Logging to Papertrail.")
}
