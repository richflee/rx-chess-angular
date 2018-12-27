import { Piece } from './piece';

export class PieceViewModel {
    public claimed = false;
    public team: string;
    public xPos: number;
    public yPos: number;

    public x: string;
    public y: string;

    constructor(piece: Piece) {
        const cp: Piece = JSON.parse(JSON.stringify(piece));
        this.claimed = cp.claimed;
        this.team = cp.team;
        this.xPos = cp.xPos;
        this.yPos = cp.yPos;
        this.x = '0px';
        this.y = '0px';
    }

    displayPrefix(): string {
        return this.team === 'WHITE' ? 'W-' : 'B-';
    }

    // abstract move(toPosition: BoardPosition): BoardPosition;

    // abstract canClaimWithMove(toPosition: BoardPosition): boolean;

    // abstract canMoveToPosition(position: BoardPosition): boolean;
}
