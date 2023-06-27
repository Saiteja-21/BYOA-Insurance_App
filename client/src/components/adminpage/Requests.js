
import React from 'react'
import { useState,useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { Button } from '@mui/material';
import Navbar from '../navbar/Navbar.js';


const service='https://insurance-app-1rvb.onrender.com'


function Requests() {
    const [users,setusers]=useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(service + '/requests/get', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            });

            const data = await response.json();
            setusers(data);
            console.log(data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, [users]);

      const handlerequest=async(id,email,bill,amount)=>{

        const obj={
          email:email,
          bill:bill,
          amount:amount
        }
        console.log(obj)
        const response2=await fetch(service+'/client/updaterequest/',{
          method:'PUT',
          headers:{
            'content-Type':'application/json'
          },
          body:JSON.stringify(obj)

        });
        const data=response2.json();
        if(data){
          const response3=await fetch(service+'/requests/delete/'+id,{
            method:'DELETE',
            headers:{
              'content-Type':'application/json'
            },
          
  
          });
          const data3=response3.json();
          setusers((users)=>users.filter((user)=>user._id!=data3._id))
          
        }

      }

    
  return (
    <div>
      <Navbar/>
         
        <Grid container  my={2} spacing={2}>
            {
                users.map((user)=>{
                    return(
                        <Grid item xs={3}>
                            <Card sx={{display:'flex',justifyContent:'center',backgroundColor:'#C5CBE3',width:'300px'}}>
                           
                            <Box sx={{width:'100%',marginLeft:'8px'}}>
                            <p style={{color:'green',fontWeight:'bold',fontSize:'30px'}}>Request From {user.admitted_in}</p>
                                
                              
                                <p>Name:{user.name}</p>
                                <p>Email:{user.email}</p>
                                <p>Addess:{user.address}</p>
                                <p>Contact:{user.contact}</p>
                                <p>Amount:{user.amount}</p>
                                <p>Admitted in :{user.admitted_in}</p>
                                <p>Bill:{user.bill}</p>
                                <Button variant="contained" sx={{width:'100px',backgroundColor:'#F13C20',marginLeft:'60px','&:hover': {
          backgroundColor: 'red',
        },}} onClick={()=>handlerequest(user._id,user.email,user.bill,user.amount)}>grant</Button>
                            </Box>
                            

                            </Card>
                           
                     </Grid>
                    )
                })
            }
        </Grid>
      
    </div>
  )
}

export default Requests
