/* eslint-disable func-names */

/* 'use strict';
 */
module.exports = (sequelize, DataTypes) => {
  const productDetails = sequelize.define(
    "product_details",
    {
      product_detail_status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      description: {
        type: DataTypes.STRING,
        required: true,
      },
      stripe_product_id: {
        type: DataTypes.STRING,
        required: true,
      },
      stripe_plan_id: {
        type: DataTypes.STRING,
        required: true,
      },
      amount: {
        type: DataTypes.FLOAT,
        required: true,
      },
      leads_count: {
        type: DataTypes.INTEGER,
        required: true,
      },
    },
    {}
  );
  productDetails.associate = function (models) {
    productDetails.belongsTo(models.product_plans, {
      foreignKey: {
        name: "plan_id",
        allowNull: false,
      },
      onDelete: "CASCADE",
    });
    productDetails.hasMany(models.subscription, {
      foreignKey: "product_id",
    });
    // salary, dpartments todo
  };
  return productDetails;
};
