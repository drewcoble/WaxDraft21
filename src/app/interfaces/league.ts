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
    // try to put collections here...
    teams?: Team[];
    draft?: any
}