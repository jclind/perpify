import React, { useState, useRef } from 'react'

import { AiOutlineClose, AiOutlineHolder } from 'react-icons/ai'

import { Draggable } from 'react-beautiful-dnd'

import { capitalize } from '../../../util/capitalize'

const IngredientsItem = ({ ingredient, deleteItem, updateItem, index }) => {
  const [name, setName] = useState(ingredient.name)
  const [quantity, setQuantity] = useState(ingredient.quantity)

  const { id } = ingredient
  const quantityElId = `quantity-${id}`

  const quantityRef = useRef()
  const nameRef = useRef()

  const handleQuantityChange = () => {
    const newQuantity = quantityRef.current.innerText

    if (newQuantity && newQuantity !== ingredient.quantity) {
      const updatedIngredient = { ...ingredient, quantity: newQuantity }
      const updateItemRes = updateItem(updatedIngredient, id)

      if (updateItemRes) {
        setQuantity(newQuantity)
      } else {
        document.getElementById(quantityElId).innerText = quantity
      }
    }
  }
  const handleNameChange = () => {
    const newName = nameRef.current.innerText
    if (newName && newName !== ingredient.name) {
      setName(newName)

      const updatedIngredient = { ...ingredient, name: capitalize(newName) }
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
              id={quantityElId}
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
