const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const settings = {
  dimensions: [ 1080, 1080 ],
  animate: true
};

const sketch = () => {
  return ({ context, canvasWidth, canvasHeight }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvasWidth, canvasHeight);

    context.fillStyle = 'black';

    const centreX = canvasWidth * 0.5;
    const centreY = canvasHeight * 0.5;

    const width = canvasWidth * 0.01;
    const height = canvasHeight * 0.1;
    let x, y;

    const numberOfShapes = 71;
    const radius = canvasWidth * 0.3

    for(let i = 0; i < numberOfShapes; i++) {
      const slice = math.degToRad(360 / numberOfShapes);
      const angle = slice * i;

      x = centreX + radius * Math.sin(angle);
      y = centreY + radius * Math.cos(angle);

      context.save();
      context.translate(x, y); 
      context.rotate(-angle);
      context.scale(random.range(0.1, 2), random.range(0.2 ,0.5));
  
      context.beginPath();
      context.rect(-width * 0.5, random.range(0, -height * 0.5), width, height)
      context.fill();
      context.restore();

      context.save();
      context.translate(centreX, centreY);
      context.rotate(-angle);

      context.lineWidth = random.range(5, 20);

      context.beginPath();
      context.arc(0, 0, radius * random.range(0.7, 1.3), slice * random.range(1, -8), slice * random.range(1, 5));
      context.stroke();

      context.restore();
    }
  };
};

canvasSketch(sketch, settings);
