import React,{useState} from 'react'
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import './Login.css'
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

const service='http://localhost:8000'



function Signup() {
    const [email,setemail]=useState('')
    const [password,setpassword]=useState('')

    const handlelogin=async()=>{
        let obj={
            email:email,
            password:password
        }
        const response=await fetch(service+'/user/login',{
            method:'POST',
            headers:{
                'content-Type':'application/json'
            },
            body:JSON.stringify(obj)
        });
        const data=await response.json();
        console.log(data.token)
        if(data.token){
            localStorage.setItem('token',data.token)
        }
        else{
            window.alert(data.message)
        }


}

  return (
    <div className='card'>
      <Card sx={{width:'300px',height:'350px',display:'flex',justifyContent:'center',flexDirection:'column'}}>
        <Box align='center'>
        <Avatar><PersonOutlineIcon/></Avatar>
        <h2>Login in as user</h2>

        </Box>
        
        
      
      <Box align='center'>
    
      <TextField id="standard-basic" label="email" variant="standard" onChange={(e)=>setemail(e.target.value)} />
      <TextField id="standard-basic" label="password" variant="standard" onChange={(e)=>setpassword(e.target.value)}/>
    
      <br/>
      <br/>
      <Button variant="contained" onClick={handlelogin}>login</Button>
      <br/>
      <a href='/signup'>go to signin</a>
      <br/>
      <a href='/adminlogin'>admin login</a>
     
      </Box>
    
      

      </Card>
      
    </div>
  )
}

export default Signup
