const Sequelize = require('sequelize');
const database = require('../config/database');

const Group = database.define('Group',{
    id : {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull : true
    },
    groupName:{
        type: Sequelize.DataTypes.STRING,
        allowNull : true
    },
});


module.exports = Group;