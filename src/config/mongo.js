const mongoose = require('mongoose');

const dbConnect = () => {
    const MONGO_URI= process.env.MONGO_URI;
    mongoose.connect(
        MONGO_URI,
        {
        useNewUrlParser:true,
        useUnifiedTopology:true
        },
    )
        .then(() => {
            console.log('***Conexion Exitosa***')
        })
        .catch((err) => {
            console.log('*** Error de Conexion***')
            console.error(err)
        })
    
}

module.exports = dbConnect