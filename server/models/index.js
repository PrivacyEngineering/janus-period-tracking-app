'use strict';

const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres://user:password@localhost:5432/period-tracking');
//const sequelize = new Sequelize('postgres://myadmin@dbpeng2:VjYK5YcGMswGU7FFd9hfy6kpYm8267XquSMSusaV@dbpeng2.postgres.database.azure.com:5432/postgres');

const models = {
  User: require("./user")(sequelize, Sequelize.DataTypes),
  Cycle: require("./cycle")(sequelize, Sequelize.DataTypes),
  Symptom: require("./symptom")(sequelize, Sequelize.DataTypes),
};

Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

//export default models;

module.exports = models;