import React, { useState, useEffect } from 'react'

function getWindowWidth() {
  const { innerWidth: width } = window
  return width
}

const WindowWidthControl = ({ children }) => {
  const [windowWidth, setWindowWidth] = useState(getWindowWidth())

  useEffect(() => {
    function handleResize() {
      setWindowWidth(getWindowWidth())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    console.log(windowWidth)
  }, [windowWidth])

  return (
    <>
      {windowWidth < 1000 ? (
        <div className='window-too-small'>
          <p>
            Prepify is currently in Beta and does not support screens smaller
            than 1000px. Please use larger device.
          </p>
        </div>
      ) : (
        children
      )}
    </>
  )
}

export default WindowWidthControl
