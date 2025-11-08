"use client";

import Grid from "@/components/module/Grid/Grid";
import RouteInfo from "@/components/module/RouteInfo/RouteInfo";
import Container from "@/layout/Container";
import { Cell, Point, RouteResult } from "@/types/gridType";
import { generateEmptyGrid, GRID_SIZE } from "@/utils/gridUtils";
import { useState } from "react";

export default function Home() {
  const [grid, setGrid] = useState<Cell[][]>(() =>
    generateEmptyGrid(GRID_SIZE, GRID_SIZE)
  );
  const [pathPoints, setPathPoints] = useState<Point[]>([]);
  const [routeResult, setRouteResult] = useState<RouteResult | null>(null);


  const handleCellClick = (x: number, y: number) => {};

  const handleCellRightClick = (x: number, y: number) => {};

  return (
    <div className="min-h-screen font-display pb-15">
      <Container className="pt-15">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Delivery Route Optimizer
          </h1>
          <p className="text-gray-500 text-md font-sans">
            Simulate delivery route optimization using A* pathfinding and TSP
            algorithms
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 items-start">
          {/* Grids */}
          <Grid
            grid={grid}
            onCellClick={handleCellClick}
            onCellRightClick={handleCellRightClick}
            pathPoints={pathPoints}
          />

          {/* Result */}
          <div>
            <RouteInfo routeResult={routeResult} />
          </div>

        </div>
      </Container>
    </div>
  );
}
