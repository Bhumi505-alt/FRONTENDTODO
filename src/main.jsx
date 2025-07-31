import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import './index.css'
import { createContext } from 'react'


 export const Context = createContext({isAuthenticated : false})


  const AppWrapper = ()=>{
const [isAuthenticated , setIsAuthenticated] = useState(false);
const [loader, setloader] = useState(false);
const [user, setUser] = useState({});


return (
 <Context.Provider value={{
  isAuthenticated,
  setIsAuthenticated,
  loader, 
  setloader,
  user, 
  setUser,
 }}>
    <App />
    </Context.Provider>
);


  }



createRoot(document.getElementById('root')).render(
  <StrictMode>
   <AppWrapper/>
  </StrictMode>,
)
