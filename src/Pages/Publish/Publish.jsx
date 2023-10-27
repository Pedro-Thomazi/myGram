import styles from './Publish.module.css'

// React
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// Firebase
import { addDoc, collection } from 'firebase/firestore'
import { db, storage } from '../../services/firebaseConnect'

import { UserAuth } from '../../Context/AuthContext'

import fotoInicial from '../../Images/foto-usuario.webp'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

const Publish = () => {
  const [imageURL, setImageURL] = useState('')
  const [progress, setProgress] = useState(0)
  const [inputDescription, setInputDescription] = useState('')
  const [inputLocalization, setInputLocalization] = useState('')

  const { user } = UserAuth()

  const navigate = useNavigate()

  
  const handleDescription = (e) => {
    setInputDescription(e.target.value)
  }

  const handleLocalization = (e) => {
    setInputLocalization(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Upload da imagem
    const file = e.target[0]?.files[0]

    console.log(file)
    if (!file) return alert('Coloque uma foto')
    const storageRef = ref(storage, `images/${file.name}`)
    const uploadImg = uploadBytesResumable(storageRef, file)


    uploadImg.on(
      'state_changed',
      snapshot => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setProgress(progress)
      },
      error => {
        console.log(error.message)
      },
      async () => {
        const url = await getDownloadURL(uploadImg.snapshot.ref)
        setImageURL(url)
        await addDoc(collection(db, 'publications'), {
          userName: user.displayName,
          userPhoto: user.photoURL,
          qtdLikes: 0,
          photo: url,
          localization: inputLocalization,
          description: inputDescription,
          date: new Date().toLocaleString(),
          comments: [],
          idUser: user.uid
        })
      }
    )
    setImageURL('')
    setInputDescription('')
    setInputLocalization('')
    navigate('/')
  }


  return (
    <section className='container' id={styles.publishContainer}>
      <header>
        <h1>Publicar</h1>
        <h2>Publique algum de seus momentos.</h2>
      </header>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <div className={styles.addImage}>
          <label>Imagem</label>
          <input type="file" />
          {!imageURL && <progress value={progress} max='100' />}
          {imageURL && <img className={styles.previewImage} src={imageURL} alt="Escolha uma foto" />}
        </div>
        <div className={styles.addDescription}>
          <label>Descrição</label>
          <textarea value={inputDescription} onChange={handleDescription} name="description" id="description"></textarea>
        </div>
        <div className={styles.addLocalization}>
          <label>Localizazção</label>
          <input value={inputLocalization} onChange={handleLocalization} maxLength='50' type="text" />
        </div>

        <button className={styles.btnSubmit} type='submit'>Compartilhar</button>
      </form>
    </section>
  )
}

export default Publish