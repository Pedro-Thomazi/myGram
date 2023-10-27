import styles from './Register.module.css'

// React
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// Context
import { UserAuth } from '../../Context/AuthContext'


const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const { createUser } = UserAuth()
  const navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (password === '') return

      if (password !== confirmPassword) {
        alert('Senhas incompatíveis')
        setPassword('')
        setConfirmPassword('')
        return
      }

      if (password.length < 6) {
        alert('Senha precisa ter no minimo 6 caracteres')
        setPassword('')
        setConfirmPassword('')
        return
      }

      await createUser(email, password)

      navigate('/update-user')
    } catch (error) {
      console.log('Erro', error.message)
    }


  }

  return (
    <main className='container'>
      <section id={styles.context}>
        <div id={styles.login}>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">E-mail</label>
              <input type="email"
                className="form-control"
                aria-describedby="emailHelp"
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
              <div id="emailHelp" className="form-text">Digite seu e-mail</div>
            </div>
            <div className="mb-3">
              <label className="form-label">Senha</label>
              <input type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Confirmação de Senha</label>
              <input type="password"
                className="form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
            <button id={styles.btnSubmit} type="submit" className="btn btn-primary">Cadastrar</button>
          </form>
        </div>
        <div id={styles.text}>
          <h2>Bem-vindo</h2>
          <h3>Crie uma conta para</h3>
          <h3> criar e compartilhar momentos</h3>
          <p>Já tem uma conta? <Link className='epecial-color' to='/login'>Clique Aqui!</Link></p>
        </div>
      </section>
    </main>
  )
}

export default Register