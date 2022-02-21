import React, { useState, useEffect } from 'react'
import './RecipeReview.scss'
import StarRatings from 'react-star-ratings'
import { useAuth } from '../../../../context/AuthContext'
import { useRecipe } from '../../../../context/RecipeContext'
import { formatDate } from '../../../../util/formatDate'
import { TailSpin } from 'react-loader-spinner'
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiTwotoneLike,
  AiTwotoneDislike,
} from 'react-icons/ai'

const ReviewOptions = ({
  handleEditReview,
  editing,
  setEditing,
  deleteReview,
  editLoading,
}) => {
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
      {handleEditReview && deleteReview ? (
        <div className='actions'>
          {!editing ? (
            <>
              <button className='edit-btn btn' onClick={() => setEditing(true)}>
                Edit
              </button>
              <button className='delete-btn btn'>Delete</button>
            </>
          ) : (
            <>
              <button className='cancel btn' onClick={() => setEditing(false)}>
                Cancel
              </button>
              <button
                className='edit-review btn'
                onClick={handleEditReview}
                disabled={editLoading}
              >
                Submit
                {editLoading && (
                  <div className='btn-overlay'>
                    <TailSpin
                      heigth='30'
                      width='30'
                      color='#303841'
                      arialLabel='loading'
                    />
                  </div>
                )}
              </button>
            </>
          )}
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

const RecipeReview = ({ review, recipeId }) => {
  const [rating, setRating] = useState(0)
  const [date, setDate] = useState('')
  const [username, setUsername] = useState('')
  const { getUsername } = useAuth()
  const { editReview } = useRecipe()

  const [reviewText, setReviewText] = useState(review.reviewText)

  const [editingText, setEditingText] = useState(review.reviewText)
  const [editing, setEditing] = useState(false)
  const [editLoading, setEditLoading] = useState(false)

  useEffect(() => {
    if (review.rating) {
      setRating(Number(review.rating))
      setDate(formatDate(review.reviewCreatedAt, true))
      getUsername(review.userId).then(res => {
        setUsername(res)
      })
    }
  }, [review])

  const handleEditReview = () => {
    if (editingText.length >= 5 && editingText !== reviewText) {
      setEditLoading(true)
      editReview(recipeId, editingText).then(() => {
        setEditing(false)
        setReviewText(editingText)
        setEditLoading(false)
      })
    }
  }
  const deleteReview = () => {}

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
        {!editing ? (
          <div className='text'>{reviewText}</div>
        ) : (
          <textarea
            className='editing-review text'
            value={editingText}
            onChange={e => setEditingText(e.target.value)}
          ></textarea>
        )}

        <ReviewOptions
          handleEditReview={handleEditReview}
          editing={editing}
          setEditing={setEditing}
          deleteReview={deleteReview}
          editLoading={editLoading}
        />
      </div>
    </div>
  )
}

export default RecipeReview
