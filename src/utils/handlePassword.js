const bcryptjs = require("bcryptjs")

// contraseña sin encriptar : hola001
const encrypt = async (passwordPlain) => {
    const hash = await bcryptjs.hash(passwordPlain, 10)
    return hash
}
// pasar contraseña sin encryptar y pasar contraseña encryptada
const compare = async (passwordPlain, hashPassword) => {
    return await bcryptjs.compare(passwordPlain, hashPassword)
}

module.exports = { encrypt, compare }