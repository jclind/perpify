import React, { useState } from 'react'
import IngredientListV2 from './IngredientListV2'
import { BsPlusCircle } from 'react-icons/bs'

const IngredientListContainer = ({
  recipeIngredients,
  setRecipeIngredients,
}) => {
  const addList = () => {
    setRecipeIngredients(prevState => [
      ...prevState,
      { name: `list${recipeIngredients.length + 1}`, list: [] },
    ])
  }
  const removeList = idx => {
    const newList = [
      ...recipeIngredients.slice(0, idx),
      ...recipeIngredients.slice(idx + 1),
    ]

    setRecipeIngredients(newList)
  }

  const handleSet = (val, idx) => {
    const tempIngredients = JSON.parse(JSON.stringify(recipeIngredients))
    tempIngredients[idx].list.push(val)
    setRecipeIngredients(tempIngredients)
  }
  const handleUpdate = (updatedArr, idx) => {
    const data = { ...recipeIngredients[idx], list: [...updatedArr] }
    const tempIngredients = JSON.parse(JSON.stringify(recipeIngredients))
    tempIngredients[idx] = data

    setRecipeIngredients(tempIngredients)
  }

  return (
    <div className='ingredients-container'>
      <label className='label-title'>Ingredients *</label>
      {recipeIngredients.length > 0 &&
        recipeIngredients.map((list, idx) => {
          return (
            <div className='ingredients-list-container' key={idx}>
              <IngredientListV2
                recipeIngredients={list.list}
                setRecipeIngredients={(val, idx) => handleSet(val, idx)}
                updateRecipeIngredients={(val, idx) => handleUpdate(val, idx)}
                index={idx}
                isMultipleLists={recipeIngredients.length > 1}
                removeList={removeList}
              />
            </div>
          )
        })}

      <button
        type='button'
        className='add-ingredient-list-btn btn'
        onClick={addList}
      >
        <BsPlusCircle className='icon' />
        Add Another Ingredient List
      </button>
    </div>
  )
}

export default IngredientListContainer
