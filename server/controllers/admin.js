import Admin from '../model/admin.js';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs';
import 'dotenv/config';

const secret=process.env.key;



export const adminSignup=async(req,res)=>{
    const {name,email,password,contact}=req.body;
    if (!name || !email || !password  || !contact) {
        return res.json({ message: 'All fields are required' });
      }
        
    const salt=await bcrypt.genSalt(10);
    const hashedpassword=await bcrypt.hash(password,salt);
    const document={
        name,
        email,
        password:hashedpassword,
        contact
    }
    try{
        const existUser= await Admin.findOne({email});
        if(existUser){
            res.json({message:'admin exists'})
            return
        }
        

        const obj=Admin(document);

        const saved=await obj.save();
        res.json({data:saved});
       


        

    }catch(error){
        console.log(error);

    }


}


export const adminLogin=async(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        res.json({message:'enter all details'})
    }
    const exist=await Admin.findOne({email:email})
    
    if(exist){
        let verify=await bcrypt.compare(password,exist.password);
       
        if(verify){
            let token=jwt.sign({email},secret);
            res.json({token});

        }else{
            res.json({message:'not a admin'})
            return
        }
       
        
    }else{
        res.json({message:'not a admin'})
    }
    

     
}
