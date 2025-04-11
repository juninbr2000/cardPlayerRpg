import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './user.module.css'
import { useAuthentication } from '../../hooks/useAuthentication'
import { getAuth } from 'firebase/auth'
import { auth } from '../../firebase/config'

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [formError, setFormError] = useState('')

  const {login, error, loading} = useAuthentication()

  const auth = getAuth()

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormError('')

    if(!email || !password || password.length < 6){
      setFormError('preencha todos os campos corretamente')
      return
    }

    const user = {
      email,
      password
    }

    try {
      login(user)
    } catch (error) {
      setFormError(error)
    }
  }
  
  return (
    <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
            <h1 className={styles.text}>Bem vindo de volta!</h1>
            <p className={styles.text}>Faça login e comece a salvar seus personagens</p>

            <label className={styles.label} htmlFor='emailtxt'>Email: </label>
            <input type='text' placeholder='Digite seu Email' name='emailtxt' className={styles.input} value={email} onChange={(e) => setEmail(e.target.value)} />

            <label className={styles.label} htmlFor='txtpassword'>Senha: </label>
            <input type='password' placeholder='Digite sua Senha' name='txtpassword' className={styles.input} value={password} onChange={(e) => setPassword(e.target.value)}/>

            {formError && <p className='error'>{formError}</p>}
            {error && <p className='error'>{error}</p>}
            <button type='submit' className={styles.button} disabled={loading}>{loading ? 'Aguarde...' : 'Entrar'} </button>
            <p className={styles.text}>Não tem uma conta? <Link to={'/register'}>Cadastre-se</Link></p> 

        </form>
    </div>
  )
}

export default Login