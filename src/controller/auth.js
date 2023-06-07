const { matchedData } = require('express-validator')
const { encrypt, compare } = require('../utils/handlePassword')
const { tokenSign } = require('../utils/handleJwt')
const { userModels } = require('../models')
const { handleHtppError } = require('../utils/handleError')


// este controlador es el encargado de registrar el usuario 
const registerCtrl = async (req, res) => {
    try {
        req = matchedData(req)
        const password = await encrypt(req.password)
        const body = { ...req, password }
        const dataUser = await userModels.create(body)
        dataUser.set("password", undefined, { strict: false }) // con esta linea no mostramos la info del token

        const data = {
            token: await tokenSign(dataUser),
            user: dataUser
        }
        res.send({ data })
    } catch (error) {
        handleHtppError(res, 'ERROR_REGISTER_USER')
    }
}

// este controlador es el encargado de logear a una persona
const loginCtrl = async (req, res) => {
    try {
        req = matchedData(req)
        const user = await userModels.findOne({ email: req.email }).select('password name role email')
        if (!user) {
            handleHtppError(res, 'USER_NOT_EXISTS', 404)
            return
        }
        const hasPassword = user.password;

        const check = await compare(req.password, hasPassword)
        if (!check) {
            handleHtppError(res, 'PASSWORD_INVALID', 401)
            return
        }
        user.set('password', undefined, { strict: false })
        const data = {
            token: await tokenSign(user),
            user
        }
        res.send({ data })

    } catch (error) {

        handleHtppError(res, 'ERROR_LOGIN_USER')
    }
}

module.exports = { registerCtrl, loginCtrl }