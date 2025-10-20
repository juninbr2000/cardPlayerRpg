import { useEffect, useState } from 'react'
import LabelInput from '../../components/Utils/LabelInput'
import Button from '../../components/Utils/Button'
import { Link } from 'react-router-dom'

import styles from './Login.module.css'
import { useAuthentication } from '../../Hooks/useAuthentication'
import { FaGoogle } from 'react-icons/fa'

function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [errors, setErrors] = useState<{ [key: string] : string }>({})
    const [formError ,setFormError] = useState('')

    const {googleLogin, register, loading, error:dataError} = useAuthentication()


    const handleRegister = async (e : React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      const newErrors: { [key:string]: string } = {}

      if(!name || name.trim().length < 3){
        newErrors.name = 'Digite um nome Valido!'
      }
      if(!email){
        newErrors.email = 'Digite um email'
      }
      if(!password || password.length < 6) {
        newErrors.password = 'Digite uma Senha Valida!'
      }
      if(passwordConfirm !== password){
        newErrors.confrimPassword = 'As Senhas não coincidem'
      }

      setErrors(newErrors)
      if(Object.keys(errors).length > 0) return

      try {
        const user = {
          name,
          email,
          password,
        }

        const res = await register(user)

        console.log(res)
      } catch (error: any ) {
        const message = error?.message || 'Erro ao fazer login.'
        setFormError(message)
      }

    }

    useEffect(() => {
      if (dataError) {
        setFormError(dataError)
      }
    }, [dataError])


  return (
    <div className={styles.container}>
        <form onSubmit={handleRegister} className={styles.form}>
            <h1 className='title'>Crie sua conta</h1>
            <p className='subtitle'>Comece sua Aventura Épica</p>

            <LabelInput title='Nome::' type='text' placeholder='O seu Nome' value={name} setValue={setName} error={errors.name} />
            <LabelInput title='Email:' type='email' placeholder='seu@email.com' value={email} setValue={setEmail} error={errors.email}/>
            <LabelInput title='Senha:' type='password' placeholder='Sua Senha' value={password} setValue={setPassword} error={errors.password} />
            <LabelInput title='Confirme a Senha:' type='password' placeholder='Confirme sua senha' value={passwordConfirm} setValue={setPasswordConfirm} error={errors.confrimPassword} />
        
            <p className='err'>{formError}</p>
            <Button title='Criar Conta' variant='primary' action={()=>{}} type='submit' disabled={loading} />
            <Link to={'/login'}>Já tem uma conta? Faça Login</Link>
            <Button title='Registre-se com Google' icon={<FaGoogle />} variant='secondary' disabled={loading} action={googleLogin} type='button' />
        </form>
    </div>
  )
}

export default Register