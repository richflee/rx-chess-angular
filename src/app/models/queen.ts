import { Piece } from './piece';
import { BoardPosition } from './board-position';

export class Queen extends Piece {
    displayIdentifier(): string {
        return `${this.displayPrefix()}QUEEN`;
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
