// Styles
import styles from './Dashboard.module.css'

// Images
import notPhoto from '../../Images/notPhoto.png'

// Components
import PublicationCard from '../../Components/Publication/PublicationCard'

// Context
import { UserAuth } from '../../Context/AuthContext'

import userPhoto from '../../Images/foto-usuario.webp'
// React
import { useEffect, useState } from 'react'
// Firebase
import { addDoc, collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../../services/firebaseConnect'

const Dashboard = () => {
  const [myPublications, setMyPublications] = useState([])
  const [users, setUsers] = useState([])
  const { user } = UserAuth()
  // console.log(user.uid)

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
      setUsers(usersArr)
    })

    console.log(users)


    const q = query(collection(db, 'publications'), orderBy('date', 'desc'))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let publicationsArr = []
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.idUser && data.idUser === user.uid) {
          publicationsArr.push({ ...data, id: doc.id });
        }
      })
      setMyPublications(publicationsArr)
    })
    return () => {
      unsubscribeUsers()
      unsubscribe()
    }
  }, [])

  console.log(users)

  const createUserInDb = async () => {
    await addDoc(collection(db, 'users'), {
      id: user.uid,
      name: user.displayName,
      email: user.email,
      userPhoto: user.photoURL
    })
  }

  return (
    <main className={styles.mainContainer}>
      <header className={styles.headerDashboard}>
        <h1>{user.displayName}</h1>
      </header>
      <article className={styles.user}>
        <div className={styles.photoAndNumber}>
          {!user.photoURL ? (
            <>
              <img src={userPhoto} className={styles.userImage} alt="Foto de perfil" />
            </>
          ) : (
            <>
              <img src={user.photoURL} className={styles.userImage} alt="Foto de perfil" />
            </>
          )}
          <div className={styles.number}>
            <span>
              <p className={styles.numbers}>{myPublications.length}</p>
              <p className={styles.string}>Publicações</p>
            </span>
            <span>
              <p className={styles.numbers}>0</p>
              <p className={styles.string}>Seguidores</p>
            </span>
            <span>
              <p className={styles.numbers}>0</p>
              <p className={styles.string}>Seguindo</p>
            </span>
          </div>
        </div>
        <div className={styles.descripion}>
          {users && users.map((item) => (
            <p>{item.descriptionUser}</p>
          ))}
        </div>
      </article>
      <section className={styles.publications}>
        {myPublications && (
          myPublications.map((item, index) => (
            <PublicationCard key={index} configsPubli={item} />))
        )}
        {myPublications.length === 0 && (
           <div className = {styles.notPubli}>
           <img src={notPhoto} alt="Sem Foto" />
           <h2>Perfil sem foto</h2>
         </div>
        ) }
    </section>

    </main >
  )
}

export default Dashboard