import React from 'react'
import './RecipeFormInput.scss'

const RecipeFormTextArea = ({ placeholder, name, val, setVal }) => {
  return (
    <label className='recipe-form-textarea'>
      <div className='label-title'>{name}</div>
      <div className='input-container'>
        <textarea
          placeholder={placeholder}
          value={val}
          onChange={e => setVal(e.target.value)}
        />
      </div>
    </label>
  )
}

export default RecipeFormTextArea
