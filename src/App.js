import { Routes, Route } from 'react-router-dom'
import AuthProvider from './context/AuthContext'
import RecipeProvider from './context/RecipeContext'

import Home from './Components/Home/Home'
import Recipes from './Components/Recipes/Recipes'
import About from './Components/About/About'
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer/Footer'
import Login from './Components/Login/Login'
import Signup from './Components/Signup/Signup'
import ForgotPassword from './Components/ForgotPassword/ForgotPassword'
import Account from './Components/Account/Account'
import PrivateRoute from './Components/PrivateRoute'
import CreateUsername from './Components/CreateUsername/CreateUsername'
import SavedRecipes from './Components/Account/SavedRecipes/SavedRecipes'
import Ratings from './Components/Account/Ratings'
import YourRecipes from './Components/Account/YourRecipes'
import SingleRecipe from './Components/SingleRecipe/SingleRecipe'
import AddRecipe from './Components/AddRecipe/AddRecipe'
import SearchRecipesPage from './Components/SearchRecipesPage/SearchRecipesPage'
import Layout from './Components/Layout/Layout'

import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import {
  AiOutlineInfoCircle,
  AiOutlineCheckCircle,
  AiOutlineClose,
} from 'react-icons/ai'
import { BiError } from 'react-icons/bi'

const alertOptions = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE,
}

const AlertTemplate = ({ style, options, message, close }) => {
  return (
    <div style={style} className='alert'>
      {options.type === 'info' && <AiOutlineInfoCircle className='icon info' />}
      {options.type === 'success' && (
        <AiOutlineCheckCircle className='icon success' />
      )}
      {options.type === 'error' && <BiError className='icon error' />}
      <div className='content'>{message}</div>
      <AiOutlineClose className='close-icon' onClick={close} />
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <RecipeProvider>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Routes>
            <Route
              exact
              path='/'
              element={
                <Layout>
                  <Home />
                </Layout>
              }
            />
            <Route
              exact
              path='/recipes'
              element={
                <Layout darkNavLinks={true}>
                  <Recipes />
                </Layout>
              }
            />

            <Route
              path='/recipes/:recipeId'
              element={
                <Layout darkNavLinks={true}>
                  <SingleRecipe />
                </Layout>
              }
            />
            <Route
              path='recipes/search/:searchQuery'
              element={
                <Layout darkNavLinks={true}>
                  <SearchRecipesPage />
                </Layout>
              }
            />
            <Route
              exact
              path='/about'
              element={
                <Layout darkNavLinks={true}>
                  <About />
                </Layout>
              }
            />
            <Route exact path='/' element={<PrivateRoute />}>
              <Route
                exact
                path='/account'
                element={
                  <Layout darkNavLinks={true}>
                    <Account />
                  </Layout>
                }
              >
                <Route path='saved-recipes' element={<SavedRecipes />} />
                <Route path='ratings' element={<Ratings />} />
                <Route path='your-recipes' element={<YourRecipes />} />
              </Route>
              <Route
                exact
                path='/add-recipe'
                element={
                  <Layout darkNavLinks={true}>
                    <AddRecipe />
                  </Layout>
                }
              />
            </Route>
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/signup' element={<Signup />} />
            <Route exact path='/create-username' element={<CreateUsername />} />
            <Route exact path='/forgot-password' element={<ForgotPassword />} />
          </Routes>
        </AlertProvider>
      </RecipeProvider>
    </AuthProvider>
  )
}

export default App
