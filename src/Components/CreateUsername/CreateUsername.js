import React, { useState, useEffect } from 'react'
import '../Form/FormStyles.scss'
import './CreateUsername.scss'
import FormInput from '../Form/FormInput'
import { AiOutlineUser } from 'react-icons/ai'
import { useAuth } from '../../context/AuthContext'
import { TailSpin } from 'react-loader-spinner'

const CreateUsername = () => {
  const [currUsername, setCurrUsername] = useState('')
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(null)

  const [loadingAvailability, setLoadingAvailability] = useState('')
  const [loadingCreateUsername, setLoadingCreateUsername] = useState(false)

  const [error, setError] = useState('')

  const { checkUsernameAvailability, setUsername } = useAuth()

  // on username change, check username availability against firestore 'usernames' collection
  useEffect(() => {
    setError('')
    if (/\s/g.test(currUsername))
      return setError('Cannot have white space in username')
    if (!currUsername || currUsername.length < 3)
      return setIsUsernameAvailable(null)

    checkUsernameAvailability(currUsername, setLoadingAvailability).then(
      val => {
        setIsUsernameAvailable(val)
        setLoadingAvailability(false)
        console.log(val)
      }
    )
  }, [currUsername])

  const handleCreateUsernameForm = e => {
    e.preventDefault()
    setError('')
    setUsername(currUsername, setLoadingCreateUsername).then(() => {
      setLoadingCreateUsername(false)
    })
  }

  return (
    <div className='create-username-page form-format'>
      <div className='login-form-container'>
        <form onSubmit={handleCreateUsernameForm} className='form'>
          <h1 className='title'>One last step...</h1>
          <p className='prompt'>
            Create a unique username to identify yourself with.
          </p>
          {error ? <div className='error'>{error}</div> : null}
          <div className='input-fields'>
            <FormInput
              icon={<AiOutlineUser className='icon' />}
              type='username'
              name='username'
              val={currUsername}
              setVal={setCurrUsername}
              placeholder='johnsmith'
            />
            {isUsernameAvailable === null ? null : (
              <>
                {loadingAvailability ? (
                  'loading...'
                ) : (
                  <p>{isUsernameAvailable ? 'Available' : 'Not Available'}</p>
                )}
              </>
            )}
          </div>
          <button className='form-action-btn btn'>
            {loadingCreateUsername ? (
              <TailSpin
                heigth='30'
                width='30'
                color='white'
                arialLabel='loading'
                className='spinner'
              />
            ) : (
              'Create Username'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateUsername
