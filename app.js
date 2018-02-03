var express = require('express'),							
	app = express(),
	path = require('path'),
	cookieParser = require('cookie-parser'),				
	bodyParser = require('body-parser'),					
	exphbs = require('express-handlebars'), 				
	expressValidator = require('express-validator'),		
	flash = require('connect-flash'),						
	session = require('express-session'),					
	passport = require('passport'),							
	LocalStrategy = require('passport-local').Strategy,		
	server = require('http').createServer(app),	
	fs = require('fs'),										
	util = require('util'),									
	timestamp = require('console-timestamp'), 				
	cron  = require('node-cron'),							
	routes = require('./routes'),
	mysql = require('mysql');

var connection = mysql.createConnection({
	host : "localhost",
	user : "root",
	password : "****",
	database : "tennis"
});

global.db = connection;
connection.connect(function(error){
	if(error) { 
		console.log("Problem with MySQL"+error);
	} else {
		console.log("Connected with Database");
	}
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());									
app.use(bodyParser.urlencoded({ extended: true }));		
app.use(cookieParser());									

app.use(express.static(path.join(__dirname, 'public')));	

app.use(session({											
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

app.use(flash());

app.use(function (req, res, next) {							
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	res.locals.user = req.user || null;						
	res.locals.ledStatus = req.ledStatus;
	next();
});

app.get('/', routes.index);
app.get('/login', routes.index);
var user = require('./routes/users')(app, db);

server.listen(80, function(){								
	console.log('\nDD-MM-YY : hh:mm:ss'.timestamp, ': Start listening on Port *.80');
}); 

var logFile = fs.createWriteStream('status.txt', { flags: 'w' });	
var logStdout = process.stdout;
	console.log = function () {
		logFile.write(util.format.apply(null, arguments) + '\n');
		logStdout.write(util.format.apply(null, arguments) + '\n');
	}
console.error = console.log;

