/*
 * Opens a WebSocket connection to the API event service
 * to receive asynchronous notifications
 */

var logic = require('./logic'),
    config = require('./config'),
    ws = require('nodejs-websocket'),
    connection;

function listen() {
  var events = [];

  // listen for events from specific channels only
  if (config.goodscloudChannels) {
    events = config.goodscloudChannels.map(function(ch) {
      return 'channel.' + ch + '.connector.#';
    });
  }

  // log into websocket with REST API key/token
  logic.api(function(gc) {

    connection = ws.connect(gc.auth.notify_url, function() {
      logic.add_event({log: "websocket connected to " + gc.auth.notify_url});
      this.sendText(JSON.stringify({
        key: gc.auth.app_key,
        token: gc.auth.app_token,
        events: events,
      }));
    });

    connection.on('close', function() {
      logic.add_event({log: "websocket connection terminated"});
      connection = null;
      setTimeout(listen, 10000);
    });

    connection.on('text', function(data) {
      logic.add_event(JSON.parse(data));
    });
  });
}

module.exports = listen;
