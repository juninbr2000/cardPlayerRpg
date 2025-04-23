import React from 'react'
import styles from "./Home.module.css"

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.banner}>
       <h1 className={styles.logo}><span>Hero</span>Note</h1>
       <small>Tudo para seu RPG</small>
      </div>

      <div className={styles.hero}>
        <h2>O que é RPG</h2>
        <p>Os Role-Playing Games (Jogos de Interpretação de Papéis) são um gênero de jogo que se destaca pela ênfase na interpretação de personagens e na construção de narrativas. Eles podem ser realizados de diversas formas, incluindo jogos de mesa, jogos de computador, jogos de console e até mesmo em ambientes ao ar livre.</p>
        <p>Em um RPG, os jogadores são encorajados a assumir papéis fictícios, geralmente representando personagens em um ambiente imaginário. Esses personagens podem ter diferentes habilidades, histórias de fundo e objetivos.</p>
      </div>

      

    </div>
  )
}

export default Home