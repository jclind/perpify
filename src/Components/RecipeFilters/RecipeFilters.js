import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { useRecipe } from '../../context/RecipeContext'
import './RecipeFilters.scss'

const RecipeFilters = ({
  options,
  selectVal,
  setSelectVal,
  selectedTags,
  setSelectedTags,
}) => {
  const [tags, setTags] = useState([])
  const selectOptions = options || [
    { value: 'popular', label: 'Popular' },
    { value: 'new', label: 'Date: Newest' },
    { value: 'old', label: 'Date: Oldest' },
    { value: 'shortest', label: 'Time: Shortest' },
    { value: 'longest', label: 'Time: Longest' },
  ]

  const { getTopTags } = useRecipe()

  useEffect(() => {
    setSelectVal(selectOptions[0].value)
    getTopTags(5).then(tags => {
      setTags(tags.data)
    })
  }, [])

  const handleSelectChange = e => {
    const value = e.value
    setSelectVal(value)
  }

  const handleTagClick = text => {
    if (selectedTags.includes(text)) {
      const idx = selectedTags.indexOf(text)
      return setSelectedTags([
        ...selectedTags.slice(0, idx),
        ...selectedTags.slice(idx + 1, selectedTags.length),
      ])
    }

    return setSelectedTags([...selectedTags, text])
  }

  return (
    <div className='filters'>
      <Select
        options={selectOptions}
        isSearchable={false}
        isClearable={false}
        className='select'
        onChange={handleSelectChange}
        defaultValue={selectOptions[0]}
      />
      <div className='tags'>
        {tags.map(tag => {
          return (
            <div
              className={
                selectedTags.includes(tag.text)
                  ? 'tag-selected tag'
                  : 'tag-not-selected tag'
              }
              key={tag.text}
              onClick={() => handleTagClick(tag.text)}
            >
              {tag.text} <span className='count'>({tag.count})</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default RecipeFilters
