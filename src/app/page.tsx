"use client";

import { optimizeRoute } from "@/algorithm/routeOptimizer";
import ControlPanel from "@/components/module/Grid/ControlPanel";
import Grid from "@/components/module/Grid/Grid";
import RouteInfo from "@/components/module/RouteInfo/RouteInfo";
import Container from "@/layout/Container";
import { Cell, Mode, Point, RouteResult } from "@/types/gridType";
import { generateEmptyGrid, GRID_SIZE, pointsEqual } from "@/utils/gridUtils";
import { useEffect, useState } from "react";

export default function Home() {
  const [grid, setGrid] = useState<Cell[][]>(() =>
    generateEmptyGrid(GRID_SIZE, GRID_SIZE)
  );
  const [start, setStart] = useState<Point | null>(null);
  const [deliveries, setDeliveries] = useState<Point[]>([]);
  const [mode, setMode] = useState<Mode>(null);
  const [pathPoints, setPathPoints] = useState<Point[]>([]);
  const [routeResult, setRouteResult] = useState<RouteResult | null>(null);
  const [useTSP, setUseTSP] = useState<boolean>(true);

  const updateGrid = () => {
    const newGrid = generateEmptyGrid(GRID_SIZE, GRID_SIZE);
    if (start) {
      newGrid[start.y][start.x].type = "start";
    }
    deliveries.forEach((point) => {
      newGrid[point.y][point.x].type = "delivery";
    });

    setGrid(newGrid);
  };

  useEffect(() => {
    updateGrid();
  }, [start, deliveries]);

  const handleCellClick = (x: number, y: number) => {
    if (mode === "start") {
      setStart({ x, y });
      setMode(null);
      setRouteResult(null);
      setPathPoints([]);
    } else if (mode === "delivery") {
      const point = { x, y };
      if (!start || !pointsEqual(point, start)) {
        if (!deliveries.some((p) => pointsEqual(p, point))) {
          setDeliveries([...deliveries, point]);
        }
      }
    }
  };

  const handleCellRightClick = (x: number, y: number) => {
    const point = { x, y };

    if (start && pointsEqual(point, start)) {
      setStart(null);
      setRouteResult(null);
      setPathPoints([]);
    } else {
      setDeliveries(deliveries.filter((p) => !pointsEqual(p, point)));
      setRouteResult(null);
      setPathPoints([]);
    }
  };

  const handleOptimize = () => {
    if (!start || deliveries.length === 0) return;

    const result = optimizeRoute(start, deliveries, grid, useTSP);
    setRouteResult(result);

    const allPathPoints: Point[] = [];
    result.paths.forEach((path) => {
      path.forEach((point) => {
        if (!allPathPoints.some((p) => pointsEqual(p, point))) {
          allPathPoints.push(point);
        }
      });
    });
    setPathPoints(allPathPoints);
  };

  const handleClear = () => {
    setStart(null);
    setDeliveries([]);
    setMode(null);
    setRouteResult(null);
    setPathPoints([]);
    setGrid(generateEmptyGrid(GRID_SIZE, GRID_SIZE));
  };

  const handleRandomObstacles = () => {
    const newGrid = [...grid.map((row) => [...row])];
    const obstacleCount = Math.floor(GRID_SIZE * GRID_SIZE * 0.1);

    for (let i = 0; i < obstacleCount; i++) {
      const x = Math.floor(Math.random() * GRID_SIZE);
      const y = Math.floor(Math.random() * GRID_SIZE);

      const isStart = start && pointsEqual({ x, y }, start);
      const isDelivery = deliveries.some((p) => pointsEqual(p, { x, y }));

      if (!isStart && !isDelivery && newGrid[y][x].type === "empty") {
        newGrid[y][x].type = "obstacle";
      }
    }

    setGrid(newGrid);
    setRouteResult(null);
    setPathPoints([]);
  };

  return (
    <div className="min-h-screen font-display pb-15">
      <Container className="pt-10">
        <div className="bg-white rounded-lg shadow-xl p-6 mb-6">
          <ControlPanel
            mode={mode}
            setMode={setMode}
            onOptimize={handleOptimize}
            onClear={handleClear}
            onRandomObstacles={handleRandomObstacles}
            hasStart={start !== null}
            deliveryCount={deliveries.length}
            useTSP={useTSP}
            setUseTSP={setUseTSP}
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-6 items-start">
          {/* Grids */}
          <Grid
            grid={grid}
            onCellClick={handleCellClick}
            onCellRightClick={handleCellRightClick}
            pathPoints={pathPoints}
            deliveries={deliveries}
          />

          {/* Result */}
          <div>
            <RouteInfo routeResult={routeResult} useTSP={useTSP} deliveries={deliveries} />
          </div>
        </div>
      </Container>
    </div>
  );
}
