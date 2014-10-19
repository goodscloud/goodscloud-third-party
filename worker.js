var cron = require('cron');
var config = require('./config');

var job = new cron.CronJob('42 * * * * *', function () {
  var username = config.goodscloudUsername;

  console.log('Hello, ' + username + '! This job will run every minute!');
});

job.start();
