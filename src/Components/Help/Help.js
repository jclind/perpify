import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import FormInput from '../Form/FormInput'
import './Help.scss'

const options = [
  { value: 'bug', label: 'Reporting A Bug' },
  { value: 'feature', label: 'Requesting A Feature' },
  { value: 'question', label: 'Asking A Question' },
  { value: 'other', label: 'Other' },
]
const customStyles = {
  control: (provided, state) => ({
    ...provided,
    background: 'white',
    minHeight: '40px',
    height: '40px',
    minWidth: '100%',
    boxShadow: state.isFocused ? null : null,
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: 'hsl(0, 0%, 0%)',
    fontWeight: '500',
    paddingBottom: '3px',
  }),

  valueContainer: (provided, state) => ({
    ...provided,
    height: '40px',
    padding: '0 6px',
  }),

  input: (provided, state) => ({
    ...provided,
    margin: '0px',
  }),
  indicatorSeparator: state => ({
    display: 'none',
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
    height: '40px',
  }),
}

const Help = () => {
  const [selectOption, setSelectOption] = useState(options[0])
  const [title, setTitle] = useState('title')

  const handleSelectChange = e => {
    setSelectOption(e)
  }
  return (
    <div className='help-page page'>
      <div className='form-container'>
        <form className='report-form'>
          <div className='select-container'>
            <div className='text'>I am:</div>
            <Select
              options={options}
              styles={customStyles}
              isSearchable={false}
              isClearable={false}
              className='select'
              onChange={handleSelectChange}
              placeholder={'Select an option...'}
            />
          </div>
          <input
            type='text'
            className='title'
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </form>
      </div>
    </div>
  )
}

export default Help
