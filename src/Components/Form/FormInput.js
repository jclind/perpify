import React from 'react'
import './FormInput.scss'

const LoginInput = ({ icon, type, placeholder, name, val, setVal }) => {
  return (
    <label className='form-input'>
      <div className='label-title'>{name}</div>
      <div className='input-container'>
        {icon}
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={val}
          onChange={e => setVal(e.target.value)}
          autoComplete='on'
          required
        />
      </div>
    </label>
  )
}

export default LoginInput
