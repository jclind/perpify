import React, { useState, useEffect } from 'react'
import { useLocation, Link, Outlet } from 'react-router-dom'
import './Account.scss'
import { useAuth } from '../../context/AuthContext'

const Account = () => {
  const [nameInitial, setNameInitial] = useState('')
  const [username, setUsername] = useState('')
  const [currPath, setCurrPath] = useState('')

  const { getUsername, user } = useAuth()

  const location = useLocation()

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

  useEffect(() => {
    setCurrPath(location.pathname)
  }, [location.pathname])

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
      <div className='account-body'>
        <div className='options-bar'>
          <Link
            to='/account/saved-recipes'
            className={
              currPath === '/account/saved-recipes'
                ? 'active selection'
                : 'selection'
            }
          >
            Saved Recipes
          </Link>
          <Link
            to='/account/ratings'
            className={
              currPath === '/account/ratings' ? 'active selection' : 'selection'
            }
          >
            Ratings
          </Link>
          <Link
            to='/account/your-recipes'
            className={
              currPath === '/account/your-recipes'
                ? 'active selection'
                : 'selection'
            }
          >
            Your Recipes
          </Link>
        </div>
        <Outlet />
      </div>
    </div>
  )
}

export default Account
