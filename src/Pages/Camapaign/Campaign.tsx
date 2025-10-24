import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import type { campaignCreate } from '../../types/campaign'

import { useFetchDocument } from '../../Hooks/useFetchDocument'
import { useAuth } from '../../context/AuthContext'
import styles from './Campaign.module.css'

import PlayersView from '../../components/Utils/CampaongComponents/PlayersView'
import { LuBackpack, LuDice6, LuFileText, LuUsers } from 'react-icons/lu'
import DiceRoll from '../../components/Utils/CampaongComponents/DiceRoll'

function Campaign() {
    const [camp, setCamp] = useState<campaignCreate>()
    const [View, setView] = useState<'player' | 'dice' | 'notes' | 'inventary'>('player')

    const { id } = useParams()
    const { user } = useAuth()
    const { document, loading, error } = useFetchDocument<campaignCreate>('campaign', id || '')

    console.log(document)
    console.log(user)

    useEffect(() => {
        if (document) {
            setCamp(document)
        }
    }, [document])

    if (loading) {
        return (
            <div className='container'>
                <div className="loading">
                    <span style={{ background: '#7544EE' }}></span>
                    <span style={{ background: '#7544EE' }}></span>
                    <span style={{ background: '#7544EE' }}></span>
                    <span style={{ background: '#7544EE' }}></span>
                    <span style={{ background: '#7544EE' }}></span>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <h1 className='title'>{camp?.name}</h1>
            <p className='subtitle'>{camp?.description}</p>

            {View === 'player' &&
                <PlayersView camp={camp} user={user} id={id!} loading={loading} />
            }
            {View === 'dice' &&
                <DiceRoll />
            }
        
            <nav className={styles.navbar}>
                <button onClick={() => setView('player')}><LuUsers /> <span>Jogadores</span></button>
                <button onClick={() => setView('dice')}><LuDice6 /> <span>Dados</span></button>
                <button onClick={() => setView('notes')}><LuFileText /> <span>Anotações</span></button>
                <button><LuBackpack /> <span>Inventário</span></button>
            </nav>
        </div>
    )
}

export default Campaign