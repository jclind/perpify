import React, { useState, useRef } from 'react'

import { AiOutlineClose } from 'react-icons/ai'

const IngredientsItem = ({ ingredient, deleteItem, updateItem }) => {
  const [name, setName] = useState(ingredient.name)
  const [quantity, setQuantity] = useState(ingredient.quantity)

  const { id } = ingredient

  const quantityRef = useRef()
  const nameRef = useRef()

  const handleQuantityChange = () => {
    const newQuantity = quantityRef.current.innerText
    if (newQuantity && newQuantity !== ingredient.quantity) {
      setQuantity(newQuantity)

      const updatedIngredient = { ...ingredient, quantity: newQuantity }
      updateItem(updatedIngredient, id)
    }
  }
  const handleNameChange = () => {
    const newName = nameRef.current.innerText
    if (newName && newName !== ingredient.name) {
      setName(newName)

      const updatedIngredient = { ...ingredient, name: newName }
      updateItem(updatedIngredient, id)
    }
  }

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      e.preventDefault()
      e.target.blur()
    }
  }

  return (
    <div className='ingredient-item'>
      <div className='content'>
        <div
          className='quantity'
          contentEditable
          suppressContentEditableWarning={true}
          ref={quantityRef}
          onBlur={handleQuantityChange}
          onKeyPress={handleKeyPress}
        >
          {quantity}
        </div>
        <div
          className='name'
          contentEditable
          suppressContentEditableWarning={true}
          ref={nameRef}
          onBlur={handleNameChange}
          onKeyPress={handleKeyPress}
        >
          {name}
        </div>

        {/* {quantity} {name} */}
      </div>
      <AiOutlineClose className='remove' onClick={() => deleteItem(id)} />
    </div>
  )
}

export default IngredientsItem
