const express = require('express');
const route = express.Router();
const userController = require('../controllers/user');
const authentication = require('../middleware/auth');


//get user the signup page
route.get('/signupPage',userController.signupPage);


//send the data from frontend axios to backend server to store users into DB
route.post('/signup',userController.signup);

//get user the login page
route.get('/login',userController.loginPage);

//send the data from frontend axios to backend server to validate the user
route.post('/login',userController.login);


//get user the chatPage, once successfully validated after login
route.get('/home',userController.chatPage);


//route.post('/saveMessage',authentication.authenticate,userController.saveMessageIntoDatabase);

module.exports = route;