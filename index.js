const express = require('express')
const path = require('path')
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const reminders = require('./routes/reminders');

// WHY store this in locals?
// const moment = require('moment'); 

dotenv.config()

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/build')));
app.locals.moment = require('moment');

app.use('/reminders', reminders);
app.use('/', reminders);

app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.get('/test_this', (req, res) => {
    res.json('sup bitch')
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
})

const port = process.env.PORT || 5000;
app.listen(port)