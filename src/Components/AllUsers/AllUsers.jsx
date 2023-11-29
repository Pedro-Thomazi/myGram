import { collection, onSnapshot, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../../services/firebaseConnect'

import photoNull from '../../Images/foto-usuario.webp'

import styles from './AllUsers.module.css'
import { Link } from 'react-router-dom'

const AllUsers = () => {
  const [users, setUsers] = useState([])


  // Ler users do firebase
  useEffect(() => {
    const q = query(collection(db, 'users'))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let usersArr = []
      querySnapshot.forEach((doc) => {
        usersArr.push({ ...doc.data() })
      })
      setUsers(usersArr)
    })
    return () => unsubscribe()
  }, [])

  return (
    <div className={styles.container}>{users.map((item) => (
      <div key={item.id} className={styles.user}>
        {item.userPhoto !== '' ? (
          <Link to={`/user/${item.id}`}><img src={item.userPhoto} alt="Foto do usuário" /></Link>
        ) : (
          <Link to={`/user/${item.id}`}><img src={photoNull} alt="Foto do usuário" /></Link>
        )}
        <p>{item.name}</p>
      </div>
    ))}</div>
  )
}

export default AllUsers