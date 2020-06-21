const pool = require('./pool');
const moment = require('moment');

class Model {
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
}

module.exports = Model;