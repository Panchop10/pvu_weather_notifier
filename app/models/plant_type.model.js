const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PlantType extends Model {
    static associate(models) {
      models.plant_type.belongsToMany(models.weather_event, {
        as: 'events',
        through: models.weather_event_plant,
        foreignKey: 'plant_type_id',
      });
    }
  }
  PlantType.init(
    {
      plant_type_id: {
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'plant_type',
    },
  );
  return PlantType;
};
