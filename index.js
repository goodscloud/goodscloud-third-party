/*
 * Provides a basic HTTP interface
 */

var _ = require('underscore');
var config = require('./config');
var express = require('express');
var app = express();
var http = require(config.listenProtocol);
var logger = require('./logger');
var logic = require('./logic');


app.use('/', express.static(__dirname + '/static'));

app.get('/orders', function (request, response) {
  logic.get_new_orders(function(data) {
    var num_results, result;
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

app.get('/status', function (request, response) {
  response.send(logic.status());
});

app.get('/events', function (request, response) {
  response.send(logic.list_events().map(JSON.stringify).reverse().join("<hr>"));
});

app.get('/channels', function (request, response) {
  response.send(logic.list_channels().
    map(function(ch) { return "<li>" + ch.id + " " + ch.label + "</li>";}).
    join("")
  );
});

function setup_server() {
  var server;
  function init_complete() {
    logger.log("Node app is running at %j", server.address())
  }
  if (config.listenProtocol == 'http') {
    server = http.createServer(app).listen(config.listenPort || 8080, init_complete);
  } else {
    server = http.createServer({
      key: config.sslKey,
      cert: config.sslCert,
    }, app).listen(config.listenPort || 8443, init_complete);
  }
}

module.exports = setup_server;
