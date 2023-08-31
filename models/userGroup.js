const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

const UserGroup = sequelize.define('UserGroup', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
});

module.exports = UserGroup;
