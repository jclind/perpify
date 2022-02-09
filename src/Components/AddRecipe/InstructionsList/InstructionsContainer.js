import React from 'react'
import InstructionsList from './InstructionsList'
import { BsPlusCircle } from 'react-icons/bs'

const InstructionsContainer = ({
  recipeInstructions,
  setRecipeInstructions,
}) => {
  const addList = () => {
    setRecipeInstructions(prevState => [
      ...prevState,
      { name: `list${recipeInstructions.length + 1}`, list: [] },
    ])
  }
  const removeList = idx => {
    const newList = [
      ...recipeInstructions.slice(0, idx),
      ...recipeInstructions.slice(idx + 1),
    ]

    setRecipeInstructions(newList)
  }

  const handleSet = (val, idx) => {
    const tempIngredients = JSON.parse(JSON.stringify(recipeInstructions))
    tempIngredients[idx].list.push(val)
    setRecipeInstructions(tempIngredients)
  }
  const handleUpdate = (updatedArr, idx) => {
    const data = { ...recipeInstructions[idx], list: [...updatedArr] }
    const tempIngredients = JSON.parse(JSON.stringify(recipeInstructions))
    tempIngredients[idx] = data

    setRecipeInstructions(tempIngredients)
  }

  return (
    <div className='instructions-container'>
      <label className='label-title'>Instruction Steps *</label>
      {recipeInstructions.length > 0 &&
        recipeInstructions.map((list, idx) => {
          console.log(list)
          return (
            <div className='instructions-list-container' key={idx}>
              <InstructionsList
                recipeInstructions={list.list}
                setRecipeInstructions={(val, idx) => handleSet(val, idx)}
                updateRecipeInstructions={(val, idx) => handleUpdate(val, idx)}
                index={idx}
                isMultipleLists={recipeInstructions.length > 1}
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

export default InstructionsContainer
