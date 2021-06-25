'use strict';

const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres://user:password@localhost:5432/period-tracking');

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