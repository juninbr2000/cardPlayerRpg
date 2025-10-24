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
    players?: Player[]
}

export interface Player {
    id: string;
    name: string;
    character?: string;
}

export interface Campaign extends campaignCreate {
    id: string
    invitedPlayers: string[]
}