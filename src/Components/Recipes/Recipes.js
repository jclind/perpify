import React, { useState, useEffect } from 'react'
import './Recipes.scss'
import RecipeThumbnail from '../RecipeThumbnail/RecipeThumbnail'
import RecipeFilters from '../RecipeFilters/RecipeFilters'
import RecipeAPI from '../../api/recipes'
import EJSON from 'ejson'

import { useRecipe } from '../../context/RecipeContext'

const Recipes = () => {
  const [recipeList, setRecipeList] = useState([])

  const [selectFilterVal, setSelectFilterVal] = useState('')

  const [loading, setLoading] = useState(false)

  // const [isMorePaginationData, setIsMorePaginationData] = useState(true)
  // const [isLoadMoreRecipesBtnVisible, setIsLoadMoreRecipesBtnVisible] =
  //   useState(true)

  // const { getRecipes } = useRecipe()

  const getRecipeList = () => {
    // const recipeQuery = {
    //   order: selectFilterVal,
    //   limit: 12,
    //   start: recipeList.length,
    // }
    // getRecipes(recipeQuery).then(arr => {
    //   // set is more pagination data to true is arr is not empty
    //   setIsMorePaginationData(arr.length ? true : false)
    //   console.log(1)
    //   if (arr.length) {
    //     console.log(2)
    //     setRecipeList([...recipeList, ...arr])
    //   }
    // })
  }

  useEffect(() => {
    RecipeAPI.getAll(0).then(res => {
      // console.log(EJSON.parse(JSON.stringify(res.data), { strict: false }))
      console.log(res.data, res.data.recipeList)
      // res.data.recipeList.map(recipe => {
      // console.log(EJSON.parse(JSON.stringify(recipe), { strict: false }))
      // })
      setRecipeList(res.data.recipeList)
      // setRecipeList(res.data.recipeList)
    })
  }, [])

  // const handleLoadMoreRecipes = () => {
  //   getRecipeList()
  // }

  // useEffect(() => {
  //   if (selectFilterVal) {
  //     getRecipeList()
  //   }
  // }, [selectFilterVal])

  // useEffect(() => {
  //   console.log(JSON.stringify(recipeList))
  // }, [recipeList])

  return (
    <div className='page recipes-page'>
      <h1 className='title'>Recipes</h1>
      <section className='recipes-container'>
        <RecipeFilters
          selectVal={selectFilterVal}
          setSelectVal={setSelectFilterVal}
        />
        {recipeList[0] ? (
          <div className='recipes-list'>
            {recipeList.map((recipe, idx) => {
              return <RecipeThumbnail key={idx} recipe={recipe} />
            })}
            {/* {isMorePaginationData && isLoadMoreRecipesBtnVisible ? (
              <button
                className='load-more-recipes-btn btn'
                onClick={handleLoadMoreRecipes}
              >
                Load More Recipes
              </button>
            ) : null} */}
          </div>
        ) : (
          <div>Loading Recipes...</div>
        )}
      </section>
    </div>
  )
}

export default Recipes
