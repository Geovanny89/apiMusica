const express = require('express')
const router = express.Router();
const uploadMiddleware = require('../utils/handleStorage')
const {createItems, getItems,getItem,deleteItems} = require('../controller/storage')
const {validatorGetItem}= require('../validators/storage')



// lista item
router.get('/',getItems)
// obtenr por id 
router.get('/:id',validatorGetItem,getItem)

// eliminar item
router.delete('/:id',validatorGetItem,deleteItems)
// crear item 
router.post('/',uploadMiddleware.single("myfile"),createItems)
module.exports = router;

