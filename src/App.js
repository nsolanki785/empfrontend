import logo from './logo.svg';
import { useEffect, useState ,useContext} from 'react';
import './App.css';
import { Route,Routes,BrowserRouter } from 'react-router-dom';
import LoginPage from './pages/login';
import Dashboard from './pages/dashboard';
import SignUpPage from './pages/signup';
import { AthentificationToken, auth } from './utils/config';
import ProtectedRoute from './Routes/protectecRoute';
import NonProtectedRoute from './Routes/nonProtectedroute';
import {setHeader} from './api/common';
import EmployeeList from './pages/employee';

import Athentification from './contexts/authentificationContext';
import AdminList from './pages/admin';
import ManagerList from './pages/manager';




function App() {
    const {authtoken,setToken} = useContext(AthentificationToken);  
    console.log("dsd",authtoken);

  
  useEffect(()=>{
    setHeader(auth)
},[auth])


  return (
     <BrowserRouter>
    <Routes>
      <Route path='/' element={
        <NonProtectedRoute auth={authtoken}>
         <LoginPage/>
      </NonProtectedRoute>
      }/>  

      <Route path="/dashboard" element={
        <ProtectedRoute auth={authtoken}>
          <Dashboard/>
        </ProtectedRoute>
      } />

      <Route path="/admin" element={
          <ProtectedRoute auth={authtoken}>
           <AdminList/>
          </ProtectedRoute>
         }
      />

      <Route path="/manager" element={
          <ProtectedRoute auth={authtoken}>
           <ManagerList/>
          </ProtectedRoute>
         }
      />

     <Route path="/employee" element={
          <ProtectedRoute auth={authtoken}>
           <EmployeeList/>
          </ProtectedRoute>
         }
      />
      
      <Route path='/signup' element={<SignUpPage/>} />
    </Routes>
 </BrowserRouter>


  );
}

export default App;