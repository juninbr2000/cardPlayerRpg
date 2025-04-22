import React, { useEffect, useState } from 'react'
import { redirect, useParams } from "react-router-dom"
import styles from "./Player.module.css"
import { useFetchDocument } from '../../hooks/useFecthDocument'
import { useAuthValue } from '../../context/AuthContext'
import Dice from '../../components/Dice'
import UserLogs from '../../components/UserLogs'


const Player = () => {

  const [charac, setCharac] = useState({})
  const [showDice, setShowDice] = useState(false)
  const [showNotes, setShowNotes] = useState(false)

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
            <p className={styles.info}>Vida: <span>{charac.life}</span></p>
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
        <button className='primary'>Inventario</button>
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