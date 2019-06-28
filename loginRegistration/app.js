var express = require('express');
var app= express();
var cookieParser = require('cookie-parser');
var cors=require('cors');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var registeration=require('./app/routes/registration');
var login = require('./app/routes/login');
var forgotPassword=require('./app/routes/forgotPassword')

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(function(req,res,next){
    req.io = io;
    next();
});
app.use('/',registeration)
app.use('/',login);
app.use('/',forgotPassword)
server.listen(3000,(req,res)=>{
    console.log("server is running on 3000");
})
