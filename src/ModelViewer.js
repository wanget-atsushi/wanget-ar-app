import React, { useEffect } from 'react';
import '@google/model-viewer';

function ModelViewer({ match }) {
  const { modelName } = match.params;

  useEffect(() => {
    // Log event when the model is accessed
    const userAgent = navigator.userAgent;
    logEvent(modelName, userAgent);
  }, [modelName]);

  return (
    <model-viewer
      src={`/models/${modelName}.glb`}
      ios-src={`/models/${modelName}.usdz`}
      ar
      auto-rotate
      camera-controls
      alt="A 3D model"
    ></model-viewer>
  );
}

export default ModelViewer;

