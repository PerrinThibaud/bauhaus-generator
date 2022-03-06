import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import './App.css';
import * as dat from 'dat.gui';
import { Canvas, Layout } from './components';

function App() {
  const [gui, setGui] = useState(null);
  const [tileSize, setTileSize] = useState(50);
  // eslint-disable-next-line no-unused-vars
  const [bgColor, setBgColor] = useState('#f5ece5'); // TODO
  const [appSize, setAppSize] = useState({ width: 0, height: 0 });
  const appRef = useRef();
  const canvasRef = useRef();

  // function to initialise the GUI
  const initGui = useCallback(() => {
    gui?.destroy();
    const g = new dat.GUI({ name: 'My GUI' });
    // Size of each tiles
    const tileSizeController = g.add({ size: 50 }, 'size', 4, 200, 1).name('Tile size');
    tileSizeController.onFinishChange(setTileSize);

    // TODO The background color
    // const backgroundColor = g.addColor({ color: '#f5ece5' }, 'color').name('Background color');
    // backgroundColor.onFinishChange(setBgColor);

    // Button to download the image
    g.add({
      download: () => {
        const data = document?.getElementById('canvas')?.toDataURL();
        if (data) {
          const link = document.createElement('a');
          link.download = 'bauhaus-wallpaper.png';
          link.href = data;
          link.click();
        }
      },
    }, 'download').name('Download the image');
    // Button to remove image
    g.add({ remove: () => { canvasRef.current.removeImage(); } }, 'remove').name('Remove the image');

    g.close();
    // save the gui inside state
    setGui(g);
  }, [gui]);

  // Function to update the size of the .App div
  const listenAppSize = useCallback(async () => {
    setAppSize({ width: appRef.current.clientWidth, height: appRef.current.clientHeight });
  }, []);

  // init the dat.gui
  useEffect(() => {
    initGui();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // only at the mounted state

  // we initialise resize functions
  useEffect(() => {
    window.addEventListener('resize', listenAppSize, false);
    listenAppSize();
    return () => {
      window.removeEventListener('resize', listenAppSize, false);
    };
  }, [listenAppSize]);

  return (
    <div className="App">
      <Layout>
        <div className="AppWrapper" ref={appRef}>
          <Canvas ref={canvasRef} tileSize={tileSize} bgColor={bgColor} appSize={appSize} />
        </div>
      </Layout>
    </div>
  );
}

export default App;
