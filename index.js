const express = require('express')
const path = require('path')
const dotenv = require('dotenv');

// this is for local use
dotenv.config();
console.log('here is the dotenv variable', process.env.TEST)

const app = express();

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/test_this', (req, res) => {
    res.json('sup bitch')
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
})

const port = process.env.PORT || 5000;
app.listen(port)