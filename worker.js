var cron = require('cron');
var config = require('./config');
var logger = require('./logger');

var job = new cron.CronJob('42 * * * * *', function () {
  var username = config.goodscloudUsername;
  logger.log('Hello, ' + username + '! This job will run every minute!');
});

job.start();
