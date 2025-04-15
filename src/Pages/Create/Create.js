import React, { useState, useEffect } from 'react'
import styles from './Create.module.css'
import { useAuthValue } from '../../context/AuthContext'
import { useInsertDocument } from '../../hooks/useInsertDocument'

const Create = () => {
  const { user } = useAuthValue()
  const [name, setName] = useState('')
  const [profic, setProfic] = useState('')
  const [personality, setPersonality] = useState('')
  const [description, setDescription] = useState('')
  const [life, setLife] = useState(0)
  const [defence, setDefence] = useState(0)
  const [playerImage, setPlayerImage] = useState(null)
  const [successMessage, setSuccessMessage] = useState('')
  
  const { insertDocument, response } = useInsertDocument('player')

  const [attributes, setAttributes] = useState({
    vigor: 0,
    agilidade: 0,
    espirito: 0,
    força: 0,
    intelecto: 0
  })

  const [skills, setSkills] = useState({
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
  })

  const attributePoints = 5
  const skillPoints = 15

  // Cálculo de pontos usados
  const totalAttributePoints = Object.values(attributes).reduce((acc, val) => acc + val, 0)
  const totalSkillPoints = Object.values(skills).reduce((acc, val) => acc + val, 0)

  // Atualizar vida e defesa
  useEffect(() => {
    const { vigor, força } = attributes
    const calcLife = 4 + (vigor * 2) 
    const calcDef = 2 + (força * 2)
    setLife(calcLife)
    setDefence(calcDef)
  }, [attributes])

  const handleAttributeChange = (key, value) => {
    if (value < 0) return

    const newAttributes = {
      ...attributes,
      [key]: value
    }

    const total = Object.values(newAttributes).reduce((acc, val) => acc + val, 0)
    if (total <= attributePoints) {
      setAttributes(newAttributes)
    }
  }

  const handleSkillChange = (key, value) => {
    if (value < 0) return

    const newSkills = {
      ...skills,
      [key]: value
    }

    const total = Object.values(newSkills).reduce((acc, val) => acc + val, 0)
    if (total <= skillPoints) {
      setSkills(newSkills)
    }
  }

//   const handleImageChange = (e) => {
//     const file = e.target.files?.[0]
//     if (file) setPlayerImage(file)
//   }

  const clearInp = () => {
    setName('')
    setProfic('')
    setPersonality('')
    setDescription('')
    setAttributes({
      vigor: 0,
      agilidade: 0,
      espirito: 0,
      força: 0,
      intelecto: 0
    })
    setSkills({
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
    })
    setPlayerImage(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const playerInfo = {
      name,
      profic,
      personality,
      description,
      life,
      defence,
      attributes,
      skills,
    //   image: playerImage,
      createBy: user.uid
    }

    try {
        await insertDocument(playerInfo)

        if(response){
            setSuccessMessage("Personagem criado com sucesso!", response)
            clearInp()
            
        }
    } catch ( error ){
        console.error(error)
        setSuccessMessage(error, response)
    }

    setTimeout(() => setSuccessMessage(''), 3000)
  }

  return (
    <div className={styles.create}>
      <form onSubmit={handleSubmit}>
        <h2>Criar Personagem</h2>

        <input type="text" placeholder="Nome" value={name} onChange={e => setName(e.target.value)} />
        <input type="text" placeholder="Profissão" value={profic} onChange={e => setProfic(e.target.value)} />
        <input type="text" placeholder="Personalidade" value={personality} onChange={e => setPersonality(e.target.value)} />
        <textarea placeholder="Descrição" value={description} onChange={e => setDescription(e.target.value)} />

        <div><strong>Vida:</strong> {life}</div>
        <div><strong>Defesa:</strong> {defence}</div>

        <h3>Atributos ({attributePoints - totalAttributePoints} pontos restantes)</h3>
        {Object.keys(attributes).map((key) => (
          <div key={key}>
            <label>{key.toUpperCase()}</label>
            <input
              type="number"
              value={attributes[key] || 0}
              onChange={(e) =>
                handleAttributeChange(key, Number(e.target.value) || 0)
              }
              min={0}
            />
          </div>
        ))}

        <h3>Perícias ({skillPoints - totalSkillPoints} pontos restantes)</h3>
        {Object.keys(skills).map((key) => (
          <div key={key}>
            <label>{key.replace(/_/g, ' ')}</label>
            <input
              type="number"
              value={skills[key] || 0}
              onChange={(e) =>
                handleSkillChange(key, Number(e.target.value) || 0)
              }
              min={0}
            />
          </div>
        ))}

        {/* <div>
          <label>Imagem do personagem:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div> */}

        <button type="submit">Criar</button>

        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      </form>
    </div>
  )
}

export default Create