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
        }
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
    const grid = [
      ['red', 'yellow'],
      ['green', 'blue']
    ];

    const WIDTH = 100;
    const HEIGHT = 100;

    const stagePos = this.state.stagePos;

    const startX = Math.floor((-stagePos.x - window.innerWidth) / WIDTH) * WIDTH;
    const endX = Math.floor((-stagePos.x + window.innerWidth * 2) / WIDTH) * WIDTH;

    const startY = Math.floor((-stagePos.y - window.innerHeight) / HEIGHT) * HEIGHT;
    const endY = Math.floor((-stagePos.y + window.innerHeight * 2) / HEIGHT) * HEIGHT;

    const gridComponents = [];
    for (var x = startX; x < endX; x += WIDTH) {
      for (var y = startY; y < endY; y += HEIGHT) {

        const indexX = Math.abs(x / WIDTH) % grid.length;
        const indexY = Math.abs(y / HEIGHT) % grid[0].length;

        gridComponents.push(
          <Rect
            x={x}
            y={y}
            width={WIDTH}
            height={HEIGHT}
            fill={grid[indexX][indexY]}
            stroke="black"
          />
        );
      }
    }

    return (
      <div
        className={"grid-container"}
        width={this.state.canvasWidth}
        height={this.state.canvasHeight}
      >
        <Stage
          component={"component"}
          width={this.state.canvasWidth}
          height={this.state.canvasHeight}
          className={"grid"}
          draggable={true}
          dragBoundFunc={ (pos) => {
            //TODO : actual bounds
            const UPPER_BOUND = 100;
            const LOWER_BOUND = -100;

            const boundedX = (pos.x > UPPER_BOUND) ? UPPER_BOUND
              : (pos.x < LOWER_BOUND) ? LOWER_BOUND
              : pos.x;
              
            const boundedY = (pos.y > UPPER_BOUND) ? UPPER_BOUND
              : (pos.y < LOWER_BOUND) ? LOWER_BOUND
              : pos.y;

            return {
              x: boundedX,
              y: boundedY
            };
          }}
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