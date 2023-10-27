import { Link } from 'react-router-dom'
import styles from './UpdateUser.module.css'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Context
import { UserAuth } from '../../Context/AuthContext'

import initialPhoto from '../../Images/foto-usuario.webp'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../services/firebaseConnect'

const UpdateUser = () => {
  const [name, setName] = useState('')
  const [photoUser, setPhotoUser] = useState(initialPhoto)
  const navigate = useNavigate()

  const { user, updateUser } = UserAuth()


  // Foto do user
  const handlePhotoUser = (e) => {
    const image = e.target.files[0]
    console.log(image)
    setPhotoUser(image)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const createUserInDb = async () => {
      await addDoc(collection(db, 'users'), {
        id: user.uid,
        name: name,
        email: user.email,
        userPhoto: ''
      })
    }

    try {
      if (!name) {
        alert('Coloque seu nome para proceguir.')
        return
      }

      await updateUser(name)
      createUserInDb()
      navigate('/')
    } catch (error) {
      console.log('Error', error.message)
    }

    
  }


  return (
    <main className='container'>
      <section id={styles.context}>
        <div id={styles.login}>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nome</label>
              <input type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Foto de perfil</label>
              <input id={styles.disabled} disabled type="file"
                className="form-control"
                onChange={handlePhotoUser} />
            </div>
            <button id={styles.btnSubmit} type="submit" className="btn btn-primary">Cadastrar</button>
          </form>
        </div>
        <div id={styles.text}>
          <h1>Quase lá...</h1>
          <h3>Coloque seu nome e uma</h3>
          <h3> foto para perfil</h3>
          <img className={styles.previewImage} src={photoUser} alt="Escolha sua foto" />
        </div>
      </section>
    </main>
  )
}

export default UpdateUser