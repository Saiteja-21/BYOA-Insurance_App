import Request from '../model/requests.js';

export const addRequest=async(req,res)=>{
    console.log('requests')
    const {name,email,password,address,contact,amount,request_granted,admitted_in,bill}=req.body;

    try{
        const document={
            name,
            email,
            password,
            address,
            contact,
            amount,
            request_granted,
            admitted_in,
            bill
        };
        
        const obj=Request(document);
        
        const savedDocument=await obj.save();
        console.log(savedDocument)
        res.json(savedDocument)
        
        
        
        

    }catch(error){
        console.log(error);  

    }


    

}


export const getrequests=async(req,res)=>{
    const requests=await Request.find();
    res.send(requests)

}

export const deleterequest=async(req,res)=>{
    let id=req.params.id;
    const data=await Request.deleteOne({_id:id});
    res.send(data)
    

}