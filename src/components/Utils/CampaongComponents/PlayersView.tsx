import React from 'react'
import LabelInput from '../LabelInput'
import Button from '../Button' 
import type { Campaign, campaignCreate, Player } from '../../../types/campaign'
import type { User } from 'firebase/auth'
import { useUpdateDocument } from '../../../Hooks/useUpdatedDocument'
import { arrayUnion } from 'firebase/firestore'
import styles from './Players.module.css'

interface playerProps {
    camp: campaignCreate | undefined,
    user: User | null,
    id: string,
    loading?: boolean
}

function Players({camp, user, id, loading}: playerProps) {
    
    const { updateDocument, response } = useUpdateDocument<campaignCreate>('campaign')
    
    const CampaignLink = `${window.location.origin}/campaign/${id}`;

    const playerJoin = async () => {
        if (!user || !id) return;

        const newPlayer = {
            id: user.uid,
            name: user.displayName || "Jogador",
        };

        // adiciona o jogador à lista de players sem sobrescrever o documento
        await updateDocument(id, {
            players: arrayUnion(newPlayer) as unknown as Player[],
        });
    }
  return (
    <div>
        {camp ? (
                <>
                    {user?.uid === camp.masterId && (
                        <form className={styles.formContainer}>
                            <h2 className={styles.title}>Convidar Participantes</h2>
                            <LabelInput type='text' title='Id ou Email' placeholder='Digite o id do usuario ou o email' value='' setValue={() => { }} />
                            <Button title='Convidar' variant='secondary' action={() => { }} type='submit' />
                            <Button title='Compartilhar Código' variant='primary' action={() => {
                                navigator.share({
                                    title: `Campanha ${camp.name}`,
                                    text: `Entre na campanha "${camp.name}" no RPG Manager!`,
                                    url: CampaignLink,
                                })
                            }} type='button' />
                        </form>
                    )}

                    <div className={styles.playerContainer}>
                        <h2 className={styles.title}>Jogadores</h2>

                        <div className={styles.playerList}>
                            <div className={styles.player}>
                                <h3>{camp.masterName}</h3>
                                <p>Mestre</p>
                            </div>
                            {camp.players && camp.players.length > 0 && (
                                camp.players.map((player) => (
                                    <div key={player.id} className={styles.player}>
                                        <h3>{player.name}</h3>
                                        <p>Jogador</p>
                                    </div>
                                ))
                            )}

                            {user?.uid !== camp.masterId && !camp.players?.some(p => p.id === user?.uid) && (
                                <Button title='Entrar' variant='primary' action={playerJoin} type='button' disabled={loading || response.loading === true} />
                            )}
                        </div>
                    </div>
                </>
            ) : (
                <h1>Erro ao Buscar pela campanha</h1>
            )}
    </div>
  )
}

export default Players