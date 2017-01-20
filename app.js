var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var multer = require('multer');
var upload = multer();
var logger = require('winston');
var app = express();

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 18080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

var ipaddress;
var port;

function initIPAdress() {
    var adr = process.env.OPENSHIFT_NODEJS_IP;
    port = process.env.OPENSHIFT_NODEJS_PORT;
    if (typeof adr === "undefined") {
            //  Log errors on OpenShift but continue w/ 127.0.0.1 - this
            //  allows us to run/test the app locally.
            console.warn('No OPENSHIFT_NODEJS_IP var, using localhost');
            adr = 'localhost';
            port = 18080;
    }
    ipaddress = adr;
}

logger.add(logger.transports.File, { filename: 'tabletop.log'});
logger.info('Logger initialized successfully...');

app.set('view engine', 'ejs');
app.set('views','./view');

app.use(express.static('pub')); // to send static files

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(upload.array()); // for parsing multipart/form-data

app.use(cookieParser());

var home = require('./ctrl/home.js');
var games = require('./ctrl/games.js');

app.use('/home', home);
app.use('/games', games);

app.get('/', function(req, res) {
  res.redirect(301, '/home/');
});

initIPAdress();

app.listen(port, ipaddress, function() {
        console.log('%s: Node server started on %s:%d ...',
                        Date(Date.now() ), ipaddress, port);
});