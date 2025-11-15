import { RouteResult, Point } from '@/types/gridType';
import { Clock, TrendingUp, MapPin } from 'lucide-react';
import { pointsEqual } from '@/utils/gridUtils';

interface RouteInfoProps {
  routeResult: RouteResult | null;
  useTSP?: boolean;
  deliveries: Point[];
}

function RouteInfo({ routeResult, useTSP = true, deliveries }: RouteInfoProps) {
  if (!routeResult || routeResult.order.length <= 1) {
    return (
      <div className="bg-white rounded-lg s p-6 ">
        <p className="text-gray-500 text-center font-sans">
          Set a start point and add delivery points to optimize a route
        </p>
      </div>
    );
  }

  const formatOrder = () => {
    return routeResult.order
      .map((point, index) => {
        if (index === 0) return 'Start';
        // Find which original delivery point this is
        const deliveryIndex = deliveries.findIndex((d) => pointsEqual(d, point));
        return deliveryIndex >= 0 ? `P${deliveryIndex + 1}` : `P${index}`;
      })
      .join(' → ');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
      <h3 className="text-xl font-bold text-gray-800 mb-4">
        Route Optimization Results
      </h3>

      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <MapPin className="text-blue-600 mt-1 shrink-0" size={20} />
          <div>
            <p className="font-semibold text-gray-700">Optimized Delivery Order:</p>
            <p className="text-gray-600 wrap-break-words">{formatOrder()}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <TrendingUp className="text-green-600 shrink-0" size={20} />
          <div>
            <p className="font-semibold text-gray-700">Total Distance:</p>
            <p className="text-gray-600">{routeResult.totalDistance} units</p>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 font-sans">
        <p className="text-sm text-gray-500">
          <span className="font-semibold">Algorithm:</span> {useTSP ? 'A* Pathfinding + TSP Optimization' : 'A* Pathfinding Only (Sequential Order)'}
        </p>
        {!useTSP && (
          <p className="text-xs text-amber-600 mt-2">
            💡 Enable TSP optimization to minimize total distance by reordering delivery points
          </p>
        )}
      </div>
    </div>
  );
}

export default RouteInfo;
