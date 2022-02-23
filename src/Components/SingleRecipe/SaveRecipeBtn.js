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
  const { saveRecipe, getSavedRecipe, unsaveRecipe } = useRecipe()

  const handleToggleSaveRecipe = recipeId => {
    if (isSaved) {
      unsaveRecipe(user.uid, recipeId).then(() => setIsSaved(false))
    } else {
      saveRecipe(user.uid, recipeId).then(() => setIsSaved(true))
    }
  }

  useEffect(() => {
    const getIsRecipeSaved = async recipeId => {
      return await getSavedRecipe(user.uid, recipeId)
    }
    getIsRecipeSaved(recipeId).then(res => {
      const currIsSaved = res.data.length > 0
      setIsSaved(currIsSaved)
    })
  }, [])

  return (
    <div className='save-recipe'>
      <button
        className='save-recipe-btn btn'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => handleToggleSaveRecipe(recipeId)}
      >
        {!isSaved ? (
          <>
            {isHovered ? (
              <BsFillBookmarkFill className='icon' />
            ) : (
              <BsBookmark className='icon' />
            )}
            Save
          </>
        ) : (
          <>
            <BsFillBookmarkCheckFill className='icon' />
            Saved
          </>
        )}
      </button>
    </div>
  )
}

export default SaveRecipeBtn
