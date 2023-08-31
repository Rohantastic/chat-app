const express = require('express');
const http = require('http');
const userRoute = require('./routes/user');
const sequelize = require('./config/database');
const User = require('./models/user');
const Message = require('./models/message');
const app = express();
const server = http.createServer(app);

const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static('public'));


app.use('/', userRoute);


User.hasMany(Message);
Message.belongsTo(User);

sequelize.sync();



server.listen(3000, (err) => {
    console.log('running')
});