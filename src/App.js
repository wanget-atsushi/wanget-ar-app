import React, { useState } from 'react'
import { supabase } from './supabaseClient'
import QRCode from 'qrcode'

function App() {
  const [currentModel, setCurrentModel] = useState(null)
  const [qrCodeUrl, setQrCodeUrl] = useState('')

  const models = [
    {
      name: 'Office Chair',
      glbUrl: '/models/officechair.glb',
      usdzUrl: '/models/officechair.usdz',
    },
    // 他のモデルを追加
  ]

  const handleModelClick = async (model) => {
    setCurrentModel(model)

    // イベントログをSupabaseに送信
    const { data, error } = await supabase.from('access_logs').insert([
      {
        model_name: model.name,
        user_agent: navigator.userAgent,
      },
    ])
    if (error) console.error('Error inserting log:', error)
    else console.log('Log inserted:', data)

    // QRコード生成
    const url = `${window.location.origin}/?model=${model.name}`
    const qrCodeDataUrl = await QRCode.toDataURL(url)
    setQrCodeUrl(qrCodeDataUrl)
  }

  return (
    <div className="App">
      <h1>3D Model Viewer with AR</h1>
      <div className="thumbnails">
        {models.map((model, index) => (
          <img
            key={index}
            src={model.glbUrl.replace('.glb', '.png')}
            alt={model.name}
            onClick={() => handleModelClick(model)}
            className="thumbnail"
          />
        ))}
      </div>

      {currentModel && (
        <div className="model-viewer-container">
          <model-viewer
            src={currentModel.glbUrl}
            ios-src={currentModel.usdzUrl}
            ar
            ar-modes="scene-viewer quick-look webxr"
            camera-controls
            auto-rotate
            style={{ width: '100%', height: '500px' }}
          ></model-viewer>
        </div>
      )}

      {qrCodeUrl && (
        <div className="qr-code-container">
          <img src={qrCodeUrl} alt="QR Code" />
        </div>
      )}
    </div>
  )
}

export default App
