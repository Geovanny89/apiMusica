const mongoose= require('mongoose')
const mongooseDelete = require('mongoose-delete')

const StorageSchema= new mongoose.Schema({
    url:{
        type:String,
        require:true
    },
    filename:{
        type:String,
        require:true
    },
    
    
},{timestamps:true, versionKey:false},

)
StorageSchema.plugin(mongooseDelete,{overrideMethods: 'all'})
module.exports= mongoose.model("storage",StorageSchema)