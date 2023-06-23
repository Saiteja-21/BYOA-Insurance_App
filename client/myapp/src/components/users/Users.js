import React, { useEffect, useState } from 'react'
const service='http://localhost:8000'
function Users() {
    const [users,setusers]=useState([]);
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
      }, []);
  return (
    <div>
        {
            users.map((user)=>{
                return(
                <div>
                    <p>name:{user.name}</p>
                    <p>email:{user.email}</p>
                    <p>address:{user.address}</p>

                </div>
                )
            })
        }
      
    </div>
  )
}

export default Users
