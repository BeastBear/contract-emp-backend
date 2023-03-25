module.exports = (sequelize, DataTypes) => {
    const Employee = sequelize.define("employee", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        surname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        number: {
            type: DataTypes.STRING,
            allowNull: true
        },
        telephone: {
            type: DataTypes.STRING,
            allowNull: true
        },
        note: {
            type: DataTypes.STRING,
            allowNull: true
        },
        createby: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    })

    return Employee
}