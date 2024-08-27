import React, { useEffect } from 'react';
import QRCode from 'qrcode.react';
import { useLocation } from 'react-router-dom';
import { supabase } from './supabaseClient';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

async function logAccessEvent(modelName, userAgent, url) {
  const { data, error } = await supabase
    .from('access_logs')
    .insert([{ model_name: modelName, user_agent: userAgent, url: url }]);

  if (error) console.error('Error logging access event:', error);
  else console.log('Access event logged:', data);
}

function LandingPage() {
  const query = useQuery();
  const modelName = query.get('model');
  const userAgent = navigator.userAgent;
  const isMobile = /iPhone|Android/i.test(userAgent);
  const currentUrl = window.location.href;

  useEffect(() => {
    logAccessEvent(modelName, userAgent, currentUrl);
  }, [modelName, userAgent, currentUrl]);

  return (
    <div>
      <h1>3D Model Viewer</h1>
      {isMobile ? (
        <model-viewer
          src={`/models/${modelName}.glb`}
          alt="A 3D model"
          ar
          auto-rotate
          camera-controls
        >
        </model-viewer>
      ) : (
        <div>
          <p>Scan the QR code to view the model in AR on your mobile device:</p>
          <QRCode value={currentUrl} />
        </div>
      )}
    </div>
  );
}

export default LandingPage;

