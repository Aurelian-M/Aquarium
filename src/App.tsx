import './App.css'
import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom'; 

export default function App() {
 const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      document.body.classList.add('bodyWelcome');
    } else {
      document.body.classList.remove('bodyWelcome');
    }
  }, [location.pathname]);
 
  return  <Outlet /> ;
  
}
