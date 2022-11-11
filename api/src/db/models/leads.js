/* eslint-disable func-names */

/* 'use strict';
 */
module.exports = (sequelize, DataTypes) => {

  const leads = sequelize.define('leads',
    {
      first_name: { type: DataTypes.STRING, required: true },
      last_name: { type: DataTypes.STRING, required: true },
      address: { type: DataTypes.STRING, allowNull: true },
      location: { type: DataTypes.GEOMETRY('POINT'), required: true },
      latitude: { type: DataTypes.STRING, required: true },
      longitude: { type: DataTypes.STRING, required: true },
      leads_status: { type: DataTypes.BOOLEAN, defaultValue: true },
      zipcode: { type: DataTypes.STRING, required: true },
      mobile: { type: DataTypes.STRING, required: true },
    },
    {},
  );
  leads.associate = function (models) {
    // salary, dpartments todo
  };
  return leads;
};
