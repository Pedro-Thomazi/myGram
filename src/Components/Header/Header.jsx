// Styles
import styles from './Header.module.css'

// Icons
import { BsList, BsX } from 'react-icons/bs'
import { BiSolidUserCircle } from 'react-icons/bi'
import { FiPlusSquare } from 'react-icons/fi'
import { ImExit } from 'react-icons/im'
import { AiFillHome } from 'react-icons/ai'
import { IoMdSettings } from "react-icons/io";

// React
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { UserAuth } from '../../Context/AuthContext'
import { collection, onSnapshot, query } from 'firebase/firestore'
import { db } from '../../services/firebaseConnect'

const Header = () => {
  const [openMenu, setOpenMenu] = useState('')
  const [users, setUsers] = useState([])

  const { user, logout } = UserAuth()
  const showMenu = () => {
    if (openMenu === '') {
      setOpenMenu(styles.show)
    }
    else {
      setOpenMenu('')
    }
  }

  const signOut = async () => {
    try {
      await logout()
    } catch (error) {
      console.log('Error', error.message)
    }
  }

  useEffect(() => {
    // Users
    const qUsers = query(collection(db, 'users'))
    const unsubscribeUsers = onSnapshot(qUsers, (querySnapshot) => {
      let usersArr = []
      // Passou por cada objeto
      querySnapshot.forEach((doc) => {
        // Add em um Array cada objeto
        usersArr.push({ ...doc.data(), id: doc.id })
      })
      // Jogou tudo que emcontrou em uma variável
      setUsers(usersArr)
    })
    return () => {
      unsubscribeUsers()
    }
  }, [])

  return (
    <header className='container-fluid' id={styles.navContainer}>
      <Link to='/'>
        <h1 className={styles.titleMygram}>MyGram</h1>
      </Link>
      {user && (
        <>
          <button onClick={showMenu} className={styles.btnHamb}><BsList size={45} /></button>
          <nav onClick={showMenu} className={`${styles.menuNav} ${openMenu}`}>
            <div className={styles.contextMenu}>
              <button onClick={showMenu} className={styles.btnHamb}><BsX size={45} /></button>
              <Link className={styles.btnOptions} to={'/dashboard'}>
                {!user.photoURL ? (
                  <>
                    <BiSolidUserCircle size={35} /> {user.displayName}
                  </>
                ) : (
                  <>
                    <img src={user.photoURL} alt="Foto do usuario" /> {user.displayName}
                  </>
                )}
              </Link>
              <Link to='/' className={styles.btnOptions}><AiFillHome size={35} />Home</Link>
              <Link to='/publish' className={styles.btnOptions}><FiPlusSquare size={35} />Publicar</Link>
              <Link to='/details' className={styles.btnOptions}><IoMdSettings size={35} />Configurações</Link>
              <button onClick={signOut} className={styles.btnOptions} id={styles.btnExit}><ImExit size={35} />Sair</button>
            </div>
          </nav>
        </>
      )}
    </header>
  )
}

export default Header