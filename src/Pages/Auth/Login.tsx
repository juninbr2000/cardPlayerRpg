import React, { type ReactElement } from 'react'
import { Link } from 'react-router-dom'
import styles from './Login.module.css'

import LabelInput from '../../components/Utils/LabelInput'
import Button from '../../components/Utils/Button'
import { FaGoogle } from 'react-icons/fa'
import { useAuthentication } from '../../Hooks/useAuthentication'


function Login() {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [errors, setErrors] = React.useState<{ [key: string] : string }>({})
    const [formError, setFormError] = React.useState<string| null>('')

    const {googleLogin, login, loading, error: dataError} = useAuthentication()

    const handleLogin = async (e : React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      const newErrors: { [key:string] : string } = {}

      if(!email){
        newErrors.email = 'Digite um email'
      }
      if(!password) {
        newErrors.password = 'Digite uma senha'
      }

      setErrors(newErrors)
      if(Object.keys(newErrors).length > 0) return

      try{
        const user = {
          email,
          password
        }
        const res = await login(user)
        
        if(res) console.log(res)

      } catch (error: any) {
        const message = error?.message || 'Erro ao fazer login.'
        setFormError(message)
      }
    }

    React.useEffect(() => {
      if (dataError) {
        setFormError(dataError)
      }
    }, [dataError])

  return (
    <div className={styles.container}>
        <form onSubmit={handleLogin} className={styles.form}>
            <h1 className='title'>Bem vindo de volta</h1>
            <p className='subtitle'>Acesse sua conta para continuar sua jornada</p>

            <LabelInput title='Email:' type='email' placeholder='seu@email.com' value={email} setValue={setEmail} error={errors.email} />
            <LabelInput title='Senha:' type='password' placeholder='Sua Senha' value={password} setValue={setPassword} error={errors.password} />

            <p className='err'>{formError}</p>
            <Button title='Entrar' variant='primary' disabled={loading} action={()=>{}} type='submit' />
            <Link to={'/register'}>Não Tem uma conta? Cadastre-se</Link>
            <Button title='Entrar com Google' icon={<FaGoogle />} variant='secondary' disabled={loading} action={googleLogin} type='button' />
        </form>

    </div>
  )
}

export default Login