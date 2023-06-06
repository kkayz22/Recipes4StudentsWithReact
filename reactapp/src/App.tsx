import React from 'react';
import { Route, Routes } from 'react-router-dom';

import MainPage from './pages/MainPage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import RegisterPage from './pages/RegisterPage.tsx';
import NewRecipePage from './pages/NewRecipePage.tsx';
import NotFound from './pages/NotFound.tsx';
import Navbar from './components/Navbar.tsx';

import "./App.css"

const App = () => {
  return (
    <React.Fragment>
      <Navbar />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path='/' element={<MainPage />} />
        <Route path="/addRecipe" element={<NewRecipePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
      </Routes>
    </React.Fragment>
  )
}

export default App