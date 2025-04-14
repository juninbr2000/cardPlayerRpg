import React, { useState } from 'react'
import styles from "./View.module.css"
import { Link } from 'react-router-dom'
import { useAuthValue } from '../../context/AuthContext'

const View = () => {

  const { user } = useAuthValue()
  console.log(user)
  
  const [player, setPlayer] = useState([])

  


  return (
    <div className={styles.visual}>
      <h1>Olá! {user.displayName}</h1>
      <h2>Visualização de presonagens</h2>

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
                <p><span>Idade: </span>{play.age}</p>
                <p><span>Vida: </span>{play.life}</p>
                <p><span>Pontos: </span>{play.points}</p>
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