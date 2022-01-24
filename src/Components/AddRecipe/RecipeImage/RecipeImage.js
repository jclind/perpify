import React, { useState, useRef, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'

const RecipeImage = ({ recipeImage, setRecipeImage }) => {
  const [files, setFiles] = useState([])

  // const [files, setFiles] = useState([])
  // const recipeImageRef = useRef()
  // const readURL = e => {
  //   if (e.target.files[0]) {
  //     console.log('picture: ', e.target.files)
  //     const reader = new FileReader()
  //     reader.addEventListener('load', () => {
  //       setRecipeImage(reader.result)
  //     })
  //     reader.readAsDataURL(e.target.files[0])
  //   }
  // }

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/png, image/gif, image/jpeg',
    onDrop: acceptedFiles => {
      const tempFiles = acceptedFiles.map(file =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
      console.log(tempFiles)
      setRecipeImage(tempFiles[0])
    },
  })

  useEffect(() => {
    URL.revokeObjectURL(recipeImage.preview)
  }, [recipeImage])

  return (
    <>
      <label className='recipe-form-input'>
        <div className='label-title'>Recipe Image</div>
        <div {...getRootProps({ className: 'recipe-image-dropzone' })}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop your recipe image here, or click to select image</p>
        </div>
        {/* <input
          type={'file'}
          className='recipe-image-input'
          onChange={readURL}
          // accept='image/png, image/gif, image/jpeg'
        /> */}
      </label>
      <div className='recipe-image-container' key={recipeImage.name}>
        <img
          src={recipeImage.preview}
          alt={recipeImage.name}
          className='recipe-image'
        />
      </div>
    </>
  )
}

export default RecipeImage
