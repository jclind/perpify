import React, { useState, useEffect } from 'react'
import './Account.scss'
import { useAuth } from '../../context/AuthContext'

const Account = () => {
  const [nameInitial, setNameInitial] = useState('')
  const [username, setUsername] = useState('')

  const { getUsername, user } = useAuth()

  useEffect(() => {
    if (user) {
      const uid = user.uid
      getUsername(uid).then(val => {
        setUsername(val)
        if (val) {
          const i = val.charAt(0).toUpperCase()
          setNameInitial(i)
        } else {
          setNameInitial('null')
        }
      })
    }
  }, [])

  return (
    <div className='page account-page'>
      <section className='account-header'>
        <div className='info-container'>
          <div className='profile-image'>{nameInitial}</div>
          <div className='content'>
            <div className='username'>{username && username}</div>
            <div className='actions'>
              <button className='edit-profile-btn btn'>Edit Profile</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Account
