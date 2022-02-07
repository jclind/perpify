import React, { useState } from 'react'
import './HomeHero.scss'
import SearchRecipesInput from '../SearchRecipesInput/SearchRecipesInput'

const HomeHero = () => {
  return (
    <div className='home-hero'>
      <img src='/images/home-images/hero.jpg' alt='Assorted Foods Background' />
      <div className='hero-overlay'>
        <h3 className='text'>Save money. Reduce stress. Be healthy.</h3>
        <SearchRecipesInput />
      </div>
    </div>
  )
}

export default HomeHero
