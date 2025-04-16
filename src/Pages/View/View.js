import React, { useEffect, useState } from 'react'
import styles from "./View.module.css"
import { Link } from 'react-router-dom'
import { useAuthValue } from '../../context/AuthContext'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'

const View = () => {

  const { user } = useAuthValue()
  const uid = user.uid
  console.log(user)
  
  const [player, setPlayer] = useState({})

  const { documents, loading } = useFetchDocuments('player', null, uid)
  console.log(documents)

  useEffect(() => {
    if(documents){
      setPlayer(documents)
    }
  }, [documents])


  return (
    <div className={styles.visual}>
      <div className={styles.complement}>
        <h1>Olá {user.displayName}!</h1>
        <h2>Lista de personagens</h2>
      </div>
      {player.length > 0 ? player.map((play) => (
        <div className={styles.ficha}>
          <h3>{play.name}</h3>
          <div>
            <p><span>Profissão:</span> {play.profic}</p>
            <p><span>Defesa:</span> {play.defence}</p>
            <p><span>Vida:</span> {play.life}</p>
          </div>
          <Link to={`/player/${play.id}`} className={styles.btn}>Selecionar</Link>
        </div>
      )) : (
        <div>
          <h3>Você ainda não criou nenhum perosnagem</h3>

          <Link to={'/create'}>Criar Personagem</Link>
        </div>
      )}
    </div>
  )
}

export default View