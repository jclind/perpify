import React, { useState, useEffect } from 'react'
import './SingleRecipe.scss'
import { useParams } from 'react-router-dom'
import { useRecipe } from '../../context/RecipeContext'
import { TailSpin } from 'react-loader-spinner'

const SingleRecipe = () => {
  const [currRecipe, setCurrRecipe] = useState(null)
  const [loading, setLoading] = useState(true)

  const { getRecipe } = useRecipe()

  let recipeParams = useParams()
  const recipeId = recipeParams.recipeId

  // Retrieve recipe data with recipeId
  useEffect(() => {
    getRecipe(recipeId).then(recipe => {
      console.log(recipe)
      setCurrRecipe(recipe)
      setLoading(false)
    })
  }, [])

  return (
    <div className='page single-recipe-page'>
      {loading || !currRecipe ? (
        <div className='loading-container'>
          <TailSpin
            heigth='50'
            width='50'
            color='gray'
            arialLabel='loading'
            className='spinner'
          />
        </div>
      ) : (
        <p>single Recipe {currRecipe && currRecipe.title}</p>
      )}
    </div>
  )
}

export default SingleRecipe
