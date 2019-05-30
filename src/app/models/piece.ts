import { BoardPosition } from './board-position';
import { ChessTeam } from './chess-team.enum';

export abstract class Piece {
    public claimed = false;
    public team: string;
    public xPos: number;
    public yPos: number;
    public uniqueIdentifier: string;

    constructor(pos: BoardPosition, team: ChessTeam) {
        this.xPos = pos.x;
        this.yPos = pos.y;
        this.team = team.valueOf();
    }

    displayPrefix(): string {
        return this.team.toLowerCase() === 'white' ? 'W-' : 'B-';
    }

    abstract displayIdentifier(): string;

    abstract move(toPosition: BoardPosition): BoardPosition;

    abstract canClaimWithMove(toPosition: BoardPosition): boolean;

    abstract canMoveToPosition(position: BoardPosition): boolean;
}
