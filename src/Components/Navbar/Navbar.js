import React, { useEffect } from 'react'
import './Navbar.scss'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import PrepifyLogo from './PrepifyLogo'

const Navbar = () => {
  const { user, logout } = useAuth()
  console.log(user)

  useEffect(() => {
    console.log('changed', user)
  }, [user])

  const loggedOutLinks = (
    <>
      <NavLink
        to='/recipes'
        className={({ isActive }) => {
          return isActive ? 'nav-link active' : 'nav-link'
        }}
      >
        recipes
      </NavLink>
      <NavLink
        to='/about'
        className={({ isActive }) => {
          return isActive ? 'nav-link active' : 'nav-link'
        }}
      >
        about
      </NavLink>
      <NavLink
        to='/login'
        className={({ isActive }) => {
          return isActive ? 'nav-link active' : 'nav-link'
        }}
      >
        login
      </NavLink>
      <NavLink
        to='/signup'
        className={({ isActive }) => {
          return isActive ? 'nav-link active' : 'nav-link'
        }}
      >
        Signup
      </NavLink>
    </>
  )
  const loggedInLinks = (
    <>
      <NavLink
        to='/recipes'
        className={({ isActive }) => {
          return isActive ? 'nav-link active' : 'nav-link'
        }}
      >
        recipes
      </NavLink>
      <NavLink
        to='/about'
        className={({ isActive }) => {
          return isActive ? 'nav-link active' : 'nav-link'
        }}
      >
        about
      </NavLink>
      <button className='nav-link btn' onClick={logout}>
        logout
      </button>
    </>
  )

  return (
    <nav className='nav'>
      <div className='nav-header'>
        <PrepifyLogo />
      </div>
      <div className='nav-content'>
        <div className='nav-links'>{user ? loggedInLinks : loggedOutLinks}</div>
      </div>
    </nav>
  )
}

export default Navbar
