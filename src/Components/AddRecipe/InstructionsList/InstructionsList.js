import React, { useState, useEffect, useRef } from 'react'
import RecipeFormTextArea from '../RecipeFormTextArea'
import InstructionsItem from './InstructionsItem'
import { v4 as uuidv4 } from 'uuid'
import './InstructionsList.scss'

const InstructionsList = ({ recipeInstructions, setRecipeInstructions }) => {
  const [instructionText, setInstructionText] = useState('')

  const [error, setError] = useState('')

  const instructionTextAreaRef = useRef()

  const handleAddInstruction = e => {
    e.preventDefault()
    setRecipeInstructions([
      ...recipeInstructions,
      {
        content: instructionText,
        index: recipeInstructions.length + 1,
        id: `instruction-${uuidv4()}`,
      },
    ])
    setInstructionText('')
    instructionTextAreaRef.current.focus()
  }

  const updateInstruction = (updatedItem, id) => {
    setError('')

    const tempInstructionsIndex = recipeInstructions.findIndex(
      item => item.id === id
    )

    if (!updatedItem.content) {
      setError('ERROR, CONTENT CANNOT BE NULL')
    }

    setRecipeInstructions([
      ...recipeInstructions.slice(0, tempInstructionsIndex),
      { ...updatedItem },
      ...recipeInstructions.slice(tempInstructionsIndex + 1),
    ])
    return true
  }

  const deleteInstruction = id => {
    setRecipeInstructions(recipeInstructions.filter(item => item.id !== id))
  }

  return (
    <div className='instructions-list'>
      <div className='instruction-list-textarea-container'>
        <RecipeFormTextArea
          name='Instruction Steps'
          smallTextArea={true}
          val={instructionText}
          setVal={setInstructionText}
          placeholder='Pre-heat oven to 350 degrees....'
          textAreaProp={instructionTextAreaRef}
        />
        <button className='add-instruction btn' onClick={handleAddInstruction}>
          Add Step
        </button>
      </div>
      <div className='list'>
        {recipeInstructions.map((instruction, idx) => {
          return (
            <InstructionsItem
              instruction={instruction}
              index={idx + 1}
              key={instruction.id}
              deleteInstruction={deleteInstruction}
              updateInstruction={updateInstruction}
            />
          )
        })}
      </div>
    </div>
  )
}

export default InstructionsList
