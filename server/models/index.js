"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (env === "hosted") {
  const dbUser = process.env.DB_USER || config.username || "root";
  const dbPass = process.env.DB_PASS || config.password || "";
  const dbName = process.env.DB_NAME || config.database || "delphidev";
  const socketPath = `/cloudsql/${
    process.env.INSTANCE_CONNECTION_NAME ||
    "delphi-web-tool-454323:us-central1:delphidev"
  }`;

  console.log(
    `Using socket connection for database with user: ${dbUser}, database: ${dbName}`
  );

  sequelize = new Sequelize(dbName, dbUser, dbPass, {
    dialect: "mysql",
    dialectOptions: {
      socketPath,
    },
  });
} else if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
