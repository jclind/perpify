import React from 'react'
import HomeHero from '../HomeHero/HomeHero'
import TrendingRecipes from '../TrendingRecipes/TrendingRecipes'

const Home = () => {
  return (
    <div className='page home-page'>
      <HomeHero />
      <TrendingRecipes />
    </div>
  )
}

export default Home
