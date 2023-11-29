// Styles
import styles from './PublicationCard.module.css'

// React
import { useEffect, useState } from 'react'

// Icons
import { BiDotsVerticalRounded, BiMessageRounded } from 'react-icons/bi'
import { BsPencil, BsTrash3Fill, BsX } from 'react-icons/bs'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import AddComments from '../AddComments/AddComments'
import { deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { db } from '../../services/firebaseConnect'
import { UserAuth } from '../../Context/AuthContext'

import autoUserPhoto from '../../Images/foto-usuario.webp'

// userName, userPhoto, photo, qtdLikes, description, comments, date

const PublicationCard = ({ configsPubli }) => {
  let qtdLikes = configsPubli.qtdLikes
  const [showMenu, setShowMenu] = useState('')
  const [showComments, setShowComments] = useState('')
  const [likes, setLikes] = useState(qtdLikes)

  const { user } = UserAuth()

  const openMenu = () => {
    if (showMenu === '') {
      setShowMenu(styles.show)
    }
    else {
      setShowMenu('')
    }
  }
  const openComments = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
    if (showComments === '') {
      setShowComments(styles.showComments)
    }
    else {
      setShowComments('')
    }
  }

  // Deletar publi
  const deletePubli = async (id) => {
    await deleteDoc(doc(db, 'publications', id))
  }

  // Add like
  const handleLike = async (configsPubli) => {
    let addLikes = likes + 1
    setLikes(addLikes)
    await updateDoc(doc(db, 'publications', configsPubli.id), {
      qtdLikes: likes
    })
  }

  console.log(configsPubli.userPhoto)


  return (
    <div className={styles.publicationContainer}>
      {configsPubli && (
        <div className={styles.publications}>
          <header className={styles.headerPublication}>
            <div className={styles.user}>
              {configsPubli.userPhoto === '' || configsPubli.userPhoto === null ? (
                <img src={autoUserPhoto} className={styles.photoUser} />
              ) : (
                <img src={configsPubli.userPhoto} className={styles.photoUser} />
              )}

              <div className={styles.name}>
                <Link to={`/user/${configsPubli.idUser}`} className={styles.nameUser}>{configsPubli.userName}</Link>
                {configsPubli.localization ? (
                  <p className={styles.localization}>{configsPubli.localization}</p>
                ) : ''}
              </div>
            </div>
            <div className={styles.config}>
              {configsPubli.idUser === user.uid && (
                <>
                  <button onClick={openMenu}><BiDotsVerticalRounded /></button>
                  <div id={showMenu} className={styles.menu}>
                    {/* <div><button><BsPencil size={25} color='#fff' /><span>Editar</span></button></div> */}
                    <div><button onClick={() => deletePubli(configsPubli.id)} className={styles.btnDel}><BsTrash3Fill size={25} color='#ad2121' /><span>Deletar</span></button></div>
                  </div>
                </>
              )}
            </div>
          </header>
          <img onDoubleClick={() => handleLike(configsPubli)} src={configsPubli.photo} className={styles.image} alt='Foto' />
          <div className={styles.displayPubli}>
            <div className={styles.likeAndcomment}>
              <button onClick={() => handleLike(configsPubli)}>
                {configsPubli.qtdLikes !== 0 ? (
                  <AiFillHeart color='#ee2314' id={styles.redHeat} />
                ) : (
                  <AiOutlineHeart id={styles.transpHeat} />
                )}
              </button>
              <button onClick={openComments} className={styles.message}>
                <BiMessageRounded />
                {configsPubli.comments.length}
              </button>
              <div id={showComments} className={styles.comments}>
                <AddComments idPubliComment={configsPubli.id} comments={configsPubli.comments} />
                <button onClick={openComments} className={styles.btnClose}><BsX size={60} /></button>
              </div>
            </div>
            <p className={styles.qtdLiks}>{configsPubli.qtdLikes} curtidas</p>
            <div className={styles.description}>
              <p><span>{configsPubli.userName} </span>{configsPubli.description ? (
                configsPubli.description
              ) : ''}</p>
            </div>
            <p className={styles.time}>em {configsPubli.date} </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default PublicationCard