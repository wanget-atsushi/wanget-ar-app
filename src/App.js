import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { supabase } from './supabaseClient';
import QRCode from 'qrcode.react';
import ModelViewer from './ModelViewer';

function App() {
  const [qrCode, setQrCode] = useState('');

  const logEvent = async (modelName, userAgent) => {
    const { error } = await supabase
      .from('access_logs')
      .insert([{ model_name: modelName, user_agent: userAgent, access_time: new Date(), url: window.location.href }]);

    if (error) console.error('Error logging event:', error);
  };

  const generateQrCode = (url) => {
    setQrCode(url);
  };

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={() => <HomePage logEvent={logEvent} generateQrCode={generateQrCode} />} />
        <Route path="/model/:modelName" component={ModelViewer} />
      </Switch>
      {qrCode && <QRCode value={qrCode} />}
    </Router>
  );
}

export default App;

