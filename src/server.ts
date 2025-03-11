const path = require('path');
const fs = require('fs')
const validador = require('express-validator');
const bodyParser = require('body-parser');
const app = require('express')();
const cors = require('cors');
const http = require('http').Server(app);

require("dotenv").config({
     path: path.resolve(__dirname, `.env.${process.env.NODE_ENV || 'development'}`)
});

/*
require('dotenv').config({ path: '.env.production' });
*/
const port = process.env.PORT || 3300;
const rotasAPI = require('./routes/router-server');
const hostname = require('os').hostname();
const socket = require('./socket').listen(http);

app.set('io', socket);
app.set('fs', fs);
app.use(require('express').static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(validador());
app.use(cors());
app.use("/", rotasAPI);
app.use((req, res, next) => {
     res.setHeader('Access-Control-Allow-Origin', '*');
     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
     res.setHeader('Access-Control-Allow-Credentials', false);
     next();
});

http.listen(port, () => console.log(`${process.env.TITLE_RUN_CONSOLE} em 'http://${hostname}:${port}'`));

module.exports = app;