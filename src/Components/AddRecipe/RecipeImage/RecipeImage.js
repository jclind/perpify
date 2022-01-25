import React, { useState, useRef, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'

const RecipeImage = ({ recipeImage, setRecipeImage }) => {
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
      setRecipeImage(tempFiles[0])
    },
    maxFiles: 1,
  })

  useEffect(() => {
    if (recipeImage) {
      URL.revokeObjectURL(recipeImage.preview)
    }
  }, [recipeImage])

  const uploadImage = async () => {
    if (recipeImage) {
      const storage = getStorage()

      const recipeImagesRef = ref(storage, `recipeImages/${recipeImage.name}`)

      await uploadBytes(recipeImagesRef, recipeImage)
      const fileUrl = await getDownloadURL(recipeImagesRef)
      // Just got fileUrl to be used in firestore after image was uploaded to firebase storage
    } else {
      console.log('enter image')
    }
  }

  return (
    <>
      <div className='recipe-form-input'>
        <div className='label-title'>Recipe Image *</div>
        <div {...getRootProps({ className: 'recipe-image-dropzone' })}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop your recipe image here, or click to select image</p>
        </div>
      </div>
      {recipeImage && (
        <>
          <div className='recipe-image-container' key={recipeImage.name}>
            <img
              src={recipeImage.preview}
              alt={recipeImage.name}
              className='recipe-image'
            />
          </div>
          {/* <button className='upload-recipe-image' onClick={uploadImage}>
            Upload
          </button> */}
        </>
      )}
    </>
  )
}

export default RecipeImage
