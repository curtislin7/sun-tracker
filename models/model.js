const pool = require('./pool');
const moment = require('moment');

class Reminder {
  constructor() {
    this.pool = pool;
    this.pool.on('error', (err, client) => `Error, ${err}, on idle client${client}`);
  };

  async select() {
    let query = `SELECT * FROM reminders`;
    return this.pool.query(query);
  };

  async create(phoneNumber, reminderTime) {
    //  moment.utc(sunTimes.sunset);
    let query = `INSERT INTO Reminders VALUES ('${phoneNumber}', '${reminderTime}', 'Good morning sunshine!', 'false')`;
    return this.pool.query(query)
  }

  async relevantPhoneNumbers() {
    let query = ''
  }

  // appointments is going to be a queried list of phonenumbers
  async sendReminders(phoneNumers) {
    // const accountSid = process.env.TWILIO_ACCOUNT_SID;
    // const authToken = process.env.TWILIO_AUTH_TOKEN;
    // console.log(authToken)
    // const client = require('twilio')(accountSid, authToken);
    // client.messages.create({
    //   body: 'The sunset is going to happen soon!',
    //   from: '+19703005133',
    //   to: '+13032292859'
    // }).then(message => {
    //     console.log('A message has been sent to a number! ', message);
    //     console.log(message.sid)
    //   });
    console.log('HI!');
  }
  // TODO: REST find numbers that need to be sent AND have not been sent yet
  // compile list of numbers
  // send to list of numbers
}

module.exports = new Reminder();