import rand from './Rand';
import shadeColor from './ShadeColor';

// Function used to draw a circle in the canvas
function drawArc(ctx, x, y, size, color) {
  const bg = shadeColor(color, 40);
  // Back square
  ctx.fillStyle = bg;
  ctx.fillRect(x, y, size, size);

  // draw circle
  const rayon = Math.max((size) / 2, 0);
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x + rayon, y + rayon, rayon, 0, 2 * Math.PI, false);
  ctx.fill();

  // draw a hole inside circle (33% chance to draw it)
  const isHoled = rand(0, 3);
  if (isHoled === 1) {
    ctx.fillStyle = bg;
    ctx.beginPath();
    ctx.arc(x + rayon, y + rayon, rayon / 3, 0, 2 * Math.PI, false);
    ctx.fill();
  }
}

export default drawArc;
