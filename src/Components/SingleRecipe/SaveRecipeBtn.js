import React, { useState, useEffect } from 'react'
import {
  BsBookmark,
  BsFillBookmarkFill,
  BsFillBookmarkCheckFill,
} from 'react-icons/bs'

import { useAuth } from '../../context/AuthContext'
import { useRecipe } from '../../context/RecipeContext'

const SaveRecipeBtn = ({ recipeId }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  const { user } = useAuth()
  const { saveRecipe, getSavedRecipe } = useRecipe()

  const handleSaveRecipe = recipeId => {
    saveRecipe(user.uid, recipeId)
    setIsSaved(true)
  }
  const handleUnsaveRecipe = recipeId => {
    setIsSaved(false)
  }

  useEffect(() => {
    const getIsRecipeSaved = async recipeId => {
      return await getSavedRecipe(user.uid, recipeId)
    }

    getIsRecipeSaved().then(res => {
      const currIsSaved = res.data.length > 0
      console.log(user.uid)
      console.log(currIsSaved)
      setIsSaved(currIsSaved)
    })
  }, [])

  return (
    <div className='save-recipe'>
      {isSaved ? (
        <button
          className='save-recipe-btn btn'
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => handleUnsaveRecipe(recipeId)}
        >
          <BsFillBookmarkCheckFill className='icon' />
          Saved
        </button>
      ) : (
        <button
          className='save-recipe-btn btn'
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => handleSaveRecipe(recipeId)}
        >
          {isHovered ? (
            <BsFillBookmarkFill className='icon' />
          ) : (
            <BsBookmark className='icon' />
          )}{' '}
          Save
        </button>
      )}
    </div>
  )
}

export default SaveRecipeBtn
