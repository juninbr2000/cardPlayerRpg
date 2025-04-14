import React from 'react'
import styles from "./Create.module.css"
import { useState } from 'react'


const Create = () => {

    const [name, setName] = useState('')
    const [profic, setProfic] = useState('')
    const [personality, setPersonality] = useState('')
    const [description, setDescription] = useState('')
    const [life, setLife] = useState('')
    const [defence, setDefence] = useState('')
    const [attributes, setAttributes] = useState([{
        vigor: 0,
        agilidade: 0,
        espirito: 0,
        força: 0,
        intelecto: 0
    }])
    const [skills, setSkills] = useState([{
        corpo_a_corpo: 0,
        tiro: 0,
        arremesso: 0,
        persuasão: 0,
        intimidação: 0,
        labia: 0,
        conhecimento: 0,
        investigação: 0,
        reparo: 0,
        sobrevivencia: 0,
        furtividade: 0,
        acrobacia: 0,
        navegaçao: 0,
        pilotagem: 0,
        direção: 0
    }])

    let attributePoints = 5;
    let skillPoints = 15


    const clearInp = () => {

    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if(file){
            setPlayerImage(file)
        }

    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        
       
        
        clearInp()

        setSuccessMessage("personagem criado com sucesso")

        setTimeout(() => {
            setSuccessMessage('');
        }, 3000);
        

            
        return playerInfo
    }

    

  return (
    <div className={styles.create}>
        
    </div>
  )
}

export default Create