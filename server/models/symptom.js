module.exports = (sequalize, DataTypes) => {
    const Symptom = sequalize.define("symptom", {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        date: {
            allowNull: false,
            type: DataTypes.DATE
        },
        symptom: {
            allowNull: false,
            type: DataTypes.STRING
        },
    });

    Symptom.associate = (models) => {
        Symptom.belongsTo(models.User, {
            foreignKey: {
                name: "userId",
            }
        })
    }

    return Symptom;
}