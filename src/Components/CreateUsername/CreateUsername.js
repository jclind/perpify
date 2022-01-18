import React, { useState, useEffect } from 'react'
import '../Form/FormStyles.scss'
import './CreateUsername.scss'
import FormInput from '../Form/FormInput'
import { AiOutlineUser } from 'react-icons/ai'
import { useAuth } from '../../context/AuthContext'
import { TailSpin } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'

const CreateUsername = () => {
  const [currUsername, setCurrUsername] = useState('')
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(null)

  const [loadingCreateUsername, setLoadingCreateUsername] = useState(false)

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const navigate = useNavigate()

  const { checkUsernameAvailability, setUsername } = useAuth()

  // on username change, check username availability against firestore 'usernames' collection
  useEffect(() => {
    setError('')
    setSuccess('')

    if (/\s/g.test(currUsername))
      return setError('Cannot have white space in username')
    if (!currUsername || currUsername.length < 3)
      return setIsUsernameAvailable(null)

    checkUsernameAvailability(currUsername)
      .then(val => {
        setIsUsernameAvailable(val)
        console.log(val)
      })
      .catch(err => setError(err.code))
  }, [currUsername])

  const handleCreateUsernameForm = e => {
    e.preventDefault()

    setError('')
    setSuccess('')

    setUsername(
      currUsername,
      setLoadingCreateUsername,
      setSuccess,
      setError
    ).then(() => {
      setLoadingCreateUsername(false)
      navigate('/')
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
          {success ? <div className='success'>{success}</div> : null}
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
                {isUsernameAvailable ? (
                  <p className='available'>{currUsername} is available</p>
                ) : (
                  <p className='not-available'>
                    {currUsername} has already been taken
                  </p>
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
