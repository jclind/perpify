import http from './http-common'

class RecipeAPI {
  getAll(page = 0, order = 'new', tags = []) {
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

    console.log(tagsArrParam)

    return http.get(`recipes?page=${page}&order=${order}${tagsArrParam}`)
  }
  search(query, tag = '', page = 0, order = 'new', recipesPerPage = 5) {
    return http.get(
      `recipes?q=${query.toString()}&page=${page}&tag=${tag}&order=${order}&recipesPerPage=${recipesPerPage}`
    )
  }
  async getTrendingRecipes(limit = 4) {
    return await http.get(`getTrendingRecipes?limit=${limit}`)
  }
  async getRecipe(id) {
    return await http.get(`getRecipe?id=${id}`)
  }

  async addRecipe(data) {
    return await http.post('addRecipe', data)
  }

  async addRecipeTag(data) {
    return await http.post('addRecipeTag', data)
  }

  async searchRecipeTags(q, tagsArr) {
    let tagsArrParam = '' // For tags that have already been chosen
    if (tagsArr.length > 0) {
      tagsArrParam += '&selectedTags='
      tagsArr.forEach(tag => {
        tagsArrParam += `${tag},`
      })
    }

    return await http.get(`searchRecipeTags?q=${q}${tagsArrParam}`)
  }

  async getRecipeTags(limit = 5) {
    return await http.get(`getRecipeTags?limit=${limit}`)
  }

  // getAll(page = 0) {
  //   return http.get(`restaurants?page=${page}`)
  // }

  // get(id) {
  //   return http.get(`/restaurant?id=${id}`)
  // }

  // find(query, by = 'name', page = 0) {
  //   return http.get(`restaurants?${by}=${query}&page=${page}`)
  // }

  // createReview(data) {
  //   return http.post('/reviewNew', data)
  // }

  // updateReview(data) {
  //   return http.put('/reviewEdit', data)
  // }

  // deleteReview(id, userId) {
  //   return http.delete(`/reviewDelete?id=${id}`, { data: { user_id: userId } })
  // }

  // getCuisines() {
  //   return http.get(`/restaurants/cuisines`)
  // }
}

export default new RecipeAPI()
