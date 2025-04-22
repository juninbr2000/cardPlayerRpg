import React, { useState } from 'react'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase/config'

const UserLogs = ({ user, charac, setCharac }) => {
  const [newLog, setNewLog] = useState('')

  const saveLog = async (e) => {
    e.preventDefault()

    const newEntry = {
      text: newLog,
      timestamp: new Date(),
      user: user.displayName,
    }

    const updatedLogs = [...(charac.logs || []), newEntry]

    const charRef = doc(db, "player", charac.id)
    await updateDoc(charRef, {
      logs: updatedLogs,
    })

    setCharac({ ...charac, logs: updatedLogs })
    setNewLog("")
  }

  if (!charac.id) {
    console.error("ID do personagem não está definido.")
    return
  }

  return (
    <div className='notes_modal'>
      <h2>Anotações da Partida</h2>

      <div className="logs_list">
        {charac.logs && charac.logs.length > 0 ? (
          charac.logs.map((log, index) => (
            <div key={index} className="log_item">
              <p>{log.text}</p>
              <small>{log.user} - {new Date(log.timestamp.seconds ? log.timestamp.seconds * 1000 : log.timestamp).toLocaleString()}</small>
            </div>
          ))
        ) : (
          <p>Nenhuma anotação ainda.</p>
        )}
      </div>

      <form className='text_area' onSubmit={saveLog}>
        <textarea
          name="logs"
          value={newLog}
          onChange={(e) => setNewLog(e.target.value)}
          placeholder='Escreva aqui o que aconteceu na partida...'
        ></textarea>
        <button className='primary' type='submit'>Salvar Anotação</button>
      </form>
    </div>
  )
}

export default UserLogs
