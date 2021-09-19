const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PhoneNumber extends Model {
    static associate(models) {
      models.phone_number.hasMany(models.plant, {
        foreignKey: 'phone_number_id',
        targetKey: 'phone_number_id',
      });
    }
  }
  PhoneNumber.init(
    {
      phone_number_id: {
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      phone: {
        type: DataTypes.STRING,
      },
      admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      last_request: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
    },
    {
      sequelize,
      modelName: 'phone_number',
    },
  );
  return PhoneNumber;
};
