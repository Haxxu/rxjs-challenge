import { EMPTY } from './constants';
import { Boards } from './interfaces';

const isThereEnoughSpaceForNextMove = (
  board: number[][],
  ship: number,
  x: number,
  y: number
) => {
  const row = [...board[x]];
  row[y] = ship;
  const col = board.map((r) => r.filter((c, j) => j === y)[0]);
  col[x] = ship;

  const shipStartInCol = col.indexOf(ship);
  const shipEndInCol = col.lastIndexOf(ship);
  const shipStartInRow = row.indexOf(ship);
  const shipEndInRow = row.lastIndexOf(ship);

  const checkSpace = (arr: any[], start: number, end: number) => {
    const startIndex = arr.lastIndexOf(
      (e: number, i: number) => e !== EMPTY && e !== ship && i < start
    );
    const endIndex = arr.findIndex(
      (e: number, i: number) => e !== EMPTY && e !== ship && i > end
    );
    const room = arr.slice(startIndex + 1, endIndex);
    return room.length >= ship;
  };

  return shipStartInCol !== shipEndInCol
    ? checkSpace(col, shipStartInCol, shipEndInCol)
    : shipStartInRow !== shipEndInRow
    ? checkSpace(row, shipStartInRow, shipEndInRow)
    : true;
};

const getTwoValidMoves = (row: number[], ship: number): [number, number] => [
  row.indexOf(ship) - 1,
  row.lastIndexOf(ship) + 1,
];

const getValidMoves = (
  expectedPlayer: 'computer' | 'player',
  boards: Boards,
  ship: number,
  [name, x, y]: [any, number, number]
): any[] => {
  const board = boards[expectedPlayer];
  const rowIndex = board.findIndex((r) =>
    (r as number[][]).some((c) => c === ship)
  );

  return [];
};
