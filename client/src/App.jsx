import React from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Signin from './pages/Signin';
import SignUp from './pages/Signup';
import Signout from './pages/Signout';
import Profile from './pages/Profile';
import About from './pages/About';
import Header from './components/Header';
import PrivateRouter from './components/PrivateRouter';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signout' element={<Signout />} />
        <Route element={<PrivateRouter />}>
          <Route path='/profile' element={<Profile />} />
        </Route>
        <Route path='/about' element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}