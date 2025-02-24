import { IngredientResponse, ingredientParser } from '@jclind/ingredient-parser'

import ObjectID from 'bson-objectid'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import dietLabels from 'src/recipeData/dietLabels'
import { calculateServingPrice } from 'src/util/calculateServingPrice'
import {
  GetSavedRecipesResponseType,
  IngredientsType,
  NewReviewType,
  NutritionDataType,
  OptionalReviewType,
  RecipeDBResponseType,
  RecipeFormType,
  RecipeSearchResponseType,
  RecipeType,
  ReviewType,
} from 'types'
import AuthAPI from './auth'
import { http, nutrition } from './http-common'
import { v4 as uuidv4 } from 'uuid'

class RecipeAPIClass {
  async getAllRecipes(
    page = 0,
    order = 'new',
    tags: string[] = [],
    cuisine: string = '',
    recipesPerPage = 5,
    query = ''
  ): Promise<RecipeDBResponseType> {
    let tagsArrParam = '' // For tags that have been chosen
    if (tags.length > 0) {
      tagsArrParam += '&tags='
      tags.forEach((tag, idx) => {
        tagsArrParam += `${tag},`

        // When the last tag is reached, leave off the last comma for backend array processing
        if (idx === tags.length - 1) {
          tagsArrParam += `${tag}`
        }
      })
    }

    const result = await http.get(
      `recipes?q=${query}&page=${page}&recipesPerPage=${recipesPerPage}&order=${order}&cuisine=${cuisine}${tagsArrParam}`
    )
    return result.data
  }
  search(
    query: string,
    tag = '',
    page = 0,
    order = 'new',
    recipesPerPage = 5
  ): Promise<RecipeDBResponseType[]> {
    return http.get(
      `recipes?q=${query.toString()}&page=${page}&tag=${tag}&order=${order}&recipesPerPage=${recipesPerPage}`
    )
  }
  async searchAutoCompleteRecipes(
    title = ''
  ): Promise<RecipeSearchResponseType[]> {
    const result = await http.get(`searchAutoCompleteRecipes?title=${title}`)
    return result.data
  }
  async getTrendingRecipes(limit = 4): Promise<RecipeType[]> {
    const result = await http.get(`getTrendingRecipes?limit=${limit}`)
    return result.data
  }
  async getRecipe(id: string): Promise<RecipeType> {
    const result = await http.get(`getRecipe?id=${id}`)
    return result.data
  }
  async deleteRecipe(recipeId: string, userId: string) {
    const result = await http.delete(
      `deleteRecipe?recipeId=${recipeId}&userId=${userId}`
    )
    return result.data
  }

  async saveRecipe(userId = '', recipeId = '') {
    return await http.put(`saveRecipe?userId=${userId}&recipeId=${recipeId}`)
  }
  async getSavedRecipe(
    userId = '',
    recipeId = ''
  ): Promise<GetSavedRecipesResponseType[]> {
    const result = await http.get(
      `getSavedRecipe?userId=${userId}&recipeId=${recipeId}`
    )
    return result.data
  }
  async unsaveRecipe(userId = '', recipeId = '') {
    return await http.put(`unsaveRecipe?userId=${userId}&recipeId=${recipeId}`)
  }
  async madeRecipe(recipeId: string) {
    const userId = AuthAPI.getUID()
    if (!userId) return

    const result = await http.post(
      `madeRecipe?userId=${userId}&recipeId=${recipeId}`
    )
    return result.data
  }
  async checkMadeRecipe(recipeId: string) {
    const userId = AuthAPI.getUID()
    if (!userId) return

    const result = await http.get(
      `checkMadeRecipe?userId=${userId}&recipeId=${recipeId}`
    )
    return result.data
  }

  uploadRecipeImage = async (
    imageFile: File,
    setProgress: (val: number) => void
  ): Promise<string> => {
    if (imageFile) {
      const storage = getStorage()

      const recipeImagesRef = ref(storage, `recipeImages/${imageFile.name}`)
      setProgress(40)
      await uploadBytes(recipeImagesRef, imageFile)
      setProgress(50)
      const fileUrl = await getDownloadURL(recipeImagesRef)
      setProgress(70)
      return fileUrl
    } else {
      console.log('enter image')
      return ''
    }
  }

  async addRecipe(
    recipeData: RecipeFormType,
    setProgress: (val: number) => void
  ): Promise<string | null> {
    try {
      setProgress(10)
      console.log('before authorUsername')
      const authorUsername: string | null = await AuthAPI.getUsername()
      const userId = await AuthAPI.getUID()
      console.log('after authorUsername', authorUsername)
      if (!authorUsername || !userId) throw Error('User does not exist')
      console.log('before recipeImage')
      const recipeImage: string = await this.uploadRecipeImage(
        recipeData.recipeImage,
        setProgress
      )
      console.log('after recipeImage', recipeImage)
      const servingPrice: number = calculateServingPrice(
        recipeData.ingredients,
        recipeData.servings
      )
      setProgress(80)
      const totalTime: number = recipeData.prepTime + (recipeData.cookTime ?? 0)
      console.log('before nutritionDataRes')
      const nutritionDataRes = await this.getRecipeNutrition(
        recipeData.ingredients
      )
      console.log('after nutritionDataRes', nutritionDataRes)
      const nutritionData = nutritionDataRes.nutritionData
      const nutritionLabels = nutritionDataRes.dietLabels
      const recipeId = '' + ObjectID()
      const returnRecipeData: RecipeType & { userId: string } = {
        _id: recipeId,
        userId,
        title: recipeData.title,
        prepTime: recipeData.prepTime,
        cookTime: recipeData.cookTime,
        servings: recipeData.servings,
        fridgeLife: recipeData.fridgeLife,
        freezerLife: recipeData.freezerLife,
        description: recipeData.description,
        ingredients: recipeData.ingredients,
        instructions: recipeData.instructions,
        recipeImage,
        nutritionData,
        totalTime,
        authorUsername,
        rating: {
          rateCount: 0,
          rateValue: 0,
        },
        createdAt: new Date().getTime().toString(),
        editedAt: null,
        servingPrice,
        cuisine: recipeData.cuisine,
        mealTypes: recipeData.mealTypes,
        nutritionLabels,
        views: 0,
        numTimesSaved: 0,
        numTimesMade: 0,
      }
      setProgress(90)
      console.log('before http.post', returnRecipeData)
      const response = await http.post('addRecipe', returnRecipeData)
      console.log('response:', response)
      return recipeId
      // return await http.post('addRecipe', returnRecipeData)
    } catch (error) {
      console.log(error)
      // !CATCH ERROR
      return null
    }
  }
  async getRecipeNutrition(ingrArr: IngredientsType[]) {
    const ingrData: { title: string; ingr: string[] } = {
      title: 'recipe 1',
      ingr: [],
    }

    ingrArr.forEach(ingr => {
      if ('parsedIngredient' in ingr) {
        const { quantity, unit, ingredient } = ingr.parsedIngredient

        if (quantity) {
          const str = `${quantity} ${unit || ''} ${ingredient}`
          ingrData.ingr.push(str)
        }
      }
    })
    const nutritionResultRes = await nutrition.post(
      `nutrition-details?app_id=${process.env.REACT_APP_EDAMAM_APP_ID}&app_key=${process.env.REACT_APP_EDAMAM_APP_KEY}`,
      ingrData
    )

    const nutritionResult: NutritionDataType = nutritionResultRes.data

    if (!nutritionResult) return { nutritionData: null, dietLabels: null }

    const currDietLabels: string[] = []

    const returnedNutritionLabels = [
      ...nutritionResult.dietLabels,
      ...nutritionResult.healthLabels,
    ]

    dietLabels.forEach(l => {
      if (returnedNutritionLabels.includes(l.toUpperCase())) {
        currDietLabels.push(l)
      }
    })

    return { nutritionData: nutritionResult, dietLabels: currDietLabels }
  }

  async addRecipeTag(data: string) {
    return await http.post('addRecipeTag', data)
  }

  async searchRecipeTags(query: string, tagsArr: { text: string }[]) {
    const tagsArrText =
      tagsArr && tagsArr.length > 0 ? tagsArr.map(tag => tag.text) : []
    let tagsArrParam = '' // For tags that have already been chosen
    if (tagsArrText.length > 0) {
      tagsArrParam += '&selectedTags='
      tagsArrText.forEach(tag => {
        tagsArrParam += `${tag},`
      })
    }

    return await http.get(`searchRecipeTags?q=${query}${tagsArrParam}`)
  }

  async getRecipeTags(limit = 5) {
    return await http.get(`getRecipeTags?limit=${limit}`)
  }

  // Ratings / Reviews
  async addRating(recipeId: string, rating: number) {
    const username = await AuthAPI.getUsername()
    if (!username) return null

    return await http.put(
      `addRating?username=${username}&recipeId=${recipeId}&rating=${rating}`
    )
  }

  async newReview(recipeId: string, text: string): Promise<ReviewType | null> {
    const uid = AuthAPI.getUID()
    if (!uid) return null

    const data: NewReviewType = {
      userId: uid,
      recipeId,
      reviewText: text,
    }
    const result = await http.put(`newReview`, data)
    return result.data
  }
  async checkIfReviewed(recipeId: string) {
    const username = await AuthAPI.getUsername()
    if (!username) return null

    const result = await http.get(
      `checkIfReviewed?username=${username}&recipeId=${recipeId}`
    )
    return result.data
  }
  async editReview(recipeId: string, text: string) {
    const username = await AuthAPI.getUsername()
    if (!username) return null
    return await http.put(
      `editReview?username=${username}&recipeId=${recipeId}&text=${text}`
    )
  }
  async deleteReview(recipeId: string) {
    const userId = await AuthAPI.getUID()
    if (!userId) return null
    return await http.put(`deleteReview?userId=${userId}&recipeId=${recipeId}`)
  }
  async getReviews(
    recipeId: string,
    filter = 'new',
    page: number,
    reviewsPerPage = 5
  ) {
    const username = await AuthAPI.getUsername()
    const result = await http.get(
      `getReviews?username=${username}&recipeId=${recipeId}&page=${page}&reviewsPerPage=${reviewsPerPage}&filter=${filter}`
    )
    return result.data
  }
  async getSingleUserReviews(
    page = 0,
    reviewsPerPage = 5,
    filter = 'new',
    returnRecipeData = false
  ): Promise<{ reviews: OptionalReviewType[]; totalCount: number } | null> {
    const username = await AuthAPI.getUsername()
    if (!username) return null
    const reviewResult = await http.get(
      `getSingleUserReviews?username=${username}&page=${page}&reviewsPerPage=${reviewsPerPage}&filter=${filter}&returnRecipeData=${returnRecipeData}`
    )
    return reviewResult.data
  }

  // Ingredients
  async getIngredientData(val: string): Promise<IngredientsType> {
    const apiKey = process.env.REACT_APP_SPOONACULAR_API_KEY

    if (!apiKey) {
      throw new Error('Spoonacular API key is not defined')
    }

    const result: IngredientResponse = await ingredientParser(val, apiKey)

    const data: IngredientsType = { ...result, id: uuidv4() }

    return data
  }

  // User
  async getSavedRecipes(
    page: number,
    recipesPerPage: number,
    order: string
  ): Promise<{ recipes: RecipeType[]; totalCount: number } | null> {
    const uid = AuthAPI.getUID()
    if (!uid) return null
    const result = await http.get(
      `getSavedRecipes?userId=${uid}&page=${page}&recipesPerPage=${recipesPerPage}&order=${order}`
    )
    return result.data
  }
}

const RecipeAPI = new RecipeAPIClass()

export default RecipeAPI
