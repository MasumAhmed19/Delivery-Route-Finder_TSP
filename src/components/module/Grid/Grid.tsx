import { Cell, Point } from "@/types/gridType";
import { pointsEqual } from "@/utils/gridUtils";

interface GridProps {
  grid: Cell[][];
  onCellClick: (x: number, y: number) => void;
  onCellRightClick: (x: number, y: number) => void;
  pathPoints: Point[];
}

const Grid = ({
  grid,
  onCellClick,
  onCellRightClick,
  pathPoints,
}: GridProps) => {
  const getCellColor = (cell: Cell): string => {
    const isPath = pathPoints.some((p) =>
      pointsEqual(p, { x: cell.x, y: cell.y })
    );
    if (isPath && cell.type !== "start" && cell.type !== "delivery") {
      return "bg-red-400";
    }

    switch (cell.type) {
      case "start":
        return "bg-blue-500";
      case "delivery":
        return "bg-green-500";
      case "obstacle":
        return "bg-gray-700";
      case "path":
        return "bg-red-400";
      default:
        return "bg-white hover:bg-gray-100";
    }
  };

  const handleContextMenu = (e: React.MouseEvent, x: number, y: number) => {
    e.preventDefault();
    onCellRightClick(x, y);
  };

  return (
    <div>
      <div className="bg-white rounded-lg shadow-xl p-6 flex justify-center">
        <div>
          <div className="flex gap-6 mb-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 border border-gray-300"></div>
              <span>Start</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 border border-gray-300"></div>
              <span>Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-400 border border-gray-300"></div>
              <span>Path</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-700 border border-gray-300"></div>
              <span>Obstacle</span>
            </div>
          </div>

          <div className="inline-block bg-gray-100 p-2">
            <div
              className="grid gap-1"
              style={{
                gridTemplateColumns: `repeat(${grid[0].length}, 25px)`,
                gridTemplateRows: `repeat(${grid.length}, 25px)`,
              }}
            >
              {grid.map((row, y) =>
                row.map((cell, x) => (
                  <div
                    key={`${x}-${y}`}
                    className={`${getCellColor(
                      cell
                    )} cursor-pointer border border-gray-200 transition-colors`}
                    onClick={() => onCellClick(x, y)}
                    onContextMenu={(e) => handleContextMenu(e, x, y)}
                    title={`(${x}, ${y})`}
                  >{
                  }</div>
                ))
              )}
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600 space-y-1 font-sans">
            <p>
              <strong>Left Click:</strong> Place start/delivery point (based on
              mode)
            </p>
            <p>
              <strong>Right Click:</strong> Remove point
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Grid;
