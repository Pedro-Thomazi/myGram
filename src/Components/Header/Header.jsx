// Styles
import styles from './Header.module.css'

// Icons
import { BsList, BsX } from 'react-icons/bs'
import { BiSolidUserCircle } from 'react-icons/bi'
import { FiPlusSquare } from 'react-icons/fi'
import { ImExit } from 'react-icons/im'
import { AiFillHome } from 'react-icons/ai'

// React
import { Link } from 'react-router-dom'
import { useState } from 'react'

import { UserAuth } from '../../Context/AuthContext'

const Header = () => {
  const [openMenu, setOpenMenu] = useState('')
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

  


  return (
    <header className='container-fluid' id={styles.navContainer}>
      <Link to='/'>
        <h1 className={styles.titleMygram}>MyGram</h1>
      </Link>
      {/* {!user && (
        <Link to='/login' className='btn myBtn'>Fazer o login</Link>
      )} */}
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
              <button onClick={signOut} className={styles.btnOptions} id={styles.btnExit}><ImExit size={35} />Sair</button>
            </div>
          </nav>
        </>
      )}
    </header>
  )
}

export default Header