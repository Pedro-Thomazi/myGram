// React
import { useEffect, useState } from 'react'

// Styles
import styles from './AddComments.module.css'

// Firebase
import { arrayUnion, collection, doc, onSnapshot, query, updateDoc } from 'firebase/firestore'
import { db } from '../../services/firebaseConnect'
import { UserAuth } from '../../Context/AuthContext'

// User sem foto
import nullPhotoUser from '../../Images/foto-usuario.webp'


const AddComments = ({ comments, idPubliComment }) => {
  const [text, setText] = useState('')
  const [userConfig, setUserConfig] = useState([])

  const { user } = UserAuth()

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
      setUserConfig(usersArr)
    })
    return () => {
      unsubscribeUsers()
    }
  }, [])

  const handleSubmitCommet = async (e) => {
    e.preventDefault()

    if (text === '') return

    const commentDocRef = doc(db, 'publications', idPubliComment); // Referência correta do documento
    const newCommentData = {
      name: user?.displayName,
      comment: text,
      date: new Date().toLocaleString(),
      photoUser: userConfig[0]?.userPhoto
    };

    // Aqui esta atualizando ou criando o campo 'comments'
    await updateDoc(commentDocRef, {
      // arrayUnion cria um array dentro do comments usando as configs
      comments: arrayUnion(newCommentData)
    });

    setText('');

  }

  return (
    <section className={styles.commentsContainer}>
      <h2>Adicione um comentário!!!</h2>
      <form onSubmit={handleSubmitCommet}>
        <textarea onChange={(e) => setText(e.target.value)} value={text} name="comment"></textarea>
        <button className='btn myBtn'>Comentar</button>
      </form>
      <article className={styles.comments}>
        {comments.map((item, index) => (
          <div key={index} className={styles.comment}>
            {item.photoUser === null ? (
              <img src={nullPhotoUser} alt="Foto do usuario" />
            ) : (
              <img src={item.photoUser} alt="Foto do usuario" />
            )}
            <div className={styles.content}>
              <div className={styles.nameAndDate}>
                <span className={styles.nameComment}>{item.name}</span>
                <p>{item.date}</p>
              </div>
              <p className={styles.textComment}>{item.comment}</p>
            </div>
          </div>
        ))}

      </article>
    </section>
  )
}

export default AddComments