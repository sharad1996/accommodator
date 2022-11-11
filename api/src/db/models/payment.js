/* eslint-disable func-names */

/* 'use strict';
 */
module.exports = (sequelize, DataTypes) => {

  const payment = sequelize.define('payments', {
    id:{
      allowNull: false,
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    payment_status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    payment_request: {
      type: DataTypes.JSON,
      allowNull: true
    },
    payment_response: {
      type: DataTypes.JSON,
      allowNull: true
    },
  }, {}, );
  payment.associate = function (models) {
    payment.belongsTo(models.subscription, {
      foreignKey: {
        name: 'subscription_id',
        allowNull: false
      },
      onDelete: 'CASCADE',
    })
    // salary, dpartments todo
  };
  return payment;
};
