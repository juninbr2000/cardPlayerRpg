import { useEffect, useState } from 'react'
import styles from './Dashboard.module.css'
import { useAuth } from '../../context/AuthContext'
import Button from '../../components/Utils/Button'
import { FaPlus } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { LuSword } from 'react-icons/lu'
import { RiFilePaperLine } from 'react-icons/ri'
import { type campaignCreate } from '../../types/campaign'
import { useFetchCollection } from '../../Hooks/useFetchCollection'
import CampaignCard from '../../components/Utils/CampaignCard'
import NavBar from '../../components/Layout/NavBar'

function Dashboard() {
    const [players, setPlayers] = useState([])
    const [campaign, setCampaign] = useState<campaignCreate[]>([])
    const { user } = useAuth()
    const navigate = useNavigate()

    const {documents, loading, error} = useFetchCollection<campaignCreate>('campaign', 'id', user?.uid)

    useEffect(() => {
        if(documents){
            console.log(documents)
            setCampaign(documents)
        }
    }, [documents])

  return (
    <div className={styles.container}>
        <NavBar />
        <h1 className='subtitle'>Olá, {user?.displayName}!</h1>

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
            {campaign && campaign.length > 0 ? (
                <div>
                    {campaign && campaign.map((camp: campaignCreate) => (
                        <CampaignCard campaign={camp} />
                    ))}
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