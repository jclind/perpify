import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Components/Home/Home'
import Recipes from './Components/Recipes/Recipes'
import About from './Components/About/About'
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer/Footer'
import Login from './Components/Login/Login'
import Signup from './Components/Signup/Signup'
import ForgotPassword from './Components/ForgotPassword/ForgotPassword'
import AuthProvider from './context/AuthContext'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            exact
            path='/'
            element={
              <>
                <Home />
                <Navbar />
                <Footer />
              </>
            }
          />
          <Route
            exact
            path='/recipes'
            element={
              <>
                <Recipes />
                <Navbar />
                <Footer />
              </>
            }
          />
          <Route
            exact
            path='/about'
            element={
              <>
                <About />
                <Navbar />
                <Footer />
              </>
            }
          />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/signup' element={<Signup />} />
          <Route exact path='/forgot-password' element={<ForgotPassword />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
