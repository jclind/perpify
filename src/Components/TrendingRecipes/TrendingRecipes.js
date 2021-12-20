import React from 'react'
import './TrendingRecipes.scss'
import { recipes } from '../../assets/data/recipes'
import { CgTimer, CgBowl } from 'react-icons/cg'
// import { BowlHot } from '@styled-icons/box'

const TrendingRecipes = () => {
  return (
    <div className='trending-recipes'>
      <h2 className='title'>Trending</h2>
      <div className='recipes'>
        {recipes.map((recipe, idx) => {
          const { title, url, totalTime, servings } = recipe
          return (
            <div key={idx} className='recipe'>
              <div className='img-container'>
                <img src={url} alt={title} />
              </div>
              <h4 className='title'>{title}</h4>
              <div className='info'>
                <div className='total-time single-info'>
                  <CgTimer className='icon' />
                  {totalTime}
                </div>
                <div className='servings single-info'>
                  <CgBowl className='icon' />
                  {servings}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default TrendingRecipes
