import React from 'react'
import './Directions.scss'

const Directions = ({ directions }) => {
  return (
    <div className='directions'>
      <h3 className='title'>Directions:</h3>
      <div className='directions-list'>
        {directions.map((direction, idx) => {
          return (
            <div className='direction' key={direction.id}>
              <div className='number'>{idx + 1}</div>
              <div className='content'>{direction.content}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Directions
