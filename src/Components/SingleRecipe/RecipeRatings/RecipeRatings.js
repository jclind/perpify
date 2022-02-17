import React, { useState, useEffect } from 'react'
import './RecipeRatings.scss'
import StarRatings from 'react-star-ratings'
import { BsStar } from 'react-icons/bs'
import { useRecipe } from '../../../context/RecipeContext'
import RecipeReview from './RecipeReview/RecipeReview'

const RecipeRatings = ({ recipeId }) => {
  const [rating, setRating] = useState(0)
  const [isReviewed, setIsReviewed] = useState(false)
  const [currUserReview, setCurrUserReview] = useState({})

  const [isReviewOpen, setIsReviewOpen] = useState(false)
  const [newReviewText, setNewReviewText] = useState('')
  const [newReviewError, setNewReviewError] = useState('')

  const { checkIfReviewed, newReview } = useRecipe()

  useEffect(() => {
    return checkIfReviewed(recipeId).then(res => {
      const resData = res.data
      const reviewData =
        resData && resData[0] && resData[0].reviews
          ? resData[0].reviews[0]
          : null

      const userRating = reviewData?.rating
      const isUserReview = reviewData?.reviewText.length > 0

      if (!isNaN(userRating)) {
        setRating(Number(userRating))
      }
      setCurrUserReview(reviewData)
      setIsReviewed(isUserReview)
    })
  }, [])

  const handleSubmitReview = () => {
    setNewReviewError('')
    if (rating === 0) {
      return setNewReviewError(
        'Please add a rating before submitting your review.'
      )
    }
    if (newReviewText.length < 5) {
      return setNewReviewError(
        'Review is too short. Please make sure to add 4 or more characters.'
      )
    }
    setIsReviewOpen(false)
    newReview(recipeId, newReviewText, rating.toString()).then(res => {
      console.log(res, res.data)
    })
  }

  return (
    <div className='recipe-ratings'>
      <h2 className='title'>Ratings & Reviews</h2>
      <div className='ratings-reviews-container'>
        <div className='overview'>
          <div className='average-rating-container'>
            <span className='text'>Average Rating:</span>
            <div className='average-rating'>
              <BsStar className='icon' />
              <div className='number'>4.3</div>
              <span className='count'>(15)</span>
            </div>
          </div>
          <div className='user-rating'>
            <span className='text'>Your Rating:</span>
            <div className='user-rate-container'>
              <StarRatings
                rating={rating}
                starRatedColor='#ff5722'
                changeRating={e => setRating(e)}
                numberOfStars={5}
                starDimension='30px'
                starSpacing='2px'
                name='rating'
              />
            </div>
          </div>
        </div>
        <div className='reviews'>
          <div className='leave-review-input-container'>
            {!isReviewed && (
              <>
                {isReviewOpen ? (
                  <div className='review-open'>
                    <h4 className='review-input-title'>Write Review:</h4>
                    {newReviewError && (
                      <div className='error'>{newReviewError}</div>
                    )}
                    <textarea
                      name='review'
                      className='review-text-area'
                      value={newReviewText}
                      onChange={e => setNewReviewText(e.target.value)}
                    />
                    <button
                      className='submit-review-btn btn'
                      onClick={handleSubmitReview}
                    >
                      Submit Review
                    </button>
                  </div>
                ) : (
                  <button
                    className='leave-review-btn btn'
                    onClick={() => setIsReviewOpen(true)}
                  >
                    Add Review
                  </button>
                )}
              </>
            )}
          </div>
          <div className='review-filters'></div>
          <div className='reviews-container'>
            {currUserReview && <RecipeReview review={currUserReview} />}{' '}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecipeRatings
