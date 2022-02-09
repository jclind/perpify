import React, { useState, useEffect, useRef } from 'react'
import './AddRecipe.scss'
import RecipeFormInput from './RecipeFormInput'
import RecipeFormTextArea from './RecipeFormTextArea'
import TimeInput from './TimeInput/TimeInput'
import IngredientListContainer from './IngredientsList/IngredientListContainer'
import InstructionsContainer from './InstructionsList/InstructionsContainer'
import RecipeImage from './RecipeImage/RecipeImage'
import { useRecipe } from '../../context/RecipeContext'
import { TailSpin } from 'react-loader-spinner'
import LoadingBar from 'react-top-loading-bar'
import RecipeTags from './RecipeTags/RecipeTags'
import { Navigate, useNavigate } from 'react-router-dom'

const AddRecipe = () => {
  const [recipeTitle, setRecipeTitle] = useState('')
  const [recipePrepTime, setRecipePrepTime] = useState('')
  const [recipeCookTime, setRecipeCookTime] = useState('')
  const [recipeAdditionalTime, setRecipeAdditionalTime] = useState('')
  const [recipeServingSize, setRecipeServingSize] = useState('')
  const [recipeFridgeLife, setRecipeFridgeLife] = useState('')
  const [recipeFreezerLife, setRecipeFreezerLife] = useState('')
  const [recipeDescription, setRecipeDescription] = useState('')

  const [recipeIngredients, setRecipeIngredients] = useState([
    { name: 'list1', list: [] },
  ])
  const [recipeInstructions, setRecipeInstructions] = useState([
    { name: 'list1', list: [] },
  ])

  const [recipeTags, setRecipeTags] = useState([])

  const [recipeImage, setRecipeImage] = useState('')

  const [undoClearForm, setUndoClearForm] = useState(false)

  const [error, setError] = useState('')
  const [loading, setLoading] = useState('')
  const [loadingProgress, setLoadingProgress] = useState(0)

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

    const additionalTime = addRecipeFormData?.recipeAdditionalTime
      ? addRecipeFormData.recipeAdditionalTime
      : ''
    setRecipeAdditionalTime(additionalTime)

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

    const ingredients = addRecipeFormData?.recipeIngredients
      ? addRecipeFormData.recipeIngredients
      : [{ name: 'list1', list: [] }]
    setRecipeIngredients(ingredients)

    const instructions = addRecipeFormData?.recipeInstructions
      ? addRecipeFormData.recipeInstructions
      : [{ name: 'list1', list: [] }]
    setRecipeInstructions(instructions)
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
        recipeAdditionalTime,
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
    recipeAdditionalTime,
    recipeServingSize,
    recipeFridgeLife,
    recipeFreezerLife,
    recipeDescription,
    recipeInstructions,
    recipeIngredients,
  ])

  const handleAddRecipeFormSubmit = e => {
    const returnError = msg => {
      setLoading(false)
      setError(msg)
    }
    e.preventDefault()
    setError('')
    setLoading(true)

    if (!recipeTitle) return returnError('Please Enter Recipe Title')
    if (!recipePrepTime) return returnError('Please Enter Prep time')
    if (!recipeCookTime) return returnError('Please Enter Cook Time')
    if (!recipeServingSize) return returnError('Please Enter Serving Size')
    if (recipeInstructions.length <= 0)
      return returnError('Please Enter Instructions')
    if (recipeIngredients.length <= 0)
      return returnError('Please Enter Ingredients')
    if (!recipeImage) return returnError('Please Select Image')

    const recipeData = {
      title: recipeTitle,
      prepTime: recipePrepTime,
      cookTime: recipeCookTime,
      additionalTime: recipeAdditionalTime,
      servings: recipeServingSize,
      fridgeLife: recipeFridgeLife,
      freezerLife: recipeFreezerLife,
      description: recipeDescription,
      instructions: recipeInstructions,
      ingredients: recipeIngredients,
      recipeImage: recipeImage,
      tags: recipeTags,
    }

    addRecipe(
      recipeData,
      setLoading,
      loadingProgress,
      setLoadingProgress,
      setError
    ).then(() => {
      // navigate('/')
      clearForm()
    })
    // .catch(err => {
    //   setLoading(false)
    //   setError(err)
    // })
  }

  const clearForm = () => {
    if (undoClearForm) {
      setUndoClearForm(false)
      return setStatesToLocalData()
    }

    setRecipeTitle('')
    setRecipePrepTime('')
    setRecipeCookTime('')
    setRecipeAdditionalTime('')
    setRecipeServingSize('')
    setRecipeFridgeLife('')
    setRecipeFreezerLife('')
    setRecipeDescription('')
    setRecipeInstructions([])
    setRecipeIngredients([])
    setRecipeImage('')
    setRecipeTags([])
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
      <LoadingBar
        color='#ff5722'
        progress={loadingProgress}
        onLoaderFinished={() => setLoadingProgress(0)}
      />
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
          <div className='recipe-data times'>
            <TimeInput
              label='Prep Time *'
              val={recipePrepTime}
              setVal={setRecipePrepTime}
            />
            <TimeInput
              label='Cook Time'
              val={recipeCookTime}
              setVal={setRecipeCookTime}
            />
            <TimeInput
              label='Additional Time'
              val={recipeAdditionalTime}
              setVal={setRecipeAdditionalTime}
            />
            {/* <RecipeFormInput
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
              name={'Additional Time'}
              type={'text'}
              val={recipeAdditionalTime}
              setVal={setRecipeAdditionalTime}
              placeholder={'1 day'}
            /> */}
          </div>
          <div className='recipe-data'>
            <RecipeFormInput
              name={'Serving Size *'}
              type={'number'}
              val={recipeServingSize}
              setVal={setRecipeServingSize}
              placeholder={'6'}
            />
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
          {/* <IngredientsList
            recipeIngredients={recipeIngredients}
            setRecipeIngredients={setRecipeIngredients}
          /> */}
          <IngredientListContainer
            recipeIngredients={recipeIngredients}
            setRecipeIngredients={setRecipeIngredients}
          />
          <InstructionsContainer
            recipeInstructions={recipeInstructions}
            setRecipeInstructions={setRecipeInstructions}
          />
          <RecipeImage
            recipeImage={recipeImage}
            setRecipeImage={setRecipeImage}
          />
          <RecipeTags tags={recipeTags} setTags={setRecipeTags} />
          <button type='submit' className='btn add-recipe-btn'>
            {loading ? (
              <TailSpin
                heigth='30'
                width='30'
                color='white'
                arialLabel='loading'
                className='spinner'
              />
            ) : (
              'Create Recipe'
            )}
          </button>
        </form>
      </div>
      <button className='clear-form' onClick={clearForm}>
        {undoClearForm ? 'Undo' : 'Clear Form'}
      </button>
    </div>
  )
}

export default AddRecipe
