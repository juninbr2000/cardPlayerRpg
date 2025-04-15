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

  const { documents, loading} = useFetchDocuments('player', null, uid)
  console.log(documents)

  useEffect(() => {
    if(documents){
      setPlayer(documents)
    }
  }, [documents])


  return (
    <div className={styles.visual}>
      <div>
        <h1>Olá! {user.displayName}</h1>
        <h2>Visualização de presonagens</h2>
      </div>

      <div className={styles.list}>
        {!player.length ? (
          <>
            <p className={styles.error}>Você ainda nao criou nehum personagem</p>
            <Link to="/Create" className={styles.btn}>Criar</Link>
          </>
        ) : (
        <ul>
          {player.map((play) => (
            <li className={styles.player} key={play.id}>
              <h4>{play.name}</h4>
              <div>
                <p><span>Defesa: </span>{play.defence}</p>
                <p><span>Vida: </span>{play.life}</p>
                <p><span>Profissão: </span>{play.profic}</p>
              </div>
                <Link to={`/player/${play.id}`} className={styles.btn}>Selecinar</Link>
            </li>
          ))}
        </ul>
        )}
      </div>

    </div>
  )
}

export default View