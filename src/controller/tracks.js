const {matchedData}= require('express-validator')
const {tracksModels} =require('../models');
const { handleHtppError } = require('../utils/handleError');
/*
*Obtener lista de la db 
*@param{*}res
*@param{*}res
*/
const getItems= async (req,res) =>{
    try {
        const user= req.user;
        const data =await tracksModels.find({});
        res.send({data, user})
        
    } catch (error) {
        handleHtppError(res,'ERROR_GET_ITEMS')
    }
}

/*
*Obtener un detalle
*@param{*}res
*@param{*}res
*/
const getItem= async(req,res) =>{
    try {
        req = matchedData(req)
        const {id}=req
        const data =await tracksModels.findById(id);
        res.send({data})
    } catch (error) {
        handleHtppError(res,'ERROR_GET_ITEM,')
    }
}

/*
*Insertar un registro
*@param{*}res
*@param{*}res
*/

const createItems= async(req,res) =>{
    try {
        const body = matchedData(req)
        const data=await tracksModels.create(body);
        res.send(data)
       
    } catch (error) {
        handleHtppError(res,'ERROR_CREATE_ITEMS')
    }
}
/*
*Actualizar un registo
*@param{*}res
*@param{*}res
*/
const updateItems= async(req,res) =>{
    try {
        const {id, ...body} = matchedData(req)
        const data=await tracksModels.findByIdAndUpdate(
            id,body
        );
        res.send(data)
       
    } catch (error) {
        handleHtppError(res,'ERROR_UPDATE_ITEMS')
    }
}
/*
*Eliminar un regitro 
*@param{*}res
*@param{*}res
*/
const deleteItems= async(req,res) =>{
    try {
        req = matchedData(req)
        const {id}=req
        const data =await tracksModels.delete({_id:id});
        res.send({data})
    } catch (error) {
        console.log(error)
        handleHtppError(res,'ERROR_DELETE_ITEM,')
    }
}

module.exports={getItems,getItem,createItems,updateItems,deleteItems}