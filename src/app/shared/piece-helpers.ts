import { Piece } from '../models/piece';
import { PieceViewModel } from '../models/game-piece-viewmodel';

export function mapToGamePieceViewModels(pieces: Piece[]): PieceViewModel[] {
    return pieces.map((piece) => piece && new PieceViewModel(piece));
}
