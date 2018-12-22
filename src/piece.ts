import { BoardPosition } from "./board-position";
import { ChessTeam } from "./chess-team.enum";

export abstract class Piece {
    public claimed: boolean = false;
    public team: string;
    public xPos: number;
    public yPos: number;

    constructor(pos: BoardPosition, team: ChessTeam) { 
        this.xPos = pos.x;
        this.yPos = pos.y;
        this.team = team.valueOf();
    }

    displayPrefix(): string {
        return this.team === 'WHITE' ? 'W-' : 'B-';
    }

    abstract move(toPosition: BoardPosition): BoardPosition;

    abstract canClaimWithMove(toPosition: BoardPosition): boolean;
    
    abstract canMoveToPosition(position: BoardPosition): boolean;
}
