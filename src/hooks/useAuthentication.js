import { useEffect, useState } from "react"
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth"

export const useAuthentication = () => {
    const [loading, setLoading] = useState(null)
    const [error, setError] = useState(null)
    const [cancelled, setCancelled] = useState(false)

    const auth = getAuth()

    const checkIfIsCancelled = () => {
        if(cancelled){
            return
        }
    }

    const login = async (data) => {
        checkIfIsCancelled()
        
        setLoading(true)
        setError(null)
        try{
            const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password)
            
            setLoading(false)
            return userCredential
        } catch (error) {
            let systemErrorMessage;

            if(error.message.includes("invalid-credential")){
                systemErrorMessage = "Por favor confira se o email e a senha estão corretos."
            } else if(error.message.includes('wrong-password')){
                systemErrorMessage = "Senha incorreta."
            } else {
                systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde"
            }
            console.log(error)

            setError(systemErrorMessage)
            setLoading(false)
        }
    }

    const register = async (data) => {
        checkIfIsCancelled()

        setLoading(true)
        setError(null)
        try{
            const { user } = await createUserWithEmailAndPassword(auth, data.email, data.password)
            await updateProfile(user, {displayName: data.name})

            setLoading(false)
            return user
        } catch (error) {
            let systemErrorMessage

            if(error.message.includes("password")){
                systemErrorMessage = "A senha precisa conter no minimo 8 caracteres."
            } else if (error.message.includes('email-already')){
                systemErrorMessage = "E-mail já cadastrado."
            } else if (error.message.includes('invalid-email')){
                systemErrorMessage = "Insira um e-mail valido"
            } else {
                systemErrorMessage = "Ocorreu um erro, por favor tente novamente mais tarde."
            }

            setLoading(false);
            setError(systemErrorMessage)
        }
    }

    const logout = () => {
        checkIfIsCancelled()
        signOut(auth)
    }

    useEffect(() => {
        return () => setCancelled(true);
    }, [])

    return {
        login,
        register,
        logout,
        loading,
        error,
        auth
    }
}