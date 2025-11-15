import { MapPin, Package, Route, Trash2, Shuffle } from 'lucide-react';
import { cn } from '@/lib/utils';

type Mode = 'start' | 'delivery' | null;

interface ControlPanelProps {
  mode: Mode;
  setMode: (mode: Mode) => void;
  onOptimize: () => void;
  onClear: () => void;
  onRandomObstacles: () => void;
  hasStart: boolean;
  deliveryCount: number;
  useTSP: boolean;
  setUseTSP: (useTSP: boolean) => void;
}

function ControlPanel({
  mode,
  setMode,
  onOptimize,
  onClear,
  onRandomObstacles,
  hasStart,
  deliveryCount,
  useTSP,
  setUseTSP,
}: ControlPanelProps) {
    
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3 items-center">
        <button
          onClick={() => setMode(mode === 'start' ? null : 'start')}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer",
            mode === 'start'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-black hover:bg-gray-300'
          )}
        >
          <MapPin size={20} />
          Set Start
        </button>

        <button
          onClick={() => setMode(mode === 'delivery' ? null : 'delivery')}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer",
            mode === 'delivery'
              ? 'bg-green-600 text-white'
              : 'bg-gray-200 text-black hover:bg-gray-300'
          )}
        >
          <Package size={20} />
          Add Delivery
        </button>

        <button
          onClick={onOptimize}
          disabled={!hasStart || deliveryCount === 0}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg font-medium cursor-pointer transition-colors",
            "bg-orange-500 text-white hover:bg-orange-600",
            "disabled:bg-gray-400 disabled:cursor-not-allowed"
          )}
        >
          <Route size={20} />
          Optimize Route
        </button>

        <button
          onClick={onRandomObstacles}
          className={cn(
            "flex items-center gap-2 cursor-pointer px-4 py-2 rounded-lg font-medium transition-colors",
            "bg-gray-500 text-white hover:bg-gray-600"
          )}
        >
          <Shuffle size={20} />
          Random Obstacles
        </button>

        <button
          onClick={onClear}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg font-medium cursor-pointer transition-colors",
            "bg-red-500 text-white hover:bg-red-600"
          )}
        >
          <Trash2 size={20} />
          Clear Grid
        </button>
      </div>

      <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
        <span className="text-sm font-medium text-gray-700">Algorithm:</span>
        <button
          onClick={() => setUseTSP(false)}
          className={cn(
            "px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer",
            !useTSP
              ? 'bg-purple-500 text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
          )}
        >
          A* Only (No Optimization)
        </button>
        <button
          onClick={() => setUseTSP(true)}
          className={cn(
            "px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer",
            useTSP
              ? 'bg-purple-500 text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
          )}
        >
          A* + TSP (Optimized)
        </button>
      </div>
    </div>
  );
}

export default ControlPanel;