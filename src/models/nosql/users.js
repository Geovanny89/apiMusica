const mongoose= require('mongoose')
const mongooseDelete = require('mongoose-delete')

const UserSchema= new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    age:{
        type:Number,
        require:true
    },
    email:{
        type:String,
        unique:true  //no perimte q los correos se repitan 
    },
    password:{
        type:String,
        select:false // para no token 
    },
    role:{
        type:["user","admin"],
        default:"user"
    },
    
},{timestamps:true, versionKey:false},
)
UserSchema.plugin(mongooseDelete,{overrideMethods: 'all'})// borrdo logico
module.exports= mongoose.model("users",UserSchema)