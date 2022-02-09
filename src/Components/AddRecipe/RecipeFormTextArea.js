import React from 'react'
import './RecipeFormInput.scss'

const RecipeFormTextArea = ({
  placeholder,
  name,
  val,
  smallTextArea,
  setVal,
  textAreaProp,
  handleKeyPress,
}) => {
  return (
    <label className='recipe-form-textarea'>
      {name && <div className='label-title'>{name}</div>}
      <div className='input-container'>
        <textarea
          placeholder={placeholder}
          value={val}
          onChange={e => setVal(e.target.value)}
          className={smallTextArea ? 'small-textarea' : ''}
          ref={textAreaProp ? textAreaProp : null}
          onKeyPress={handleKeyPress}
        />
      </div>
    </label>
  )
}

export default RecipeFormTextArea
