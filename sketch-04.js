const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');
const Tweakpane = require('tweakpane');

const settings = {
  dimensions: [ 1080, 1080 ],
  animate: true
};

const params = {
  columns: 10,
  rows: 10,
  scaleMin: 1,
  scaleMax: 30,
  frequency: 0.001,
  amplitude: 0.2,
  animate: true,
  frame: 0,
  lineCap: 'butt',
}

const sketch = () => {
  return ({ context, canvasWidth, canvasHeight, frame }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvasWidth, canvasHeight);

    const collumns = params.columns;
    const rows = params.rows;
    const numberOfCells = collumns * rows;

    const gridWidth = canvasWidth * 0.8;
    const gridHeight = canvasHeight * 0.8;
    const cellWidth = gridWidth / collumns;
    const cellHeight = gridHeight / rows;
    const marginX = (canvasWidth - gridWidth) * 0.5;
    const marginY = (canvasHeight - gridHeight) * 0.5;

    for (let i = 0; i < numberOfCells; i++) {
      const collumn = i % collumns;
      const row = Math.floor(i / collumns);

      const x = collumn * cellWidth;
      const y = row * cellHeight;
      const width = cellWidth * 0.8;
      const height = cellHeight * 0.8;

      const f = params.animate ? frame : params.frame;

      const randomNumber = random.noise3D(x, y, f * 10, params.frequency);

      const angle = randomNumber * Math.PI * params.amplitude;
      const scale = math.mapRange(randomNumber, -1, 1, params.scaleMin, params.scaleMax);

      context.save();
      context.translate(x, y);
      context.translate(marginX, marginY);
      context.translate(cellWidth * 0.5, cellHeight * 0.5);
      context.rotate(angle);

      context.lineWidth = scale;
      context.lineCap = params.lineCap;

      context.beginPath();
      context.moveTo(width * -0.5, 0);
      context.lineTo(width * 0.5, 0);
      context.stroke();

      context.restore();
    }
  };
};


const createPane = () => {
  const pane = new Tweakpane.Pane();
  let folder;

  folder = pane.addFolder({ title: 'Grid'});
  folder.addInput(params, 'lineCap', { options: { butt: 'butt', round: 'round', square: 'square'}});
  folder.addInput(params, 'columns', { min: 2, max: 50, step: 1});
  folder.addInput(params, 'rows', { min: 2, max: 50, step: 1});
  folder.addInput(params, 'scaleMin', { min: 1, max: 100});
  folder.addInput(params, 'scaleMax', { min: 1, max: 100});

  folder = pane.addFolder({title: 'Noise'});
  folder.addInput(params, 'frequency', {min: -0.01, max: 0.01});
  folder.addInput(params, 'amplitude', {min: 0, max: 1});  
  folder.addInput(params, 'animate');
  folder.addInput(params, 'frame', { min: 0, max: 999 });
}

createPane();
canvasSketch(sketch, settings);
