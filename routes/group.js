const express = require('express');
const route = express();
const groupController = require('../controllers/group');
const authentication = require('../middleware/auth');


//creating group with the userId of user who created, without authenticating(authentication not needed).
route.post('/create-group',groupController.createGroup);

//getting groups, created by user and also groups involved
route.get('/get-groups',authentication.authenticate,groupController.getGroups);


module.exports = route;