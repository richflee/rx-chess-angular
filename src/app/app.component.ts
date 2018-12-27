import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Game } from './models/game';
import { mapToGamePieceViewModels } from './shared/piece-helpers';
import { PieceViewModel } from './models/game-piece-viewmodel';
import { Piece } from './models/piece';
import { fromEvent, Observable, merge, combineLatest } from 'rxjs';
import { mergeMap, tap, map, takeUntil, startWith, skip, exhaustMap } from 'rxjs/operators';

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

  testXPos = '20px';
  testYPos = '200px';

  game: Game;
  boardPieces: PieceViewModel[];
  boardRows: number[] = new Array(8);
  boardColumns: number[] = new Array(8);


  constructor(
    private cd: ChangeDetectorRef
  ) {}


  ngOnInit() {
    this.game = new Game();
    this.boardPieces = mapToGamePieceViewModels(this.game.pieces)
      .filter(piece => !!piece)
      .map(p => {
        p.x = this.evaluateXPosition(p);
        p.y = this.evaluateYPosition(p);
        return p;
      });

    // console.log('%cthis.boardPieces', 'color: cyan; font-weight: bold;');
    // console.log('pieces', this.boardPieces);
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
                map((e: MouseEvent) => {
                  console.log('herrow', e);
                  console.log('startX', startX);
                  console.log('clientX', e.clientX);
                  // console.log('moveX', e.movementX);
                  // console.log('moveY', e.movementY);
                  // console.log('offsetX', e.offsetX);

                  return {
                    piece: e.target['dataset']['piece'],
                    x: e.clientX - startX,
                    y: e.clientY - startY
                  }
                }),
                takeUntil(testUp$)
              )
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
      const mouseUp$ = fromEvent(element, 'mouseup');

      const o$ = mouseDown$
        .pipe(
          exhaustMap((e: MouseEvent) => {

            const startX = e.offsetX;
            const startY = e.offsetY;

            return mouseMove$.pipe(
              map((e: MouseEvent) => {
                console.log('herrow', e);
                return {
                  piece: e.target['dataset']['piece'],
                  x: e.clientX - startX,
                  y: e.clientY - startY
                }
              }),
              takeUntil(mouseUp$)
            )
          })
        );
      obs$.push(o$);
    });

    this.subscribeAll(obs$);
  }

  subscribeAll(obs: Observable<{ piece: string, x: number, y: number }>[]): void {
    obs.forEach((o: Observable<{ piece: string, x: number, y: number }>) => {
      o.subscribe((e: { piece: string, x: number, y: number }) => {
        if (e.piece) {
          const p: PieceViewModel = this.boardPieces[+e.piece];
          console.log('setting!', e);
          p.x = `${e.x}px`;
          p.y = `${e.y}px`;
        }
      })
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
