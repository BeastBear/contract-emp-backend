const dbconfig = require('../config/dbconfig.js')

const {Sequelize, DataTypes} = require('sequelize')

const sequelize = new Sequelize(
    dbconfig.DB,
    dbconfig.USER,
    dbconfig.PASSWORD, {
        host: dbconfig.HOST,
        port: dbconfig.PORT,
        dialect: dbconfig.dialect,
        operatorAliases: false,

        pool: {
            max: dbconfig.pool.max,
            min: dbconfig.pool.min,
            acquire: dbconfig.pool.acquire,
            idle: dbconfig.pool.idle
        }
    }
        
)

sequelize.authenticate()
.then(() => {
    console.log('connected...')
})
.catch(err => {
    console.log('Error' + err)
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.archive = require('./archiveModel')(sequelize, DataTypes)
db.company = require('./companyModel')(sequelize, DataTypes)
db.contract = require('./contractModel')(sequelize, DataTypes)
db.employee = require('./employeeModel')(sequelize, DataTypes)
db.user = require('./userModel')(sequelize, DataTypes)

db.company.hasMany(db.contract, { foreignKey: "company_id", as:"contract" })
db.contract.belongsTo(db.company, {foreignKey: "company_id", as: "company"})
db.company.hasMany(db.user, {foreignKey: "company_id", as:"users" })
db.user.belongsTo(db.company, {foreignKey: "company_id", as:"company" })

db.employee.belongsToMany(db.contract, { through: db.archive, foreignKey: 'employee_id' });
db.contract.belongsToMany(db.employee, { through: db.archive, foreignKey: 'contract_id' });
db.archive.belongsTo(db.employee, { foreignKey: 'employee_id' });
db.archive.belongsTo(db.contract, { foreignKey: 'contract_id' });


db.sequelize.sync({force: false})
.then(() => {
    console.log('yes re-sync done!')
})

module.exports = db