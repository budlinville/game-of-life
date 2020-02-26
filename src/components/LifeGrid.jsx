import React, {Component} from 'react';
import Grid from "./Grid"

const updateGrid = (grid, numCellsX, numCellsY) => {
    const checkCell = (x, y) => {
      if (x < 0 || x >= numCellsX || y < 0 || y >= numCellsY) {
        return null;
      }
      return grid[x][y];
    } 

    const getNextColor = (neighborArr, cellColor) => {
      let blacks = 0;
      neighborArr.forEach(cellColor => {
        if (cellColor === "black") {
          blacks++;
        }
      });

      if (cellColor === "white" && blacks === 3) {
        return "black";
      } else if (cellColor === "black" && blacks >= 2 && blacks <= 3) {
        return "black";
      }
      return "white";
    }

    let newGrid = [];
    for (let i = 0; i < numCellsX; i++) {
      for (let j = 0; j < numCellsY; j++) {
        const neighbors = [
          checkCell(i - 1, j - 1),  // top left
          checkCell(i, j - 1),      // top
          checkCell(i + 1, j - 1),  // top right
          checkCell(i + 1, j),      // right
          checkCell(i + 1, j + 1),  // bottom right
          checkCell(i, j + 1),      // bottom
          checkCell(i - 1, j + 1),  // bottom left
          checkCell(i - 1, j)       // left
        ];
        
        newGrid[i] = (newGrid[i]) ? newGrid[i] : [];
        newGrid[i][j] = getNextColor(neighbors, grid[i][j]);
      }
    }
    return newGrid;
}

class LifeGrid extends Component {
    constructor(props) {
        super(props);

        const NUM_CELLS_X = 8;
        const NUM_CELLS_Y = 8;

        const initialGrid = [];
        for (let i = 0; i < NUM_CELLS_X; i++) {
            for (let j = 0; j < NUM_CELLS_Y; j++) {
                initialGrid[i] = (initialGrid[i]) ? initialGrid[i] : [];
                initialGrid[i][j] = ((i+j) % 2 === 1) ? "black" : "white";
            }
        }

        this.state = ({
            grid: initialGrid,
            timerSpeed: 500,    // 5 seconds
            numCellsX: NUM_CELLS_X,
            numCellsY: NUM_CELLS_Y,
            cellSize: 120
        });
    }

    componentDidMount() {
        const {timerSpeed, grid, numCellsX, numCellsY} = this.state;
        this.interval = setInterval(() => {
            this.setState({
                grid: updateGrid(grid, numCellsX, numCellsY)
            });
        }, timerSpeed);
    }

    componentWillUnmount() {
        clearInterval(this.state.grid);
    }

    render() {
        const {grid, numCellsX, numCellsY, cellSize} = this.state;
        return (
            <Grid
                grid={grid}
                numCellsX={numCellsX}
                numCellsY={numCellsY}
                cellSize={cellSize}
            />
        );
    }
}

export default LifeGrid;