import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useRecipe } from '../../context/RecipeContext'

const SearchRecipesPage = () => {
  const params = useParams()
  const queryString = params.searchQuery.split('+').join(' ')

  const { searchRecipes } = useRecipe()

  useEffect(() => {
    searchRecipes(queryString).then(arr => {
      console.log(arr)
    })
  }, [])

  return (
    <div className='search-recipes-page page'>
      Search Recipes Page: {queryString}
    </div>
  )
}

export default SearchRecipesPage
