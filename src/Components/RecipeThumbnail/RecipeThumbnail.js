import React from 'react'
import { Link } from 'react-router-dom'
import { CgTimer } from 'react-icons/cg'
import { AiOutlineStar } from 'react-icons/ai'

import './RecipeThumbnail.scss'

const RecipeThumbnail = ({ recipe }) => {
  const {
    recipeId,
    recipeImage,
    title,
    prepTime,
    cookTime,
    totalTime,
    rating,
  } = recipe

  const currPrepTime = prepTime ? prepTime : 0
  const currCookTime = cookTime ? cookTime : 0
  const currTotalTime = totalTime ? totalTime : currPrepTime + currCookTime

  return (
    <Link to={`/recipes/${recipeId}`} className='recipe-thumbnail'>
      <div className='img-container'>
        <img src={recipeImage} alt={title} />
      </div>
      <h4 className='title'>{title}</h4>
      <div className='info'>
        <div className='total-time single-info'>
          <CgTimer className='icon' />
          {currTotalTime > 1 ? `${currTotalTime} mins` : `${currTotalTime} min`}
        </div>
        <div className='rating single-info'>
          <AiOutlineStar className='icon' />
          {rating}
        </div>
      </div>
    </Link>
  )
}

export default RecipeThumbnail
