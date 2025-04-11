import React from 'react'
import styles from "./Create.module.css"
import { useState } from 'react'


const Create = () => {

    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [history, setHistory] = useState('')
    const [life, setLife] = useState('')
    const [points, setPoints] = useState('')
    const [playerImage, setPlayerImage] = useState(null);
    const [successMessage, setSuccessMessage] = useState("")

    const clearInp = () => {
        setName('')
        setAge('')
        setHistory('')
        setLife('')
        setPoints('')
        setPlayerImage(null)
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if(file){
            setPlayerImage(file)
        }

    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        
        console.log("playerImage: " + playerImage)

        if(!name || !age || !life || !points){
            setSuccessMessage("Preencha todos os campos!")
            
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);

            return
        }

        let playerInfo = new Array()
        

        if(localStorage.hasOwnProperty("playerInfo")){
            playerInfo = JSON.parse(localStorage.getItem("playerInfo"))
        }
        const key = playerInfo.length

        const playerImageURL = playerImage ? URL.createObjectURL(playerImage) : null;
        
        playerInfo.push({id: key, name, age, history, life, points, playerImage: playerImageURL || null})

        localStorage.setItem("playerInfo", JSON.stringify(playerInfo))
        
        clearInp()

        setSuccessMessage("personagem criado com sucesso")

        setTimeout(() => {
            setSuccessMessage('');
        }, 3000);
        

            
        return playerInfo
    }

    

  return (
    <div className={styles.create}>
        <h2>Criar Personagem</h2>

        <form className={styles.P_form} onSubmit={handleSubmit}>
            <h4>Ficha de Personagem</h4>
            <div>
                <label htmlFor="TxtNome">
                    Nome:
                    <input type="text" name='TxtNome' placeholder='Nome do personagem' value={name} onChange={(e) => setName(e.target.value)}/>
                </label>
                <label htmlFor="NbrAge">
                    Idade:
                    <input type="number" min={18} max={60} placeholder='Age' value={age} onChange={(e) => setAge(e.target.value)}/>
                </label>

            </div>
            <label htmlFor="ImgPlayer">
                Player picture:
                <input type="file" onChange={(e)=>{handleImageChange(e)}}/>
            </label>
            <label htmlFor="TxtHistory">
                Historia / Caracteristicas: (opcional)
            </label>
            <textarea name="TxtHistory" id="txtHistory" cols="30" rows="10" placeholder='Historia do personagem' value={history} onChange={(e) => setHistory(e.target.value)}></textarea>
            <div>
                <label htmlFor="NbrLife">
                    Pontos de Vida:
                    <input type="number" max={25} min={0} value={life} onChange={(e) => setLife(e.target.value)}/>
                </label>
                <label htmlFor="NbrHability">
                    Pontos de Habilidade:
                    <input type="number" max={30} min={10} value={points} onChange={(e) => setPoints(e.target.value)}/>
                </label>
            </div>
            <input type="submit" value={"Criar"} className={styles.btn_form}/>
        </form>

        {successMessage && (
            <div className={styles.alert}>
                <p className={styles.successMessage}>{successMessage}</p>
            </div>
        )}
    </div>
  )
}

export default Create