import { Team } from "./team";

export interface League {
    leagueID?: string;
    name?: string;
    positions?: {
        QB: number,
        RB: number,
        WR: number,
        TE: number,
        QRWT: number,
        RWT: number,
        DEF: number,
        K: number,
        B: number
    },
    myTeamID?: string,
    currentRound?: number,
    currentPick?: number,
    numTeams?: number,
    numRounds?: number,
    draftedPlayers?: any
}