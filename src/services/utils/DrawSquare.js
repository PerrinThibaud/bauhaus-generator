import rand from './Rand';
import shadeColor from './ShadeColor';

// Function used to draw a square in the canvas
function drawSquare(ctx, x, y, size, color) {
  // Back square
  ctx.fillStyle = color;
  ctx.fillRect(x, y, size, size);

  // hole inside square only 33% chance to draw it
  const isHoled = rand(0, 3);
  if (isHoled === 1) {
    const newSize = (size) / 3;
    ctx.fillStyle = shadeColor(color, 40);
    ctx.fillRect(x + newSize, y + newSize, newSize, newSize);
  }
}

export default drawSquare;
