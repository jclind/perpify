import React, { useState } from 'react'
import './AddRecipe.scss'
import RecipeFormInput from './RecipeFormInput'

const AddRecipe = () => {
  const [recipeTitle, setRecipeTitle] = useState('')

  return (
    <div className='add-recipe-page page'>
      <h1 className='title'>Create Your Own Recipe</h1>
      <div className='form-container'>
        <form action='' className='create-recipe-form'>
          <RecipeFormInput
            name={'Title'}
            val={recipeTitle}
            setVal={setRecipeTitle}
            placeholder={'Mexican Chipotle Bowl...'}
          />
          <div className='recipe-data'>
            <RecipeFormInput
              name={'Prep Time (min)'}
              type={'number'}
              val={recipeTitle}
              setVal={setRecipeTitle}
              placeholder={'25'}
            />
            <RecipeFormInput
              name={'Cook Time (min)'}
              type={'number'}
              val={recipeTitle}
              setVal={setRecipeTitle}
              placeholder={'35'}
            />
            <RecipeFormInput
              name={'Serving Size'}
              type={'number'}
              val={recipeTitle}
              setVal={setRecipeTitle}
              placeholder={'6'}
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddRecipe
