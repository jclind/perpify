import React, { useEffect } from 'react'
import './Navbar.scss'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

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
        to='/register'
        className={({ isActive }) => {
          return isActive ? 'nav-link active' : 'nav-link'
        }}
      >
        register
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
        <NavLink to='/' className='nav-link'>
          <div className='nav-logo'>Prepify</div>
        </NavLink>
      </div>
      <div className='nav-content'>
        <div className='nav-links'>
          {user ? loggedInLinks : loggedOutLinks}
          {/* <NavLink
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
            to='/register'
            className={({ isActive }) => {
              return isActive ? 'nav-link active' : 'nav-link'
            }}
          >
            register
          </NavLink> */}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
