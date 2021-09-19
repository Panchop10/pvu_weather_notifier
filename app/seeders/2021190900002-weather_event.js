module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'weather_event',
      [
        // Spring
        { weather_event_id: 1, name: 'Hurricanes', season: 'Spring' },
        { weather_event_id: 2, name: 'Volcano', season: 'Spring' },
        { weather_event_id: 3, name: 'Tsunami', season: 'Spring' },
        { weather_event_id: 4, name: 'Earthquake', season: 'Spring' },
        { weather_event_id: 5, name: 'Rainy', season: 'Spring' },
        { weather_event_id: 6, name: 'Sunny', season: 'Spring' },
        { weather_event_id: 7, name: 'Cloudy', season: 'Spring' },
        { weather_event_id: 8, name: 'Iron Rain', season: 'Spring' },
        { weather_event_id: 9, name: 'Locusts Swarm', season: 'Spring' },
        { weather_event_id: 10, name: 'Rats Swarm', season: 'Spring' },
        { weather_event_id: 11, name: 'Malaria', season: 'Spring' },

        // Summer
        { weather_event_id: 12, name: 'Heat Wave', season: 'Summer' },
        { weather_event_id: 13, name: 'Hurricanes', season: 'Summer' },
        { weather_event_id: 14, name: 'Thunderstorm', season: 'Summer' },
        { weather_event_id: 15, name: 'Volcano', season: 'Summer' },
        { weather_event_id: 16, name: 'Tsunami', season: 'Summer' },
        { weather_event_id: 17, name: 'Earthquake', season: 'Summer' },
        { weather_event_id: 18, name: 'Tornado', season: 'Summer' },
        { weather_event_id: 19, name: 'Rainy', season: 'Summer' },
        { weather_event_id: 20, name: 'Sunny', season: 'Summer' },
        { weather_event_id: 21, name: 'Cloudy', season: 'Summer' },
        { weather_event_id: 22, name: 'Locusts Swarm', season: 'Summer' },
        { weather_event_id: 23, name: 'Rats Swarm', season: 'Summer' },
        { weather_event_id: 24, name: 'Malaria', season: 'Summer' },
        { weather_event_id: 25, name: 'Coronal mass ejection', season: 'Summer' },
        { weather_event_id: 26, name: 'Solar Flares', season: 'Summer' },
        { weather_event_id: 27, name: 'Solar Maxima', season: 'Summer' },
        { weather_event_id: 28, name: 'Proton Storm', season: 'Summer' },

        // Autumn
        { weather_event_id: 29, name: 'Hurricanes', season: 'Autumn' },
        { weather_event_id: 30, name: 'Thunderstorm', season: 'Autumn' },
        { weather_event_id: 31, name: 'Volcano', season: 'Autumn' },
        { weather_event_id: 32, name: 'Tsunami', season: 'Autumn' },
        { weather_event_id: 33, name: 'Earthquake', season: 'Autumn' },
        { weather_event_id: 34, name: 'Tornado', season: 'Autumn' },
        { weather_event_id: 35, name: 'Flood', season: 'Autumn' },
        { weather_event_id: 36, name: 'Winter Storm', season: 'Autumn' },
        { weather_event_id: 37, name: 'Rainy', season: 'Autumn' },
        { weather_event_id: 38, name: 'Sunny', season: 'Autumn' },
        { weather_event_id: 39, name: 'Cloudy', season: 'Autumn' },
        { weather_event_id: 40, name: 'Windy', season: 'Autumn' },
        { weather_event_id: 41, name: 'Iron Rain', season: 'Autumn' },
        { weather_event_id: 42, name: 'Moonlight', season: 'Autumn' },
        { weather_event_id: 43, name: 'Locusts swarm', season: 'Autumn' },
        { weather_event_id: 44, name: 'Rats swarm', season: 'Autumn' },
        { weather_event_id: 45, name: 'Malaria', season: 'Autumn' },

        // Winter
        { weather_event_id: 46, name: 'Volcano', season: 'Winter' },
        { weather_event_id: 47, name: 'Earthquake', season: 'Winter' },
        { weather_event_id: 48, name: 'Snowy', season: 'Winter' },
        { weather_event_id: 49, name: 'Cold wave', season: 'Winter' },
        { weather_event_id: 50, name: 'Winter Storm', season: 'Winter' },
        { weather_event_id: 51, name: 'Windy', season: 'Winter' },
        { weather_event_id: 52, name: 'Coronal mass ejection', season: 'Winter' },
        { weather_event_id: 53, name: 'Solar Flares', season: 'Winter' },
        { weather_event_id: 54, name: 'Solar maxima', season: 'Winter' },
        { weather_event_id: 55, name: 'Magnetic Reconnection', season: 'Winter' },
      ],
      {},
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('weather_event', null, {});
  },
};
