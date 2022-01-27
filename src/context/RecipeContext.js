import React, { useState, useEffect, useContext } from 'react'
import {
  doc,
  setDoc,
  getDoc,
  collection,
  query,
  limit,
  orderBy,
  startAfter,
  where,
  getDocs,
} from 'firebase/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { db } from '../client/db'
import { v4 as uuidv4 } from 'uuid'
import { useAuth } from './AuthContext'

const RecipeContext = React.createContext()

export function useRecipe() {
  return useContext(RecipeContext)
}

const RecipeProvider = ({ children }) => {
  const { user } = useAuth()
  const getRecipe = async recipeId => {
    if (recipeId) {
      const recipesRef = collection(db, 'recipes')
      const q = query(recipesRef, where('recipeId', '==', recipeId))

      const querySnapshot = await getDocs(q)
      const tempRecipeData = []
      querySnapshot.forEach(doc => {
        tempRecipeData.push(doc.data())
      })
      return tempRecipeData[0]
    }
    return null
  }

  let latestsSearchRecipesDoc = null
  const searchRecipes = async recipeQuery => {
    const q = query(
      collection(db, 'recipes'),
      limit(8),
      where('title', '==', recipeQuery)
    )
    const docSnaps = await getDocs(q)

    latestsSearchRecipesDoc = docSnaps.docs[docSnaps.docs.length - 1]

    let tempRecipesArr = []
    docSnaps.forEach(doc => {
      tempRecipesArr.push(doc.data())
    })

    return tempRecipesArr
  }

  let latestRecipeDoc = null

  const getRecipes = async recipeQuery => {
    const q = query(
      collection(db, 'recipes'),
      orderBy(recipeQuery.order, 'desc'),
      startAfter(latestRecipeDoc || ''),
      limit(recipeQuery.limit)
    )
    const docSnaps = await getDocs(q)

    latestRecipeDoc = docSnaps.docs[docSnaps.docs.length - 1]

    let tempRecipesArr = []
    docSnaps.forEach(doc => {
      tempRecipesArr.push(doc.data())
    })

    return tempRecipesArr
  }

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
    const recipeImage = recipeData.recipeImage

    const recipeImageUrl = await uploadImageToStorage(recipeImage)
    setLoadingProgress(loadingProgress + 50)
    console.log(new Date().getTime())
    console.log(recipeImageUrl)

    const recipeId = `recipe-${uuidv4()}`
    const userUID = user.uid

    const { prepTime, cookTime, additionalTime } = recipeData
    const tempPrepTime = prepTime ? prepTime : 0
    const tempCookTime = cookTime ? cookTime : 0
    const tempAdditionalTime = additionalTime ? additionalTime : 0
    const totalTime =
      Number(tempPrepTime) + Number(tempCookTime) + Number(tempAdditionalTime)

    const fullRecipeData = {
      ...recipeData,
      totalTime,
      recipeImage: recipeImageUrl,
      authorId: userUID,
      rating: 0,
      recipeId,
      dateCreated: new Date(),
    }

    const recipesRef = doc(db, 'recipes', recipeId)
    await setDoc(recipesRef, { ...fullRecipeData }).catch(err => {
      setLoading(false)
      setLoadingProgress(0)
      setError(err)
    })
    setLoadingProgress(90)
    console.log(new Date().getTime())

    console.log(recipeImage)
    console.log(recipeData)
  }

  const value = { getRecipe, searchRecipes, getRecipes, addRecipe }
  return (
    <RecipeContext.Provider value={value}>{children}</RecipeContext.Provider>
  )
}

export default RecipeProvider
