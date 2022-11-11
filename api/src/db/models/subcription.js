/* eslint-disable func-names */

/* 'use strict';
 */
module.exports = (sequelize, DataTypes) => {

  const subscription = sequelize.define('subscription', {
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
    expiry_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    auto_renew_status:{
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    subscription_status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    stripe_subscription_id:{
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {}, );
  subscription.associate = function (models) {
    subscription.belongsTo(models.user, {
      foreignKey: {
        name: 'users_id',
        allowNull: false
      },
      onDelete: 'CASCADE',
    })
    subscription.belongsTo(models.product_details, {
      foreignKey: {
        name: 'product_id',
        allowNull: false
      },
      onDelete: 'CASCADE',
    })
    subscription.hasMany(models.payments, {
      foreignKey: 'subscription_id'
    });
    // salary, dpartments todo
  };
  return subscription;
};
