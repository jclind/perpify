import React from 'react'
import { NavLink } from 'react-router-dom'

const PrepifyLogo = () => {
  return (
    <NavLink to='/' className='nav-link prepify-logo'>
      <div className='nav-logo'>Prepify</div>
    </NavLink>
  )
}

export default PrepifyLogo
