import React, { useState, useEffect, useContext } from 'react'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid'
import { useAuth } from './AuthContext'
import RecipeAPI from '../api/recipes'
import ObjectID from 'bson-objectid'

const RecipeContext = React.createContext()

export function useRecipe() {
  return useContext(RecipeContext)
}

const RecipeProvider = ({ children }) => {
  const { user } = useAuth()

  const getRecipe = async recipeId => {
    if (recipeId) {
      return await RecipeAPI.getRecipe(recipeId)
    }
    return null
  }

  const searchRecipes = async (
    recipeQuery,
    tag,
    page,
    order,
    recipesPerPage
  ) => {
    if (recipeQuery) {
      return await RecipeAPI.search(
        recipeQuery,
        tag,
        page,
        order,
        recipesPerPage
      )
    }

    return await RecipeAPI.search(recipeQuery, tag, page, order, recipesPerPage)
  }
  const searchAutoCompleteRecipes = async title => {
    if (title) {
      return await RecipeAPI.searchAutoComplete(title)
    }
  }

  const getTrendingRecipes = async limit => {
    return await RecipeAPI.getTrendingRecipes(limit)
  }

  // Uploads image to firebase storage and returns url of image to be kept in database
  const uploadImageToStorage = async image => {
    if (image) {
      const storage = getStorage()

      const recipeImagesRef = ref(storage, `recipeImages/${image.name}`)

      await uploadBytes(recipeImagesRef, image)
      const fileUrl = await getDownloadURL(recipeImagesRef)
      return fileUrl
    } else {
      console.log('enter image')
    }
  }

  const addRecipe = async (
    recipeData,
    setLoading,
    loadingProgress,
    setLoadingProgress,
    setError
  ) => {
    setLoadingProgress(loadingProgress + 10)

    // Get image url for submitted image, stored in firebase (for now)
    const recipeImage = recipeData.recipeImage
    const recipeImageUrl = await uploadImageToStorage(recipeImage)

    setLoadingProgress(loadingProgress + 50)

    const recipeId = `recipe-${uuidv4()}`
    const userUID = user.uid

    const { prepTime, cookTime, additionalTime } = recipeData
    const tempPrepTime = prepTime ? prepTime : 0
    const tempCookTime = cookTime ? cookTime : 0
    const tempAdditionalTime = additionalTime ? additionalTime : 0
    const totalTime = (
      Number(tempPrepTime) +
      Number(tempCookTime) +
      Number(tempAdditionalTime)
    ).toString()

    const fullRecipeData = {
      ...recipeData,
      _id: ObjectID(),
      title: recipeData.title.toLowerCase(), // Needed for title search later on.
      totalTime,
      recipeImage: recipeImageUrl,
      authorId: userUID,
      rating: '0',
      tags: recipeData.tags.map(tag => tag.text), // Map through tags to only return tag text which will be unique
      createdAt: Date.now().toString(),
      editedAt: null,
    }

    let tagsAreValid = true
    // Validate each entered tag and return false if any tag is not valid
    recipeData.tags.forEach(tag => {
      const isTagValid = validateTag(tag, recipeData.tags)
      if (!isTagValid) tagsAreValid = false // If the tag is not valid, set tagsAreValid to false to later return before adding recipe to database
    })

    if (!tagsAreValid) {
      return setError('Tags are not valid, please re-enter them correctly')
    } else {
      addTags(recipeData.tags)
    }

    RecipeAPI.addRecipe(fullRecipeData)
      .then(() => {
        setLoading(false)
        setLoadingProgress(100)
      })
      .catch(err => {
        setError(err)
      })

    setLoadingProgress(90)
  }

  const saveRecipe = async (userId, recipeId) => {
    return await RecipeAPI.saveRecipe(userId, recipeId)
  }
  const getSavedRecipe = async (userId, recipeId) => {
    return await RecipeAPI.getSavedRecipe(userId, recipeId)
  }
  const unsaveRecipe = async (userId, recipeId) => {
    return await RecipeAPI.unsaveRecipe(userId, recipeId)
  }

  // Tags
  const addTags = tags => {
    tags.forEach(tag => {
      RecipeAPI.addRecipeTag(tag)
    })
  }

  const validateTag = (currTagText, tagsArr) => {
    if (currTagText.length < 3) return false
    if (currTagText.length > 20) return false
    const tagExists = tagsArr.filter(tag => tag.text === currTagText)
    if (tagExists.length !== 0) return false

    return true
  }

  const searchTags = async (str, tagsArr) => {
    // If tags array exists and the length is greater than 0, get text from each tags object and push to tagsArrText variable
    const tagsArrText =
      tagsArr && tagsArr.length > 0 ? tagsArr.map(tag => tag.text) : []

    return await RecipeAPI.searchRecipeTags(str, tagsArrText)
  }

  const getTopTags = async limit => {
    return await RecipeAPI.getRecipeTags(limit)
  }

  // Reviews
  const addRating = async (recipeId, rating) => {
    return await RecipeAPI.addRating(user.uid, recipeId, rating)
  }

  const newReview = async (recipeId, text) => {
    const data = {
      userId: user.uid,
      recipeId,
      text,
    }

    return await RecipeAPI.newReview(data)
  }
  const checkIfReviewed = async recipeId => {
    return await RecipeAPI.checkIfReviewed(user.uid, recipeId)
  }
  const deleteReview = async recipeId => {
    return await RecipeAPI.deleteReview(user.uid, recipeId)
  }
  const getReviews = async (recipeId, page, reviewsPerPage) => {
    return await RecipeAPI.getReviews(user.uid, recipeId, page, reviewsPerPage)
  }

  const value = {
    getRecipe,
    searchRecipes,
    searchAutoCompleteRecipes,
    getTrendingRecipes,
    addRecipe,
    saveRecipe,
    getSavedRecipe,
    unsaveRecipe,
    validateTag,
    searchTags,
    getTopTags,
    addRating,
    newReview,
    checkIfReviewed,
    deleteReview,
    getReviews,
  }
  return (
    <RecipeContext.Provider value={value}>{children}</RecipeContext.Provider>
  )
}

export default RecipeProvider
