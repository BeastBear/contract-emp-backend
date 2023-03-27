module.exports = (sequelize, DataTypes) => {
    const Contract = sequelize.define("contract", {
        number: {
            type: DataTypes.STRING,
            allowNull: false
        },
        start_date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        end_date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        company_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
    })

    return Contract
}