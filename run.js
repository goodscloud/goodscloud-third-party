/* Main entry point */

var index = require('./index'),
    worker = require('./worker'),
    api_events = require('./api_events');

// Start local Web Server
index();
// Start Cron Worker
worker();
// Listen to event notifications from API
api_events();
