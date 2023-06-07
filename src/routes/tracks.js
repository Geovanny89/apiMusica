const express=require('express');
const router =express.Router();
const {validatorCreateItem,validatorGetItem} = require('../validators/tracks')
const authMiddleware = require('../middleware/session')
const { getItems, createItems, getItem, updateItems, deleteItems } = require('../controller/tracks');
const checkRol = require('../middleware/rol');

router.get('/',authMiddleware,getItems)
router.get('/:id',authMiddleware,validatorGetItem,getItem)
router.post('/',authMiddleware,checkRol(["admin"]),validatorCreateItem,createItems)
router.put('/:id',authMiddleware,validatorGetItem,validatorCreateItem,updateItems)
router.delete('/:id',validatorGetItem,deleteItems)

module.exports=router 