import React, { useState, useRef } from 'react'

import { AiOutlineClose, AiOutlineHolder } from 'react-icons/ai'
import Select from 'react-select'

import { Draggable } from 'react-beautiful-dnd'

import { capitalize } from '../../../util/capitalize'

const IngredientsItem = ({
  ingredient,
  deleteItem,
  updateItem,
  index,
  options,
}) => {
  const [name, setName] = useState(ingredient.name)
  const [measurement, setMeasurement] = useState(ingredient.measurement)
  const [isMeasurementOpen, setIsMeasurementOpen] = useState(false)
  const [quantity, setQuantity] = useState(ingredient.quantity)

  const { id } = ingredient
  const quantityElId = `quantity-${id}`

  const quantityRef = useRef()
  const measurementRef = useRef()
  const nameRef = useRef()

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      background: '#eeeeee',
      borderColor: '#9e9e9e',
      minHeight: '47px',
      height: '47px',
      width: '160px',
      boxShadow: state.isFocused ? null : null,
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: 'hsl(0, 0%, 0%)',
      paddingBottom: '3px',
    }),

    valueContainer: (provided, state) => ({
      ...provided,
      height: '47px',
      padding: '0 6px',
    }),

    input: (provided, state) => ({
      ...provided,
      margin: '0px',
    }),
    indicatorSeparator: state => ({
      display: 'none',
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      height: '47px',
    }),
  }

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
    } else {
      quantityRef.current.innerText = ingredient.quantity
    }
  }
  const handleNameChange = () => {
    const newName = nameRef.current.innerText
    if (newName && newName !== ingredient.name) {
      setName(newName)

      const updatedIngredient = { ...ingredient, name: capitalize(newName) }
      updateItem(updatedIngredient, id)
    } else {
      nameRef.current.innerText = ingredient.name
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
            {quantity && (
              <div
                id={quantityElId}
                className='quantity field'
                contentEditable
                suppressContentEditableWarning={true}
                ref={quantityRef}
                onBlur={handleQuantityChange}
                onKeyPress={handleKeyPress}
              >
                {quantity}
              </div>
            )}
            <div
              onMouseEnter={() => setIsMeasurementOpen(true)}
              onBlur={() => setIsMeasurementOpen(false)}
            >
              {isMeasurementOpen ? (
                <Select
                  options={options}
                  styles={customStyles}
                  contentEditable={false}
                  className='measurement-select'
                  value={measurement}
                  onChange={e => setMeasurement(e)}
                  onMouseLeave
                />
              ) : (
                <div className='measurement-text field'>
                  {measurement.value}
                </div>
              )}
            </div>
            <div
              className='name field'
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
