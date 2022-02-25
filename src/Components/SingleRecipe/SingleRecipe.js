import React, { useState, useEffect } from 'react'
import './SingleRecipe.scss'
import { useParams } from 'react-router-dom'
import { useRecipe } from '../../context/RecipeContext'
import { TailSpin } from 'react-loader-spinner'

import Ingredients from './Ingredients/Ingredients'
import Directions from './Directions/Directions'
import SaveRecipeBtn from './SaveRecipeBtn'
import AddRatingBtn from './AddRatingBtn'
import PrintRecipeBtn from './PrintRecipeBtn'
import RecipeRatings from './RecipeRatings/RecipeRatings'

import { formatRating } from '../../util/formatRating'
import { calcServings } from '../../util/calcServings'

import { AiOutlineClockCircle, AiOutlineUsergroupAdd } from 'react-icons/ai'
import { BsStar } from 'react-icons/bs'

import { getWindowWidth } from '../../util/getWindowWidth'

const SingleRecipe = () => {
  const [currRecipe, setCurrRecipe] = useState(null)
  const [loading, setLoading] = useState(true)
  const [modIngredients, setModIngredients] = useState([])

  const [currUserReview, setCurrUserReview] = useState({})

  const [windowWidth, setWindowWidth] = useState(getWindowWidth())

  const [yieldSize, setYieldSize] = useState(0)
  useEffect(() => {
    if (yieldSize && currRecipe) {
      const recipeServings = JSON.parse(localStorage.getItem('recipeServings'))
      if (!recipeServings) {
        localStorage.setItem(
          'recipeServings',
          JSON.stringify([{ recipeId: currRecipe._id, servingSize: yieldSize }])
        )
      } else {
        const idx = recipeServings.findIndex(
          item => item.recipeId === currRecipe._id
        )
        if (idx >= 0) {
          recipeServings[idx].servingSize = yieldSize
          localStorage.setItem(
            'recipeServings',
            JSON.stringify([...recipeServings])
          )
        } else {
          localStorage.setItem(
            'recipeServings',
            JSON.stringify([
              ...recipeServings,
              { recipeId: currRecipe._id, servingSize: yieldSize },
            ])
          )
        }
      }

      setModIngredients(
        calcServings(
          currRecipe.ingredients,
          Number(currRecipe.yield.value),
          yieldSize
        )
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [yieldSize])

  const { getRecipe } = useRecipe()

  let recipeParams = useParams()
  const recipeId = recipeParams.recipeId

  // Retrieve recipe data with recipeId
  useEffect(() => {
    getRecipe(recipeId).then(res => {
      setCurrRecipe(res.data)
      setLoading(false)
    })

    function handleResize() {
      console.log(windowWidth)
      setWindowWidth(getWindowWidth())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (currRecipe) {
      console.log(currRecipe)

      const recipeServings = JSON.parse(localStorage.getItem('recipeServings'))
      if (recipeServings) {
        const idx = recipeServings.findIndex(
          item => item.recipeId === currRecipe._id
        )
        if (idx >= 0) {
          const newServingSize = recipeServings[idx].servingSize
          setYieldSize(newServingSize)
        } else {
          console.log(currRecipe.yield.value)
          setYieldSize(Number(currRecipe.yield.value))
        }
      }
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
            {windowWidth <= 956 && (
              <div className='mobile-title-content'>
                <h1 className='title'>{currRecipe.title}</h1>
                <p className='description'>{currRecipe.description}</p>
              </div>
            )}
            <div className='recipe-image-container'>
              <img src={currRecipe.recipeImage} alt={currRecipe.title} />
            </div>
            <div className='description-content'>
              {windowWidth > 956 && (
                <>
                  <h1 className='title'>{currRecipe.title}</h1>
                  <p className='description'>{currRecipe.description}</p>
                </>
              )}

              <div className='recipe-data'>
                <div className='time data-element'>
                  <AiOutlineClockCircle className='icon' />
                  <h3>Total Time</h3>
                  <div className='data'>{currRecipe.totalTime} min.</div>
                </div>
                <div className='servings data-element'>
                  <AiOutlineUsergroupAdd className='icon' />
                  <h3>
                    {currRecipe.yield.type.value || currRecipe.yield.type}
                  </h3>
                  <div className='data'>{yieldSize}</div>
                </div>
                <div className='rating data-element'>
                  <BsStar className='icon' />
                  <h3>Rating</h3>
                  <div className='data'>
                    {Number(currRecipe.rating.rateCount) === 0 ? (
                      'No Ratings'
                    ) : (
                      <>
                        {formatRating(
                          currRecipe.rating.rateValue,
                          currRecipe.rating.rateCount
                        )}{' '}
                        ({currRecipe.rating.rateCount})
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className='actions'>
                <SaveRecipeBtn recipeId={currRecipe._id} className='action' />
                <AddRatingBtn
                  recipeId={currRecipe._id}
                  currUserReview={currUserReview}
                  className='action'
                />
                <PrintRecipeBtn recipe={currRecipe} className='action' />
              </div>
            </div>
          </div>

          <div className='body-content'>
            <Ingredients
              ingredients={modIngredients}
              yieldSize={yieldSize}
              setYieldSize={setYieldSize}
            />
            <Directions directions={currRecipe.instructions} />
            <div className='tags-container'>
              <label className='tag-label'>Tags:</label>
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
          <RecipeRatings
            recipeId={currRecipe._id}
            ratingVal={currRecipe.rating.rateValue}
            ratingCount={currRecipe.rating.rateCount}
            currUserReview={currUserReview}
            setCurrUserReview={setCurrUserReview}
          />
        </div>
      )}
    </div>
  )
}

export default SingleRecipe
