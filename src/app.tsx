import React, {useEffect, useState, useRef} from 'react';
import {createRoot} from 'react-dom/client';

import {HeatmapView} from './views/heatmapView/HeatmapView';

const App = () => {
  return (
  <div>
    <HeatmapView />
  </div>
  )
}

export default App;

export function renderToDom(container: HTMLElement) {
  const root = createRoot(container);

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
