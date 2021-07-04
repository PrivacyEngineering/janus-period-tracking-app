module.exports = (sequalize, DataTypes) => {
    const Cycle = sequalize.define("cycle", {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        start: {
            allowNull: false,
            type: DataTypes.DATE
        },
        end: {
            allowNull: false,
            type: DataTypes.DATE
        },
    });

    Cycle.associate = (models) => {
        Cycle.belongsTo(models.User, {
            foreignKey: 'userId'
        })
    }

    return Cycle;
}