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
import SavedRecipes from './Components/Account/SavedRecipes'
import Ratings from './Components/Account/Ratings'
import YourRecipes from './Components/Account/YourRecipes'
import SingleRecipe from './Components/SingleRecipe/SingleRecipe'
import AddRecipe from './Components/AddRecipe/AddRecipe'
import SearchRecipesPage from './Components/SearchRecipesPage/SearchRecipesPage'

import Layout from './Components/Layout/Layout'

function App() {
  return (
    <AuthProvider>
      <RecipeProvider>
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
      </RecipeProvider>
    </AuthProvider>
  )
}

export default App
