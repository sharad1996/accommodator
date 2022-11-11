/* eslint-disable func-names */

/* 'use strict';
 */
module.exports = (sequelize, DataTypes) => {
  const auth = sequelize.define('auth',
    {
      user_name: { type: DataTypes.STRING, required: true },
      auth: { type: DataTypes.STRING, required: true },
      auth_status: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
    },
    {},
  );
  auth.associate = function(models) {
    // salary, dpartments todo
  };
  return auth;
};
