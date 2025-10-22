import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import type { campaignCreate } from '../../types/campaign'

import { useFetchDocument } from '../../Hooks/useFetchDocument'
import { useAuth } from '../../context/AuthContext'
import styles from './Campaign.module.css'
import LabelInput from '../../components/Utils/LabelInput'
import Button from '../../components/Utils/Button'
import { LuBackpack, LuDice6, LuFileText, LuUsers } from 'react-icons/lu'

function Campaign() {
    const [camp, setCamp] = useState<campaignCreate>()
    
    const { id } = useParams()
    const { user } = useAuth()
    const {document, loading, error} = useFetchDocument<campaignCreate>('campaign', id || '')
    
    console.log(document)
    console.log(user)

    useEffect(() => {
        if(document){
            setCamp(document)
        }
    })

    if(loading){
        return (
            <div className='container'>
                <div className="loading">
                    <span style={{background: '#7544EE'}}></span>
                    <span style={{background: '#7544EE'}}></span>
                    <span style={{background: '#7544EE'}}></span>
                    <span style={{background: '#7544EE'}}></span>
                    <span style={{background: '#7544EE'}}></span>
                </div>
            </div>
        )
    }
    
    return (
        <div className={styles.container}>
            {camp ? (
                <>
                    <h1 className='title'>{camp.name}</h1>
                    <p className='subtitle'>{camp.description}</p>

                    {user?.uid === camp.masterId && (
                        <form className={styles.formContainer}>
                            <h2 className={styles.title}>Convidar Participantes</h2>
                            <LabelInput type='text' title='Id ou Email' placeholder='Digite o id do usuario ou o email' value='' setValue={()=> {}} />
                            <Button title='Convidar' variant='secondary' action={() => {}} />
                        </form>
                    )}

                    <div className={styles.playerContainer}>
                        <h2 className={styles.title}>Jogadores</h2>

                        <div>
                            <div className={styles.player}>
                                <h3>{camp.masterName}</h3>
                                <p>Mestre</p>
                            </div>
                        </div>
                    </div>
                    <nav className={styles.navbar}>
                        <button><LuFileText /> <span>Anotações</span></button>
                        <button><LuDice6 /> <span>Dados</span></button>
                        <button><LuUsers /> <span>Jogadores</span></button>
                        <button><LuBackpack /> <span>Inventário</span></button>
                    </nav>
                </>
            ) : (
                <h1>Erro ao Buscar pela campanha</h1>
            )}
        </div>
    )
}

export default Campaign