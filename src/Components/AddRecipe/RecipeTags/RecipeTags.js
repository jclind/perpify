import React, { useState, useEffect } from 'react'
import './RecipeTags.scss'
import { AiOutlineClose } from 'react-icons/ai'
import { v4 as uuidv4 } from 'uuid'
import { useRecipe } from '../../../context/RecipeContext'

const RecipeTags = ({ tags, setTags }) => {
  const [tagsInputVal, setTagsInputVal] = useState('')
  const [isTagsInputValid, setIsTagsInputValid] = useState(false)

  const [searchResults, setSearchResults] = useState([])

  const [error, setError] = useState('')

  const { validateTag, searchTags, checkDatabaseForTagMatch } = useRecipe()

  const handleAddTag = e => {
    if (!isTagsInputValid) {
      return setError('Tag not valid, please try a different tag')
    }

    if (tagsInputVal.trim()) {
      e.preventDefault()

      if (tags.filter(tag => tag.text === tagsInputVal).length !== 0) {
        return setError(tagsInputVal + ' is already in use!')
      }

      setTags([...tags, { text: tagsInputVal, tagId: `tag-${uuidv4()}` }])
      setTagsInputVal('')
    }
  }
  const handleDeleteTag = tagId => {
    setTags(tags.filter(tag => tag.tagId !== tagId))
  }

  const handleKeyPress = e => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      handleAddTag(e)
    }
  }

  const handleClickSearchResult = result => {
    console.log(result)
    setTags([...tags, result])
    setTagsInputVal('')
  }

  // Search through tags collection to show matching tags to user input
  useEffect(() => {
    setError('')

    setIsTagsInputValid(validateTag(tagsInputVal, tags))

    setSearchResults([])
    if (tagsInputVal.length >= 3) {
      searchTags(tagsInputVal, tags).then(res => {
        setSearchResults(res)
      })
    }
  }, [tagsInputVal])

  return (
    <label className='recipe-tags-input'>
      <div className='label-title'>Recipe Tags</div>
      {error && <div className='error'>{error}</div>}
      <div className='tags-list'>
        {tags.length > 0 &&
          tags.map(tag => {
            return (
              <div className='selected-tag' key={tag.tagId}>
                <AiOutlineClose
                  className='delete-tag'
                  onClick={() => handleDeleteTag(tag.tagId)}
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
          onChange={e => setTagsInputVal(e.target.value.toLowerCase())}
          onKeyPress={handleKeyPress}
        />
        {tagsInputVal && isTagsInputValid ? (
          <button
            type='button'
            className='add-tag-btn btn'
            onClick={handleAddTag}
          >
            Add
          </button>
        ) : null}

        {searchResults.length > 0 && (
          <div className='search-results'>
            <div className='search-results-title'>Popular Tags</div>
            {searchResults.map(result => {
              const matchedLetters = tagsInputVal
              const nonMatchedLetters = result.text.replace(matchedLetters, ``)

              return (
                <div
                  className='result'
                  key={result.tagId}
                  onClick={() => handleClickSearchResult(result)}
                >
                  <span className='matched-letters'>{matchedLetters}</span>
                  {nonMatchedLetters}
                </div>
              )
            })}
          </div>
        )}
      </div>
      <button type='button' onClick={() => checkDatabaseForTagMatch(tags)}>
        Submit Tags
      </button>
    </label>
  )
}

export default RecipeTags
