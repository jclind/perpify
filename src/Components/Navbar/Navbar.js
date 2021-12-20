import React from 'react'
import './Navbar.scss'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='nav'>
      <div className='nav-header'>
        <NavLink to='/' className='nav-link'>
          <div className='nav-logo'>Prepify</div>
        </NavLink>
      </div>
      <div className='nav-content'>
        <div className='nav-links'>
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
        </div>
      </div>
    </nav>
  )
}

export default Navbar
