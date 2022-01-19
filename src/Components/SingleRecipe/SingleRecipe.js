import React, { useState, useEffect } from 'react'
import './SingleRecipe.scss'
import { useParams } from 'react-router-dom'
import { useRecipe } from '../../context/RecipeContext'
import { TailSpin } from 'react-loader-spinner'

import {
  AiOutlineClockCircle,
  AiOutlineUsergroupAdd,
  AiOutlineStar,
} from 'react-icons/ai'

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
        <div className='recipe-container'>
          <div className='header-content'>
            <div className='recipe-image-container'>
              <img src={currRecipe.url} alt={currRecipe.title} />
            </div>
            <div className='description-content'>
              <h1 className='title'>{currRecipe.title}</h1>
              <p className='description'>
                Put down the fork and knife… here's a Chicago deep-dish pizza
                that you can actually eat by holding it in your hands! A
                beautiful golden crust contains a meaty, cheesy, saucy filling
                with Italian sausage, sweet peppers, and 3 types of cheese. The
                sauce and cheese char slightly on the outside as they bake,
                resulting in a super savory taste.
              </p>
              <div className='recipe-data'>
                <div className='time data-element'>
                  <AiOutlineClockCircle className='icon' />
                  <h3>Total Time</h3>
                  <div className='data'>{currRecipe.totalTime} min.</div>
                </div>
                <div className='servings data-element'>
                  <AiOutlineUsergroupAdd className='icon' />
                  <h3>Servings</h3>
                  <div className='data'>{currRecipe.servings}</div>
                </div>
                <div className='rating data-element'>
                  <AiOutlineStar className='icon' />
                  <h3>Rating</h3>
                  <div className='data'>{currRecipe.rating}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SingleRecipe
