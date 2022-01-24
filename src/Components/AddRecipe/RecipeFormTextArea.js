import React from 'react'
import './RecipeFormInput.scss'

const RecipeFormTextArea = ({
  placeholder,
  name,
  val,
  smallTextArea,
  setVal,
  textAreaProp,
}) => {
  return (
    <label className='recipe-form-textarea'>
      <div className='label-title'>{name}</div>
      <div className='input-container'>
        <textarea
          placeholder={placeholder}
          value={val}
          onChange={e => setVal(e.target.value)}
          className={smallTextArea ? 'small-textarea' : ''}
          ref={textAreaProp ? textAreaProp : null}
        />
      </div>
    </label>
  )
}

export default RecipeFormTextArea
