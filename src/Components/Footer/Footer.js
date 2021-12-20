import React from 'react'
import './Footer.scss'

const Footer = () => {
  return (
    <footer>
      <div className='email'>JesseLindCS@gmail.com</div>
      <div className='info'>
        © {new Date().getFullYear()} || Made with{' '}
        <a href='https://reactjs.org/'>React.js</a>
      </div>
    </footer>
  )
}

export default Footer
