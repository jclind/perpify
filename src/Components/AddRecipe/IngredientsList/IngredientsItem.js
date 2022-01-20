import React, { useState, useRef } from 'react'

import { AiOutlineClose } from 'react-icons/ai'

const IngredientsItem = ({ ingredient, deleteItem }) => {
  const [name, setName] = useState(ingredient.name)
  const [quantity, setQuantity] = useState(ingredient.quantity)

  const { id } = ingredient

  const quantityRef = useRef('')

  const handleQuantityChange = () => {
    setQuantity(quantityRef.current.innerText)
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
        >
          {quantity}
        </div>

        {/* {quantity} {name} */}
      </div>
      <AiOutlineClose className='remove' onClick={() => deleteItem(id)} />
    </div>
  )
}

export default IngredientsItem
