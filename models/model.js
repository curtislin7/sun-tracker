const pool = require('./pool');

class Model {
  constructor(table) {
    this.pool = pool;
    this.table = table;
    this.pool.on('error', (err, client) => `Error, ${err}, on idle client${client}`);
  }

  async select() {
    let query = `SELECT * FROM reminders`;
    console.log('executing this query')
    return this.pool.query(query);
  }
}

module.exports = Model;