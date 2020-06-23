const reminder = require('../models/model');
// read about function factories: https://www.theodinproject.com/courses/javascript/lessons/factory-functions-and-the-module-pattern
const reminderWorker = function() {
    return {
        run: function() {
            console.log('Attempting to send reminders...')
            reminder.sendReminders();
        }
    }
};

module.exports = reminderWorker();