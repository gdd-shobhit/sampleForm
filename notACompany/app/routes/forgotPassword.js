var express = require('express');
var router = express.Router();
var connect = require('../../mongoConnect');
const nodemailer = require("nodemailer");
var randomNumber = require('random')
var sha256 = require('js-sha256').sha256;
var otpBool=false;


router.post('/forgotPassword', (req, res) => {
    CheckEmail(req.body.email,(emailBool)=>{
        if(emailBool===true){
            SendMail(req.body.email, () => {
                res.json({
                    message: "Mail has been sent to " + req.body.email
                })
            })
        }
        else{
            res.json({
                message:"This email is not registered"
            })
        }
    })
   
})
router.post('/forgotPassword/enterOtp', (req, res) => {
    CheckOtp(req.body.OTP, req.body.email, (otp) => {
        if (otp === true) {
            otpBool = true;
            res.json({
                message: "OTP has been verified successfully",
                otpCheck: true
            })
        }
        else {           
            res.json({
                message: "OTP was wrong",
                otpCheck: false
            })
        }

    })
})
router.post('/changePassword', (req,res) => {
    ChangePassword(req.body.newPassword, req.body.email, (passBool) => {
       if(passBool===true){
        res.json({
            message: "Password has been changed"
        })

       } 
       else{
        res.json({
            message: "OTP wasn't verified"
        })
       }
        
    })
})
function CheckEmail(email,callback){
    connect("registeredPeople",(err,collection)=>{
        collection.find({email:email}).toArray((err,res)=>{
            if(res.length===0){
                callback(false);
            }
            else{
                callback(true);
            }
        })
    })
}

function ChangePassword(password, email, callback) {
    connect("registeredPeople", (err, collection) => {
        if (otpBool === true) {
            collection.updateOne({ email: email },
                { $set: { password: sha256(password) } }, (err, res) => {
                })
                callback(true)
        }
        else {
            callback(false);
        }
    })
}

function SendMail(email, callback) {
    var transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: 'shobhitdhamania@gmail.com', // generated ethereal user
            pass: 'shobhit@8' // generated ethereal password
        }
    });
    var otp = randomNumber.int(min = 1000, max = 9999)
    let info = {
        from: 'shobhitdhamania@gmail.com', // sender address
        to: email, // list of receivers
        subject: "OTP", // Subject line
        text: "Your OTP: " + otp, // plain text body
        // html: "<b>Hello world?</b>" // html body
    };
    transporter.sendMail(info, (error, response) => {
        if (error)
            console.log(error);
        else {
            connect("OTP", (err, otpCollection) => {
                if (err) console.log(err);
                else {
                    otpCollection.find({ email: email, active: true }).toArray((err, result) => {
                        if (result.length === 0) {
                            otpCollection.insertOne({ email: email, otp: otp, active: true }, (err, res) => {
                                if (err) throw err;
                                callback();
                            })
                        }
                        else {
                            otpCollection.updateMany(
                                { active: true },
                                { $set: { active: false } }, (err, res) => {
                                    if (err) throw err;
                                    console.log(res.result.nModified + " document(s) updated");
                                    otpCollection.insertOne({ email: email, otp: otp, active: true }, (err, res) => {
                                        if (err) throw err;
                                        callback();
                                    })
                                }
                            )
                        }
                    })
                }
            })
        }
    })
}

function CheckOtp(otp, email, callback) {
    connect("OTP", (err, collection) => {
        if (err) {
            console.log(err);
        } else {
            otp = parseInt(otp)
            collection.find({ email: email, otp: otp, active: true }).toArray((err, result) => {
                if (result.length === 0) {
                    callback(false)
                }
                else {
                    collection.updateOne(
                        { active: true },
                        { $set: { active: false } }, (err, res) => {
                            if (err) throw err;
                            console.log(res.result.nModified + " OTP taken and changed to false");
                            callback(true)
                        }
                    )
                }
            })
        }
    })
}
module.exports = router;