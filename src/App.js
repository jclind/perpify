import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Components/Home/Home'
import Recipes from './Components/Recipes/Recipes'
import About from './Components/About/About'
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer/Footer'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/recipes' element={<Recipes />} />
          <Route exact path='/about' element={<About />} />
        </Routes>
        <Navbar />
        <Footer />
      </Router>
    </>
  )
}

export default App
