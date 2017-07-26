"use strict";

require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

const apikey = process.env.SLACK_API_TOKEN;

app.set('port', (process.env.PORT || 9001));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/hello', (req, res) => {
    res.send('hello');
});

app.post('/', (req, res) => {
    const opponent = req.body.text;
    const currentUser = req.body.user_name;
    const body = {
        response_type: "in_channel",
        "attachments": [{
            "text": `Let's start battle @${currentUser} VS @${opponent}! Who will be the winner?`
        }]
    };
    res.send(body);
});


app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
