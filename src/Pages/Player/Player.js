import React, { useEffect, useState } from 'react'
import { redirect, useParams } from "react-router-dom"
import styles from "./Player.module.css"
import { useFetchDocument } from '../../hooks/useFecthDocument'
import { useAuthValue } from '../../context/AuthContext'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase/config'
import Dice from '../../components/Dice'
import UserLogs from '../../components/UserLogs'
import Inventary from '../../components/Inventary'


const Player = () => {

  const [charac, setCharac] = useState({})
  const [showDice, setShowDice] = useState(false)
  const [showNotes, setShowNotes] = useState(false)
  const [showInventary, setshowInvetary] = useState(false)

  const { id } = useParams()
  const { document: data, loading, error} = useFetchDocument('player', id)
  const { user } = useAuthValue()

  useEffect(() => {
    if(data){
      setCharac({...data, id})
    }
  }, [data, id])

  if(loading){
    return (
      <div>
        
      </div>
    )
  }

  const updateLife = async (amount) => {
    if (!charac.id) return
  
    const currentLife = charac.life || 0
    const maxLife = charac.maxlife || 999 // fallback alto se ainda não tiver o campo
  
    const newLife = Math.max(0, Math.min(currentLife + amount, maxLife))
  
    const charRef = doc(db, "player", charac.id)
  
    try {
      await updateDoc(charRef, {
        life: newLife
      })
  
      setCharac(prev => ({ ...prev, life: newLife }))
    } catch (error) {
      console.error("Erro ao atualizar vida:", error)
    }
  }
  

  console.log(charac)

  return (
    <div className={styles.container}>
      <h1>Ficha de Personagem</h1>
      {charac && (
      <div className={styles.ficha}>
        <h2 className={styles.name}>Nome: <span>{charac.name}</span></h2>
        <div>
          <div>
            <p className={styles.info}>Profissão: <span>{charac.profic}</span></p>
            <p className={styles.info}>Personalidade: <span>{charac.personality}</span></p>
            <p className={styles.info}>informações: <span>{charac.description}</span></p>
          </div>

          <div className={styles.life_cont}>
            <p className={styles.info}>Defesa: <span>{charac.defence}</span></p>
            <p className={styles.info}>
              Vida: <span>{charac.life} / {charac.maxlife}</span>
              <button onClick={() => updateLife(-1)} className={styles.lifeBtn}>-</button>
              <button onClick={() => updateLife(1)} className={styles.lifeBtn}>+</button>
            </p>
          </div>
        </div>
        <hr />
        <div className={styles.skills_attr}>
          <div>
          {charac.attributes && Object.entries(charac.attributes).map(([key, value]) => (
            <div key={key} className={styles.Att_item}>
              <strong>{key.toUpperCase()}:</strong> {value}
            </div>
            ))}
          </div>
          <div>
          {charac.skills && Object.entries(charac.skills).map(([key, value]) => (
            <div key={key} className={styles.Att_item}>
              <strong>{key.toUpperCase()}:</strong> {value}
            </div>
            ))}
          </div>
        </div>
      </div>
      )}

      {charac && user && charac.createBy === user.uid && (
      <div className={styles.button_container}>
        <button className='primary' onClick={() => setShowDice(true)}>Dado</button>
        <button className='primary' onClick={() => setshowInvetary(true)}>Inventario</button>
        <button className='primary' onClick={() => setShowNotes(true)}>Anotações</button>
      </div>
      )}

      {showDice === true && (
        <div className={styles.modal} onClick={() => setShowDice(false)}>
          <div onClick={(e) => e.stopPropagation()} className='container_modal'>
            <Dice />
          </div>
        </div>
      )}

      {showInventary === true && (
        <div className={styles.modal} onClick={() => setshowInvetary(false)}>
          <div onClick={(e) => e.stopPropagation()} className='container_modal'>
            <Inventary charac={charac} setCharac={setCharac} />
          </div>
        </div>
      )}
      
      {showNotes === true && (
        <div className={styles.modal} onClick={() => setShowNotes(false)}>
          <div onClick={(e) => e.stopPropagation()} className='container_modal'>
            <UserLogs user={user} charac={charac} setCharac={setCharac} />
          </div>
        </div>
      )}
    </div>
  )
}

export default Player