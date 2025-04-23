import React, { useState } from 'react'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase/config'

const Inventary = ({ charac, setCharac }) => {
  const [newItem, setNewItem] = useState('')
  const [newQty, setNewQty] = useState(1)

  const handleAddItem = async (e) => {
    e.preventDefault()

    const item = {
      id: Date.now().toString(),
      name: newItem,
      qtd: newQty,
    }

    const updatedInventory = [...(charac.inventory || []), item]
    const charRef = doc(db, 'player', charac.id)

    await updateDoc(charRef, {
      inventory: updatedInventory,
    })

    setCharac(prev => ({ ...prev, inventory: updatedInventory }))
    setNewItem('')
    setNewQty(1)
  }

  const handleRemoveItem = async (id) => {
    const updatedInventory = charac.inventory.filter(item => item.id !== id)
    const charRef = doc(db, 'player', charac.id)

    await updateDoc(charRef, { inventory: updatedInventory })
    setCharac(prev => ({ ...prev, inventory: updatedInventory }))
  }

  return (
    <div className='inventory_modal'>
      <h2>Inventário</h2>

      <form onSubmit={handleAddItem}>
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Nome do item"
          required
        />
        <input
          type="number"
          min="1"
          value={newQty}
          onChange={(e) => setNewQty(Number(e.target.value))}
        />
        <button className='primary'>Adicionar</button>
      </form>

      <ul>
        {(charac.inventory || []).map(item => (
          <li key={item.id} className='itemInventary'>
            {item.name} x{item.qtd}
            <button className='primary' onClick={() => handleRemoveItem(item.id)}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Inventary