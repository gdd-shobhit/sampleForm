var express = require('express');
var router = express.Router();
var connect = require('../../mongoConnect');
var sha256 = require('js-sha256').sha256;
router.post('/enroll', (req, res) => {

    var myObj = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        number: parseInt(req.body.number)
    }
    ValidateInfo(myObj, (infoCheck) => {
        if (infoCheck === true) {
            Registration(myObj, (info) => {
                console.log(info.message);
                //res.send(info.message);
                res.json({
                    validationCheck: true,
                    numberCheck: info.numberCheck,
                    emailCheck: info.emailCheck
                })
            });
        }
        else {
            res.json({
                message: "Information was wrong somewhere.",
                validationCheck: false
            });
            console.log("Information was wrong somewhere.");
        }
    })
})
function Registration(someObj, callback) {

    //validating the information according to the schema given

    connect("registeredPeople", (err, collection) => {
        if (err) {
            //console.log(err);
        } else {
            if (collection) {
                someObj.password = sha256(someObj.password);
                collection.find({ number: someObj.number }).toArray((err, numberResult) => {
                    if (numberResult.length == 0) {
                        collection.find({ email: someObj.email }).toArray((err, emailResult) => {
                            if (emailResult.length == 0) {
                                collection.insertOne(someObj, function (err, res) {
                                    if (err) throw err;
                                    callback({message:`${someObj.name} has been registered`,
                                    numberCheck: true,
                                    emailCheck: true
                                        });
                                })
                            }
                            else {
                                callback({
                                    message: "Number already exists. Please login",
                                    numberCheck: true,
                                    emailCheck: false
                                })
                            }
                        })
                    }
                    else {
                        callback({
                            message: "Number already exists. Please login",
                            numberCheck: false,
                            emailCheck: false
                        })
                    }
                })
            }
        }
    })
}

function ValidateInfo(info, callback) {
    // var schema = {
    //     name: Joi.string().min(2).required(),
    //     password: Joi.string().min(8).required(),
    //     email: Joi.string().min(4).required(),
    //     number: Joi.number().min(10).required()
    // };
    // console.log(Joi.validate(info, schema).value);
    // console.log(Joi.validate(info, schema).error);
    if (info.password.length > 8 && info.number.toString().length == 10) {
        callback(true);
    }
    else {
        callback(false);
    }


}

module.exports = router;

