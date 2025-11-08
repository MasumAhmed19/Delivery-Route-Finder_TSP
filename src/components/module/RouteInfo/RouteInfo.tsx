import { RouteResult } from '@/types/gridType';
import { Clock, TrendingUp, MapPin } from 'lucide-react';

interface RouteInfoProps {
  routeResult: RouteResult | null;
}

function RouteInfo({ routeResult }: RouteInfoProps) {
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
        return `P${index}`;
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
          <MapPin className="text-blue-600 mt-1 flex-shrink-0" size={20} />
          <div>
            <p className="font-semibold text-gray-700">Optimized Delivery Order:</p>
            <p className="text-gray-600 break-words">{formatOrder()}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <TrendingUp className="text-green-600 flex-shrink-0" size={20} />
          <div>
            <p className="font-semibold text-gray-700">Total Distance:</p>
            <p className="text-gray-600">{routeResult.totalDistance} units</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Clock className="text-orange-600 flex-shrink-0" size={20} />
          <div>
            <p className="font-semibold text-gray-700">Estimated Time:</p>
            <p className="text-gray-600">{routeResult.estimatedTime} min</p>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 font-sans">
        <p className="text-sm text-gray-500">
          <span className="font-semibold">Algorithm:</span> A* Pathfinding + Nearest Neighbor TSP
        </p>
      </div>
    </div>
  );
}

export default RouteInfo;
