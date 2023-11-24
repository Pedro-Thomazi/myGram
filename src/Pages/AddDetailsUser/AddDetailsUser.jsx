import { useEffect, useState } from 'react'
import styles from './AddDetailsUser.module.css'
import { useNavigate } from 'react-router-dom'
import { collection, doc, onSnapshot, query, updateDoc } from 'firebase/firestore'
import { db } from '../../services/firebaseConnect'
import { UserAuth } from '../../Context/AuthContext'

const AddDetailsUser = () => {
  const [description, setDescription] = useState('')
  const [userConfigs, setUserConfigs] = useState('')
  const [idUser, setIdUser] = useState('') 
  const {user} = UserAuth()

  // console.log(user.uid)
  const navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await updateDoc(doc(db, 'users', idUser), {
        descriptionUser: description
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
        <h1>Descrição</h1>
        <h2>Adicione uma Descrição ao seu Perfil</h2>
      </header>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <div className={styles.description}>
          <label htmlFor="">Descrição</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} name="" id="" maxLength='200' cols="30" rows="10"></textarea>
        </div>
        <button className={styles.btnSubmit} type='submit'>Compartilhar</button>
      </form>
    </section>
  )
}

export default AddDetailsUser