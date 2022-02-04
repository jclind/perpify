import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { useRecipe } from '../../context/RecipeContext'
import './RecipeFilters.scss'

const RecipeFilters = ({ options, selectVal, setSelectVal }) => {
  const [tags, setTags] = useState([])
  const selectOptions = options || [
    { value: 'rating', label: 'Popular' },
    { value: 'newest', label: 'Time: Newest' },
    { value: 'oldest', label: 'Time: Oldest' },
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
            <div className='tag' key={tag.text}>
              {tag.text} <span className='count'>({tag.count})</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default RecipeFilters
