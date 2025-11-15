import { Cell, Point } from "@/types/gridType";

export const GRID_SIZE = 15;

export function generateEmptyGrid(rows: number, cols: number): Cell[][] {
  const grid: Cell[][] = [];
  for (let y = 0; y < rows; y++) {
    const row: Cell[] = [];
    for (let x = 0; x < cols; x++) {
      row.push({ x, y, type: 'empty' });
    }
    grid.push(row);
  }
  return grid;
}

export function manhattanDistance(p1: Point, p2: Point): number {
  return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
}

export function pointsEqual(p1: Point | null, p2: Point | null): boolean {
  if (!p1 || !p2) return false;
  return p1.x === p2.x && p1.y === p2.y;
}

export function isPointInList(point: Point, list: Point[]): boolean {
  return list.some(p => pointsEqual(p, point));
}
