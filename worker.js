/*
 * Cron Job Management
 */

var cron = require('cron');
var logger = require('./logger');
var logic = require('./logic');

var job = new cron.CronJob('42 * * * * *', function () {
  logger.log('This job runs at 42 seconds after every full minute.');
  logic.sync_channels();
});

module.exports = job.start.bind(job);
