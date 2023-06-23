import mongoose from "mongoose";
import 'dotenv/config'


const CS=process.env.CONNECTION;

mongoose.connect(CS)
.then(()=>{
    console.log('connected to mongodb')
})
.catch((error)=>{
    console.log(error)
})

export default mongoose.connection;