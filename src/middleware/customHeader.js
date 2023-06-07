const customHeader = (req, res, next )=> {
    try {
        
    } catch (error) {
        res.status(403)
        res.send({error:"Algo ocurrio "})
    }
}

module.exports = customHeader