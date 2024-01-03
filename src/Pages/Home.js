import React from 'react'
import styles from "./Home.module.css"

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.banner}>
       <small>RPG</small>
       <h1 className={styles.logo}>O Misterio de <span>Kielmore</span></h1>
      </div>

      <div className={styles.hero}>
        <h2>O que é RPG</h2>
        <p>Os Role-Playing Games (Jogos de Interpretação de Papéis) são um gênero de jogo que se destaca pela ênfase na interpretação de personagens e na construção de narrativas. Eles podem ser realizados de diversas formas, incluindo jogos de mesa, jogos de computador, jogos de console e até mesmo em ambientes ao ar livre.</p>
        <p>Em um RPG, os jogadores são encorajados a assumir papéis fictícios, geralmente representando personagens em um ambiente imaginário. Esses personagens podem ter diferentes habilidades, histórias de fundo e objetivos.</p>
      </div>

      <div className={styles.info}>
        <div>
          <h3>O que é Misterio de Kielmore</h3>

          <p>O Misterio de Kielmore é um RPG de investigaçao onde os jogadores devem descobrir quem estra por tras dos bizarros assassinatos recentes em kielmore</p>
        </div>
    
        <div>
          <h3>Prologo</h3>

          <p>Recem formados como Investigadores da policia de Nova York, os personagens são chamados a sala do Diretor Wilson, onde serão enviados para a sua primeira missão</p>
        </div>

      </div>

      <div className={styles.rules}>
        <div>
          <h2>Regras:</h2>
          <h4>combate:</h4>
          <p>ao iniciar um combate os jogadores e os inimigos deverão rolar em d20 com agilidade, a rodada iniciará pelo que tira maior valor entre inimigos e jogadores; caso um jogador tente um ataque surpresa ele devera rodar um d6 que ira determinar a distancia dele para o inimigo, apos isso devera rolar um d20 com furtividade por /2 o valor do d6; e caso o valor do d20 for abaixo de 10 com a furtividade gera um fracasso</p>
        </div>
        <div>
          <h4>Armas:</h4>
          <p><span>Pistolas:</span> tem 1d6 de dano tendo que rolar um d20 com tiro para ver se o player acertou</p>
          <p><span>Shotguns(doze):</span> proximo ao inimigo 1d10; de longe tem 1d4</p>
          <p><span>metralhadoras:</span> tem 3d6 de dano; o d20 com tiro deve ser girado 3 vezes uma para cada tiro, existe a posibilidade de dar apenas 1 tiro.</p>
          <hr />
          <h4>corpo a corpo:</h4>
          <p><span>com arma:</span> 1d4 de dano</p>
          <p><span>sem arma:</span> 1d2 de dano</p>
        </div>
      </div>

    </div>
  )
}

export default Home