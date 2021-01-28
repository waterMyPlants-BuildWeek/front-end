import React, { useState, useEffect } from 'react'
import Login from './pages/Login';
import Nav from './components/Nav';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './pages/Dashboard'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/Auth'
import Homepage from './pages/Homepage'

function App() {

  return (
      <AuthProvider>
        <Router>
          <>
          <Nav />
          <Route exact path='/' component={Homepage} />
          <PrivateRoute path='/dashboard' component={Dashboard}/>
          <Route path='/login' component={Login} />
          </>
        </Router>
      </AuthProvider>
  );
}

export default App;
