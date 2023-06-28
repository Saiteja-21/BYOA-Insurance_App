import React, { useEffect, useState } from 'react'
import  useNavigateNavigate, { useNavigate }  from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import './Users.css'
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

const service='https://insurance-app-1rvb.onrender.com'
const token=localStorage.getItem('token')

function Users() {
    const [users,setusers]=useState([]);
    const [user2,setuser2]=useState();
    const [updateduser,setupdateduser]=useState({});
    const [amount,setamount]=useState();
    const [search,setsearch]=useState('')
    
    const navigate=useNavigate()


    const handlelogout=()=>{
      localStorage.clear();
      navigate('/')
    }
    const dialog=()=>{

    }
    useEffect(() => {
      console.log('in useeffect')
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
      const [open, setOpen] = React.useState(false);
      const [fullWidth, setFullWidth] = React.useState(true);
      const [maxWidth, setMaxWidth] = React.useState('sm');
    
      const handleClickOpen = async(user) => {
        setuser2(user)
        setOpen(true);
        
       
      
       
      } 
        
      
    
      const handleClose = () => {
        setOpen(false);
      };
    
      const handleMaxWidthChange = (event) => {
        setMaxWidth(
          // @ts-expect-error autofill of arbitrary value is not handled.
          event.target.value,
        );
      };
    
      const handleFullWidthChange = (event) => {
        setFullWidth(event.target.checked);
      };
     
    const request=async(id)=>{ 
      const hospitalstored=localStorage.getItem('hospital')
      const a={hospital:hospitalstored};
      console.log(a)
      console.log('in request')
      const response2 = await fetch(service + '/client/update/'+id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(a)
      });

      const data2 = await response2.json();
      console.log(data2)
      
      const newclient={...data2,bill:amount}
      if(data2){
        const response3 = await fetch(service + '/requests/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body:JSON.stringify(newclient)
        });
  
        const data3 = await response3.json();

      }
      

    }
    const filtered=users.filter((element)=>element.name.includes(search));
 

  return (
    <div style={{display:'flex',flexDirection:'column'}}>
      <Box>
      <Button variant="contained" sx={{width:'100px', float:'right',marginRight:"20px",marginTop:'20px','&:hover': {
          backgroundColor: 'red',
        },}} onClick={handlelogout}><span>Logout</span></Button>

      </Box>
  
        <Box sx={{display:'flex',justifyContent:'center'}}>
        <input type='text' style={{width:'80%',height:'30px'}} className='search-input' placeholder='search user' onChange={(e)=>setsearch(e.target.value)}/>


        </Box>


      {
      token?
 <Grid container my={12} spacing={2} >

        {
         
         
            filtered.map((user)=>{
                return(
                  <Grid item xs={12} sm={6} md={4} lg={3} key={user.id}>
                     <Card
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  backgroundColor: '#C5CBE3',
                  cursor: 'pointer',
                  width: '100%',
                  '@media (min-width: 600px)': {
                    width: '80%',
                  },
                  '@media (min-width: 960px)': {
                    width: '70%',
                  },
                  '@media (min-width: 1280px)': {
                    width: '90%',
                  },
                }}
                
              >
                      <Box >
                      <p>Name: {user.name}</p>
                      <p>Email: {user.email}</p>
                      <Button variant="outlined" sx={{width:'200px',height:'30px',backgroundColor:'#F13C20','&:hover': {
          backgroundColor: 'red',
        },}} onClick={()=>handleClickOpen(user)} >
         more details
      </Button>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Details</DialogTitle>
        <DialogContent sx={{display:'flex',justifyContent:'space-around'}}>
          <Box sx={{width:'50%'}}>

          
          {user2 && (<Box>
            <p>Name:{user2.name}</p>
          <p>Email:  {user2.email}</p>
          <p>Contact: {user2.contact}</p>
          <p>Address: {user2.address}</p>
          <p>Amount: {user2.amount}</p>
          <p>Admitted In: {user2.admitted_in}</p>
          <p>Request Granted: {user2.request_granted.toString()}</p>
         
            </Box>)
          }
          </Box>
          <Box sx={{width:'50%'}}>
          <TextField id="standard-basic" label="Enter amount" variant="standard" onChange={(e)=>setamount(e.target.value)} />
          <Button variant="contained" sx={{width:'100px',backgroundColor:'#F13C20', float:'right',marginRight:"20px",marginTop:'20px','&:hover': {
          backgroundColor: 'red',
        },}} onClick={()=>request(user2._id)}>Request</Button>
            

          </Box>
         
          {/* <Box
            noValidate
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              m: 'auto',
              width: 'fit-content',
            }}
          >
            <FormControl sx={{ mt: 2, minWidth: 120 }}>
              <InputLabel htmlFor="max-width">maxWidth</InputLabel>
              <Select
                autoFocus
                value={maxWidth}
                onChange={handleMaxWidthChange}
                label="maxWidth"
                inputProps={{
                  name: 'max-width',
                  id: 'max-width',
                }}
              >
                <MenuItem value={false}>false</MenuItem>
                <MenuItem value="xs">xs</MenuItem>
                <MenuItem value="sm">sm</MenuItem>
                <MenuItem value="md">md</MenuItem>
                <MenuItem value="lg">lg</MenuItem>
                <MenuItem value="xl">xl</MenuItem>
              </Select>
            </FormControl>
            <FormControlLabel
              sx={{ mt: 1 }}
              control={
                <Switch checked={fullWidth} onChange={handleFullWidthChange} />
              }
              label="Full width"
            />
          </Box> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>

                      </Box>
                     
                    </Card>


                    </Grid>
                )
                
            })
            
        }
          </Grid>:<p>Register to see the content</p>}
    
    </div>
  )
      }

export default Users
