import React, { useState, useEffect } from 'react'
import './RecipeTags.scss'
import { AiOutlineClose } from 'react-icons/ai'
import { v4 as uuidv4 } from 'uuid'
import { useRecipe } from '../../../context/RecipeContext'

const RecipeTags = ({ tags, setTags }) => {
  const [tagsInputVal, setTagsInputVal] = useState('')

  const { searchTags } = useRecipe()

  const handleAddTag = e => {
    if (tagsInputVal.trim()) {
      e.preventDefault()
      setTags([...tags, { text: tagsInputVal, id: `tag-${uuidv4()}` }])
      setTagsInputVal('')
    }
  }
  const handleDeleteTag = id => {
    setTags(tags.filter(tag => tag.id !== id))
  }

  const handleKeyPress = e => {
    if (e.key === 'Enter' || e.key === ',') {
      handleAddTag(e)
    }
  }

  // Search through tags collection to show matching tags to user input
  useEffect(() => {
    if (tagsInputVal.length >= 3) {
      searchTags(tagsInputVal).then(res => {
        console.log(res)
      })
    }
  }, [tagsInputVal])

  return (
    <label className='recipe-tags-input'>
      <div className='label-title'>Recipe Tags</div>
      <div className='tags-list'>
        {tags.length > 0 &&
          tags.map(tag => {
            return (
              <div className='selected-tag' key={tag.id}>
                <AiOutlineClose
                  className='delete-tag'
                  onClick={() => handleDeleteTag(tag.id)}
                />
                {tag.text}
              </div>
            )
          })}
      </div>
      <div className='input-container'>
        <input
          type={'string'}
          placeholder={'Tag your recipe'}
          value={tagsInputVal}
          onChange={e => setTagsInputVal(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        {tags.length >= 0 && (
          <button
            type='button'
            className='add-tag-btn btn'
            onClick={handleAddTag}
          >
            Add
          </button>
        )}
      </div>
    </label>
  )
}

export default RecipeTags
