import React from 'react'
import { useState,useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { Button } from '@mui/material';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { useNavigate } from 'react-router-dom';

const service='http://localhost:8000'

function Adminpage() {
    const [users,setusers]=useState([]);
    const navigate=useNavigate();


    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(service + '/client/get', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            });

            const data = await response.json();
            setusers(data);
            console.log(data);
            console.log('1werfgb');
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, [users]);
      const handledelete=async (id)=>{
        const response = await fetch(service + '/client/delete/'+id, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          setusers((users)=>users.filter((user)=>user._id!=id))


    }
    const request=()=>{
      navigate('/requests')
    }
  return (
    <div>
        <Button variant="contained" sx={{width:'100px',backgroundColor:'#F13C20', float:'right',marginRight:"20px",marginTop:'20px','&:hover': {
          backgroundColor: 'red',
        },}} onClick={request}>Requests</Button>
        <Grid container  my={12} spacing={2}>
            {
                users.map((user)=>{
                    return(
                        <Grid item xs={2}>
                            <Card sx={{display:'flex',justifyContent:'center',backgroundColor:'#C5CBE3'}}>
                            <Box sx={{width:'100%'}}>
                                <button onClick={()=>handledelete(user._id)}>  <DeleteForeverOutlinedIcon sx={{float:'right',marginRight:'2px'}}  /> 
                                 </button>
                           
                                <p>Name:{user.name}</p>
                                <p>Email:{user.email}</p>
                                <p>Contact:{user.contact}</p>
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

export default Adminpage;
