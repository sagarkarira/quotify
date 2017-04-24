'use strict';

process.env.NODE_CONFIG_DIR = __dirname + '/config/';

const config = require('config');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const http = require('http');
const https = require('https');
const ejs = require('ejs');
const colors = require('colors');

const bot = require('./routes/bot');

const app = express();
app.set('port', process.env.PORT || 8080);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
app.use('/static', express.static(__dirname + '/public'));

app.get('/api/page', bot.page);
app.get('/api/screenshot', bot.screenshot);


app.listen(app.get('port'), () => {
	console.log('%s App is running on port %s mode', colors.green('✓'), app.get('port'), app.get('env')); 
	console.log('  Press CTRL-C to stop\n');
});

module.exports = app;