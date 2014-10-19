var cron = require('cron');

var job = new cron.CronJob('42 * * * * *', function () {
  var username = process.env.GC_USERNAME || 'friend';

  console.log('Hello, ' + username + '! This job will run every minute!');
});

job.start();
