import React, { useState, useEffect } from 'react'
import { storage, db, getDownloadURL } from '../client/db'
import { ref, uploadBytes } from 'firebase/storage'
import { doc, collection, getDocs } from 'firebase/firestore'

const Data = () => {
  const [data, setData] = useState(null)
  const [fileUrl, setFileUrl] = useState(null)

  const getData = async () => {
    const docRef = collection(db, 'recipes')
    const docSnaps = await getDocs(docRef)
    docSnaps.forEach(doc => {
      console.log(doc.data())
    })
  }

  useEffect(() => {
    getData()
  }, [])

  const handleFileChange = async e => {
    const file = e.target.files[0]
    const storageRef = ref(storage, 'images')
    await uploadBytes(storageRef, file).then(sp => {
      console.log('Uploaded file')
      console.log(sp)
    })
    setFileUrl(await storageRef.getDownloadURL())
    // fileRef.put(file).then(() => {
    //   console.log('Uploaded file', file.name)
    // })
  }
  const handleSubmit = e => {
    e.preventDefault()
  }

  return (
    <div>
      {/* <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <input type='file' onChange={handleFileChange} />
        <input type='text' name='username' placeholder='name' />
        <button>Submit</button>
      </form>
      <ul>
        <li>---</li>
      </ul> */}
    </div>
  )
}

export default Data
