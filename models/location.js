'use strict';
module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    city: DataTypes.STRING,
    state: DataTypes.STRING,
  }, {});
  Location.associate = function(models) {
    Location.belongsTo(models.User, {
      foreignKey: 'UserId',
      as: 'user'
    })
  };
  return Location;
};
