import React, { useState, useEffect } from 'react'
import './RecipeReview.scss'
import StarRatings from 'react-star-ratings'
import { useAuth } from '../../../../context/AuthContext'
import { formatDate } from '../../../../util/formatDate'
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiTwotoneLike,
  AiTwotoneDislike,
} from 'react-icons/ai'

const ReviewOptions = ({ editReview, deleteReview }) => {
  const [likeStatus, setLikeStatue] = useState(null)
  const [isLikeHovered, setIsLikeHovered] = useState(false)
  const [isDislikeHovered, setIsDislikeHovered] = useState(false)

  return (
    <div className='review-options'>
      <button
        className='like-review-btn btn'
        onMouseEnter={() => setIsLikeHovered(true)}
        onMouseLeave={() => setIsLikeHovered(false)}
      >
        {isLikeHovered ? (
          <AiTwotoneLike className='icon' />
        ) : (
          <AiOutlineLike className='icon' />
        )}
      </button>
      <button
        className='dislike-review-btn btn'
        onMouseEnter={() => setIsDislikeHovered(true)}
        onMouseLeave={() => setIsDislikeHovered(false)}
      >
        {isDislikeHovered ? (
          <AiTwotoneDislike className='icon' />
        ) : (
          <AiOutlineDislike className='icon' />
        )}
      </button>
      {editReview && deleteReview ? (
        <div className='actions'>
          <button className='edit-btn btn'>Edit</button>
          <button className='delete-btn btn'>Delete</button>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

const RecipeReview = ({ review, editReview, deleteReview }) => {
  const [rating, setRating] = useState(0)
  const [date, setDate] = useState('')
  const [username, setUsername] = useState('')
  const { user, getUsername } = useAuth()

  useEffect(() => {
    if (review.rating) {
      setRating(Number(review.rating))
      setDate(formatDate(review.dateCreated, true))
      getUsername(review.userId).then(res => {
        setUsername(res)
      })
    }
    console.log(review)
  }, [review])
  return (
    <div className='recipe-review'>
      <div className='head'>
        <div className='name'>{username}</div>
        rated this recipe:
        <div className='rating'>
          <StarRatings
            rating={rating}
            starRatedColor='#ff5722'
            starDimension='15px'
            starSpacing='1px'
            name='rating'
          />
        </div>
        <div className='date'>{date}</div>
      </div>
      <div className='body'>
        <div className='text'>{review.reviewText}</div>
        <ReviewOptions editReview={editReview} deleteReview={deleteReview} />
      </div>
    </div>
  )
}

export default RecipeReview
