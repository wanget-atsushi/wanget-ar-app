import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { supabase } from '../supabaseClient'

function LandingPage() {
  const [searchParams] = useSearchParams()
  const modelName = searchParams.get('model')

  useEffect(() => {
    if (modelName) {
      const logAccess = async () => {
        const { data, error } = await supabase.from('access_logs').insert([
          {
            model_name: modelName,
            user_agent: navigator.userAgent,
          },
        ])
        if (error) console.error('Error inserting log:', error)
        else console.log('Log inserted:', data)
      }
      logAccess()
    }
  }, [modelName])

  return (
    <div>
      <h1>{modelName} AR Viewer</h1>
      {modelName && (
        <model-viewer
          src={`/models/${modelName.toLowerCase()}.glb`}
          ios-src={`/models/${modelName.toLowerCase()}.usdz`}
          ar
          ar-modes="scene-viewer quick-look webxr"
          camera-controls
          auto-rotate
          style={{ width: '100%', height: '500px' }}
        ></model-viewer>
      )}
    </div>
  )
}

export default LandingPage
