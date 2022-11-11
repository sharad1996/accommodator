/* eslint-disable func-names */

/* 'use strict';
 */
module.exports = (sequelize, DataTypes) => {

  const downloadedLeads = sequelize.define('downloaded_leads',
    {
      download_count: { type: DataTypes.STRING, required: true },
      download_file: { type: DataTypes.STRING, allowNull: true },
    },
    {},
  );
  downloadedLeads.associate = function (models) {
    downloadedLeads.belongsTo(models.user, {
      foreignKey: {
        name: 'users_id',
        allowNull: false
      },
      onDelete: 'CASCADE',
    })
    // salary, dpartments todo
  };
  return downloadedLeads;
};
