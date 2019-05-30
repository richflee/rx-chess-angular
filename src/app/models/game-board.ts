import { BoardPosition } from './board-position';
import { Rook } from './rook';
import { Pawn } from './pawn';
import { Piece } from './piece';
import { ChessTeam } from './chess-team.enum';
import { Bishop } from './bishop';
import { Knight } from './knight';
import { Queen } from './queen';
import { King } from './king';

export class GameBoard {

    public board: Array<Array<Piece>>;

    constructor() {
        this.board = [];

        const maxRowsCount = 8;
        const rowsCount = new Array(8).fill(null);

        const arrayOfRowsOfPieces = rowsCount.map((_, i) => {
            if (i === 0 || i === (maxRowsCount - 1)) {
                const team = i === 0 ? ChessTeam.WHITE : ChessTeam.BLACK;
                return this.populateInitialTeamRow(team, i);
            } else if (i === 1 || i === (maxRowsCount - 2)) {
                const team = i === 1 ? ChessTeam.WHITE : ChessTeam.BLACK;
                return this.populatePawnRow(team, i);
            } else {
                return [null, null, null, null, null, null, null, null];
            }
        });

        this.board = arrayOfRowsOfPieces;
        console.log('board', this.board);
    }

    private findPiece(row: number, column: number): object {
        return this.board[row][column];
    }

    private populateInitialTeamRow(team: ChessTeam, rowPosition: number): Piece[] {
        const row = [];
        for (let j = 0; j < 8; j++) {
            let r;
            if (j === 1 || j === 6) {
                r = new Knight({ x: j, y: rowPosition }, team === ChessTeam.WHITE ? ChessTeam.WHITE : ChessTeam.BLACK);
            } else if (j === 2 || j === 5) {
                r = new Bishop({ x: j, y: rowPosition }, team === ChessTeam.WHITE ? ChessTeam.WHITE : ChessTeam.BLACK);
            } else if (j === 3) {
                r = new Queen({ x: j, y: rowPosition }, team === ChessTeam.WHITE ? ChessTeam.WHITE : ChessTeam.BLACK);
            } else if (j === 4) {
                r = new King({ x: j, y: rowPosition }, team === ChessTeam.WHITE ? ChessTeam.WHITE : ChessTeam.BLACK);
            } else {
                r = new Rook({ x: j, y: rowPosition }, team === ChessTeam.WHITE ? ChessTeam.WHITE : ChessTeam.BLACK);
            }

            row.push(r);
        }
        return row;
    }

    private populatePawnRow(team: ChessTeam, rowPosition: number): Pawn[] {
        const row = [];
        for (let j = 0; j < 8; j++) {
            const r = new Pawn({ x: j, y: rowPosition }, team === ChessTeam.WHITE ? ChessTeam.WHITE : ChessTeam.BLACK);
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
