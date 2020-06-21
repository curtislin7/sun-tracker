const express = require('express');
const momentTimeZone = require('moment-timezone');
const moment = require('moment');
const Model = require('../models/model');

const router = new express.Router();
const messages = new Model('messages');

// post: /reminders/create
// router.post('/create', function(req, res, next) {
//     messages.select().then(
//         function(result){
//             res.send(result);
//         }
//     ).catch(
//         function(result){
//             console.log('there was an error', result);
//             res.send('there was an eror');
//         }
//     );
// });

router.post('/create', function(req, res, next) {
    const phoneNumber = req.body.phoneNumber;
    const reminderTime = req.body.reminderTime;
    console.log('enter here')
    messages.create(phoneNumber, reminderTime)
        .then(
            function(result) {
                res.send(result);
            }
        ).catch(
            function(result) {
                res.status(400).send('There was an error creating the notification');
            }
        );
});

router.get('/test', function(req, res, next) {
    messages.sendNotifications()
        .then(
            function(result){
                res.send('it was sent')
            }
        )
})

// router.get('/create/:phoneNumber', function(req, res, next) {
//     messages.create(req.params.phoneNumber).then(
//         function(result){
//             res.send(result);
//         }
//     ).catch(
//         function(result){
//             console.log('there was an error', result);
//             res.send('there was an eror');
//         }
//     );
// });


// const client = new Client({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false
//   }
// });

// client.connect();
// console.log(moment.utc().format())
// client.query(`INSERT INTO Reminders VALUES ('test', '1234567891', '2', 'us', '${moment.utc().format()}')`, (err, res) => {
//   if (err) throw err;
//   for (let row of res.rows) {
//     console.log(JSON.stringify(row));
//   }
//   client.end();
// });

// INSERT INTO films VALUES
//     ('UA502', 'Bananas', 105, '1971-07-13', 'Comedy', '82 minutes');
// this is for local use


// const insertText = 'INSERT INTO users(name, email) VALUES($1, $2) RETURNING *'
// const values = ['brianc', 'brian.m.carlson@gmail.com']


module.exports = router;