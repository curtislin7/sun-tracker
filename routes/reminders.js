const express = require('express');
const momentTimeZone = require('moment-timezone');
const moment = require('moment');
const messages = require('../models/model');

const router = new express.Router();

router.post('/create', function(req, res, next) {
    const phoneNumber = req.body.phoneNumber;
    const reminderTime = req.body.reminderTime;
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

// TODO: make this route useful for testing queries
router.get('/test', function(req, res, next) {
    messages.relevantPhoneNumbers()
        .then(
            function(result){
                res.send(result);
                return 'blah'
            }
        ).then(function(result) {
            console.log('here is the json result', result)
        })
});

module.exports = router;