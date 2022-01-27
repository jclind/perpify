import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai'
import slugify from 'slugify'

const SearchRecipesInput = () => {
  const [searchRecipeVal, setSearchRecipeVal] = useState('')

  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()

    if (searchRecipeVal) {
      console.log('yo')
      const slug = slugify(searchRecipeVal, '+')
      navigate(`recipes/search/${slug}`)
    }

    console.log('yo Im here now')
  }

  return (
    <form onSubmit={handleSubmit}>
      <label
        htmlFor='.search-recipes-input'
        className='search-recipes-input-label'
      >
        <AiOutlineSearch className='icon' />
        <input
          className='search-recipes-input'
          placeholder='Search All Recipes'
          onChange={e => setSearchRecipeVal(e.target.value)}
          value={searchRecipeVal}
        />
        {searchRecipeVal && (
          <div className='search-recipes-btn btn' onClick={handleSubmit}>
            Search
          </div>
        )}
      </label>
    </form>
  )
}

export default SearchRecipesInput
