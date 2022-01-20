import React, { useState, useEffect, useRef } from 'react'
import './IngredientsList.scss'
import IngredientsItem from './IngredientsItem'
import { v4 as uuidv4 } from 'uuid'
import { capitalize } from '../../../util/capitalize'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const IngredientsList = ({ ingredientsList, setIngredientsList }) => {
  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState('')

  const [error, setError] = useState('')

  const ingredientNameRef = useRef()

  const handleAddIngredient = e => {
    e.preventDefault()
    setError('')

    if (!name || !quantity) return setError('Please fill out both fields')

    setIngredientsList(prevState => [
      ...prevState,
      { name: capitalize(name), quantity, id: uuidv4() },
    ])
    ingredientNameRef.current.focus()
    setName('')
    setQuantity('')
  }
  const deleteItem = id => {
    setIngredientsList(ingredientsList.filter(item => item.id !== id))
  }
  const updateItem = (updatedItem, id) => {
    const tempIngredientIndex = ingredientsList.findIndex(
      item => item.id === id
    )
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
          ref={ingredientNameRef}
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
      <DragDropContext
        onDrapEnd={(...props) => {
          console.log(props)
        }}
      >
        <Droppable droppableId='droppable-1'>
          {(provided, _) => (
            <div
              className='list'
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {ingredientsList &&
                ingredientsList.map((ingredient, idx) => {
                  return (
                    <IngredientsItem
                      ingredient={ingredient}
                      deleteItem={deleteItem}
                      updateItem={updateItem}
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
