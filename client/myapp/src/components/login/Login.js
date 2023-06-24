import React,{useState} from 'react'
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import './Login.css'
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useNavigate } from 'react-router-dom';
import loginimage from '../images/undraw_login.svg'

const service='http://localhost:8000'



function Signup() {
    const [email,setemail]=useState('')
    const [password,setpassword]=useState('')
    const navigate=useNavigate()

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
            localStorage.setItem('token',data.token);
            localStorage.setItem('hospital',data.hospital)
            navigate('/users')
        }
        else{
            window.alert(data.message)
        }


}

  return (
    <div className='card'>
      

     
      <Card sx={{width:'800px',height:'600px',display:'flex',justifyContent:'center'}}>
        <Box sx={{width:'50%',backgroundColor:'#EFE2BA',margin:'15px 15px 15px 15px',borderRadius:'8px' ,display:'flex',justifyContent:'center'}}>
        <img src={loginimage} alt='no'/>
        </Box>
        <Box  sx={{height:'600px',display:'flex',justifyContent:'center',flexDirection:'column',width:'50%'}}>
        <Box align='center'>
        <Avatar sx={{backgroundColor:'#4056A1'}}><PersonOutlineIcon/></Avatar>
        <h2>Login in as user</h2>

        </Box>
        
        
      
      <Box align='center'>
    
      <TextField id="standard-basic" label="email" variant="standard" onChange={(e)=>setemail(e.target.value)} />
      <br/>
      <br/>
      <TextField id="standard-basic" label="password" variant="standard" onChange={(e)=>setpassword(e.target.value)}/>
    
      <br/>
      <br/>
      <br/>
      <Button variant="contained" sx={{width:'300px',backgroundColor:'#F13C20','&:hover': {
          backgroundColor: 'red',
        },}} onClick={handlelogin}>Login</Button>

</Box>
        <Box align='center'>
       <p>Don't have an account?<a href='/signup'>Signup</a></p>
       <p><a href='/adminlogin'>Admin</a></p>

        </Box>
     
     
      
    
      </Box>

      </Card>
     
      
    </div>
  )
}

export default Signup
