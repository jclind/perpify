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

const Ingredients = ({ ingredients, yieldSize, setYieldSize }) => {
  const [modYieldSize, setModYieldSize] = useState(yieldSize)

  const decYieldSize = () => {
    const num = Number(modYieldSize)
    if (num > 1) {
      setYieldSize(num - 1)
      setModYieldSize(num - 1)
    }
  }
  const incYieldSize = () => {
    const num = Number(modYieldSize)
    setYieldSize(num + 1)
    setModYieldSize(num + 1)
  }

  const handleServingsBlur = e => {
    const val = e.target.value
    if (val && !isNaN(val) && val > 0) {
      setYieldSize(modYieldSize)
    } else {
      setModYieldSize(yieldSize)
    }
  }
  const handleServingsOnChange = e => {
    if (
      (e.target.value % 1 === 0 || e.target.value === '') &&
      !e.target.value.toString().includes('.')
    ) {
      setModYieldSize(e.target.value)
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
              onClick={decYieldSize}
            >
              -
            </button>
            <input
              value={modYieldSize}
              type='tel'
              onChange={handleServingsOnChange}
              onBlur={handleServingsBlur}
            />
            <button
              type='button'
              className='inc counter-btn btn'
              onClick={incYieldSize}
            >
              +
            </button>
          </div>
          <div className='text'>Servings</div>
        </div>
      </div>
      <div className='ingredients-lists'>
        {ingredients.map((ingredientList, idx) => {
          const isMultiIngr = ingredients.length > 1
          return (
            <div
              className={isMultiIngr ? 'multi-ingredient-list list' : 'list'}
              key={idx}
            >
              {isMultiIngr && (
                <h4 className='title'>
                  <span className='text'>{ingredientList.name}</span>
                  <div className='divider'></div>
                </h4>
              )}
              {ingredientList.list.map(ingr => {
                return (
                  <div key={ingr.id}>
                    <CheckBox text={ingr.name} />
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Ingredients
