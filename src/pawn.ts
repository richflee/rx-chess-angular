import { Piece } from "./piece";
import { BoardPosition } from "./board-position";

export class Pawn extends Piece {
    move(toPosition: BoardPosition): BoardPosition {
        return toPosition;
    }

    canClaimWithMove(toPosition: BoardPosition): boolean {
        return true;
    }

    canMoveToPosition(position: BoardPosition): boolean {
        return true;
    }
}
