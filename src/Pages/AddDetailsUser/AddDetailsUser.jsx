import { useEffect, useState } from 'react'
import styles from './AddDetailsUser.module.css'
import { useNavigate } from 'react-router-dom'
import { collection, doc, onSnapshot, query, updateDoc } from 'firebase/firestore'
import { db } from '../../services/firebaseConnect'
import { UserAuth } from '../../Context/AuthContext'

import maleImage from '../../Images/manUser.png'
import famaleImage from '../../Images/womanUser.png'

const AddDetailsUser = () => {
  const [description, setDescription] = useState('')
  const [userPhoto, setUserPhoto] = useState('')
  const [gender, setGender] = useState('')
  const [userConfigs, setUserConfigs] = useState('')
  const [idUser, setIdUser] = useState('')
  const { user } = UserAuth()

  // console.log(user.uid)
  const navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (gender === 'Famale') {
        setUserPhoto(`${process.env.URL_FOR_WOMAN_PHOTO}`)
        console.log(userPhoto)
      }
  
      else if (gender === 'Male') {
        setUserPhoto(`${process.env.URL_FOR_MAN_PHOTO}`)
        console.log(userPhoto)
      }

      await updateDoc(doc(db, 'users', idUser), {
        descriptionUser: description,
        gender: gender,
        // userPhoto: userPhoto
      })
    } catch (error) {
      console.log(error.message)
    }

    console.log(description)

    setDescription('')
    navigate('/dashboard')
  }

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
          setIdUser(doc.id)
        }
      })
      // Jogou tudo que emcontrou em uma variável
      setUserConfigs(usersArr)
    })
    return () => {
      unsubscribeUsers()
    }
  }, [])

  return (
    <section className='container' id={styles.publishContainer}>
      <header>
        <h1>Configurações</h1>
        <h2>Adicione mais detalhes sobre você ao seu Perfil</h2>
      </header>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <div className={styles.description}>
          <label htmlFor="">Descrição</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} maxLength='200' cols="30" rows="10"></textarea>
        </div>
        <div className={styles.gender}>
          <label>Sexo</label>
          <div className={styles.genders}>
            <div>
              <input className={styles.genderMan} value='Male' type="radio" name="sexo" id="man" onChange={(e) => setGender(e.target.value)} />
              <label htmlFor='man'>Homem</label>
              <img id={styles.imgMan} className={styles.userImg} src={maleImage} alt="Foto de usuário masculino" />
            </div>
            <div>
              <input className={styles.genderWoman} value='Famale' type="radio" name="sexo" id="woman" onChange={(e) => setGender(e.target.value)} />
              <label htmlFor='woman'>Mulher</label>
              <img id={styles.imgWoman} className={styles.userImg} src={famaleImage} alt="Foto de usuária feminino" />
            </div>
          </div>
        </div>
        <button className={styles.btnSubmit} type='submit'>Compartilhar</button>
      </form>
    </section>
  )
}

export default AddDetailsUser