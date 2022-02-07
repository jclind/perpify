import React, { useState, useEffect } from 'react'
import './Recipes.scss'
import RecipeThumbnail from '../RecipeThumbnail/RecipeThumbnail'
import RecipeFilters from '../RecipeFilters/RecipeFilters'
import RecipeAPI from '../../api/recipes'
import EJSON from 'ejson'
import SearchRecipesInput from '../SearchRecipesInput/SearchRecipesInput'

import { useRecipe } from '../../context/RecipeContext'

const Recipes = () => {
  const [recipeList, setRecipeList] = useState([])

  const [selectFilterVal, setSelectFilterVal] = useState('')
  const [selectedTags, setSelectedTags] = useState([])

  const [currPage, setCurrPage] = useState(null)
  const [totalResults, setTotalResults] = useState(null)

  const [loading, setLoading] = useState(false)

  const getRecipes = page => {
    console.log(page, selectFilterVal)
    RecipeAPI.getAll(page, selectFilterVal, selectedTags).then(res => {
      console.log(res.data, res.data.recipeList)

      const totalResults = Number(res.data.total_results)
      console.log(totalResults)
      setTotalResults(totalResults)

      if (currPage !== 0) {
        setRecipeList([...recipeList, ...res.data.recipeList])
      } else {
        setRecipeList(res.data.recipeList)
      }
    })
  }

  useEffect(() => {
    console.log(selectFilterVal, selectedTags)
    if (selectFilterVal) {
      setCurrPage(0)
      getRecipes(0)
    }
  }, [selectFilterVal, selectedTags])

  useEffect(() => {
    if (currPage !== null && currPage !== 0) {
      getRecipes(currPage)
    }
  }, [currPage])

  return (
    <div className='page recipes-page'>
      <h1 className='title'>Recipes</h1>
      <SearchRecipesInput autoComplete={true} />
      <section className='recipes-container'>
        <RecipeFilters
          selectVal={selectFilterVal}
          setSelectVal={setSelectFilterVal}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
        />
        {recipeList[0] ? (
          <div className='recipes-list'>
            {recipeList.map((recipe, idx) => {
              return <RecipeThumbnail key={idx} recipe={recipe} />
            })}
            {totalResults && totalResults > recipeList.length ? (
              <button
                className='load-more-recipes-btn btn'
                onClick={() => setCurrPage(currPage + 1)}
              >
                Load More Recipes
              </button>
            ) : null}
          </div>
        ) : (
          <div>Loading Recipes...</div>
        )}
      </section>
    </div>
  )
}

export default Recipes
