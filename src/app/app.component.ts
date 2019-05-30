import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Game } from './models/game';
import { mapToGamePieceViewModels } from './shared/piece-helpers';
import { PieceViewModel } from './models/game-piece-viewmodel';
import { Piece } from './models/piece';
import { fromEvent, Observable, merge, combineLatest } from 'rxjs';
import { mergeMap, tap, map, takeUntil, startWith, skip, exhaustMap } from 'rxjs/operators';
import { Rook } from './models/rook';
import { Pawn } from './models/pawn';
import { Knight } from './models/knight';
import { Bishop } from './models/bishop';
import { Queen } from './models/queen';
import { King } from './models/king';

@Component({
  selector: 'rxc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'rxc';

  private readonly PIECE_WIDTH = 30;
  private readonly PIECE_HEIGHT = 30;
  private readonly CELL_HEIGHT = 60;

  piecesMap = {};


  // WHITE PIECES
  whiteRook: PieceViewModel;
  whiteKnight: PieceViewModel; // Knight;
  whiteBishop: PieceViewModel; // Bishop;
  whiteQueen: PieceViewModel; // Queen;
  whiteKing: PieceViewModel; // King;
  whiteBishop2: PieceViewModel; // Bishop;
  whiteKnight2: PieceViewModel; // Knight;
  whiteRook2: PieceViewModel;
  whitePawn: PieceViewModel;
  whitePawn2: PieceViewModel;
  whitePawn3: PieceViewModel;
  whitePawn4: PieceViewModel;
  whitePawn5: PieceViewModel;
  whitePawn6: PieceViewModel;
  whitePawn7: PieceViewModel;
  whitePawn8: PieceViewModel;

  // BLACK PIECES
  blackRook: PieceViewModel;
  blackKnight: PieceViewModel; // Knight;
  blackBishop: PieceViewModel; // Bishop;
  blackQueen: PieceViewModel; // Queen;
  blackKing: PieceViewModel; // King;
  blackBishop2: PieceViewModel; // Bishop;
  blackKnight2: PieceViewModel; // Knight;
  blackRook2: PieceViewModel;
  blackPawn: PieceViewModel;
  blackPawn2: PieceViewModel;
  blackPawn3: PieceViewModel;
  blackPawn4: PieceViewModel;
  blackPawn5: PieceViewModel;
  blackPawn6: PieceViewModel;
  blackPawn7: PieceViewModel;
  blackPawn8: PieceViewModel;



  testXPos = '20px';
  testYPos = '200px';

  game: Game;
  boardPieces: PieceViewModel[];
  boardRows: number[] = new Array(8);
  boardColumns: number[] = new Array(8);


  ngOnInit() {
    this.game = new Game();
    this.boardPieces = mapToGamePieceViewModels(this.game.pieces)
      .filter(piece => !!piece)
      .map((p: PieceViewModel) => {
        p.x = this.evaluateXPosition(p);
        p.y = this.evaluateYPosition(p);
        return p;
      });

    this.boardPieces.forEach((p: PieceViewModel) => {
      this.piecesMap[p.piece.uniqueIdentifier] = p;
    });

    console.log('pieceMap', this.piecesMap);
  }

  ngAfterViewInit() {

    const testPiece = document.querySelector('.piece-piece');

    if (testPiece) {
      const testDown$ = fromEvent(testPiece, 'mousedown');
      const testMove$ = fromEvent(document, 'mousemove');
      const testUp$ = fromEvent(testPiece, 'mouseup');

      const testObs$ = testDown$
          .pipe(
            exhaustMap((e: MouseEvent) => {

              const startX = e.offsetX;
              const startY = e.offsetY;

              return testMove$.pipe(
                map((moveEvent: MouseEvent) => {
                  return {
                    piece: moveEvent.target['dataset']['piece'],
                    x: moveEvent.clientX - startX,
                    y: moveEvent.clientY - startY
                  };
                }),
                takeUntil(testUp$)
              );
            })
          );

      testObs$.subscribe((e: any) => {
        console.log('%cHERE', 'background-color: yellow; color: black; font-weight: bold;');
        console.log(e);
        this.testXPos = `${e['x']}px`;
        this.testYPos = `${e['y']}px`;
      });
    }


    const nodes = Array.from(document.querySelectorAll('.game-piece'));
    const obs$ = [];
    nodes.forEach(element => {

      const mouseDown$ = fromEvent(element, 'mousedown');
      const mouseMove$ = fromEvent(document, 'mousemove');
      const mouseUp$ = fromEvent(element, 'mouseup').pipe(startWith(null));
      const docMouseUp$ = fromEvent(document, 'mouseup').pipe(startWith(null));

      const combined$ = combineLatest(mouseUp$, docMouseUp$, (one, two) => true)
        .pipe(skip(1));

      const o$ = mouseDown$
        .pipe(
          exhaustMap((e: MouseEvent) => {

            const startX: number = e.offsetX;
            const startY: number = e.offsetY;
            return mouseMove$.pipe(
              map((moveEvent: MouseEvent) => {
                return {
                  piece: moveEvent.target['dataset']['piece'],
                  x: (moveEvent.clientX + window.scrollX) - startX,
                  y: (moveEvent.clientY + window.scrollY) - startY
                };
              }),
              takeUntil(combined$)
            );
          })
        );
      obs$.push(o$);
    });

    this.subscribeAll(obs$);
  }


  subscribeAll(dragEvents: Observable<{ pieceIndex: string, x: number, y: number }>[]): void {
    dragEvents.forEach((mouseDrag: Observable<{ pieceIndex: string, x: number, y: number }>) => {
      mouseDrag.subscribe((e: { pieceIndex: string, x: number, y: number }) => {
        if (e.pieceIndex) {
          const p: PieceViewModel = this.boardPieces[+e.pieceIndex];
          p.x = `${e.x}px`;
          p.y = `${e.y}px`;
        }
      });
    });
  }


  evaluateYPosition(piece: Piece | PieceViewModel): string {
    const val = (piece.yPos * this.CELL_HEIGHT) + 114 + (this.CELL_HEIGHT / 2) - (this.PIECE_HEIGHT / 2);
    return `${val}px`;
  }


  evaluateXPosition(piece: Piece | PieceViewModel): string {
    const cellWidth = 176;
    const val = (cellWidth * piece.xPos) + 9 + Math.floor(cellWidth / 2) - (this.PIECE_WIDTH / 2);
    return `${val}px`;
  }
}
