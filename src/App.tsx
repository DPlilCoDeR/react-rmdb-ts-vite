import React from 'react';

//Router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Home from './components/Home';
import Header from './components/Header/Header';
import Movie from './components/Movie';
import NotFound from './components/NotFound'
import Login from './components/Login/Login';

//Context
import UserProvider from './context'

import { GlobalStyle } from './GlobalStyle'


function App (): JSX.Element {
  return (
    <Router>

      <UserProvider>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/:movieId' element={<Movie/>} />
        <Route path='/*' element={<NotFound/>} />
      </Routes>
      <GlobalStyle/>
      </UserProvider>
    </Router>
  );
}

export default App;
