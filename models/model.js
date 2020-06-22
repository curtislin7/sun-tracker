const pool = require('./pool');

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
        console.log(`Setting a reminder to be sent at ${reminderTime}`);
        let query = `INSERT INTO Reminders VALUES ('${phoneNumber}', '${reminderTime}', 'Good morning sunshine!', 'false');`;
        return this.pool.query(query);
    }

    async relevantPhoneNumbers() {
        let query = `UPDATE reminders 
                    SET status='true'
                    WHERE "time" <= (now() at time zone 'utc') + INTERVAL '1 minutes' AND 
                    "time" >= (now() at time zone 'utc') - INTERVAL '1 minutes' AND
                    status='false'
                    RETURNING *;`
        const result = await this.pool.query(query);

        // TODO add more options for the notification here
        const phoneNumbers = result.rows.map(row => row.phoneNumber);
        return [...new Set(phoneNumbers)];
    };

    async sendReminders() {  
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;

        const client = require('twilio')(accountSid, authToken);
        const phoneNumbers = await this.relevantPhoneNumbers();
        phoneNumbers.forEach((number) => {
            client.messages.create({
                body: 'The sunset is going to happen soon!',
                from: '+19703005133',
                to: `+1${number}`
            }).then(message => {
                console.log(`A message has been sent to ${number}!`);
                console.log(`Message.sid: ${message.sid}`);
            });
        });
    };
};

module.exports = new Reminder();