const { Sequelize, DataTypes } = require("sequelize");
const mysql = require("tedious");
const http = require("http");

const sequelize = new Sequelize("node18", "sa", "d00r.D00R", {
  host: "127.0.0.1",
  port: 1433,
  dialect: "mssql",
  define: {
    timestamps: false,
  },
});

module.exports = sequelize;
