import React, { useState } from 'react'
import { redirect, useParams } from "react-router-dom"
import styles from "./Player.module.css"


const Player = () => {

  const { id } = useParams()

  const object = localStorage.playerInfo

  const players = JSON.parse(object)

  const playerImage = players.playerImage || "/default-image.png"

  const [vida, setVida] = useState(players[id].life)
  const aumentarVida = () => {
    if(vida >= 25){
      return
    }
    setVida(vida + 1) 
  }
  const diminuirVida = () => {
    if(vida <= -5){
      return
    }
    setVida(vida - 1)
  }


  const [pontos, setPontos] = useState(players[id].points)

  const [habilidades, setHabilidades] = useState({
    furtividade: 0,
    tiro: 0,
    investigacao: 0,
    agilidade: 0,
    carisma: 0,
    forca: 0,
    percepcao: 0,
    inteligencia: 0,
    resistencia: 0,
  })

  const handleDecrease = (habilidade) => {
    if(pontos >= players[id].points || habilidades[habilidade] <= 0){
      return
    }
    setPontos(pontos + 1)
    setHabilidades((prevHabilidades) => ({
      ...prevHabilidades,
      [habilidade]: Math.max(0, prevHabilidades[habilidade] - 1),
    }));
  };

  const handleIncrease = (habilidade) => {
    if(pontos <= 0){
      return
    }
    setPontos(pontos - 1);
    setHabilidades((prevHabilidades) => ({
      ...prevHabilidades,
      [habilidade]: prevHabilidades[habilidade] + 1,
    }));
  };

  const handleDelete = () => {
    if(window.confirm(`Tem certeza que quer deletar o personagem ${players[id].name}`)) {
      const updatedPlayers = players.filter(player => player.id !== parseInt(id));
      
      localStorage.setItem("playerInfo", JSON.stringify(updatedPlayers));

      redirect("/View")
    }
  };

  const [inv, setInv] = useState("")
  const [inventory, setInventory] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setInventory([...inventory, { item: inv }]);
    
    setInv('');
  }
  const removeItemFromInventory = (index) => {
    const updatedInventory = [...inventory];

    updatedInventory.splice(index, 1);

    setInventory(updatedInventory);
  }

  const [showInventory, setShowInventory] = useState(false);

  return (
    <div className={styles.container}>
      <h1>Ficha de personagem:<br /> {players[id].name}</h1>

      <div className={styles.ficha}>

        <div className={styles.imageplayer}>
          <img src={players[id].playerImage} alt="Imagem do Jogador" />
        </div>

        <h3 className={styles.player_name}>{players[id].name}</h3>

        <div className={styles.info_player}>
          <p><span>Profissão: </span>Investigador</p>
          <p><span>Idade: </span>{players[id].age}</p>
        </div>

        {players[id].history && (
          <div className={styles.history}>
          <p><span>Dados:</span></p>
          <p className={styles.history_area}>{players[id].history}</p> 
          </div>

        )}

        <hr />

        <div className={styles.hability_area}>
          <div>
            <p className={styles.title}>Vida</p>
            <div className={styles.life_container}>
              <button className={styles.btn_life} onClick={diminuirVida}> - </button>
              <p className={styles.life}>{vida} / {players[id].life}</p>
              <button className={styles.btn_life} onClick={aumentarVida}> + </button>
            </div>

            <div>
              <p className={styles.title}>Habilidade: {pontos} / {players[id].points}</p>
              <div>
                {Object.entries(habilidades).map(([habilidade, valor]) => (
                  <div key={habilidade} className={styles.habilidade}>
                    <p><span>{habilidade.charAt(0).toUpperCase() + habilidade.slice(1)}: </span>{valor}</p>
                    <div>
                      <button onClick={() => handleDecrease(habilidade)} className={styles.btn_hab}>-</button>
                      <button onClick={() => handleIncrease(habilidade)} className={styles.btn_hab}>+</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      
      </div>

      <div className={`${styles.inventory} ${showInventory ? '' : styles.ocult}`}>
        <div>
          <h4>Inventario</h4>

          <button className={styles.btn_hab} onClick={() => setShowInventory(!showInventory)}>X</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <input type="text" onChange={(e) => setInv(e.target.value)} value={inv} placeholder='Adicione o item'/>
          <input type="submit" value="adicionar" className={styles.btn_play}/>
        </form>

        <hr />
        <ul>
          {inventory.map((item, index) => (
            <li key={index}>
              {item.item}
              <button onClick={() => removeItemFromInventory(index)} className={styles.btn_list}>Remover</button>
            </li>
          ))}
        </ul>
      </div>


      <div className={styles.buttons_area}>
        <button className={styles.btn_play} onClick={() => setShowInventory(!showInventory)}>
   {showInventory ? 'Ocultar Inventário' : 'Mostrar Inventário'}</button>
        <button className={styles.btn_play} onClick={handleDelete}>Deletar personagem</button>
      </div>

    </div>
  )
}

export default Player