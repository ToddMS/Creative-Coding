const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [1080, 1080]
};

const sketch = () => {
  return ({ context, canvasWidth, canvasHeight }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvasWidth, canvasHeight);
    context.lineWidth = canvasWidth * 0.01

    const width = canvasWidth * 0.1;
    const height = canvasHeight * 0.1;
    const gap = canvasWidth * 0.03;
    const initialX = canvasWidth * 0.17;
    const intialY = canvasHeight * 0.17;

    const offsetValue = canvasWidth * 0.02

    let x, y;

    for (var i = 0; i < 5; i++) {
      for (var j = 0; j < 5; j++) {
        x = initialX + (width + gap) * i;
        y = intialY + (height + gap) * j;

        context.beginPath();
        context.rect(x , y, width, height);
        context.stroke();

        if (Math.random() > 0.5) {
          context.beginPath();
          context.rect(x + offsetValue / 2, y + offsetValue / 2, width - offsetValue, height - offsetValue);
          context.stroke();

          context.beginPath();
          context.rect(x + 4, y + 4, width - 8, height - 8);
          context.stroke();
        }
      }				
    }
  };
};

canvasSketch(sketch, settings);
