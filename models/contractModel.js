module.exports = (sequelize, DataTypes) => {
    const Contract = sequelize.define("contract", {
        number: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        start_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        end_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        company_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
    })

    return Contract
}