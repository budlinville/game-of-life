import React, { Component } from 'react';
import { Stage, Layer, Rect } from 'react-konva';

import "../styles/Grid.css"

class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {
        canvasWidth: window.innerWidth * 0.8,
        canvasHeight: window.innerHeight * 0.8,
        stagePos: {
          x: 0,
          y: 0
        },
        cellSize: this.props.cellSize,
        numCellsX: this.props.numCellsX,
        numCellsY: this.props.numCellsY,
        grid: this.props.grid
    };
  }

  updateDimensions() {
    this.setState({
        canvasWidth: window.innerWidth * 0.8,
        canvasHeight: window.innerHeight * 0.8
    });
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }
  
  render() {
    const {grid, stagePos, cellSize, canvasWidth, canvasHeight, numCellsX, numCellsY} = this.state;
    const startX = Math.floor((-stagePos.x - canvasWidth) / cellSize) * cellSize;
    const endX = Math.floor((-stagePos.x + canvasWidth * 2) / cellSize) * cellSize;
    const startY = Math.floor((-stagePos.y - canvasHeight) / cellSize) * cellSize;
    const endY = Math.floor((-stagePos.y + canvasHeight * 2) / cellSize) * cellSize;
    const gridWidth = cellSize * numCellsX;
    const gridHeight = cellSize * numCellsY;

    const dragBoundFunc = (pos) => {
      const xMin = canvasWidth - gridWidth;
      const yMin = canvasHeight - gridHeight;
      const xMax = 0;
      const yMax = 0;

      let boundedX = pos.x;
      let boundedY = pos.y;

      if (boundedX < xMin) {
        boundedX = xMin;
        //gridStyle = "gridLeft";
      } else if (boundedX > xMax) {
        boundedX = xMax;
        //gridStyle = "gridRight";
      }

      if (boundedY < yMin) {
        boundedY = yMin;
        //gridStyle = "gridTop";
      } else if (boundedY > yMax) {
        boundedY = yMax;
        //gridStyle = "gridTop";
      }

      return {x: boundedX, y: boundedY};
    }

    const gridComponents = [];
    for (var x = startX; x < endX; x += cellSize) {
      for (var y = startY; y < endY; y += cellSize) {
        const indexX = (x < 0) ? 1 : Math.abs(x / cellSize) % numCellsX;
        const indexY = (y < 0) ? 1 : Math.abs(y / cellSize) % numCellsY;

        gridComponents.push(
          <Rect
            x={x}
            y={y}
            width={cellSize}
            height={cellSize}
            fill={grid[indexX] ? grid[indexX][indexY] : null}
            stroke="grey"
            dragBoundFunc={dragBoundFunc}
          />
        );
      }
    }

    return (
      <div
        className={"grid-container"}
        width={canvasWidth}
        height={canvasHeight}
      >
        <Stage
          component={"component"}
          width={canvasWidth}
          height={canvasHeight}
          className={"grid"}
          draggable={true}
          dragBoundFunc={dragBoundFunc}
          onDragEnd={e => {
            this.setState({
              stagePos: e.currentTarget.position()
            })
          }}
        >
          <Layer>{gridComponents}</Layer>
        </Stage>
      </div>
    );
  }
}

export default Grid;