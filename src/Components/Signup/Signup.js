import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import './Signup.scss'
import '../Form/FormStyles.scss'
import FormInput from '../Form/FormInput'
import { AiOutlineUser, AiOutlineGoogle } from 'react-icons/ai'
import { MdOutlineEmail, MdOutlineLock } from 'react-icons/md'
import { useAuth } from '../../context/AuthContext'
import PrepifyLogo from '../Navbar/PrepifyLogo'

const Signup = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState('')

  const { signInWithGoogle, signUp, user } = useAuth()

  const handleEmailAndPasswordFormSubmit = e => {
    e.preventDefault()
    signUp(email, password, username, setError)
  }

  return user ? (
    <Navigate to='/' />
  ) : (
    <>
      <div className='abs-logo'>
        <PrepifyLogo className='abs-logo' />
      </div>
      <div className='signup-page form-format'>
        <div className='form-container'>
          <form onSubmit={handleEmailAndPasswordFormSubmit} className='form'>
            <h1 className='title'>Sign Up</h1>
            <p className='prompt'>
              Already have an account?{' '}
              <Link to='/login' className='prompt-btn'>
                Login
              </Link>{' '}
            </p>
            {error ? <div className='error'>{error}</div> : null}
            <div className='input-fields'>
              <FormInput
                icon={<AiOutlineUser className='icon' />}
                type='text'
                name='username'
                val={username}
                setVal={setUsername}
                placeholder='example_username'
              />
              <FormInput
                icon={<MdOutlineEmail className='icon' />}
                type='email'
                name='email'
                val={email}
                setVal={setEmail}
                placeholder='name@example.com'
              />
              <FormInput
                icon={<MdOutlineLock className='icon' />}
                type='password'
                name='password'
                val={password}
                setVal={setPassword}
                placeholder='6+ Characters'
              />
            </div>
            <button className='form-action-btn btn'>Sign Up</button>
          </form>
          <button
            className='google-btn btn'
            onClick={() => signInWithGoogle(setError)}
          >
            <AiOutlineGoogle className='icon' /> Sign Up With Google
          </button>
        </div>
      </div>
    </>
  )
}

export default Signup
