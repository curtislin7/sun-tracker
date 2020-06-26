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

    async create(phoneNumber, reminderTime, reminderType, sunInfo) {
        let query = `INSERT INTO Reminders VALUES ('${phoneNumber}', '${reminderTime}', 'Good morning sunshine!', 'false', '${reminderType}', '${JSON.stringify(sunInfo)}');`;
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

        const phoneNumbers = result.rows.map(row => {
            return {
                phoneNumber: row.phoneNumber,
                reminderType: row.reminderType,
                localTime: row.sunInfo.localTime,
                location: row.sunInfo.location,
            }
        });

        return phoneNumbers;

    };

    async sendReminders() {  
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const adminPhoneNumber = process.env.TWILIO_PHONE_NUMBER;        

        const client = require('twilio')(accountSid, authToken);
        const phoneNumbers = await this.relevantPhoneNumbers();
        phoneNumbers.forEach(({phoneNumber, reminderType, localTime, location}) => {
            client.messages.create({
                body:`The ${reminderType} in ${location} will happen at ${localTime}. -SunTracker`,
                from: `${adminPhoneNumber}`,
                to: `+1${phoneNumber}`
            }).then(message => {
                console.log(`A message has been sent to ${phoneNumber}!`);
                console.log(`Message.sid: ${message.sid}`);
            }).catch(message => {
                console.log('there was an error', message)
            });
        });
    };
};

module.exports = new Reminder();