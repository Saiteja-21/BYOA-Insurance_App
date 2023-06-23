import mongoose from "mongoose";

const UserSchema=mongoose.Schema({
    name:{
        type:String,
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
    hospitalName:{
        type:String,
        required:true
    },
    contact:{
        type:Number,
        required:true
    }

});

export default mongoose.model('users',UserSchema);