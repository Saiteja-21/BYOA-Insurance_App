import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Signup from './components/signup/Signup.js';
import Login from './components/login/Login.js';
import Adminlogin from './components/adminLogin/Adminlogin.js';
import users from './components/users/Users.js'
import Adminpage from './components/adminpage/Adminpage';
import Requests from './components/adminpage/Requests';


function App() {
  
  
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/BYOA-Insurance_App/' Component={Login}/>
    <Route path='/BYOA-Insurance_App/adminlogin' Component={Adminlogin}/>
    <Route path='/BYOA-Insurance_App/signup' Component={Signup}/>
     <Route path='/BYOA-Insurance_App/users' Component={users}/>
    <Route path='/BYOA-Insurance_App/adminpage' Component={Adminpage}/>
    <Route path='/BYOA-Insurance_App/requests' Component={Requests}/>
    
   
      
    </Routes>
   

    
    </BrowserRouter>
    
  );
}

export default App;
