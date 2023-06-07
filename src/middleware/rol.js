const { handleHtppError } = require("../utils/handleError");

const checkRol = (roles)=> (req,res,next) =>{
    try {
        const {user} = req;
        console.log({user})
        const rolesByUser = user.role;

        const checkValueRol= roles.some((rolSingle) => rolesByUser.includes(rolSingle)) // devuelve true o false
        if(!checkValueRol){
            handleHtppError(res,'USER_NOT_PERMIS',403)
            return
        }
        next();
        
    } catch (error) {
        handleHtppError(res,'ERROR')
    }
}
module.exports= checkRol