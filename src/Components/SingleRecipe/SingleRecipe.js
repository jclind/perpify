import React, { useState, useEffect } from 'react'
import './SingleRecipe.scss'
import { useParams } from 'react-router-dom'
import { useRecipe } from '../../context/RecipeContext'
import { TailSpin } from 'react-loader-spinner'

import Ingredients from './Ingredients/Ingredients'
import Directions from './Directions/Directions'

import {
  AiOutlineClockCircle,
  AiOutlineUsergroupAdd,
  AiOutlineStar,
} from 'react-icons/ai'

const SingleRecipe = () => {
  const [currRecipe, setCurrRecipe] = useState(null)
  const [loading, setLoading] = useState(true)

  const [servings, setServings] = useState(0)

  const { getRecipe } = useRecipe()

  let recipeParams = useParams()
  const recipeId = recipeParams.recipeId

  // Retrieve recipe data with recipeId
  useEffect(() => {
    getRecipe(recipeId).then(res => {
      setCurrRecipe(res.data)
      console.log(res.data)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    if (currRecipe) {
      setServings(currRecipe.servings)
    }
  }, [currRecipe])

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
              <img src={currRecipe.recipeImage} alt={currRecipe.title} />
            </div>
            <div className='description-content'>
              <h1 className='title'>{currRecipe.title}</h1>
              <p className='description'>{currRecipe.description}</p>
              <div className='recipe-data'>
                <div className='time data-element'>
                  <AiOutlineClockCircle className='icon' />
                  <h3>Total Time</h3>
                  <div className='data'>{currRecipe.totalTime} min.</div>
                </div>
                <div className='servings data-element'>
                  <AiOutlineUsergroupAdd className='icon' />
                  <h3>Servings</h3>
                  <div className='data'>{servings}</div>
                </div>
                <div className='rating data-element'>
                  <AiOutlineStar className='icon' />
                  <h3>Rating</h3>
                  <div className='data'>
                    {currRecipe.rating === '0'
                      ? 'No Ratings'
                      : currRecipe.rating}
                  </div>
                </div>
              </div>
              <div className='tags'>
                {currRecipe.tags.map(tag => {
                  return (
                    <div className='tag' key={tag}>
                      {tag}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          <div className='body-content'>
            <Ingredients
              ingredients={currRecipe.ingredients}
              servings={servings}
              setServings={setServings}
            />
            <Directions directions={currRecipe.instructions} />
          </div>
        </div>
      )}
    </div>
  )
}

export default SingleRecipe
