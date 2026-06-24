import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate, useLocation } from 'react-router';
import Home from './page/home';
import Dashboard from './page/Dashboard';
import Itam from './pate/Sidebar';
import Code from './pate/login';
import Education from './page/Education'
import StepGoogle from './copnat/google/stepgoogle';
import Chatbut from './page/chatbut';
const App = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');
  const user = localStorage.getItem("userData");

  useEffect(() => {
    if (!token || !user) {
      navigate('/login');
    }
  }, [token, user, navigate]);


  const showSidebar = user && token && location.pathname !== '/login';

  return (
    <div className="bg-[#FDFBF7] font-sans text-gray-800 flex min-h-screen">
      {showSidebar && <Itam />}
      <div className="flex-1 w-full">
        <Routes>
          <Route path="/" element={<Navigate to={token && user ? '/about' : '/login'} replace />} />
          <Route path="/Dashboard/Clinicalhistory" element={<Dashboard />} >
            <Route path="/Dashboard/Clinicalhistory" element={<StepGoogle />} />
          </Route>
          <Route path='/Chatbut' element={<Chatbut/>} />
          <Route path="/about" element={<Home />} />
          <Route path="/login" element={<Code />} />
          <Route path="/book" element={<Education />} />
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </div>


    </div>
  );
}

export default App;
