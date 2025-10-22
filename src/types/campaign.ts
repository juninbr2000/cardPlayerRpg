import { Timestamp } from "firebase/firestore";

export interface campaignCreate {
    id: string,
    name: string,
    description: string,
    system: string,
    masterId: string | null,
    masterName: string | null,
    rulesId: string
    createdAt?: Timestamp
}

export interface Campaign extends campaignCreate {
    id: string
    players: string[]
    invitedPlayers: string[]
    isActive: boolean
}