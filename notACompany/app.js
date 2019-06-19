var express = require('express');
var app= express();
var cookieParser = require('cookie-parser');
var cors=require('cors');
// var Joi= require('joi');
// var connect=require('./mongoConnect');
// var jwt=require('jsonwebtoken');
// var sha256=require('js-sha256').sha256;
var bodyParser=require('body-parser');
var registeration=require('./app/routes/registration');
var login = require('./app/routes/login');
var forgotPassword=require('./app/routes/forgotPassword')
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
 app.use(cookieParser());
//app.use(bodyParser());

app.use('/',registeration)
app.use('/',login);
app.use('/',forgotPassword)
app.listen(3000,(req,res)=>{
    console.log("server is running on 3000");
})
