import mongoose, { mongo } from "mongoose";

const RequestSchema=mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    contact:{
        type:Number,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    request_granted:{
        type:Boolean,
        default:'false'
    },
    admitted_in:{
        type:String,
        default:'none'
    },
    bill:{
        type:Number
    }    

})

export default mongoose.model('requests',RequestSchema)