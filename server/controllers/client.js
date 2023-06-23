import User from '../model/clients.js';

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