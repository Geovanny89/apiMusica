const { Sequelize } = require("sequelize");

const database = process.env.MYSQL_DATABASE;
const username = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASSWORD;
const host = process.env.MYSQL_HOST;

const sequelize = new Sequelize(
    database,
    username,
    password,
    {
        host:host, 
        dialect: "mysql",
        port:3306
    }
)
const dbConnectMysql = async () => {
    try {
        await sequelize.authenticate();
        console.log("**-** MYSQL Conexion Correcta **-**")
    } catch (error) {
        console.log('**_** Mysql error de conexion **_**', error)
    }
}

module.exports = { sequelize, dbConnectMysql }


