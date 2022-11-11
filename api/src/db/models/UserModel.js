module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    'user', {
      uuid: {
        allowNull: false,
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      roleId: DataTypes.INTEGER,
      stripe_customer_id: {
        type: DataTypes.STRING,
        allowNull:true
      },
      meta: DataTypes.JSON,
      password: DataTypes.STRING,
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    }, {},
  );
  // eslint-disable-next-line no-unused-vars
  user.associate = function (models) {
    user.hasMany(models.subscription, {
      foreignKey: 'users_id'
    });
    user.hasMany(models.downloaded_leads, {
      foreignKey: 'users_id'
    });
    // associations can be defined here
  };
  return user;
};
