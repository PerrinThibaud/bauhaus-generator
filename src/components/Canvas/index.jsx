import React, {
  useEffect, useRef, useState, useCallback, useMemo, forwardRef, useImperativeHandle,
} from 'react';
import PropTypes from 'prop-types';
import styles from './Canvas.module.scss';

import {
  rand,
  rgbToHexa,
  drawSquare as _drawSquare,
  drawArc as _drawArc,
  drawDiamond as _drawDiamond,
  drawTriangle as _drawTriangle,
  drawRoundedCorner as _drawRoundedCorner,
  drawRoundedSquare as _drawRoundedSquare,
} from '../../services/utils';
import UploadFile from './UploadFile';
import CanvasWrapper from './CanvasWrapper';

const Canvas = forwardRef(({ tileSize: ITEMSIZE, bgColor: BG, appSize }, ref) => {
  const canvasRef = useRef();
  const [context, setContext] = useState(null);
  const [image, setImage] = useState(null);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  // The component instance will be extended
  // with whatever you return from the callback passed
  // as the second argument
  useImperativeHandle(ref, () => ({

    removeImage() {
      setImage(null);
      setContext(null);
      setImageSize({ width: 0, height: 0 });
    },

  }));

  // draw square
  const drawSquare = useCallback((x, y, color) => {
    _drawSquare(context, x, y, ITEMSIZE, color);
  }, [ITEMSIZE, context]);

  // draw circle
  const drawArc = useCallback((x, y, color) => {
    _drawArc(context, x, y, ITEMSIZE, color);
  }, [ITEMSIZE, context]);

  // draw diamond
  const drawDiamond = useCallback((x, y, color) => {
    _drawDiamond(context, x, y, ITEMSIZE, color);
  }, [ITEMSIZE, context]);

  // Draw triangle
  const drawTriangle = useCallback((x, y, color) => {
    _drawTriangle(context, x, y, ITEMSIZE, color);
  }, [ITEMSIZE, context]);

  // Draw rounded corner shape (1 side corner rounded at 100%)
  const drawRoundedCorner = useCallback((x, y, color) => {
    _drawRoundedCorner(context, x, y, ITEMSIZE, color);
  }, [ITEMSIZE, context]);

  // Draw rounded square (2 side by side corner rounded at 50%)
  const drawRoundedSquare = useCallback((x, y, color) => {
    _drawRoundedSquare(context, x, y, ITEMSIZE, color);
  }, [ITEMSIZE, context]);

  // All possible shapes
  const shapes = useMemo(() => [
    drawSquare, // square
    drawArc, // circle
    drawDiamond, // diamond
    drawTriangle, // triangle
    drawRoundedCorner, // rounded corner
    drawRoundedSquare, // rounded square
  ], [drawArc, drawDiamond, drawRoundedCorner, drawRoundedSquare, drawSquare, drawTriangle]);

  // function that return the hexa decimal color from a specific point
  const echoColor = useCallback((c, r) => {
    // calc width and height to prevent black borders in the case shape go out the box
    const imgWidth = c + ITEMSIZE <= imageSize.width ? ITEMSIZE : imageSize.width - c;
    const imgHeight = r + ITEMSIZE <= imageSize.height ? ITEMSIZE : imageSize.height - r;
    const imgData = context.getImageData(c, r, imgWidth, imgHeight);
    // convert in array
    const imgPixels = Array.from(imgData.data); // all pixels [r1, g1, b1, a1, ..., rn, gn, bn, an]
    const pixelLength = imgPixels.length / 4; // all pixels [r1, g1, b1, a1, ..., rn, gn, bn, an]

    // sum of each rgb colors
    const pixels = [0, 0, 0];
    for (let i = 0; i < imgPixels.length; i += 4) {
      pixels[0] += imgPixels[i];
      pixels[1] += imgPixels[i + 1];
      pixels[2] += imgPixels[i + 2];
    }

    // means of each pixels colors type
    const red = Math.floor(pixels[0] / pixelLength); // pixels.length = the number of pixel of each colors
    const green = Math.floor(pixels[1] / pixelLength);
    const blue = Math.floor(pixels[2] / pixelLength);

    return rgbToHexa(red, green, blue);
  }, [ITEMSIZE, context, imageSize.height, imageSize.width]);

  // draw a random shape
  const drawItems = useCallback((c, r) => {
    // Calculate x & y coordinate
    const x = c * ITEMSIZE;
    const y = r * ITEMSIZE;

    // calculate the color
    const color = echoColor(x, y);

    // get a random shape from the list
    const rShapeIndex = rand(0, (shapes.length - 1));

    // draw the selected shape
    shapes?.[rShapeIndex](x, y, color);
  }, [ITEMSIZE, echoColor, shapes]);

  // display the grid
  const drawGrid = useCallback(() => {
    // calculate the number of columns and rows depending the item size
    const columnsNb = Math.ceil(imageSize.width / ITEMSIZE);
    const rowsNb = Math.ceil(imageSize.height / ITEMSIZE);
    // Columns
    Array.from({ length: columnsNb }, (_, k) => k).forEach((cIndex) => {
      // Rows
      Array.from({ length: rowsNb }, (_, k) => k).forEach((rIndex) => {
        drawItems(cIndex, rIndex);
      });
    });
  }, [ITEMSIZE, drawItems, imageSize.height, imageSize.width]);

  // function to center and fit the image
  function drawImageScaled(img, ctx) {
    const { canvas } = ctx;
    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    const ratio = Math.min(hRatio, vRatio);
    const centerShiftX = (canvas.width - img.width * ratio) / 2;
    const centerShiftY = (canvas.height - img.height * ratio) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShiftX,
      centerShiftY,
      img.width * ratio,
      img.height * ratio,
    );
  }

  // draw image wallpaper
  const drawWallpaper = useCallback(() => new Promise((resolve) => {
    const baseImage = new Image();
    baseImage.src = image;
    baseImage.onload = () => {
      drawImageScaled(baseImage, context);
      resolve();
    };
  }), [context, image]);

  // Runs each time the DOM window resize event fires.
  // Resets the canvas dimensions to match window,
  const resizeCanvas = useCallback(async () => {
    const canvasWidth = imageSize.width; // the width of the canvas = the window width size
    const canvasHeight = imageSize.height;

    // init canvas sizes
    context.canvas.width = canvasWidth;
    context.canvas.height = canvasHeight;

    // clean canvas
    context.fillStyle = BG;
    context.fillRect(0, 0, canvasWidth, canvasHeight);

    await drawWallpaper();
    drawGrid();
  }, [BG, context, drawGrid, drawWallpaper, imageSize.height, imageSize.width]);

  // At the mounted state of the component we initialise the canvas
  useEffect(() => {
    if (image) {
      const canvas = canvasRef.current;
      setContext(canvas.getContext('2d'));
    }
  }, [image]);

  // we initialise resize functions
  useEffect(() => {
    if (context && image) {
      window.addEventListener('resize', resizeCanvas, false);
      resizeCanvas();
    }
    return () => {
      window.removeEventListener('resize', resizeCanvas, false);
    };
  }, [context, image, resizeCanvas]);

  return (
    !image ? (
      <UploadFile setImage={setImage} setImageSize={setImageSize} />
    ) : (
      <CanvasWrapper imageSize={imageSize} appSize={appSize}>
        <canvas ref={canvasRef} className={styles.Root} id="canvas" />
      </CanvasWrapper>
    )
  );
});

Canvas.propTypes = {
  tileSize: PropTypes.number,
  bgColor: PropTypes.string,
  appSize: PropTypes.exact({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }).isRequired,
};

Canvas.defaultProps = {
  tileSize: 50,
  bgColor: '#ffffff',
};

export default React.memo(Canvas);
