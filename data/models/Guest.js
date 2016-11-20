'use strict';

module.exports = function(sequelize, DataTypes) {
  var Guest = sequelize.define('Guest', {
    name: DataTypes.STRING,
    attending: DataTypes.STRING,
    dietary: DataTypes.STRING,
    dietaryText: DataTypes.STRING,
    numberAttending: DataTypes.INTEGER,
    song1: DataTypes.STRING,
    song2: DataTypes.STRING
  },
  {
    tableName: 'guests'
  });
  return Guest;
};