var express = require('express');
var loginRouter=express.Router();
var jwt=require('jsonwebtoken');
var sha256=require('js-sha256').sha256;
var connect= require('../../mongoConnect');
var loginCheck=false;
const nodemailer = require("nodemailer");
var randomNumber= require('random')
loginRouter.post('/login',(req,res)=>{
    ValidateLogin(req.body.number,req.body.password,(numberCheck,passwordCheck,newObj)=>{
        if(newObj==null){
            console.log("Number check: "+numberCheck);
            console.log("Password Check: "+passwordCheck);
            res.json({
                numberCheck:numberCheck,
                passwordCheck:passwordCheck
            })           
        }
        else{
            console.log(newObj.name+" is loging in ");
            jwt.sign({user:newObj},'secretKey',(err,token)=>{
                if(err) throw err;               
                else{
                    res.json({
                        token,
                        numberCheck:numberCheck,
                        passwordCheck:passwordCheck                      
                   })     
                }              
            })         
        }
        
    });      
        
         
})
loginRouter.get('/login/user',validateToken,(req,res)=>{
    jwt.verify(req.token,'secretKey',(err,authData)=>{
        if(err) {
            res.sendStatus(403);
        }
        else{
            res.json({
                message:"You have Logged in Successfully and your information is ...",
                authData
            })
        }
    })
})


function ValidateLogin(number,password,callback){
    connect("registeredPeople",(err,collection)=> {
        if(err){
            console.log(err);
        } else {
            if(collection){
                collection.find({number:number}).toArray((err,result)=>{
                    if(err) throw err;
                    else if(result.length==0){
                        var someObj=result[0];                               
                        callback(false,false,null);
                    }
                    else{
                        var someObj= result[0];
                        if(someObj.password===sha256(password)){
                            someObj.password=password;
                            callback(true,true,someObj)
                        }
                        else{
                            callback(true,false,null)
                        }
                    }                                           
                })              
            }
        }        
    })
    
}
   

function validateToken(req,res,next){
    // get the header
    var header= req.headers['authorization'];
    // check if the header is defined
    if(typeof header!=='undefined'){
        // split to get the token
        var array=header.split(' ')
        var token= array[1];
        req.token=token;
        next();
    }
    else{
        res.sendStatus(403);
    }
}
module.exports=loginRouter;
