import rand from './Rand';
import shadeColor from './ShadeColor';

// Function used to draw a triangle in the canvas
function drawTriangle(ctx, x, y, size, color) {
  const bg = shadeColor(color, 40);
  // Back square
  ctx.fillStyle = bg;
  ctx.fillRect(x, y, size, size);

  ctx.beginPath();
  const rotation = rand(0, 3);
  switch (rotation) {
    case 0: { // Bottom left
      ctx.moveTo(x, y + size);
      ctx.lineTo(x + size, y + size);
      ctx.lineTo(x + size, y);
      break;
    }
    case 1: { // Top right
      ctx.moveTo(x, y);
      ctx.lineTo(x + size, y + size);
      ctx.lineTo(x + size, y);
      break;
    }
    case 2: { // Top left
      ctx.moveTo(x + size, y);
      ctx.lineTo(x, y);
      ctx.lineTo(x, y + size);
      break;
    }
    default: { // Bottom left
      ctx.moveTo(x, y);
      ctx.lineTo(x, y + size);
      ctx.lineTo(x + size, y + size);
      break;
    }
  }
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
}

export default drawTriangle;
