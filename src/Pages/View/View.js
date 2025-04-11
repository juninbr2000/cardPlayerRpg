import React, { useState } from 'react'
import styles from "./View.module.css"
import { Link } from 'react-router-dom'

const View = () => {
  let player = []
  const object = localStorage.playerInfo

  if(object){
    player = JSON.parse(object)
    
  } else {
    console.log("nao tem dados")
  }


  return (
    <div className={styles.visual}>
      <h1>Visualização de presonagens</h1>

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