import React, { useState, useEffect, useContext } from 'react'
import {
  doc,
  setDoc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore'
import { db } from '../client/db'

const RecipeContext = React.createContext()

export function useRecipe() {
  return useContext(RecipeContext)
}

const RecipeProvider = ({ children }) => {
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
  const addRecipe = async (recipeData, setLoading, setError) => {
    console.log(recipeData)
  }

  const value = { getRecipe, addRecipe }
  return (
    <RecipeContext.Provider value={value}>{children}</RecipeContext.Provider>
  )
}

export default RecipeProvider
