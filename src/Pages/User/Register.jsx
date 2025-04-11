import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './user.module.css'
import { useAuthentication } from '../../hooks/useAuthentication'
import { getAuth } from 'firebase/auth'

const Register = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [error, setError] = useState('')

    const {register, error: formError, loading} = useAuthentication()
    const auth = getAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

        if(!name || name.trim().length < 3 || name.length > 20){
            setError('Digite um nome de usuario valido')
            return
        }
        if(!email || !emailRegex.test(email)){
            setError('Digite um email valido')
            return
        }
        if(!password || !passwordRegex.test(password) || password.length < 8){
            setError('A senha deve conter pelo menos 8 caracteres, uma letra maiuscula e um numero')
            return
        }
        if(password !== confirm){
            setError('A senhas nao são iguais')
            return
        }

        const user = {
            name,
            email,
            password
        }

        try{ 
            const res = await register(user)

            console.log(res)
        } catch (error) {
            setError(error)
            console.error(error)
        }
    }

    useEffect(() => {
        setError(formError)
    }, [formError])

    return (
        <div className={styles.container}>
            <form className={styles.form}>
                <h1 className={styles.text}>Crie sua conta</h1>
                <p className={styles.text}>crie seus personagens e salve de forma simples</p>

                <label className={styles.label}>Nome: </label>
                <input className={styles.input} type='text' placeholder='Digite seu Nome' />

                <label className={styles.label}>Email: </label>
                <input className={styles.input} type='text' placeholder='Digite seu Email' />

                <label className={styles.label}>Senha: </label>
                <input className={styles.input} type='password' placeholder='Digite sua Senha' />
                
                <label className={styles.label}>Confirme a Senha: </label>
                <input className={styles.input} type='password' placeholder='Digite novamente a Senha' />

                {error && <p className='error'>{error}</p>}
                <button type='submit' className={styles.button}>Criar Conta</button>
                <p className={styles.text}>Já tem uma conta? <Link to={'/login'}>Faça Login</Link></p>
            </form>
        </div>
    )
}

export default Register