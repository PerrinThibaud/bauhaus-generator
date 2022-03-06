import rand from './Rand';
import shadeColor from './ShadeColor';

// Draw rounded corner shape (1 side corner rounded at 100%)
function drawRoundedCorner(ctx, x, y, size, color) {
  const bg = shadeColor(color, 40);
  // Back square
  ctx.fillStyle = bg;
  ctx.fillRect(x, y, size, size);

  // Find center position of the shape
  const cx = x + (size / 2);
  const cy = y + (size / 2);
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
  ctx.arc(-(size / 2), -(size / 2), Math.max(size, 0), 0, Math.PI / 2, false);
  ctx.lineTo(-(size / 2), -(size / 2));
  ctx.fill();
  ctx.closePath();
  // Reset transform
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}

export default drawRoundedCorner;
