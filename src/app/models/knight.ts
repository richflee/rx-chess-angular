import { Piece } from './piece';
import { BoardPosition } from './board-position';

export class Knight extends Piece {
    displayIdentifier(): string {
        return `${this.displayPrefix()}KNIGHT`;
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
