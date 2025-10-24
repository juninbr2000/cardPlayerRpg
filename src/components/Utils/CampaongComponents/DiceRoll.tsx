import { useEffect, useState } from "react"
import styles from "./Players.module.css"

interface Dice {
  name: string
  maxValue: number
}

interface RollResult {
  dice: string
  value: number
}

function DiceRoll() {
  const [result, setResult] = useState<RollResult | null>(null)
  const [history, setHistory] = useState<RollResult[]>([])

  const dices: Dice[] = [
    { name: "d4", maxValue: 4 },
    { name: "d6", maxValue: 6 },
    { name: "d8", maxValue: 8 },
    { name: "d10", maxValue: 10 },
    { name: "d12", maxValue: 12 },
    { name: "d20", maxValue: 20 },
    { name: "d100", maxValue: 100 },
  ]

  // Carrega histórico salvo (só uma vez)
  useEffect(() => {
    try {
      const saved = localStorage.getItem("diceHistory")
      if (saved) {
        const parsed: RollResult[] = JSON.parse(saved)
        if (Array.isArray(parsed)) {
          setHistory(parsed)
        }
      }
    } catch (err) {
      console.error("Erro ao carregar histórico:", err)
    }
  }, [])

  // Salva histórico sempre que mudar
  useEffect(() => {
    try {
      if (history.length > 0) {
        localStorage.setItem("diceHistory", JSON.stringify(history))
      }
    } catch (err) {
      console.error("Erro ao salvar histórico:", err)
    }
  }, [history])

  const rollDice = (num: number, dice: string) => {
    const value = Math.floor(Math.random() * num + 1)
    const roll = { dice, value }

    setResult(roll)

    // Atualiza histórico mantendo apenas os 5 últimos
    setHistory((prev) => {
      const updated = [roll, ...prev].slice(0, 5)
      localStorage.setItem("diceHistory", JSON.stringify(updated))
      return updated
    })
  }

  const clearHistory = () => {
    setHistory([])
    localStorage.removeItem("diceHistory")
  }

  return (
    <div className={styles.playerContainer}>
      <h2>Rolagem de dados</h2>

      <p className={styles.label}>Selecione o dado:</p>

      <div className={styles.diceContainer}>
        {dices.map((d) => (
          <button
            key={d.name}
            className={styles.diceBtn}
            onClick={() => rollDice(d.maxValue, d.name)}
          >
            {d.name}
          </button>
        ))}
      </div>

      <div className={styles.result}>
        <p className={styles.value}>{result ? result.value : '-'}</p>
        <p>{result ? result.dice : ''}</p>
      </div>

      {history.length > 0 && (
        <div className={styles.history}>
          <p>Últimas rolagens:</p>
          <ul>
            {history.map((h, index) => (
              <li key={index}>
                {h.dice} → <strong>{h.value}</strong>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default DiceRoll
