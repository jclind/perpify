import React, { useState, useEffect, useRef } from 'react'
import './IngredientsList.scss'
import IngredientsItem from './IngredientsItem'
import { v4 as uuidv4 } from 'uuid'

const IngredientsList = () => {
  const [ingredientsList, setIngredientsList] = useState([])
  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState('')

  const [error, setError] = useState('')

  const handleAddIngredient = e => {
    e.preventDefault()
    setError('')

    if (!name || !quantity) return setError('Please fill out both fields')

    setIngredientsList(prevState => [
      ...prevState,
      { name, quantity, id: uuidv4() },
    ])
    setName('')
    setQuantity('')
  }
  const deleteItem = id => {
    setIngredientsList(ingredientsList.filter(item => item.id !== id))
  }
  const updateItem = (updatedItem, id) => {
    console.log(ingredientsList)
    console.log(id)
    const tempIngredientIndex = ingredientsList.findIndex(item => {
      console.log(item.id, id)
      return item.id === id
    })
    console.log(tempIngredientIndex)
    setIngredientsList([
      ...ingredientsList.slice(0, tempIngredientIndex),
      { ...updatedItem },
      ...ingredientsList.slice(tempIngredientIndex + 1),
    ])
  }

  useEffect(() => {
    console.log(ingredientsList)
  }, [ingredientsList])

  return (
    <div className='ingredients-list'>
      <label className='label-title'>Ingredients</label>
      {error && <div className='error'>{error}</div>}
      <div className='inputs'>
        <input
          type='text'
          className='ingredient'
          placeholder='Ingredient name'
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          type='text'
          className='quantity'
          placeholder='Quantity ie. 2 tbs'
          value={quantity}
          onChange={e => setQuantity(e.target.value)}
        />
        <button
          className='add-ingredient-btn btn'
          onClick={handleAddIngredient}
        >
          Add Ingredient
        </button>
      </div>
      <div className='list'>
        {ingredientsList &&
          ingredientsList.map((ingredient, idx) => {
            return (
              <IngredientsItem
                ingredient={ingredient}
                deleteItem={deleteItem}
                updateItem={updateItem}
                key={idx}
              />
            )
          })}
      </div>
    </div>
  )
}

export default IngredientsList
