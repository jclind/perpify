import React, { useState, useRef } from 'react'

import { AiOutlineClose, AiOutlineHolder } from 'react-icons/ai'

import { Draggable } from 'react-beautiful-dnd'

const IngredientsItem = ({ ingredient, deleteItem, updateItem, index }) => {
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
    <Draggable
      key={id}
      draggableId={`draggable-${ingredient.id}`}
      index={index}
    >
      {(provided, snapshot) => (
        <div
          className='ingredient-item'
          ref={provided.innerRef}
          {...provided.draggableProps}
          style={{
            ...provided.draggableProps.style,
            boxShadow: snapshot.isDragging ? '0 0 0.4rem #979ba0' : 'none',
          }}
        >
          <div className='drag-icon-container' {...provided.dragHandleProps}>
            <AiOutlineHolder className='drag-icon' />
          </div>
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
          </div>
          <AiOutlineClose className='remove' onClick={() => deleteItem(id)} />
        </div>
      )}
    </Draggable>
  )
}

export default IngredientsItem
