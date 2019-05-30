import { Piece } from './piece';
import { BoardPosition } from './board-position';

export class Bishop extends Piece {
    displayIdentifier(): string {
        return `${this.displayPrefix()}BISHOP`;
    }

    move(toPosition: BoardPosition): BoardPosition {
        return toPosition;
    }

    canMoveToPosition(position: BoardPosition): boolean {
        return true;
    }

    canClaimWithMove(toPosition: BoardPosition): boolean {
        return true;
    }
}
