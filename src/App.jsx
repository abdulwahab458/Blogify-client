import { useState } from 'react'
import reactLogo from './assets/react.svg'  
import './App.css'
import Navbar from './components/navbar'
import { Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Postlistpage from './pages/Postlistpage'
import Write from './pages/Write'
import Loginpage from './pages/Loginpage'
import Registerpage from './pages/Registerpage'
import Singlepostpage from './pages/Singlepostpage'

function App() {


  return (
    <>
    <div className="px-4 md:px-8 lg:px-16 lx:px-32 2xl:px-64">
       {/* NAVBAR */}
      
       <Navbar/>
      {/* BREADCRUMB */}
      {/* INTRODUCTION */}
      {/* FEATURED POSTS */}
      {/* POST LIST */}
    <Routes>
      <Route path='/'
      element={
        <Homepage/>
      }
      />
      <Route path='/posts'
      element={
        <Postlistpage/>
      }
      />
      <Route path='/:slug'
      element={
        <Singlepostpage/>
      }
      />
      <Route path='/write'
      element={
        <Write/>
      }
      />
      <Route path='/login'
      element={
        <Loginpage/>
      }
      />
      <Route path='/register'
      element={
        <Registerpage/>
      }
      />
    </Routes>
      
      </div>
    </>
  )
}

export default App
