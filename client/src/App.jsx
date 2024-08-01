import React from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Signin from './pages/Signin';
import SignUp from './pages/Signup';
import Signout from './pages/Signout';
import Profile from './pages/Profile';
import About from './pages/About';
import Header from './components/Header';
import PrivateRouter from './components/PrivateRouter';
import CreateListing from './pages/CreateListing';
import EditListing from './pages/EditListing';
import ViewListing from './pages/ViewListing';
import Search from './pages/Search';

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
          <Route path='/create-listing' element={<CreateListing />} />
          <Route path='/edit-listing/:listingId' element={<EditListing />} />
        </Route>
        <Route path='/about' element={<About />} />
        <Route path='/search' element={<Search />} />
        <Route path='/view-listing/:listingId' element={<ViewListing />} />

      </Routes>
    </BrowserRouter>
  )
}