module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('weather_event_plant', {
      weather_event_plant_id: {
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      effect: {
        type: DataTypes.INTEGER,
      },
      weather_event_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'weather_event',
          key: 'weather_event_id',
        },
      },
      plant_type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'plant_type',
          key: 'plant_type_id',
        },
      },
      season_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'season',
          key: 'season_id',
        },
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.literal(
          'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
        ),
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('weather_event_plant');
  },
};
