import React from 'react'
import './RecipeFormInput.scss'

const RecipeFormInput = ({ type, placeholder, name, val, setVal }) => {
  return (
    <label className='recipe-form-input'>
      <div className='label-title'>{name}</div>
      <div className='input-container'>
        <input
          type={type}
          placeholder={placeholder}
          value={val}
          onChange={e => setVal(e.target.value)}
        />
      </div>
    </label>
  )
}

export default RecipeFormInput
