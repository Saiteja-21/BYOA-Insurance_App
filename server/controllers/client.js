import User from '../model/clients.js';
import jwt from 'jsonwebtoken'
import 'dotenv/config';

const secret=process.env

export const addClient=async(req,res)=>{
    console.log('1')
    const {name,email,password,address,contact,amount,request_granted,admitted_in}=req.body;

    try{
        const document={
            name,
            email,
            password,
            address,
            contact,
            amount,
            request_granted,
            admitted_in
        };
        
        const obj=User(document);
        
        const savedDocument=await obj.save();
        res.json(savedDocument)
        
        
        
        

    }catch(error){
        console.log(error);  

    }




}

export const getclients=async(req,res)=>{
    const data=await User.find();
    res.json(data);

}
export const getByid=async(req,res)=>{
    console.log('in id')
    const id=req.params.id;
    const data=await User.findOne({_id:id});
    console.Consolelog(data.request_granted)
    res.json({data});

}

export const updateclient=async(req,res)=>{
    const id=req.params.id;
    let hospital=req.body.hospital;
    const data=await User.findOneAndUpdate({_id:id},{admitted_in:hospital},{new:true})
    console.log(data)
    res.json(data);

}

export const deleteclient=async(req,res)=>{
    const id=req.params.id;
  
  const data=await User.deleteOne({_id:id});
  console.log(data)
    
    res.json(data);

}
export const updateclient2=async(req,res)=>{
    console.log('5678')
   const email=req.body.email
    const bill=req.body.bill;
    let amount=req.body.amount;
    const data=await User.findOneAndUpdate({email:email},{amount:amount-bill,request_granted:true},{new:true})
    console.log(data)
    res.json(data);

}