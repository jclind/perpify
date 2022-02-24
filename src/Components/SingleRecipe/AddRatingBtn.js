import React, { useState, useEffect } from 'react'
import { BsStar, BsStarFill } from 'react-icons/bs'

const AddRatingBtn = ({ currUserReview }) => {
  const [isRated, setIsRated] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (currUserReview && currUserReview.rating) {
      setIsRated(true)
    } else {
      setIsRated(false)
    }
  }, [currUserReview])

  const handleClick = () => {
    document.getElementById('recipeReviews').scrollIntoView({
      behavior: 'smooth',
    })
  }

  return (
    <div className='add-rating'>
      <button
        className='add-rating-btn btn'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
      >
        {!isRated ? (
          <>
            {isHovered ? (
              <BsStarFill className='icon' />
            ) : (
              <BsStar className='icon' />
            )}{' '}
            Add Rating
          </>
        ) : (
          <>
            <BsStarFill className='icon' />
            {currUserReview.rating}
          </>
        )}
      </button>
    </div>
  )
}

export default AddRatingBtn
