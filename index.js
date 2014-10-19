var _ = require('underscore');
var config = require('./config');
var express = require('express');
var app = express();
var http = require(config.listenProtocol);
var gclib = require('goodscloud');
var logger;

var winston = require('winston');
require('winston-papertrail').Papertrail;


var gc = new gclib(config.goodscloudHost);

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

app.get('/status', function (request, response) {
  response.send('alive');
});


function setup_server() {
  function init_complete() {
    logger.log("Node app is running at localhost:" + app.get('port'))
  }
  if (config.listenProtocol == 'http') {
    http.createServer(app).listen(config.listenPort || 8080, init_complete);
  } else {
    http.createServer({
      key: config.sslKey,
      cert: config.sslCert,
    }, app).listen(config.listenPort || 8443, init_complete);
  }
}

function setup_logging() {
  // Logging to papertrail
  if (config.papertrailHost && config.papertrailPort) {
    logger = new (winston.Logger)({
        transports: [
          new (winston.transports.Papertrail)({
            host: config.papertrailHost,
            port: config.papertrailPort
          })
        ]
    });
    logger.info("Logging to Papertrail.")
  } else {
    logger = console;
  }
}

setup_logging();
setup_server();
