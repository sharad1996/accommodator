/* eslint-disable func-names */

/* 'use strict';
 */
module.exports = (sequelize, DataTypes) => {

  const productPlans = sequelize.define('product_plans', {
    product_status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    duration_per_day: {
      type: DataTypes.INTEGER,
      required: true
    },
    sub_plan: {
      type: DataTypes.STRING,
      required: true
    }
  }, {});
  productPlans.associate = function (models) {
    productPlans.hasMany(models.product_details, {
      foreignKey: 'plan_id'
    });
    // salary, dpartments todo
  };
  return productPlans;
};
