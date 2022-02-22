import React from 'react'
import { Link } from 'react-router-dom'
import { CgTimer } from 'react-icons/cg'
import { AiOutlineStar } from 'react-icons/ai'
import { formatRating } from '../../util/formatRating'

import './RecipeThumbnail.scss'

const RecipeThumbnail = ({ recipe }) => {
  const { _id, recipeImage, title, totalTime, rating } = recipe
  console.log(rating)
  // console.log(recipe, recipeId)
  return (
    <Link to={`/recipes/${_id}`} className='recipe-thumbnail'>
      <div className='img-container'>
        <img src={recipeImage} alt={title} />
      </div>
      <h4 className='title'>{title}</h4>
      <div className='info'>
        <div className='total-time single-info'>
          <CgTimer className='icon' />
          {totalTime > 1 ? `${totalTime} mins` : `${totalTime} min`}
        </div>
        <div className='rating single-info'>
          <AiOutlineStar className='icon' />
          {Number(rating.rateCount) === 0 ? (
            0
          ) : (
            <>
              {formatRating(rating.rateValue, rating.rateCount)} (
              {rating.rateCount})
            </>
          )}
        </div>
      </div>
    </Link>
  )
}

export default RecipeThumbnail
