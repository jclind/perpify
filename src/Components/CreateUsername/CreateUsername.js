import React, { useState, useEffect } from 'react'
import '../Form/FormStyles.scss'
import FormInput from '../Form/FormInput'
import { AiOutlineUser } from 'react-icons/ai'
import { useAuth } from '../../context/AuthContext'

const CreateUsername = () => {
  const [username, setUsername] = useState('')
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(null)

  const [loading, setLoading] = useState('')

  const [error, setError] = useState('')

  const { checkUsernameAvailability } = useAuth()

  // on username change, check username availability against firestore 'usernames' collection
  useEffect(() => {
    setError('')
    if (/\s/g.test(username))
      return setError('Cannot have white space in username')
    if (!username || username.length < 3) return setIsUsernameAvailable(null)

    checkUsernameAvailability(username, setLoading).then(val => {
      setIsUsernameAvailable(val)
      setLoading(false)
      console.log(val)
    })
  }, [username])

  const handleCreateUsernameForm = e => {
    e.preventDefault()
    setError('')
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
              val={username}
              setVal={setUsername}
              placeholder='johnsmith'
            />
            {isUsernameAvailable === null ? null : (
              <>
                {loading ? (
                  'loading...'
                ) : (
                  <p>{isUsernameAvailable ? 'Available' : 'Not Available'}</p>
                )}
              </>
            )}
          </div>
          <button className='form-action-btn btn'>Create Username</button>
        </form>
      </div>
    </div>
  )
}

export default CreateUsername
