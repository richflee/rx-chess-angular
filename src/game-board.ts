import { BoardPosition } from "./board-position";
import { Rook } from "./rook";
import { Pawn } from "./pawn";
import { Piece } from "./piece";
import { ChessTeam } from "./chess-team.enum";

export class GameBoard {

    public board: Array<Array<Piece>>;

    constructor() {
        this.board = [];
        const rowsCount = 8;
        for (let i = 0; i < rowsCount; i++) {
            if (i === 0 || i === (rowsCount - 1)) {
                const team = i == 0 ? ChessTeam.WHITE : ChessTeam.BLACK;
                this.board.push(this.populateInitialTeamRow(team));
            } else if (i === 1 || i === (rowsCount - 2)) {
                const team = i == 0 ? ChessTeam.WHITE : ChessTeam.BLACK;
                this.board.push(this.populatePawnRow(team));
            } else {
                this.board.push([null, null, null, null, null, null, null, null]);
            }
        }
    }

    private findPiece(row: number, column: number): object {
        return this.board[row][column];
    }

    private populateInitialTeamRow(team: ChessTeam): Piece[] {
        const row = [];
        for (let j = 0; j < 8; j++) {
            const r = new Rook({ x: j, y: 0 }, team === ChessTeam.WHITE ? ChessTeam.WHITE : ChessTeam.BLACK);
            row.push(r);
        }
        console.log('populated', row);
        return row;
    }

    private populatePawnRow(team: ChessTeam): Pawn[] {
        const row = [];
        for (let j = 0; j < 8; j++) {
            const r = new Pawn({ x: j, y: 1 }, team === ChessTeam.WHITE ? ChessTeam.WHITE : ChessTeam.BLACK);
            row.push(r);
        }
        return row;
    }

    claim(from: BoardPosition, to: BoardPosition): boolean {
        return true;
    }

    moviePiece(from: BoardPosition, to: BoardPosition): boolean {
        return true;
    }

    pieceAtPosition(piecePosition: string): boolean {
        const row = piecePosition.slice(0,0);
        const col = piecePosition.slice(1,1);
        const found = this.findPiece(+row, +col);
        return found[0] !== null;
    }
}
