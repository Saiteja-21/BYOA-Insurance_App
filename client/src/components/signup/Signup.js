import React, { useState } from 'react'
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import './Signup.css'
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import LockIcon from '@mui/icons-material/Lock';
import Radio from '@mui/material/Radio';
import Login from '../login/Login.js'
import { useNavigate } from 'react-router-dom';
import signupimage from '../images/undraw_authentication.svg'


const service='http://localhost:8000'
function Signup() {
  const [selectedValue, setSelectedValue] = React.useState('a');
  const [admin,setadmin]=useState(true);
  const [name,setname]=useState('');
  const [email,setemail]=useState('');
  const [password,setpassword]=useState('');
  const [hospital,sethospital]=useState('');
  const [contact,setcontact]=useState('');
  const [securitycode,setsecuritycode]=useState('');


  const navigate=useNavigate();

  const handlesignup=async()=>{
    console.log(admin)
    if(admin){
      if(securitycode=='marvel'){
        var endpoint='/admin/signup';
        var obj={
          name:name,
          email:email,
          password:password,
          contact:contact
        }
      }
        else{
          window.alert('error');
        }

      
    
    }
    else{
      var endpoint='/user/signup';
        var obj={
          name:name,
          email:email,
          password:password,
          hospitalName:hospital,
          contact:contact
        }

    }
    let response=await fetch(service+endpoint,{
      method:'POST',
      headers:{
        'content-Type':'application/json'
      },
      body:JSON.stringify(obj)

    });
    const response2=await response.json();
    console.log(response2.data);
    console.log(response2.message)
    if(response2.data){
      console.log('in response')
      if(admin){
        navigate('/adminlogin');
      }
      else{
        console.log('in resonsesdf')
        navigate('/');
      }

    }
    else{
      window.alert(response2.message)
    }
    
    
  }
 

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const controlProps = (item) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: 'color-radio-button-demo',
    inputProps: { 'aria-label': item },
  });
  return (
    <div className='card'>
      <Card sx={{width:'800px',height:'600px',display:'flex',justifyContent:'space-around' }}>
        <Box sx={{width:'50%',backgroundColor:'#EFE2BA',margin:'15px 15px 15px 15px',borderRadius:'8px' ,display:'flex',justifyContent:'center'}}>
         <img src={signupimage} alt='no'/>
         

        </Box>
        <Box sx={{height:'600px',display:'flex',justifyContent:'center',flexDirection:'column',width:'50%'}}>
        <Box align='center'>
        <Avatar sx={{backgroundColor:'#4056A1'}}><LockIcon /></Avatar>
        <h2>Sign in</h2>

        </Box>
        
        
      
      <Box align='center'>
      <Radio {...controlProps('a')} sx={{ '& .MuiSvgIcon-root': { color: '#F13C20' } }} size="small" onClick={(e)=>setadmin(true)} />
      admin
      <Radio {...controlProps('b')}  sx={{ '& .MuiSvgIcon-root': { color: '#F13C20' } }} size="small" onClick={(e)=>setadmin(false)} />
      user
      <br/> 
      {
        admin&& <TextField id="standard-basic" label="security code" variant="standard"  onChange={(e)=>setsecuritycode(e.target.value)}/>
      }
      <br/>
      <br/>
      
      <TextField id="standard-basic" label="name" variant="standard"  onChange={(e)=>setname(e.target.value)}/>
      <br/>
      <br/>
      <TextField id="standard-basic" label="email" variant="standard" onChange={(e)=>setemail(e.target.value)} />
      <br/>
      <br/>
      <TextField id="standard-basic" label="password" variant="standard"  onChange={(e)=>setpassword(e.target.value)}/>
      {
        !admin&&  <TextField id="standard-basic" label="hospital name" variant="standard" onChange={(e)=>sethospital(e.target.value)} />
      

      }
      <br/>
      <br/>
      <TextField id="standard-basic" label="contact" variant="standard"  onChange={(e)=>setcontact(e.target.value)}/>
      <br/>
      <br/>
      <Button variant="contained" sx={{width:'300px',backgroundColor:'#F13C20','&:hover': {
          backgroundColor: 'red',
        },}} onClick={handlesignup}>signup</Button>
     
      </Box>
      
     

      </Box>
    
     
     
      

      </Card>
     
      
    </div>
  )
}

export default Signup
