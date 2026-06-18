"use strict";

const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const adminPass = process.env.ADMIN_PASS;
    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(adminPass, salt);
    const nowDate = new Date();

    await queryInterface.bulkInsert("users", [
      {
        name: process.env.ADMIN_NAME,
        email: process.env.ADMIN_EMAIL,
        passwordHash: hashPassword,
        role: "director",
        createdAt: nowDate,
        updatedAt: nowDate,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", {
      email: process.env.ADMIN_EMAIL,
    });
  },
};
