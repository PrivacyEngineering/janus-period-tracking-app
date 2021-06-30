module.exports = (sequalize, DataTypes) => {
    const User = sequalize.define("user", {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        username: {
            allowNull: false,
            type: DataTypes.STRING
        },
        firstName: {
            allowNull: true,
            type: DataTypes.STRING
        },
        lastName: {
            allowNull: true,
            type: DataTypes.STRING
        },
        email: {
            allowNull: true,
            type: DataTypes.STRING
        },
        passwordHash: {
            allowNull: true,
            type: DataTypes.STRING
        },
        role: {
            allowNull: true,
            type: DataTypes.STRING
        },
        age: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        contraceptive: {
            allowNull: true,
            type: DataTypes.STRING
        }        
    });

    return User;
}