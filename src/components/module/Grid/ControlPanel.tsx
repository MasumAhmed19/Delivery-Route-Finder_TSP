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
}

function ControlPanel({
  mode,
  setMode,
  onOptimize,
  onClear,
  onRandomObstacles,
  hasStart,
  deliveryCount,
}: ControlPanelProps) {
    
  return (
    <div className="flex flex-wrap gap-3 items-center">
      <button
        onClick={() => setMode(mode === 'start' ? null : 'start')}
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-sm font-medium transition-colors cursor-pointer",
          mode === 'start'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-black'
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
            : 'bg-gray-200 text-black'
        )}
      >
        <Package size={20} />
        Add Delivery
      </button>

      <button
        onClick={onOptimize}
        disabled={!hasStart || deliveryCount === 0}
        className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium cursor-pointer bg-orange-500 text-white hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        <Route size={20} />
        Optimize Route
      </button>

      <button
        onClick={onRandomObstacles}
        className="flex items-center gap-2 cursor-pointer px-4 py-2 rounded-lg font-medium bg-gray-500 text-white hover:bg-gray-600 transition-colors"
      >
        <Shuffle size={20} />
        Random Obstacles
      </button>

      <button
        onClick={onClear}
        className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium cursor-pointer bg-red-500 text-white hover:bg-red-600 transition-colors"
      >
        <Trash2 size={20} />
        Clear Grid
      </button>
    </div>
  );
}

export default ControlPanel;