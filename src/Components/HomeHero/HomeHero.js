import React, { useState } from 'react'
import './HomeHero.scss'
import { AiOutlineSearch } from 'react-icons/ai'

const HomeHero = () => {
  const [searchRecipeVal, setSearchRecipeVal] = useState('')

  return (
    <div className='home-hero'>
      <img src='/images/home-images/hero.jpg' alt='Assorted Foods Background' />
      <div className='hero-overlay'>
        <h3 className='text'>Save money. Reduce stress. Be healthy.</h3>
        <label
          htmlFor='.search-recipes-input'
          className='search-recipes-input-label'
        >
          <AiOutlineSearch className='icon' />
          <input
            className='search-recipes-input'
            placeholder='Search All Recipes'
            onChange={e => setSearchRecipeVal(e.target.value)}
            value={searchRecipeVal}
          />
        </label>
      </div>
    </div>
  )
}

export default HomeHero
