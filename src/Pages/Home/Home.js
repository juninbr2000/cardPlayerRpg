import React from 'react'
import styles from "./Home.module.css"
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.banner}>
        <h1 className={styles.logo}><span>Hero</span>Notes</h1>
        <small>Tudo para seu RPG</small>

        <div className={styles.actions}>
          <Link to="/login" className='primary'>Entrar</Link>
          <Link to="/register" className='secondary'>Criar Conta</Link>
        </div>
      </div>

      <div className={styles.hero}>
        <h2>O que é RPG</h2>
        <p>Os Role-Playing Games (Jogos de Interpretação de Papéis) são um gênero de jogo que se destaca pela ênfase na interpretação de personagens e na construção de narrativas. Eles podem ser realizados de diversas formas, incluindo jogos de mesa, jogos de computador, jogos de console e até mesmo em ambientes ao ar livre.</p>
        <p>Em um RPG, os jogadores são encorajados a assumir papéis fictícios, geralmente representando personagens em um ambiente imaginário. Esses personagens podem ter diferentes habilidades, histórias de fundo e objetivos.</p>
      </div>

      <div className={styles.features}>
        <p className={styles.main}>No <strong>HeroNotes</strong>, você pode organizar seus personagens, acompanhar a vida e inventário, registrar anotações e muito mais.</p>
      
        <div className={styles.feature}>
          <h3>🎲 Rolar Dados</h3>
          <p>Use um sistema rápido de dados integrado para resolver ações do jogo.</p>
        </div>
        <div className={styles.feature}>
          <h3>📦 Inventário</h3>
          <p>Gerencie os itens do seu personagem com praticidade.</p>
        </div>
        <div className={styles.feature}>
          <h3>📝 Anotações</h3>
          <p>Registre momentos importantes da aventura e acompanhe os eventos da campanha.</p>
        </div>
      </div>
    </div>
  )
}

export default Home