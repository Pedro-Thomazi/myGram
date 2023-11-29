import { collection, onSnapshot, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../services/firebaseConnect'
import { UserAuth } from '../../Context/AuthContext'
import userPhoto from '../../Images/foto-usuario.webp'

const GetUserPhoto = () => {
  const [userConfig, setUserConfig] = useState([])
  const { user } = UserAuth()

  useEffect(() => {
    // Users
    const qUsers = query(collection(db, 'users'))
    const unsubscribeUsers = onSnapshot(qUsers, (querySnapshot) => {
      let usersArr = []
      // Passou por cada objeto
      querySnapshot.forEach((doc) => {
        // Add em um Array cada objeto
        const data = doc.data();
        if (data.id && data.id === user.uid) { 
          usersArr.push({ ...data, id: doc.id })
        }
      })
      // Jogou tudo que emcontrou em uma variável
      setUserConfig(usersArr)
    })
    return () => {
      unsubscribeUsers()
    }
  }, [])

  return (
    <>
    {userConfig && userConfig.map((item, id) => (
      item.userPhoto !== '' 
      ? (<img key={id} className='userPhoto' src={item.userPhoto} alt="Foto do usuário" />) 
      : (<img key={id} className='userPhoto' src={userPhoto} alt="Foto do usuário" />)
      
    ))}
    </>
  )
}

export default GetUserPhoto