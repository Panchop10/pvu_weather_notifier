const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Plant extends Model {
    static associate(models) {
      models.plant.belongsTo(models.phone_number, {
        foreignKey: 'phone_number_id',
        targetKey: 'phone_number_id',
      });
    }
  }
  Plant.init(
    {
      plant_id: {
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      phone_number_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'phone_number',
          key: 'phone_number_id',
        },
      },
      type: {
        type: DataTypes.STRING,
      },
      land: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'plant',
    },
  );
  return Plant;
};
