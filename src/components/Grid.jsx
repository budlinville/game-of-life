import React, { Component } from 'react';
import { Stage, Layer, Rect } from 'react-konva';

import "../styles/Grid.css"

class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {
        visualWidth: window.innerWidth * 0.8,
        visualHeight: window.innerHeight * 0.8,
        xStart: 23,
        yStart: 27
    };
  }

  updateDimensions() {
    this.setState({
        visualWidth: window.innerWidth * 0.8,
        visualHeight: window.innerHeight * 0.8
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
    const CELL_SIZE = 10;
    const NUM_CELLS_X = 150;
    const NUM_CELLS_Y = 150;
    const CANVAS_VIRTUAL_WIDTH = CELL_SIZE * NUM_CELLS_X;
    const CANVAS_VIRTUAL_HEIGHT = CELL_SIZE * NUM_CELLS_Y;

    const FIRST_COL_WIDTH = CELL_SIZE - (this.state.xStart % CELL_SIZE);
    const LAST_COL_WIDTH = (this.state.visualWidth - FIRST_COL_WIDTH) % CELL_SIZE;
    
    const FIRST_ROW_HEIGHT = CELL_SIZE - (this.state.yStart % CELL_SIZE);
    const LAST_ROW_HEIGHT = (this.state.visualHeight - FIRST_ROW_HEIGHT) % CELL_SIZE;

    const NUM_VIS_X_CELLS = (this.state.visualWidth % CELL_SIZE === 0)
        ? Math.round(this.state.visualWidth / CELL_SIZE)
        : Math.round(this.state.visualWidth / CELL_SIZE) + 1;

    const NUM_VIS_Y_CELLS = (this.state.visualHeight % CELL_SIZE === 0)
        ? Math.round(this.state.visualHeight / CELL_SIZE)
        : Math.round(this.state.visualHeight / CELL_SIZE) + 1;

    const getCellColor = (x,y) => {
        return ((x+y) % 2 === 1) ? "red" : "blue";
    }

    return (
      <div className={"grid-container"} width={this.state.visualWidth} height={this.state.visualHeight}>
        <Stage
          component={"component"}
          width={this.state.visualWidth}
          height={this.state.visualHeight}
          className={"grid"}
        >
        {console.log(this)}
          <Layer>
            {[...Array(NUM_VIS_X_CELLS)].map((_, i) => (
              [...Array(NUM_VIS_Y_CELLS)].map((_, j) => (
                <Rect
                  x={(i === 0) ? 0 : FIRST_COL_WIDTH + ((i - 1) * CELL_SIZE)}
                  y={(j === 0) ? 0 : FIRST_ROW_HEIGHT + ((j - 1) * CELL_SIZE)}
                  width={(i === 0)
                    ? FIRST_COL_WIDTH
                    : (i === NUM_VIS_X_CELLS - 1)
                      ? LAST_COL_WIDTH
                      : CELL_SIZE
                  }
                  height={(j === 0)
                    ? FIRST_ROW_HEIGHT
                    : (j === NUM_VIS_Y_CELLS - 1)
                      ? LAST_ROW_HEIGHT
                      : CELL_SIZE
                  }
                  fill={
                    getCellColor(i,j)
                  }
                />
              ))
            ))}
          </Layer>
        </Stage>
      </div>
    );
  }
}

export default Grid;