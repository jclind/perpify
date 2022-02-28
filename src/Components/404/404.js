import React from 'react'
import './404.scss'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='not-found-page page'>
      <div className='header'>
        <span className='number'>4</span>
        <div className='image-container'>
          <img src='/images/404-plate.svg' alt='food plate as 404 zero' />
        </div>
        <span className='number'>4</span>
      </div>
      <div className='content'>
        <h1>Something went wrong!</h1>
        <p className='text'>
          It seems like we can't find the page you are looking for, if you think
          this is a mistake please{' '}
          <Link to='/' className='contact-link'>
            contact our support team
          </Link>
          .
        </p>
        <button className='home-btn btn'>Return Home</button>
      </div>
    </div>
  )
}

export default NotFound
