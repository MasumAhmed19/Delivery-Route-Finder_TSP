import { Cell, Point } from "@/types/gridType";
import { manhattanDistance, pointsEqual } from "@/utils/gridUtils";

interface AStarNode {
  point: Point;
  g: number;
  h: number;
  f: number;
  parent: AStarNode | null;
}

export function findPath(start: Point, end: Point, grid: Cell[][]): Point[] {
  const rows = grid.length;
  const cols = grid[0].length;

  const openList: AStarNode[] = [];
  const closedList: Set<string> = new Set();

  const starNode: AStarNode = {
    point: start,
    g: 0,
    h: manhattanDistance(start, end),
    f: manhattanDistance(start, end),
    parent: null,
  };

  openList.push(starNode);

  while (openList.length > 0) {
    openList.sort((a, b) => a.f - b.f);
    const current = openList.shift()!;

    const key = `${current.point.x},${current.point.y}`;
    if (closedList.has(key)) continue;
    closedList.add(key);

    if (pointsEqual(current.point, end)) {
      return reconstructPath(current);
    }

    const neighbors = getNeighbors(current.point, rows, cols, grid);

    for (const neighbor of neighbors) {
      const neighborKey = `${neighbor.x},${neighbor.y}`;
      if (closedList.has(neighborKey)) continue;

      const g = current.g + 1;
      const h = manhattanDistance(neighbor, end);
      const f = g + h;

      const existingNode = openList.find((n) => pointsEqual(n.point, neighbor));

      if (!existingNode || g < existingNode.g) {
        const newNode: AStarNode = {
          point: neighbor,
          g,
          h,
          f,
          parent: current,
        };

        if (existingNode) {
          openList.splice(openList.indexOf(existingNode), 1);
        }
        openList.push(newNode);
      }
    }
  }

  return [start, end];
}

function getNeighbors(
  point: Point,
  rows: number,
  cols: number,
  grid: Cell[][]
): Point[] {
  const neighbors: Point[] = [];
  const directions = [
    { x: 0, y: -1 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: -1, y: 0 },
  ];

  for (const dir of directions) {
    const newX = point.x + dir.x;
    const newY = point.y + dir.y;

    if (newX >= 0 && newX < cols && newY >= 0 && newY < rows) {
      const cell = grid[newY][newX];
      if (cell.type !== 'obstacle') {
        neighbors.push({ x: newX, y: newY });
      }
    }
  }

  return neighbors;
}

function reconstructPath(node: AStarNode): Point[] {
  const path: Point[] = [];
  let current: AStarNode | null = node;

  while (current) {
    path.unshift(current.point);
    current = current.parent;
  }

  return path;
}
