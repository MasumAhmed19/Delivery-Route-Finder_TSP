# 🚚 Delivery Route Finder

An intelligent delivery route optimization tool that combines **A* pathfinding** and **Traveling Salesman Problem (TSP)** algorithms to find the most efficient delivery routes. 


### 🧮 Algorithms

#### A* Pathfinding
- Finds the shortest path between two points
- Uses `f(n) = g(n) + h(n)` scoring:
  - `g(n)`: Actual cost from start to current node
  - `h(n)`: Heuristic (Manhattan distance to goal)
  - `f(n)`: Total estimated cost
- Avoids obstacles dynamically

#### Traveling Salesman Problem (TSP)
- Optimizes the order of delivery visits
- Minimizes total travel distance
- Uses nearest neighbor heuristic for efficiency

### 🎨 User Interface
- **Numbered Delivery Points**: See P1, P2, P3... as you add deliveries
- **Mode Selection**: Easy toggle between setting start point and adding deliveries
- **Algorithm Toggle**: Compare A* Only vs A* + TSP optimization
- **Detailed Route Info**: 
  - Total distance
  - Delivery order (optimized vs sequential)
  - Algorithm used
  - Step count
- **Random Obstacles**: Generate random obstacles for testing

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/route-finder-v1.git
cd route-finder-v1

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

### Development

```bash
# Run the development server
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

### Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

---

## 📖 How to Use

### 1. Set Up Your Route
1. Click **"Set Start"** button
2. Click any cell on the grid to place your starting point (blue)
3. Click **"Add Delivery"** button
4. Click cells to add delivery points (green, labeled P1, P2, P3...)

### 2. Add Obstacles (Optional)
- Click **"Random Obstacles"** to generate obstacles automatically
- Or manually add obstacles by clicking cells after setting points

### 3. Choose Your Algorithm
- **A* Only (No Optimization)**: Visits deliveries in the order you clicked them
- **A* + TSP (Optimized)**: Reorders deliveries to minimize total distance

### 4. Optimize & View Results
- Click **"Optimize Route"** to calculate the best path
- View route information including:
  - Total distance traveled
  - Optimized delivery order
  - Number of steps
  - Algorithm comparison insights

### 5. Modify or Reset
- **Right-click** any point to remove it
- Click **"Clear Grid"** to start over

---
