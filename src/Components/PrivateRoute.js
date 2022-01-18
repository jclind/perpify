import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Navbar.scss'
const PrivateRoute = () => {
  const { user } = useAuth()
  console.log(user)

  return user ? <Outlet /> : <Navigate to='/login' />
}

export default PrivateRoute
