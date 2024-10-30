import React from 'react'
import Login from './Authentication/Login'
import { BrowserRouter as Router , Routes, Route} from "react-router-dom"
import Home from './Compoents/Home'
import Registration from './Authentication/Registration'
import Profile from './Compoents/Profile'
const App = () => {
  return (
    <Router>
    <Routes>
      <Route path="/" element={
       <div className='flex justify-center mt-10  mb-10 overflow-hidden'> 

      
        <Login/>
      </div>
      
      } />
       <Route path="/Profile" element={
       <div className='flex justify-center mt-10  mb-10 overflow-hidden'>  
        <Profile/>
      </div>
      
      } />
       <Route path="/Registration" element={
       <div className='flex justify-center mt-10  mb-10 overflow-hidden'> 

      
        <Registration/>
      </div>
      
      } />

<Route path="/Home" element={
    <div className='flex justify-center mt-10  mb-10 overflow-hidden'> 
      <Home/>
      </div>
      } />
    </Routes>
  </Router>
  )
}

export default App