var express = require('express');
var Joi= require('joi');
var router=express.Router();
var connect=require('../../mongoConnect');
var sha256=require('js-sha256').sha256;
const MongoClient=require('mongodb').MongoClient;
var url="mongodb://localhost:27017/";
var localCollection;
router.post('/enroll',(req,res)=>{
    
    var myObj= {
        name: req.body.name,
        email:req.body.email,
        password: sha256(req.body.password),
        number: req.body.number
    }

    console.log(myObj)

    Registration(myObj,(info)=> {
        console.log(info);
        res.send(info);
    });
})
function Registration(someObj, callback){

    // validating the information according to the schema given
    // var errorResult=ValidateInfo(someObj,()=>{
        
    // });
    // if(errorResult.error)
    // {
    //     // throwing error if validation is unsuccessfull
    //     console.log(errorResult.error.details[0]);
    //     throw errorResult.error;
    // }
    // else{
        connect("registeredPeople",(err,collection)=> {
            if(err){
                //console.log(err);
            } else {
                if(collection){                  
                    collection.insertOne(someObj,function(err,res){
                        if(err) throw err;                          
                            callback(`${someObj.name} has been registered`);   
                    })   
                }
            }
        })
    //}
}

function ValidateInfo(info,callback){
    var schema={
        name:Joi.string().min(2).required(),
        password:Joi.string().min(4).required(),
        email:Joi.string().min(4).required(),
        number:Joi.number().required()
    };
    callback();
    return Joi.validate(info,schema);
}

module.exports=router;

