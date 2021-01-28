import React, { useState, useEffect } from 'react'
import Login from './pages/Login';
import Nav from './components/Nav';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './pages/Dashboard'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/Auth'

function App() {

  return (
      <AuthProvider>
        <Router>
          <>
          <Nav />
          <PrivateRoute path='/dashboard' component={Dashboard}/>
          <Route path='/login' component={Login} />
          </>
        </Router>
      </AuthProvider>
  );
}

export default App;
