module.exports = (sequalize, DataTypes) => {
  const LocalAuth = sequalize.define('local_auth', {
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: DataTypes.STRING,
  });

  LocalAuth.associate = (models) => {
    LocalAuth.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return LocalAuth;
};