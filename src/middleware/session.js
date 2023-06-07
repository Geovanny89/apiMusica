const { userModels } = require("../models");
const { handleHtppError } = require("../utils/handleError");
const { verifyToken } = require("../utils/handleJwt");

const authMiddleware =async(req,res,next) => {
    try {
        if(!req.headers.authorization){m 
            handleHtppError(res,'NOT_TOKEN',401)
            return
        } 

        const token = req.headers.authorization.split(' ').pop();
        const dataToken = verifyToken(token);
        if(!dataToken._id){
            handleHtppError(res,'ID_TOKEN',401)
            return
        }
        const user = await userModels.findById(dataToken._id)
        req.user=user
        next()
    } catch (error) {
     handleHtppError(res,'ERROR_NOT_SESSION',401)
    }

}

module.exports = authMiddleware