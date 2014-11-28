var logger = require('./logger');
var gclib = require('goodscloud');
var config = require('./config');

var api_client = new gclib(config.goodscloudHost);

var channels = [],
    events = [];

function getDate(hours_before) {
  var current_date = new Date();
  return new Date(current_date.setHours(current_date.getHours() - hours_before));
}

/*
 * Wrapper for GoodsCloud API calls:
 * make sure we are logged in, and the session is still valid, then invoke
 * `callback` with an active API client instance as sole parameter
 */
function api(callback) {
  function invoke() {
    callback(api_client);
  }
  if (!api_client.auth || api_client.auth.expires < new Date().toJSON()) {
    api_client.login(config.goodscloudUsername, config.goodscloudPassword, invoke);
  } else {
    invoke();
  }
}

/*
 * Get new orders within the last `hours`, default to 24
 */
function get_new_orders(callback, hours) {
  api(function(gc) {
    date = getDate(hours || 24);
    gc.get('/api/internal/order', {q: {filters: [
      {name: 'placed', op: '>=', val: date.toISOString()}
    ]}}, callback);
  });
}

/*
 * Add an event to the list of events
 */
function add_event(event) {
  event.received = new Date();
  events.push(event);
  events = events.slice(-100); // keep 100 events
  if (event.last_action == "client_email.send_preview_email" &&
      !event.success) {
    logger.log("A preview email failed to send");
  }
}

/*
 * Store available channels in a local cache
 */
function sync_channels() {
  api(function(gc) {
    gc.get('/api/internal/channel', function (data) {
      channels = data.objects;
    });
  });
}

/*
 * Return API client status
 */
function status() {
  return "<b>Alive</b><hr>" +
      "Username:" + config.goodscloudUsername + "<br>" +
      "Host:" + config.goodscloudHost + "<br>" +
      "Auth until:" + (api_client.auth ? api_client.auth.expires : 'n/a');
}


module.exports = {
  api: api,
  get_new_orders: get_new_orders,
  sync_channels: sync_channels,
  status: status,
  add_event: add_event,
  list_events: function() { return events; },
  list_channels: function() { return channels; },
}
