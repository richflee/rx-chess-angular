import { GameBoard } from "./game-board";
import { BoardPosition } from "./board-position";
import { Piece } from "./piece";
import { Pawn } from "./pawn";
import { Rook } from "./rook";

export enum PlayerLabel {
    WHITE = <any>'white',
    BLACK = <any>'black'
}

export class Game {

    public currentTurn: string = PlayerLabel[PlayerLabel.WHITE];
    private _gameBoard: GameBoard;

    constructor() {
        this.init();
    }

    private init() {
        this._gameBoard = new GameBoard();
        console.log('gameboard', this.printBoard());
    }

    public printBoard() {
        const board = this._gameBoard.board;

        const displayBoard = board.map((row: Array<object>) => {
            return row.map(this.objectToBoardDisplay)
                .reduce((acc, curr) => `${acc} ${curr}`, '');
        });

        displayBoard.forEach(row => {
            console.log(row);
        });
    }

    private objectToBoardDisplay(obj: Piece): string {
        if (obj instanceof Pawn) {
            return `[${obj.displayPrefix()}-P]`;
        } else if (obj instanceof Rook) {
            return `[${obj.displayPrefix()}-R]`;
        } else {
            return '[...]';
        }
    }

    public nextTurn() {
        return this.currentTurn === PlayerLabel[PlayerLabel.WHITE]
            ? PlayerLabel[PlayerLabel.BLACK]
            : PlayerLabel[PlayerLabel.WHITE];
    }

    public validateMove(piece: 'string', destination: BoardPosition): boolean {
        return this._gameBoard.pieceAtPosition(piece);
    }
}
