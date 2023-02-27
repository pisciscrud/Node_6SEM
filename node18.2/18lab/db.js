const { Sequelize, DataTypes } = require("sequelize");
const mysql = require("mysql2");
const http = require("http");

const sequelize = new Sequelize("node18", "root", "r00t.R00T", {
  host: "127.0.0.1",
  dialect: "mysql",
  define: {
    timestamps: false,
    hooks: {
      beforeBulkDestroy(attributes, options) {
        console.log("beforeDelete");
      },
    },
  },
});


module.exports = sequelize;
