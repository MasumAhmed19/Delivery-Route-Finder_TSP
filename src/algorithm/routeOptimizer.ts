import { Cell, Point, RouteResult } from '@/types/gridType';
import { pointsEqual } from '../utils/gridUtils';
import { findPath } from './astar';

export function optimizeRoute(
  start: Point,
  deliveries: Point[],
  grid: Cell[][]
): RouteResult {
  if (deliveries.length === 0) {
    return {
      order: [start],
      totalDistance: 0,
      paths: [],
    };
  }

  const order = nearestNeighborTSP(start, deliveries, grid);
  const { totalDistance, paths } = calculateRouteDetails(order, grid);
  // const estimatedTime = Math.round(totalDistance * 0.2);

  return {
    order,
    totalDistance,
    paths,
  };
}

function nearestNeighborTSP(
  start: Point,
  deliveries: Point[],
  grid: Cell[][]
): Point[] {
  const unvisited = [...deliveries];
  const route: Point[] = [start];
  let current = start;

  while (unvisited.length > 0) {
    let nearest: Point | null = null;
    let minDistance = Infinity;

    for (const point of unvisited) {
      const path = findPath(current, point, grid);
      const distance = path.length - 1;

      if (distance < minDistance) {
        minDistance = distance;
        nearest = point;
      }
    }

    if (nearest) {
      route.push(nearest);
      const index = unvisited.findIndex(p => pointsEqual(p, nearest!));
      unvisited.splice(index, 1);
      current = nearest;
    }
  }

  return route;
}

function calculateRouteDetails(
  order: Point[],
  grid: Cell[][]
): { totalDistance: number; paths: Point[][] } {
  let totalDistance = 0;
  const paths: Point[][] = [];

  for (let i = 0; i < order.length - 1; i++) {
    const path = findPath(order[i], order[i + 1], grid);
    paths.push(path);
    totalDistance += path.length - 1;
  }

  return { totalDistance, paths };
}
