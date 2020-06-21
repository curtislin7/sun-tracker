const CronJob = require('cron').CronJob;
const reminderWorker = require('./workers/reminderWorker');

const schedulerFactory = function() {
    return {
        start: function() {
            console.log('hey you schedule a job!');
            new CronJob('*/1 * * * *', function() {
                reminderWorker.run();
            }, null, true, '');
        }
    }
};
  
module.exports = schedulerFactory();
