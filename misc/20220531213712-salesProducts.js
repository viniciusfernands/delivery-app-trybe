module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert(
      "sales_products",
      [
        {
          sale_id: 1,
          product_id: 2,
          quantity: 9,
        },
        {
          sale_id: 1,
          product_id: 3,
          quantity: 200,
        },
      ],
      { timestamps: false }
    );
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete("sales_products", null, {});
  },
};
