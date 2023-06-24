import User from '../model/user.js'
import bcrypt from 'bcryptjs';

import jwt from 'jsonwebtoken'
import 'dotenv/config';

const secret=process.env.key;



export const userSignup=async(req,res)=>{
    const {name,email,password,hospitalName,contact}=req.body;
    if (!name || !email || !password || !hospitalName || !contact) {
        return res.json({ message: 'All fields are required' });
      }
    const salt=await bcrypt.genSalt(10);
    const hashedpassword=await bcrypt.hash(password,salt);
    const document={
        name,
        email,
        password:hashedpassword,
        hospitalName,
        contact
    }
    try{
        const existUser= await User.findOne({email});
        if(existUser){
            res.json({message:'user exists'})
            return
        }

        const obj=User(document);

        const saved=await obj.save();
        res.json({data:saved})
       


        

    }catch(error){
        console.log(error);

    }


}


export const userLogin=async(req,res)=>{
    const {email,password}=req.body;
    const exist=await User.findOne({email:email})
    if(exist){
        let verify=await bcrypt.compare(password,exist.password);
        if(verify){
            let token=jwt.sign({email},secret);
            res.json({token,hospital:exist.hospitalName});
            return

        }
        else{
            res.json({message:'not a user'})
        }
       
        
    }else{
        res.json({message:'not a user'})
    }
    

     
}

