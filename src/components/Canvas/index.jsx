import React, {
  useEffect, useRef, useState, useCallback,
} from 'react';
import styles from './Canvas.module.scss';

const BG = '#000000'; // background color

function Canvas() {
  const canvasRef = useRef();
  const [context, setContext] = useState();

  // Runs each time the DOM window resize event fires.
  // Resets the canvas dimensions to match window,
  const resizeCanvas = useCallback(() => {
    const canvasWidth = window.innerWidth; // the width of the canvas = the window width size
    const canvasHeight = window.innerHeight;

    // init canvas sizes
    context.canvas.width = canvasWidth;
    context.canvas.height = canvasHeight;

    // clean canvas
    context.fillStyle = BG;
    context.fillRect(0, 0, canvasWidth, canvasHeight);

    // draw();
  }, [context]);

  // At the mounted state of the component we initialise the canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    setContext(canvas.getContext('2d'));
  }, []);

  // we initialise resize functions
  useEffect(() => {
    if (context) {
      window.addEventListener('resize', resizeCanvas, false);
      resizeCanvas();
    }
    return () => {
      window.removeEventListener('resize', resizeCanvas, false);
    };
  }, [context, resizeCanvas]);

  return (
    <canvas ref={canvasRef} className={styles.Root} />
  );
}

export default React.memo(Canvas);
