module.exports = (sequelize, DataTypes) => {
    const Archive = sequelize.define("archive", {
        employee_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        contract_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        department1: {
            type: DataTypes.STRING,
            allowNull: true
        },
        department2: {
            type: DataTypes.STRING,
            allowNull: true
        },
        department3: {
            type: DataTypes.STRING,
            allowNull: true
        },
        remark: {
            type: DataTypes.STRING,
            allowNull: true
        },
    })

    return Archive
}