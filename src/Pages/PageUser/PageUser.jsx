// Styles
import styles from './PageUser.module.css'

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
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../../services/firebaseConnect'


const PageUser = () => {
  const [userPublications, setUserPublications] = useState([])
  const { user } = UserAuth()
  // console.log(user.uid)

  useEffect(() => {
    const q = query(collection(db, 'publications'), orderBy('date', 'desc'))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let publicationsArr = []
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.idUser && data.idUser === user.uid) {
          publicationsArr.push({ ...data, id: doc.id });
        }
      })
      setUserPublications(publicationsArr)
    })
    return () => unsubscribe()
  }, [userPublications])

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
              <p className={styles.numbers}>{userPublications.length}</p>
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
      </article>
      <section className={styles.publications}>
        {userPublications && (
          userPublications.map((item, index) => (
            <PublicationCard key={index} configsPubli={item} />))
        )}
        {userPublications.length === 0 && (
           <div className = {styles.notPubli}>
           <img src={notPhoto} alt="Sem Foto" />
           <h2>Perfil sem foto</h2>
         </div>
        ) }
    </section>

    </main >
  )
}

export default PageUser