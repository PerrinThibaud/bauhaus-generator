import rand from './Rand';
import shadeColor from './ShadeColor';

// Function used to draw a diamond in the canvas
function drawDiamond(ctx, x, y, size, color) {
  const bg = shadeColor(color, 40);
  // Back square
  ctx.fillStyle = bg;
  ctx.fillRect(x, y, size, size);

  // draw diamond
  ctx.fillStyle = color;
  // Find center position of the shape
  const cx = x + (size / 2);
  const cy = y + (size / 2);
  // Transform properties
  ctx.translate(cx, cy); // translate to center of shape
  ctx.rotate((45 * Math.PI) / 180);
  ctx.scale(0.71, 0.71);
  ctx.fillRect(-(size / 2), -(size / 2), size, size);

  // draw a hole inside the diamond (33% chance to draw it)
  const isHoled = rand(0, 2);
  if (isHoled === 1) {
    const newSize = size / 3;
    ctx.fillStyle = bg;
    ctx.fillRect(-((newSize) / 2), -((newSize) / 2), newSize, newSize);
  }
  // Reset transform
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}

export default drawDiamond;
