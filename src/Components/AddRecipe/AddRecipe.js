import React, { useState } from 'react'
import './AddRecipe.scss'
import RecipeFormInput from './RecipeFormInput'
import RecipeFormTextArea from './RecipeFormTextArea'

const AddRecipe = () => {
  const [recipeTitle, setRecipeTitle] = useState('')
  const [recipePrepTime, setRecipePrepTime] = useState(null)
  const [recipeCookTime, setRecipeCookTime] = useState(null)
  const [recipeServingSize, setRecipeServingSize] = useState(null)
  const [recipeDescription, setRecipeDescription] = useState('')

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
              val={recipePrepTime}
              setVal={setRecipePrepTime}
              placeholder={'25'}
            />
            <RecipeFormInput
              name={'Cook Time (min)'}
              type={'number'}
              val={recipeCookTime}
              setVal={setRecipeCookTime}
              placeholder={'35'}
            />
            <RecipeFormInput
              name={'Serving Size'}
              type={'number'}
              val={recipeServingSize}
              setVal={setRecipeServingSize}
              placeholder={'6'}
            />
          </div>
          <RecipeFormTextArea
            name='Recipe Description'
            val={recipeDescription}
            setVal={setRecipeDescription}
            placeholder
          />
        </form>
      </div>
    </div>
  )
}

export default AddRecipe
