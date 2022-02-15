import React, { useState } from 'react'
import './RecipeRatings.scss'
import StarRatings from 'react-star-ratings'
import { BsStar } from 'react-icons/bs'

const RecipeRatings = () => {
  const [rating, setRating] = useState(0)

  return (
    <div className='recipe-ratings'>
      <h2 className='title'>Ratings and Reviews</h2>
      <div className='ratings-reviews-container'>
        <div className='overview'>
          <span className='text'>Average Rating:</span>
          <div className='average-rating'>
            <BsStar className='icon' />
            <div className='number'>4.3</div>
            <span className='count'>(15- )</span>
          </div>
          <div className='user-rate-container'>
            <StarRatings
              rating={rating}
              starRatedColor='#ff5722'
              changeRating={e => setRating(e)}
              numberOfStars={5}
              starDimension='25px'
              starSpacing='2px'
              name='rating'
            />
          </div>
        </div>
        <div className='reviews'>.</div>
      </div>
    </div>
  )
}

export default RecipeRatings
