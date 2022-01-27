import * as functions from 'firebase-functions'

const env = functions.config()

import * as algoliasearch from 'algoliasearch'

const client = algoliasearch(env.algolia.appid, env.algolia.apikey)
const index = client.initIndex('recipe')

const indexRecipe = functions.firestore
  .document('recipe/recipeId')
  .onCreate((snap, context) => {
    const data = snap.data()
    const objectId = snap.id

    return index.addObject({
      objectId,
      ...data,
    })
  })
