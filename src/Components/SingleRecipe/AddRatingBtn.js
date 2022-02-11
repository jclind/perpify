import React, { useState } from 'react'
import { BsStar, BsStarFill } from 'react-icons/bs'

const AddRatingBtn = () => {
  const [isRated, setIsRated] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className='add-rating'>
      <button
        className='add-rating-btn btn'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isHovered && !isRated ? (
          <BsStarFill className='icon' />
        ) : (
          <BsStar className='icon' />
        )}{' '}
        Add Rating
      </button>
    </div>
  )
}

export default AddRatingBtn
