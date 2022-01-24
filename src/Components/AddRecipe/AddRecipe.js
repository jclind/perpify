import React, { useState, useEffect } from 'react'
import './AddRecipe.scss'
import RecipeFormInput from './RecipeFormInput'
import RecipeFormTextArea from './RecipeFormTextArea'
import IngredientsList from './IngredientsList/IngredientsList'
import InstructionsList from './InstructionsList/InstructionsList'

const AddRecipe = () => {
  const [recipeTitle, setRecipeTitle] = useState('')
  const [recipePrepTime, setRecipePrepTime] = useState('')
  const [recipeCookTime, setRecipeCookTime] = useState('')
  const [recipeServingSize, setRecipeServingSize] = useState('')
  const [recipeFridgeLife, setRecipeFridgeLife] = useState('')
  const [recipeFreezerLife, setRecipeFreezerLife] = useState('')
  const [recipeDescription, setRecipeDescription] = useState('')

  const [recipeInstructions, setRecipeInstructions] = useState([])
  const [recipeIngredients, setRecipeIngredients] = useState([
    {
      name: 'Flour',
      quantity: '2 cups',
      id: '01027528-81ab-447b-9946-0d312b7b76bf',
    },
    {
      name: 'Sugar',
      quantity: '1/2 cup',
      id: '35a6f4a6-5b99-4ece-b5f2-22c4b4d3f1d2',
    },
    {
      name: 'Salt',
      quantity: '1 tsp, or to taste',
      id: 'b0af1d47-1b89-4544-828b-3cb11d21ba65',
    },
  ])

  useEffect(() => {
    const addRecipeFormData = JSON.parse(
      localStorage.getItem('addRecipeFormData')
    )
    console.log(addRecipeFormData)

    const title = addRecipeFormData?.recipeTitle
      ? addRecipeFormData.recipeTitle
      : ''
    setRecipeTitle(title)

    const prepTime = addRecipeFormData?.recipePrepTime
      ? addRecipeFormData.recipePrepTime
      : ''
    setRecipePrepTime(prepTime)

    const cookTime = addRecipeFormData?.recipeCookTime
      ? addRecipeFormData.recipeCookTime
      : ''
    setRecipeCookTime(cookTime)

    const servingSize = addRecipeFormData?.recipeServingSize
      ? addRecipeFormData.recipeServingSize
      : ''
    setRecipeServingSize(servingSize)

    const fridgeLife = addRecipeFormData?.recipeFridgeLife
      ? addRecipeFormData.recipeFridgeLife
      : ''
    setRecipeFridgeLife(fridgeLife)

    const freezerLife = addRecipeFormData?.recipeFreezerLife
      ? addRecipeFormData.recipeFreezerLife
      : ''
    setRecipeFreezerLife(freezerLife)

    const description = addRecipeFormData?.recipeDescription
      ? addRecipeFormData.recipeDescription
      : ''
    setRecipeDescription(description)

    const instructions = addRecipeFormData?.recipeInstructions
      ? addRecipeFormData.recipeInstructions
      : []
    setRecipeInstructions(instructions)

    const ingredients = addRecipeFormData?.ingredientsList
      ? addRecipeFormData.ingredientsList
      : []
    setRecipeIngredients(ingredients)
  }, [])

  useEffect(() => {
    const saveLocalRecipeData = () => {
      const addRecipeFormData = {
        recipeTitle,
        recipePrepTime,
        recipeCookTime,
        recipeServingSize,
        recipeFridgeLife,
        recipeFreezerLife,
        recipeDescription,
        recipeInstructions,
        recipeIngredients,
      }
      localStorage.setItem(
        'addRecipeFormData',
        JSON.stringify(addRecipeFormData)
      )
    }

    window.addEventListener('beforeunload', saveLocalRecipeData)

    return () => {
      window.removeEventListener('beforeunload', saveLocalRecipeData)
    }
  }, [
    recipeTitle,
    recipePrepTime,
    recipeCookTime,
    recipeServingSize,
    recipeFridgeLife,
    recipeFreezerLife,
    recipeDescription,
    recipeInstructions,
    recipeIngredients,
  ])

  const handleAddRecipeFormSubmit = e => {
    e.preventDefault()
  }

  return (
    <div className='add-recipe-page page'>
      <h1 className='title'>Create Your Own Recipe</h1>
      <div className='form-container'>
        <form
          action=''
          className='create-recipe-form'
          onSubmit={handleAddRecipeFormSubmit}
        >
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
          <div className='recipe-data'>
            <RecipeFormInput
              name={'Fridge Life (days)'}
              type={'number'}
              val={recipeFridgeLife}
              setVal={setRecipeFridgeLife}
              placeholder={'3'}
            />
            <RecipeFormInput
              name={'Freezer Life (days)'}
              type={'number'}
              val={recipeFreezerLife}
              setVal={setRecipeFreezerLife}
              placeholder={'40'}
            />
          </div>
          <RecipeFormTextArea
            name='Recipe Description'
            val={recipeDescription}
            setVal={setRecipeDescription}
            placeholder='Description of recipe...'
          />
          <InstructionsList
            recipeInstructions={recipeInstructions}
            setRecipeInstructions={setRecipeInstructions}
          />
          <IngredientsList
            recipeIngredients={recipeIngredients}
            setRecipeIngredients={setRecipeIngredients}
          />
        </form>
      </div>
    </div>
  )
}

export default AddRecipe
