require('dotenv').config()
const express = require('express')
const cors = require('cors')
const dbConnectNosql = require('./src/config/mongo')
const { dbConnectMysql } = require('./src/config/mysql')
const morganBody = require('morgan-body')

const ENGINE_DB=process.env.ENGINE_DB

const loggerStream = require('./src/utils/handleLoger')
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static("storage"))


morganBody(app, {
    noColors: true,
    stream: loggerStream,
    skip: function (req, res) {
        return res.statusCode < 400
    }

})


const port = process.env.PORT || 3000;



/*
*Aqui invoco las rutas
*/
app.use("/api", require("./src/routes"))


app.listen(port, () => {
    console.log(`Escuchando Servidor: ${port}`)

});
// (ENGINE_DB ==='nosql') ? dbConnectNosql(): dbConnectMysql();

dbConnectNosql()