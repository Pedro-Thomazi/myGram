import styles from './Login.module.css'

// React
import { useState } from 'react'
import { Link } from 'react-router-dom'

// Icon
import { FcGoogle } from 'react-icons/fc'

// AuthContext
import { UserAuth } from '../../Context/AuthContext'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signIn, googleSignIn } = UserAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await signIn(email, password)
    } catch (error) {
      console.log('Error', error.message)
    }
  }

  const googleLogin = async () => {
    

    try {
      await googleSignIn()
    } catch (error) {
      console.log(error)
    }


  }

  return (
    <main className='container'>
      <section id={styles.context}>
        <div id={styles.login}>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1"
                className="form-label">E-mail</label>
              <input type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
              <div id="emailHelp" className="form-text">Digite seu e-mail</div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1"
                className="form-label">Senha</label>
              <input type="password"
                className="form-control"
                id="exampleInputPassword1"
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button id={styles.btnSubmit} type="submit" className="btn btn-primary">Entrar</button>
            <span>Ou</span>
          </form>
          <button className="btn btn-primary"
            id={styles.btnGoogle}
            onClick={googleLogin}><FcGoogle />Login com Google</button>
        </div>
        <div id={styles.text}>
          <h2>Bem-vindo de volta</h2>
          <h3>Faça seu login para criar </h3>
          <h3> e compartilhar momentos</h3>
          <p>Ainda não tem uma conta? <Link className='epecial-color' to='/register'>Clique Aqui!</Link></p>
        </div>
      </section>
    </main>
  )
}

export default Login