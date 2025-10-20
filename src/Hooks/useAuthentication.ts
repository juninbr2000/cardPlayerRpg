import { useEffect, useState } from "react"
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile
} from "firebase/auth"
import { type User, type UserCredential} from 'firebase/auth'
import { auth } from "../config/firebase"

interface LoginData {
  email: string
  password: string
}

interface RegisterData extends LoginData {
  name: string
}

export const useAuthentication = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [cancelled, setCancelled] = useState<boolean>(false)

  const provider = new GoogleAuthProvider()

  const checkIfIsCancelled = () => {
    if (cancelled) return
  }

  const login = async (data: LoginData): Promise<UserCredential | void> => {
    checkIfIsCancelled()
    setLoading(true)
    setError(null)

    try {
      const userCredentials = await signInWithEmailAndPassword(auth, data.email, data.password)
      setLoading(false)
      return userCredentials
    } catch (error: any) {
      let systemErrorMessage: string

      if (error.message.includes("invalid-credential")) {
        systemErrorMessage = "Por favor, confira se o email e a senha estão corretos."
      } else if (error.message.includes("wrong-password")) {
        systemErrorMessage = "Senha incorreta."
      } else {
        systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde."
      }

      console.error(error)
      setError(systemErrorMessage)
      setLoading(false)
    }
  }

  const register = async (data: RegisterData): Promise<User | void> => {
    checkIfIsCancelled()

    setLoading(true)
    setError(null)

    try {
      const { user } = await createUserWithEmailAndPassword(auth, data.email, data.password)
      await updateProfile(user, { displayName: data.name })

      setLoading(false)
      return user
    } catch (error: any) {
      let systemErrorMessage: string

      if (error.message.includes("password")) {
        systemErrorMessage = "A senha precisa conter no mínimo 8 caracteres."
      } else if (error.message.includes("email-already")) {
        systemErrorMessage = "E-mail já cadastrado."
      } else if (error.message.includes("invalid-email")) {
        systemErrorMessage = "Insira um e-mail válido."
      } else {
        systemErrorMessage = "Ocorreu um erro, por favor tente novamente mais tarde."
      }

      setLoading(false)
      setError(systemErrorMessage)
    }
  }

  const googleLogin = async (): Promise<User | void> => {
    console.log('ola')
    checkIfIsCancelled()

    setLoading(true)
    setError(null)

    try {
      const result = await signInWithPopup(auth, provider)
      const user = result.user

      setLoading(false)
      console.log(user)
      return user
    } catch (error: any) {
      console.error(error)
      setError("Erro ao autenticar com o Google. Tente novamente mais tarde.")
      setLoading(false)
    }
  }

  const logOut = async (): Promise<void> => {
    checkIfIsCancelled()
    await signOut(auth)
  }

  useEffect(() => {
    return () => setCancelled(true)
  }, [])

  return {
    auth,
    loading,
    error,
    login,
    register,
    googleLogin,
    logOut
  }
}
