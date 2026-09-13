import { useState } from 'react'
import { Toaster } from 'react-hot-toast';
import Register from './components/generalzone/Register'
import Login from './components/generalzone/Login'
import Otp from './components/generalzone/Otp'
import Home from './components/generalzone/Home';
import StudentProfile from './components/student/Studentprofile';
import { BrowserRouter , Routes , Route } from 'react-router-dom'
import './App.css'
import Courses from './components/student/Course';
import Studentdashboard from './components/student/Studentdashboard';
import Jobs from './components/student/Jobs';

function App() {

  return (
    <>
     <Toaster position="top-center" reverseOrder={false} />
    <BrowserRouter>
     <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/jobs' element={<Jobs/>}></Route>
      <Route path='/Student' element={<Studentdashboard/>}></Route>
      <Route path='/course' element={<Courses/>}></Route>
      <Route path='/studentprofile' element={<StudentProfile/>}></Route>
   
        <Route path='/register' element={<Register/>}></Route>
      <Route path='/verify' element={<Otp/>}></Route>
      <Route path='/login' element={<Login/>}></Route>

     </Routes>
     </BrowserRouter>

    </>
  )
}

export default App
