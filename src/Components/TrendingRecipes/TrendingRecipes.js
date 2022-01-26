import React, { useState, useEffect } from 'react'
import './TrendingRecipes.scss'

import { db } from '../../client/db'
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore'
import RecipeThumbnail from '../RecipeThumbnail/RecipeThumbnail'

const TrendingRecipes = () => {
  const [recipes, setRecipes] = useState()

  const getData = async () => {
    const q = query(
      collection(db, 'recipes'),
      orderBy('rating', 'desc'),
      limit(4)
    )
    const docSnaps = await getDocs(q)

    let tempRecipesArr = []
    docSnaps.forEach(doc => {
      tempRecipesArr.push(doc.data())
    })
    setRecipes(tempRecipesArr)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className='trending-recipes'>
      <h2 className='title'>Trending</h2>
      <div className='recipes'>
        {recipes ? (
          recipes.map(recipe => {
            return <RecipeThumbnail key={recipe.recipeId} recipe={recipe} />
          })
        ) : (
          <p>Recipes Loading...</p>
        )}
        {/* {recipes.map((recipe, idx) => {
          // const {
          //   title,
          //   image: {
          //     fields: {
          //       file: { url },
          //     },
          //   },
          //   totalTime,
          //   rating: { rating },
          // } = recipe.fields
          const { url, title, totalTime, servings, rating } = recipe
          return (
            <div key={idx} className='recipe'>
              <div className='img-container'>
                <img src={url} alt={title} />
              </div>
              <h4 className='title'>{title}</h4>
              <div className='info'>
                <div className='total-time single-info'>
                  <CgTimer className='icon' />
                  {totalTime > 1 ? `${totalTime} mins` : `${totalTime} min`}
                </div>
                <div className='rating single-info'>
                  <AiOutlineStar className='icon' />
                  {rating}
                </div>
              </div>
            </div>
          )
        })} */}
      </div>
    </div>
  )
}

export default TrendingRecipes
