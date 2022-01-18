import React, { useState, useEffect, useContext } from 'react'
import {
  signOut,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { db } from '../client/db'

import { useNavigate } from 'react-router-dom'

const AuthContext = React.createContext()
const auth = getAuth()

export function useAuth() {
  return useContext(AuthContext)
}

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const logout = () => {
    signOut(auth)
      .then(() => {
        console.log('sign out success')
        navigate('/')
      })
      .catch(err => {
        console.log('sign out NOT success,', err)
      })
  }

  const signInWithGoogle = setError => {
    const provider = new GoogleAuthProvider()

    signInWithPopup(auth, provider)
      .then(result => {
        navigate('/')
      })
      .catch(err => {
        setError(err.code)
      })
  }
  const signInDefault = (email, password, setError) => {
    if (!email) {
      return setError('Must enter email')
    } else if (!password) {
      return setError('Must enter password')
    }
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        setUser(userCredential.user)
        console.log('Login Success')
        navigate('/')
      })
      .catch(err => {
        const errCode = err.code

        switch (errCode) {
          case 'auth/user-not-found':
            return setError(
              'User not found in database, try creating an account.'
            )
          default:
            return setError('Error, try refreshing your page.')
        }
      })
  }
  const signUp = (email, password, username, setError) => {
    if (!username) {
      return setError('Must enter username')
    } else if (!email) {
      return setError('Must enter email')
    } else if (!password) {
      return setError('Must enter password')
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log('Sign Up Success')
        navigate('/')
      })
      .catch(err => {
        const errCode = err.code
        setError(errCode)
      })
  }
  const forgotPassword = (email, setSuccess, setError) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setSuccess('Email sent! Check your inbox for instructions.')
        console.log('email sent')
      })
      .catch(err => {
        console.log(err)
        setError(err.code)
      })
  }

  // Check for auth status on page load
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(userInstance => {
      if (userInstance) {
        console.log('logged in')
        setUser(userInstance)
        console.log(userInstance.displayName)
      } else {
        console.log('logged out')
        setUser(null)
      }
    })

    return () => unsubscribe()
  }, [])

  const value = {
    user,
    logout,
    signInWithGoogle,
    signInDefault,
    signUp,
    forgotPassword,
  }

  return (
    <AuthContext.Provider value={value}>
      {loading ? <div>Loading auth....</div> : <>{children}</>}
    </AuthContext.Provider>
  )
}

export default AuthProvider
