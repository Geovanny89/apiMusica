const express = require('express')
const fs = require('fs')
const {storageModels} =require('../models');
const { handleHtppError } = require('../utils/handleError');
const { matchedData } = require('express-validator');

const PUBLIC_URL=process.env.PUBLIC_URL;
const MEDIA_PATH = `${__dirname}/../storage`;  // me trae la direccion donde se encuentra guardado el item C:....

const getItems= async (req,res) =>{
    try {
        const data =await storageModels.find({});

        res.send(data)
        
    } catch (error) {
        handleHtppError(res,'ERROR')
    }
}

/*
*Obtener un detalle
*@param{*}res
*@param{*}res
*/
const getItem= async (req,res) =>{
    try {
        const {id}=matchedData(req)
        const data =await storageModels.findById(id);
        console.log(storageModels)
        res.send(data)
        
    } catch (error) {
        handleHtppError(res,'ERROR_DETAIL_ITEM')
    }
}

/*
*Insertar un registro
*@param{*}res
*@param{*}res
*/

const createItems= async(req,res) =>{
    try {
        const {body,file}=req
        
        const fileData={
            filename:file.filename,
            url:`${PUBLIC_URL}/${file.filename}`
        }
  
        const data=await storageModels.create(fileData);
        res.send(data)
    } catch (error) {
        console.log(error)
    }
}

/*
*Eliminar un regitro 
*@param{*}res
*@param{*}res
*/
const deleteItems= async(req,res) =>{
    try {
        const {id}=matchedData(req)
        const dataFile =await storageModels.findById(id);
        await storageModels.delete({_id:id})
        console.log(dataFile)
        const {filename}= dataFile;
        const filePath=`${MEDIA_PATH}/${filename}`
        fs.unlinkSync(filePath)
        const data = {
            filePath,
            delete:1
        }
        console.log('hola' +data)
        res.send(data)
    } catch (error) {
        handleHtppError(res,'ERROR_DELETE_ITEM')
    }
}

module.exports={getItems,getItem,createItems,deleteItems}