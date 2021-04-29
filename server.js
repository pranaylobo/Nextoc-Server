
var express = require('express');
var nodemailer = require('nodemailer');

const PORT =  process.env.PORT || 3000;
const cors = require('cors')
var firebase = require('firebase');

var app12 = firebase.initializeApp({ 
    
    apiKey: "AIzaSyBacjjYZ2bJyyvSNCYRwPGTXwNgYsRBl3U",
    authDomain: "milestone-fe4ed.firebaseapp.com",
    projectId: "milestone-fe4ed",
    storageBucket: "milestone-fe4ed.appspot.com",
    messagingSenderId: "650884671954",
    appId: "1:650884671954:web:b1ed8cc23346c9c361000b",
    measurementId: "G-9YDDWP66HR"


});

var app = express();


app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
  
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
  
    // Pass to next layer of middleware
    next();
  });

  app.use(express.json());

app.post('/signin', function (req, res) {


    console.log(req.body.email,req.body.password)
    firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.password)
    .then((userCredential) => {
      // Signed in 
      var user = userCredential.user;
      res.json({
        message:true
      })
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ..
    })
      



})

app.post('/employeemail', function (req, res) {


  console.log(req.body.email)
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'nextocemployeeadded@gmail.com',
      pass: 'REDcherry@1'
    }
  });
  
  var mailOptions = {
    from: 'youremail@gmail.com',
    to: req.body.email,
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
    



})

  app.listen(PORT,function()
  {
      console.log("Server is running")
  });

