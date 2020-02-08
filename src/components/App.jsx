import React, { Component } from 'react';
import { Stage, Layer, Rect, Star } from 'react-konva';


class App extends Component {
  componentDidMount() {
    /*const canvas = this.refs.canvas
    this.fitToContainer(canvas);

    const ctx = canvas.getContext("2d")
    const img = this.refs.image
    ctx.rect(20, 20, 150, 100);
    ctx.stroke();*/
  }

  fitToContainer = canvas => {
    // Make it visually fill the positioned parent
    canvas.style.width ='100%';
    canvas.style.height='100%';
    // Set the internal size to match
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  render() {  
    const canvasContainer = {
      border: "2px solid black",
      margin: "0 auto",
      width: "80%",
      height: "80%"
    };

    const konvaStyle = {
      container: 'container',
      draggable: true
    }

    const getCellColor = (i,j) => {
      // working from here
      return ((i + j) % 2 === 1) ? "red" : "blue";
    }

    const CELL_SIZE = 5;
    const NUM_CELLS_X = 100;
    const NUM_CELLS_Y = 100;

    return (
      <div style={canvasContainer}>
        <Stage 
          width={CELL_SIZE*NUM_CELLS_X}
          height={CELL_SIZE*NUM_CELLS_Y}
        >
          <Layer>
            {[...Array(NUM_CELLS_Y)].map((_, i) => (
              [...Array(NUM_CELLS_X)].map((_, j) => (
                <Rect
                  x={i * CELL_SIZE}
                  y={j * CELL_SIZE}
                  width={CELL_SIZE}
                  height={CELL_SIZE}
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

export default App;
