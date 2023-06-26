import express from 'express';
import 'dotenv/config';
import db from './config/db.js'
import cors from 'cors';

const app =express();
app.use(cors())
app.use(express.json());
let port=process.env.port;

db.once('open',()=>{
    console.log('connected')
})
import clientRoute from './routes/client.js'
import adminRoute from './routes/admin.js';
import userRoute from './routes/user.js';
import requestRoute from './routes/requests.js'

// app.get('/',(req,res)=>{
//     res.redirect(https://6499c09150d99d0b7385c54d--aesthetic-speculoos-a7a07d.netlify.app/)
// })
app.use('/client',clientRoute);
app.use('/admin',adminRoute);
app.use('/user',userRoute);
app.use('/requests',requestRoute)

app.listen(port,()=>{
    console.log('server started at 8000')
})

