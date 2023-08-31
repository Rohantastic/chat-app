const express = require('express');
const route = express();
const groupController = require('../controllers/group');
const authentication = require('../middleware/auth');

route.post('/create-group',groupController.createGroup);


route.get('/get-groups',authentication.authenticate,groupController.getGroups);


module.exports = route;