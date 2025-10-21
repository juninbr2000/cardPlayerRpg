import React, { useState } from 'react'
import styles from './Dashboard.module.css'
import { useAuth } from '../../context/AuthContext'
import Button from '../../components/Utils/Button'
import { FaPlus } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { LuSword } from 'react-icons/lu'
import { RiFilePaperLine } from 'react-icons/ri'

function Dashboard() {
    const [players, setPlayers] = useState([])
    const { user } = useAuth()
    const navigate = useNavigate()

  return (
    <div className={styles.container}>
        <h1>Olá, {user?.displayName}</h1>

        <div className={styles.actionContainer}>
            <div className={styles.containerHeader}>
                <div>
                    <h2 className={styles.title}>Meus Personagens</h2>
                    <p className={styles.subtitle}>Gerencie seus heróis</p>
                </div>
                <Button title='Criar Personagem' icon={<FaPlus />} variant='primary' action={() => {}} type='button' />
            </div>
            {players && players.length > 0 ? (
                <div>

                </div>
            ) : (
                <div className={styles.empty}>
                    <LuSword />
                    <p className='subtitle'>Você ainda não criou nenhum personagem</p>
                    <Button title='Criar Primeiro Personagem' variant='secondary' action={() => {}} type='button' />
                </div>
            )}
        </div>
        <div className={styles.actionContainer}>
            <div className={styles.containerHeader}>
                <div>
                    <h2 className={styles.title}>Minhas Campanhas</h2>
                    <p className={styles.subtitle}>Crie aventuras épicas com seus amigos</p>
                </div>
                <Button title='Criar Campanha' icon={<FaPlus />} variant='primary' action={() => navigate('/create/campaign')} type='button' />
            </div>
            {players && players.length > 0 ? (
                <div>

                </div>
            ) : (
                <div className={styles.empty}>
                    <RiFilePaperLine />
                    <p className='subtitle'>Você ainda não criou nenhuma Campanha</p>
                    <Button title='Criar Primeira Campanha' variant='secondary' action={() => navigate('/create/campaign')} type='button' />
                </div>
            )}
        </div>
    </div>
  )
}

export default Dashboard