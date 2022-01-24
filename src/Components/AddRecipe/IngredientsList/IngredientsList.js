import React, { useState, useEffect, useRef } from 'react'
import './IngredientsList.scss'
import IngredientsItem from './IngredientsItem'
import { v4 as uuidv4 } from 'uuid'
import { capitalize } from '../../../util/capitalize'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { validateIngredientQuantityStr } from '../../../util/validateIngredientQuantityStr'

const IngredientsList = ({ recipeIngredients, setRecipeIngredients }) => {
  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState('')

  const [error, setError] = useState('')

  const ingredientNameRef = useRef()

  const handleAddIngredient = e => {
    e.preventDefault()
    setError('')

    if (!name || !quantity) return setError('Please fill out both fields')

    const quantityValidation = validateIngredientQuantityStr(quantity)
    if (quantityValidation.err) {
      const err = quantityValidation.err
      return setError(err)
    }
    setRecipeIngredients(prevState => [
      ...prevState,
      { name: capitalize(name), quantity, id: uuidv4() },
    ])
    ingredientNameRef.current.focus()
    setName('')
    setQuantity('')
  }
  const deleteIngredient = id => {
    setRecipeIngredients(recipeIngredients.filter(item => item.id !== id))
  }
  const updateIngredient = (updatedItem, id) => {
    setError('')

    const tempIngredientIndex = recipeIngredients.findIndex(
      item => item.id === id
    )

    const quantityValidation = validateIngredientQuantityStr(
      updatedItem.quantity
    )
    if (quantityValidation.err) {
      const err = quantityValidation.err
      setError(err)
      return false
    }

    setRecipeIngredients([
      ...recipeIngredients.slice(0, tempIngredientIndex),
      { ...updatedItem },
      ...recipeIngredients.slice(tempIngredientIndex + 1),
    ])
    return true
  }

  const handleOnDragEnd = param => {
    const srcIdx = param.source.index
    const desIdx = param.destination.index

    if (desIdx !== null) {
      console.log(srcIdx, desIdx)

      const tempIngredientsList = JSON.parse(JSON.stringify(recipeIngredients))

      const movedIngredient = tempIngredientsList.splice(srcIdx, 1)[0]

      tempIngredientsList.splice(desIdx, 0, movedIngredient)

      setRecipeIngredients(tempIngredientsList)
    }
  }

  return (
    <div className='ingredients-list'>
      <label className='label-title'>Ingredients</label>
      {error && <div className='error'>{error}</div>}
      <div className='inputs'>
        <input
          type='text'
          className='ingredient input'
          placeholder='Ingredient name'
          value={name}
          onChange={e => setName(e.target.value)}
          ref={ingredientNameRef}
        />
        <input
          type='text'
          className='quantity'
          placeholder='Qty: 1 1/2 cups, to taste'
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
      <DragDropContext onDragEnd={param => handleOnDragEnd(param)}>
        <Droppable droppableId='droppable-1'>
          {(provided, _) => (
            <div
              className='list'
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {recipeIngredients &&
                recipeIngredients.map((ingredient, idx) => {
                  return (
                    <IngredientsItem
                      ingredient={ingredient}
                      deleteItem={deleteIngredient}
                      updateItem={updateIngredient}
                      key={ingredient.id}
                      index={idx}
                    />
                  )
                })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}

export default IngredientsList
