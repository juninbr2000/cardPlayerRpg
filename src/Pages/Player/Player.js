import React, { useEffect, useState } from 'react'
import { redirect, useParams } from "react-router-dom"
import styles from "./Player.module.css"
import { useFetchDocument } from '../../hooks/useFecthDocument'
import { useAuthValue } from '../../context/AuthContext'
import Dice from '../../components/Dice'


const Player = () => {

  const [charac, setCharac] = useState({})

  const { id } = useParams()
  const { document, loading, error} = useFetchDocument('player', id)
  const { user } = useAuthValue()

  useEffect(() => {
    setCharac(document)
  }, [document])

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

      <div className={styles.button_container}>
        <button className='primary'>Dado</button>
        <button className='primary'>Inventario</button>
        <button className='primary'>Anotações</button>
      </div>

      <Dice />
    </div>
  )
}

export default Player