export type CellType = 'empty' | 'start' | 'delivery' | 'path' | 'obstacle';

export interface Point {
  x: number;
  y: number;
}

export interface Cell {
  x: number;
  y: number;
  type: CellType;
}

export interface RouteResult {
  order: Point[];
  totalDistance: number;
  paths: Point[][];
}


export type Mode = 'start' | 'delivery' | null;
