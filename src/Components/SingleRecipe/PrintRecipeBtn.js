import React, { useState } from 'react'

import { BsPrinter, BsFillPrinterFill } from 'react-icons/bs'

const PrintRecipeBtn = () => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className='print-recipe'>
      <button
        className='print-recipe-btn btn'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isHovered ? (
          <BsFillPrinterFill className='icon' />
        ) : (
          <BsPrinter className='icon' />
        )}{' '}
        Print Recipe
      </button>
    </div>
  )
}

export default PrintRecipeBtn
