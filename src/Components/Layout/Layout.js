import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'

const Layout = ({ children, darkNavLinks }) => {
  return (
    <>
      <Navbar darkNavLinks={darkNavLinks} />
      {children}
      <Footer />
    </>
  )
}

export default Layout
