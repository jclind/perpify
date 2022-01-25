import React, { useState, useEffect, useRef } from 'react'
import './AddRecipe.scss'
import RecipeFormInput from './RecipeFormInput'
import RecipeFormTextArea from './RecipeFormTextArea'
import IngredientsList from './IngredientsList/IngredientsList'
import InstructionsList from './InstructionsList/InstructionsList'
import RecipeImage from './RecipeImage/RecipeImage'
import { useRecipe } from '../../context/RecipeContext'

const AddRecipe = () => {
  const [recipeTitle, setRecipeTitle] = useState('')
  const [recipePrepTime, setRecipePrepTime] = useState('')
  const [recipeCookTime, setRecipeCookTime] = useState('')
  const [recipeServingSize, setRecipeServingSize] = useState('')
  const [recipeFridgeLife, setRecipeFridgeLife] = useState('')
  const [recipeFreezerLife, setRecipeFreezerLife] = useState('')
  const [recipeDescription, setRecipeDescription] = useState('')

  const [recipeInstructions, setRecipeInstructions] = useState([])
  const [recipeIngredients, setRecipeIngredients] = useState([])

  const [recipeImage, setRecipeImage] = useState('')

  const [undoClearForm, setUndoClearForm] = useState(false)

  const [error, setError] = useState('')
  const [loading, setLoading] = useState('')

  const { addRecipe } = useRecipe()

  const setStatesToLocalData = () => {
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

    const ingredients = addRecipeFormData?.recipeIngredients
      ? addRecipeFormData.recipeIngredients
      : []
    setRecipeIngredients(ingredients)
  }

  useEffect(() => {
    setStatesToLocalData()
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
    setError('')

    if (!recipeTitle) return setError('Please Enter Recipe Title')
    if (!recipePrepTime) return setError('Please Enter Prep time')
    if (!recipeCookTime) return setError('Please Enter Cook Time')
    if (!recipeServingSize) return setError('Please Enter Serving Size')
    if (recipeInstructions.length <= 0)
      return setError('Please Enter Instructions')
    if (recipeIngredients.length <= 0)
      return setError('Please Enter Ingredients')
    if (!recipeImage) return setError('Please Select Image')

    const recipeData = {
      recipeTitle,
      recipePrepTime,
      recipeCookTime,
      recipeServingSize,
      recipeFridgeLife,
      recipeFreezerLife,
      recipeDescription,
      recipeInstructions,
      recipeIngredients,
      recipeImage,
    }
  }

  const clearForm = () => {
    if (undoClearForm) {
      setUndoClearForm(false)
      return setStatesToLocalData()
    }

    setRecipeTitle('')
    setRecipePrepTime('')
    setRecipeCookTime('')
    setRecipeServingSize('')
    setRecipeFridgeLife('')
    setRecipeFreezerLife('')
    setRecipeDescription('')
    setRecipeInstructions([])
    setRecipeIngredients([])
    setUndoClearForm(true)
  }

  useEffect(() => {
    if (error) {
      addRecipeTitleRef.current.scrollIntoView()
    }
  }, [error])

  const addRecipeTitleRef = useRef()

  return (
    <div className='add-recipe-page page'>
      <h1 className='title' ref={addRecipeTitleRef}>
        Create Your Own Recipe
      </h1>
      <div className='form-container'>
        <form
          action=''
          className='create-recipe-form'
          onSubmit={handleAddRecipeFormSubmit}
        >
          {error && <div className='error'>{error}</div>}
          <RecipeFormInput
            name={'Title *'}
            val={recipeTitle}
            setVal={setRecipeTitle}
            placeholder={'Mexican Chipotle Bowl...'}
          />
          <div className='recipe-data'>
            <RecipeFormInput
              name={'Prep Time (min) *'}
              type={'number'}
              val={recipePrepTime}
              setVal={setRecipePrepTime}
              placeholder={'25'}
            />
            <RecipeFormInput
              name={'Cook Time (min) *'}
              type={'number'}
              val={recipeCookTime}
              setVal={setRecipeCookTime}
              placeholder={'35'}
            />
            <RecipeFormInput
              name={'Serving Size *'}
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
          <RecipeImage
            recipeImage={recipeImage}
            setRecipeImage={setRecipeImage}
          />
          <button className='btn add-recipe-btn'>Create Recipe</button>
        </form>
      </div>
      <button className='clear-form' onClick={clearForm}>
        {undoClearForm ? 'Undo' : 'Clear Form'}
      </button>
    </div>
  )
}

export default AddRecipe
