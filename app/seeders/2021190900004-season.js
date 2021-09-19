module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'season',
      [
        {
          season_id: 1,
          name: 'Spring',
        },
        {
          season_id: 2,
          name: 'Summer',
        },
        {
          season_id: 3,
          name: 'Autumn',
        },
        {
          season_id: 4,
          name: 'Winter',
        },
      ],
      {},
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('season', null, {});
  },
};
