export interface RPGSystem {
  id: string
  name: string
  description: string
  maxLevel?: number | null
  hitDice: string
  attributes: string[]
  mechanics: Record<string, string>
  hitPointsFormula?: string
  proficiencyBonus?: {
    levels: Record<string, number>
  } | null
}