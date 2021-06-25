module.exports = (sequalize, DataTypes) => {
    const User = sequalize.define("user", {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        firstName: {
            allowNull: false,
            type: DataTypes.STRING
        },
        email: {
            allowNull: false,
            type: DataTypes.STRING
        },
        passwordHash: {
            allowNull: false,
            type: DataTypes.STRING
        },
        role: {
            allowNull: false,
            type: DataTypes.STRING
        },
        age: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        contraceptive: {
            allowNull: false,
            type: DataTypes.STRING
        }        
    });

    return User;
}