const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [1080, 1080]
};

let manager;

let text = 'T';
let fontSize = 1800;
let fontFamily = 'magneto';

const typeCanvas = document.createElement('canvas');
const typeContext = typeCanvas.getContext('2d', { willReadFrequently: true });

const sketch = ({ context, width, height }) => {
  const cell = 20;
  const columns = Math.floor(width / cell);
  const rows = Math.floor(height / cell);
  const numberOfCells = columns * rows;

  typeCanvas.width = columns;
  typeCanvas.height = rows;

  return () => {
    typeContext.fillStyle = 'black';
    typeContext.fillRect(0, 0, columns, rows);

    fontSize = columns * 0.8;

    typeContext.fillStyle = 'white';
    typeContext.font = `${fontSize}px ${fontFamily}`;
    typeContext.textBaseline = 'top';

    const metrics = typeContext.measureText(text);
    const metricX = metrics.actualBoundingBoxLeft * -1;
    const metricY = metrics.actualBoundingBoxAscent * -1;
    const metricWidth = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
    const metricHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

    const typeX = (columns - metricWidth) * 0.5 - metricX;
    const typeY = (rows - metricHeight) * 0.5 - metricY;

    typeContext.save();
    typeContext.translate(typeX, typeY);

    typeContext.beginPath();
    typeContext.rect(metricX, metricY, metricWidth, metricHeight);
    typeContext.stroke();

    typeContext.fillText(text, 0, 0);
    typeContext.restore();

      const typeData = typeContext.getImageData(0, 0, columns, rows).data;
      
      context.fillStyle = 'black';
      context.fillRect(0, 0, width, height);

      context.textBaseline = 'middle';
      context.textAllign = 'center';

      for (let i = 0; i < numberOfCells; i++) {
        const column = i % columns;
        const row = Math.floor(i / columns);

        const x = column * cell;
        const y = row * cell;

        const red = typeData[i * 4 + 0];
        const green = typeData[i * 4 + 1];
        const blue = typeData[i * 4 + 2];
        const alpha = typeData[i * 4 + 3];

        const glyph = getGlyph(blue);

        context.font = `${cell * 2}px ${fontFamily}`;
        if (Math.random() < 0.1) context.font = `${cell * 4}px ${fontFamily}`;

        context.fillStyle = 'white';

        context.save();
        context.translate(x, y);
        context.translate(cell * 0.5, cell * 0.5);

        context.fillText(glyph, 0, 0);

        context.restore();
      }
  };
};

const getGlyph = (value) => {
  if (value < 50) return '';
  if (value < 100) return '.';
  if (value < 150) return '-';
  if (value < 200) return '+';

  const glyphs = '_= /'.split('');

  return random.pick(glyphs);
}

const onKeyDown = (event) => {
  text = event.key.toUpperCase();
  manager.render();
};

const start = async () => {
  manager = await canvasSketch(sketch, settings);
  document.addEventListener('keydown', onKeyDown);
};

start();
