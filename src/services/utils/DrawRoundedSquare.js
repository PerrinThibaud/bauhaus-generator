import rand from './Rand';
import shadeColor from './ShadeColor';

// Draw rounded square (2 side by side corner rounded at 50%)
function drawRoundedSquare(ctx, x, y, size, color) {
  const bg = shadeColor(color, 40);
  // Back square
  ctx.fillStyle = bg;
  ctx.fillRect(x, y, size, size);

  const rayon = Math.max((size) / 2, 0);
  // Find center position of the shape
  const cx = x + rayon;
  const cy = y + rayon;
  ctx.fillStyle = color;
  ctx.beginPath();
  // Transform properties
  ctx.translate(cx, cy); // translate to center of shape
  const rotation = rand(0, 3);
  switch (rotation) {
    case 0: { // Bottom left
      ctx.rotate((-90 * Math.PI) / 180);
      break;
    }
    case 1: { // Top right
      ctx.rotate((90 * Math.PI) / 180);
      break;
    }
    case 2: { // Top left
      ctx.rotate((0 * Math.PI) / 180);
      break;
    }
    default: { // Bottom left
      ctx.rotate((180 * Math.PI) / 180);
      break;
    }
  }
  ctx.arc(0, 0, rayon, 0, Math.PI, false);
  ctx.lineTo(-rayon, -rayon);
  ctx.lineTo(rayon, -rayon);
  ctx.fill();
  ctx.closePath();
  // Reset transform
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}

export default drawRoundedSquare;
