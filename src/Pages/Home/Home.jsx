import styles from './Home.module.css'

// Components
import PublicationCard from '../../Components/Publication/PublicationCard'

// React
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

// Banco de Dados
import { db } from '../../services/firebaseConnect'
import { query, collection, onSnapshot, orderBy } from 'firebase/firestore'
import { UserAuth } from '../../Context/AuthContext'

// Images
import userPhotoNull from '../../Images/foto-usuario.webp'
import notPhoto from '../../Images/notPhoto.png'


// Icons
import { BsFillPlusCircleFill } from 'react-icons/bs'
import AllUsers from '../../Components/AllUsers/AllUsers'

const Home = () => {
  const [publications, setPublications] = useState([])

  const { user } = UserAuth()

  // Ler publicações do firebase
  useEffect(() => {
    const q = query(collection(db, 'publications'), orderBy('date', 'desc'))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let publicationsArr = []
      querySnapshot.forEach((doc) => {
        publicationsArr.push({ ...doc.data(), id: doc.id })
      })
      setPublications(publicationsArr)
    })
    return () => unsubscribe()
  }, [])

  return (
    <main className={styles.homeContainer}>
      <div className={styles.userPhoto}>
        <Link to='/publish'>
          {user.photoURL === null ? (
            <div className={styles.user}>
              <img src={userPhotoNull} alt="Foto Do Usuário" />
              <p>Eu</p>
            </div>
          ) : (
            <div className={styles.user}>
              <img src={user.photoURL} alt="Foto Do Usuário" />
              <p>Eu</p>
            </div>
          )}
          <BsFillPlusCircleFill size={25} />
        </Link>
        <div className={styles.allUsers}>
          <AllUsers />
        </div>
      </div>
      <hr />
      <div className={styles.publicCard}>
        {publications.map((item, index) => (
          <PublicationCard key={index} configsPubli={item} />))}

        {publications.length === 0 && (
          <div className={styles.notPubli}>
            <img src={notPhoto} alt="Sem Foto" />
            <h2>Sem fotos.</h2>
            <h3>Seja você o primeiro!</h3>
          </div>
        )}
      </div>
    </main>
  )
}

export default Home