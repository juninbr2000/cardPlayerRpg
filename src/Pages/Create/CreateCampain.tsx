import React, { useEffect, useState } from 'react'
import { WiStars } from 'react-icons/wi'
import LabelInput from '../../components/Utils/LabelInput'

import styles from './Create.module.css'
import Button from '../../components/Utils/Button'
import { useNavigate } from 'react-router-dom'
import { useFetchCollection } from '../../Hooks/useFetchCollection'
import { type RPGSystem } from '../../types/rules'
import { useInsertDocument } from '../../Hooks/useCreateDocument'
import { type campaignCreate } from '../../types/campaign'
import { useAuth } from '../../context/AuthContext'

function CreateCampain() {
    const {user} = useAuth()
    const navigate = useNavigate()
    const [campaignName, setCampaignName] = useState('')
    const [description, setDescription] = useState('')
    const [campaing, setCampaign] = useState<any>([])
    const [selectedSys, setSelectedSys] = useState('')
    const [fieldError, setFieldError] = useState('')
    const [errors, setErrors] = useState('')

    const {documents, loading, error} = useFetchCollection<RPGSystem>('rules')
    const {insertDocument} = useInsertDocument<campaignCreate>('campaign')

    useEffect(() => {
        if(documents){
            setCampaign(documents)
        }
    })

    useEffect(() => {
      if (error) {
        setErrors(error)
      }
    }, [error])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setFieldError('')

        if(!campaignName || campaignName.trim().length < 3){
            setFieldError('Digite um nome maior para a Campanha')
            return
        }

        if(!selectedSys){
            setErrors('Selecione um sistema')
            return
        }
        
        try{
             const selectedRule = campaing.find((camp: RPGSystem) => camp.id === selectedSys);

            const data = {
                name: campaignName,
                description,
                system: selectedRule?.name ?? '',
                rulesId: selectedSys,
                masterName: user!.displayName,
                masterId: user!.uid,
                players: []
            }

            const res = await insertDocument(data)

            if(res){
                navigate('/dashboard')
            }
        } catch(error: any) {
            console.error(error)
            setErrors(error)
        }
    }

  return (
    <div className={styles.container}>
        <div className={styles.header}>
            <WiStars />
            <h1 className='title'>Nova Campanha</h1>
            <p className='subtitle'>Crie uma aventura épica para seus jogadores</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
            <h2 className={styles.title}>Detalhes da Campanha</h2>
            <p className={styles.subtitle}>Preencha as Informações basicas da sua campanha</p>

            <LabelInput title='Nome da Campanha:' type='text' placeholder='Ex: O reino do Dragão' value={campaignName} setValue={setCampaignName} error={fieldError} />
            <label htmlFor="rule" className={styles.label}>
                <span>Sistema de RPG:</span>
                <select name="rule" id="" disabled={loading} value={selectedSys} onChange={(e) => setSelectedSys(e.target.value)}>
                    <option value="">{loading ? 'Carregando...' : 'Selecione'}</option>
                    {campaing && campaing.map((camp: RPGSystem) => (
                        <option value={camp.id}>{camp.name}</option>
                    ))}
                </select>
            </label>

            <label htmlFor="description" className={styles.label}>
                <span>Descrição</span>
                <textarea name="description" placeholder='Descerva o cenario, a trama ou o objetivo principal da campanha...'  value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            </label>
            
            <p className='err'>{errors}</p>
            <div className={styles.buttonContainer}>
                <Button title='Cancelar' variant='secondary' action={() => navigate('/dashboard')} type='button' />
                <Button title='Criar Campanha' variant='primary' disabled={loading} action={() => {}} type='submit' />
            </div>
        </form>
    </div>
  )
}

export default CreateCampain