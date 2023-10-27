import { collection, onSnapshot, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../../services/firebaseConnect'

import photoNull from '../../Images/foto-usuario.webp'

import styles from './AllUsers.module.css'

const AllUsers = () => {
  const [users, setUsers] = useState([])


  // Ler users do firebase
  useEffect(() => {
    const q = query(collection(db, 'users'))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let usersArr = []
      querySnapshot.forEach((doc) => {
        usersArr.push({ ...doc.data(), id: doc.id })
      })
      setUsers(usersArr)
    })
    return () => unsubscribe()
  }, [])

  return (
    <div className={styles.container}>{users.map((item) => (
      <div key={item.id} className={styles.user}>
        {item.photoUser === null ? (
          <img src={item.photoUser} alt="Foto do usuário" />
        ) : (
          <img src={photoNull} alt="Foto do usuário" />
        )}
        <p>{item.name}</p>
      </div>
    ))}</div>
  )
}

export default AllUsers