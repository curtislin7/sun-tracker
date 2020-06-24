const express = require('express');
const messages = require('../models/model');

const router = new express.Router();

// send over req body with all requirements

router.post('/create', function(req, res, next) {
    const phoneNumber = req.body.phoneNumber;
    const reminderTime = req.body.reminderTime;
    const reminderType = req.body.reminderType;
    const reqBody = req.body;

    messages.create(phoneNumber, reminderTime, reminderType)
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

// TODO: make this route useful for testing queries
// router.get('/test', function(req, res, next) {
//     messages.relevantPhoneNumbers()
//         .then(
//             function(result){
//                 res.send(result);
//             }
//         ).catch(
//             function(result) {
//                 res.send(result);
//             }
//         )
// });

module.exports = router;