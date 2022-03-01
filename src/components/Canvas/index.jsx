import React, {
  useEffect, useRef, useState, useCallback,
} from 'react';
import styles from './Canvas.module.scss';

import City from '../../assets/images/city.jpg';
// eslint-disable-next-line no-unused-vars
import { average, rgbToHexa } from '../../services/utils';

const BG = '#000000'; // background color
const ITEMSIZE = 200;

function Canvas() {
  const canvasRef = useRef();
  const [context, setContext] = useState();

  // function that return the hexa decimal color from a specific point
  const echoColor = useCallback((c, r) => {
    const imgData = context.getImageData(c, r, ITEMSIZE, ITEMSIZE);
    console.time('imgPixels');
    // convert in array
    const imgPixels = Array.from(imgData.data); // all pixels [r1, g1, b1, a1, ..., rn, gn, bn, an]
    console.timeEnd('imgPixels');

    console.time('pixels');
    // pixels reshapes [[r1, g1, b1, a1], ..., [rn, gn, bn, an]]
    const pixels = [];
    while (imgPixels.length) pixels.push(imgPixels.splice(0, 4));
    console.timeEnd('pixels');

    console.time('sortedPixels');
    // sum of pixels sort by colors [sum(r1, ..., rn), sum(g1, ..., gn), sum(b1, ..., bn)] (without alpha)
    const sortedPixels = pixels.reduce((acc, x) => [acc[0] + x[0], acc[1] + x[1], acc[2] + x[2]], [0, 0, 0]);
    console.timeEnd('sortedPixels');
    console.time('colors');
    // means of each pixels colors type
    const red = Math.floor(sortedPixels[0] / pixels.length); // pixels.length = the number of pixel of each colors
    const green = Math.floor(sortedPixels[1] / pixels.length);
    const blue = Math.floor(sortedPixels[2] / pixels.length);
    console.timeEnd('colors');
    throw new Error('tesst');
    // eslint-disable-next-line no-unreachable
    return rgbToHexa(red, green, blue);
  }, [context]);

  const drawItems = useCallback((c, r) => {
    context.fillStyle = `${echoColor(c * ITEMSIZE, r * ITEMSIZE)}`;
    // console.log(c * ITEMSIZE, r * ITEMSIZE, ITEMSIZE, ITEMSIZE);
    context.fillRect(c * ITEMSIZE, r * ITEMSIZE, ITEMSIZE, ITEMSIZE);
  }, [context, echoColor]);

  // display the grid
  const drawGrid = useCallback(() => {
    // calculate the number of columns and rows depending the item size
    const columnsNb = Math.ceil(window.innerWidth / ITEMSIZE);
    const rowsNb = Math.ceil(window.innerHeight / ITEMSIZE);
    // Columns
    Array.from({ length: columnsNb }, (_, k) => k).forEach((cIndex) => {
      // Rows
      Array.from({ length: rowsNb }, (_, k) => k).forEach((rIndex) => {
        drawItems(cIndex, rIndex);
      });
    });
  }, [drawItems]);

  // draw image wallpaper
  const drawWallpaper = useCallback(() => new Promise((resolve) => {
    const baseImage = new Image();
    baseImage.src = City;
    baseImage.onload = () => {
      context.drawImage(baseImage, 0, 0);
      resolve();
    };
  }), [context]);

  // Runs each time the DOM window resize event fires.
  // Resets the canvas dimensions to match window,
  const resizeCanvas = useCallback(async () => {
    const canvasWidth = window.innerWidth; // the width of the canvas = the window width size
    const canvasHeight = window.innerHeight;

    // init canvas sizes
    context.canvas.width = canvasWidth;
    context.canvas.height = canvasHeight;

    // clean canvas
    context.fillStyle = BG;
    context.fillRect(0, 0, canvasWidth, canvasHeight);

    await drawWallpaper();
    if (true) {
      drawGrid();
    }
  }, [context, drawGrid, drawWallpaper]);

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
    <canvas ref={canvasRef} className={styles.Root} onClick={echoColor} />
  );
}

export default React.memo(Canvas);
