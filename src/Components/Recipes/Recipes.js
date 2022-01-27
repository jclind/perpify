import React, { useState, useEffect } from 'react'
import './Recipes.scss'
import RecipeThumbnail from '../RecipeThumbnail/RecipeThumbnail'
import Select from 'react-select'
import { useRecipe } from '../../context/RecipeContext'

const Recipes = () => {
  const selectOptions = [
    { value: 'rating', label: 'Popular' },
    { value: 'newest', label: 'Time: Newest' },
    { value: 'oldest', label: 'Time: Oldest' },
  ]

  const [recipeList, setRecipeList] = useState([])
  const [selectVal, setSelectVal] = useState(selectOptions[0].value)

  const [loading, setLoading] = useState(false)

  const [isMorePaginationData, setIsMorePaginationData] = useState(true)
  const [isLoadMoreRecipesBtnVisible, setIsLoadMoreRecipesBtnVisible] =
    useState(true)

  const { getRecipes } = useRecipe()

  const handleSelectChange = e => {
    const value = e.value
    setSelectVal(value)
  }

  const getRecipeList = () => {
    const recipeQuery = {
      order: selectVal,
      limit: 8,
      start: recipeList.length,
    }
    getRecipes(recipeQuery).then(arr => {
      // set is more pagination data to true is arr is not empty
      setIsMorePaginationData(arr.length ? true : false)
      console.log(1)
      if (arr.length) {
        console.log(2)
        setRecipeList([...recipeList, ...arr])
      }
    })
  }

  const handleLoadMoreRecipes = () => {
    getRecipeList()
  }

  useEffect(() => {
    getRecipeList()
  }, [])

  return (
    <div className='page recipes-page'>
      <h1 className='title'>Recipes</h1>
      <section className='recipes-container'>
        <div className='filters'>
          <Select
            options={selectOptions}
            isSearchable={false}
            isClearable={false}
            className='select'
            onChange={handleSelectChange}
            defaultValue={selectOptions[0]}
          />
        </div>
        {recipeList[0] ? (
          <div className='recipes-list'>
            {recipeList.map((recipe, idx) => {
              return <RecipeThumbnail key={idx} recipe={recipe} />
            })}
            {isMorePaginationData && isLoadMoreRecipesBtnVisible ? (
              <button
                className='load-more-recipes-btn btn'
                onClick={handleLoadMoreRecipes}
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
