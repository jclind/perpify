import React, { useState } from 'react'
import './Ingredients.scss'

const CheckBox = ({ text }) => {
  const [checked, setChecked] = useState(false)

  return (
    <div className='ingredient' onClick={() => setChecked(!checked)}>
      <input
        type='checkbox'
        checked={checked}
        className='ingredient-checkbox'
        onChange={() => {}}
      />
      <label>{text}</label>
    </div>
  )
}

const Ingredients = ({ ingredients, servings, setServings }) => {
  const [modServings, setModServings] = useState(servings)

  const decServings = () => {
    const num = Number(modServings)
    if (num > 1) {
      setServings(num - 1)
      setModServings(num - 1)
    }
  }
  const incServings = () => {
    const num = Number(modServings)
    setServings(num + 1)
    setModServings(num + 1)
  }

  const handleServingsBlur = e => {
    const val = e.target.value
    if (val && !isNaN(val) && val > 0) {
      setServings(modServings)
    } else {
      setModServings(servings)
    }
  }
  const handleServingsOnChange = e => {
    if (
      (e.target.value % 1 === 0 || e.target.value === '') &&
      !e.target.value.toString().includes('.')
    ) {
      setModServings(e.target.value)
    }
  }

  return (
    <div className='ingredients'>
      <div className='header'>
        <h3 className='title'>Ingredients:</h3>
        <div className='servings'>
          <div className='content'>
            <button
              type='button'
              className='dec counter-btn btn'
              onClick={decServings}
            >
              -
            </button>
            <input
              value={modServings}
              type='tel'
              onChange={handleServingsOnChange}
              onBlur={handleServingsBlur}
            />
            <button
              type='button'
              className='inc counter-btn btn'
              onClick={incServings}
            >
              +
            </button>
          </div>
          <div className='text'>Servings</div>
        </div>
      </div>
      <div className='ingredients-list'>
        {ingredients.map(ingr => {
          return <CheckBox text={ingr.name} key={ingr.id} />
        })}
      </div>
    </div>
  )
}

export default Ingredients
