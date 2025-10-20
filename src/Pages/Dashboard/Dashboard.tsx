import React from 'react'
import styles from './Dashboard.module.css'
import { useAuth } from '../../context/AuthContext'

function Dashboard() {

    const { user } = useAuth()

  return (
    <div className={styles.container}>
        <h1>Olá, {user?.displayName}</h1>

        <div>
            <h2>Meus Personagens</h2>
            <p>Gerencie seus heróis</p>
        </div>
        <div>
            <h2>Minhas Campanhas</h2>
            <p>Crie aventuras épicas com seus amigos</p>
        </div>
    </div>
  )
}

export default Dashboard