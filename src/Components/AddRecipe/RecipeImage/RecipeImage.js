import React, { useState, useRef } from 'react'

const RecipeImage = () => {
  const [recipeImageData, setRecipeImageData] = useState('')
  const recipeImageRef = useRef()

  const readURL = e => {
    if (e.target.files[0]) {
      console.log('picture: ', e.target.files)
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        setRecipeImageData(reader.result)
      })
      reader.readAsDataURL(e.target.files[0])
    }
  }

  return (
    <>
      <label className='recipe-form-input'>
        <div className='label-title'>Recipe Image</div>
        <input
          type={'file'}
          className='recipe-image-input'
          onChange={readURL}
        />
      </label>
      <img src={recipeImageData} alt='' ref={recipeImageRef} />
    </>
  )
}

export default RecipeImage
