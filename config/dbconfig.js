require('dotenv').config({path: './config.env'})
module.exports = {
    HOST: process.env.MYSQL_URL,
    PORT: process.env.MYSQL_PORT,
    USER: process.env.MYSQL_USER,
    PASSWORD: process.env.MYSQL_PASSWORD,
    PORT : process.env.MYSQL_PORT,
    DB: process.env.MYSQL_DB,
    dialect: 'mysql',
    
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    }
}