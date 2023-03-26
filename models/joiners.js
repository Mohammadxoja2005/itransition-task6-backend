module.exports = (Sequelize, DataTypes) => {
    const joiners = Sequelize.define("joiners", {
        name: {
           type: DataTypes.STRING,
           allowNull: false, 
        }
    })  

    joiners.associate = ((models) => {
        joiners.hasMany(models.messages, {
            onDelete: "cascade",
            foreignKey: "sender_id",
        }) 
        
        joiners.hasOne(models.messages, {
            onDelete: "cascade",
            foreignKey: "receiver_id",
        })
    })

    return joiners;
}