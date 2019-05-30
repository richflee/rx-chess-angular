import { Piece } from './piece';
import { BoardPosition } from './board-position';

export class King extends Piece {
    displayIdentifier(): string {
        return `${this.displayPrefix()}KING`;
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
