import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import * as dat from 'dat.gui';
import { Canvas } from './components';

function App() {
  const [gui, setGui] = useState(null);
  const [tileSize, setTileSize] = useState(50);
  const [bgColor, setBgColor] = useState('#ffffff');

  // function to initialise the GUI
  const initGui = useCallback(() => {
    gui?.destroy();
    const g = new dat.GUI({ name: 'My GUI' });
    // Size of each tiles
    const tileSizeController = g.add({ size: 50 }, 'size', 4, 200, 1).name('Tile size');
    tileSizeController.onFinishChange(setTileSize);

    // The background color
    const backgroundColor = g.addColor({ color: '#ffffff' }, 'color').name('Background color');
    backgroundColor.onFinishChange(setBgColor);

    g.add({ refresh: () => { console.log('test'); } }, 'refresh').name('Refresh');

    // save the gui inside state
    setGui(g);
  }, [gui]);

  // init the dat.gui
  useEffect(() => {
    initGui();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // only at the mounted state

  return (
    <div className="App">
      <Canvas tileSize={tileSize} bgColor={bgColor} />
    </div>
  );
}

export default App;
