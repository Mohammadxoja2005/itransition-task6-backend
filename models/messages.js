module.exports = (Sequelize, DataTypes) => {
    const messages = Sequelize.define("messages", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        body: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })

    messages.associate = ((models) => {
        messages.belongsTo(models.joiners, {
            onDelete: "cascade",
            foreignKey: "sender_id",
        }) 

        messages.belongsTo(models.joiners, {
            onDelete: "cascade",
            foreignKey: "receiver_id",
        })
    })

    return messages;
}